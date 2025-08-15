import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Search, FileText, Users, Clock, LogOut, 
  FolderOpen, Settings, BarChart3, Eye, Upload, Video, Image as ImageIcon
} from 'lucide-react';
import { 
  fetchBlogs, deleteBlog, Blog, fetchServices, Service, 
  fetchServiceProjects, Project, createProject, updateProject, 
  deleteProject, fetchProjectById
} from '@/lib/api';
import { Header } from '@/components/Header';
import { ProjectAnalytics } from '@/components/ProjectAnalytics';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ProjectFormData {
  project_name: string;
  project_description: string;
  service_id: number | null;
  project_video: File | null;
  project_thumbnail: File | null;
  project_photos: File[];
}

export const AdminDashboard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'blogs' | 'projects'>('blogs');
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectFormData, setProjectFormData] = useState<ProjectFormData>({
    project_name: '',
    project_description: '',
    service_id: null,
    project_video: null,
    project_thumbnail: null,
    project_photos: []
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    if (!localStorage.getItem('adminAuthenticated')) {
      navigate('/admin');
      return;
    }

    loadInitialData();
  }, [navigate]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [blogsResponse, servicesResponse] = await Promise.all([
        fetchBlogs(),
        fetchServices()
      ]);
      setBlogs(blogsResponse.data);
      setServices(servicesResponse);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadServiceProjects = async (serviceId: number) => {
    try {
      const projectsData = await fetchServiceProjects(serviceId);
      setProjects(projectsData);
    } catch (err) {
      console.error('Error loading service projects:', err);
      setProjects([]);
    }
  };

  const handleServiceChange = (serviceId: string) => {
    const id = parseInt(serviceId);
    setSelectedService(id);
    loadServiceProjects(id);
  };

  const handleDeleteBlog = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      setDeleteLoading(id);
      await deleteBlog(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Failed to delete blog');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleDeleteProject = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      setDeleteLoading(id);
      await deleteProject(id);
      if (selectedService) {
        loadServiceProjects(selectedService);
      }
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEditProject = async (project: Project) => {
    try {
      const projectData = await fetchProjectById(project.project_id);
      setEditingProject(projectData);
      setProjectFormData({
        project_name: projectData.project_name,
        project_description: projectData.project_description,
        service_id: projectData.service_id,
        project_video: null,
        project_thumbnail: null,
        project_photos: []
      });
      setIsProjectDialogOpen(true);
    } catch (err) {
      console.error('Error fetching project details:', err);
      alert('Failed to load project details');
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectFormData.service_id || !projectFormData.project_name.trim() || !projectFormData.project_description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('service_id', projectFormData.service_id.toString());
      formData.append('project_name', projectFormData.project_name);
      formData.append('project_description', projectFormData.project_description);
      
      if (projectFormData.project_video) {
        formData.append('project_video', projectFormData.project_video);
      }
      if (projectFormData.project_thumbnail) {
        formData.append('project_thumbnail', projectFormData.project_thumbnail);
      }
      projectFormData.project_photos.forEach(photo => {
        formData.append('project_photos', photo);
      });

      if (editingProject) {
        await updateProject(editingProject.project_id, formData);
      } else {
        await createProject(formData);
      }

      setIsProjectDialogOpen(false);
      setEditingProject(null);
      setProjectFormData({
        project_name: '',
        project_description: '',
        service_id: null,
        project_video: null,
        project_thumbnail: null,
        project_photos: []
      });

      if (selectedService) {
        loadServiceProjects(selectedService);
      }
    } catch (err) {
      console.error('Error submitting project:', err);
      alert('Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin');
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjects = projects.filter(project =>
    project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.project_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const selectedServiceName = services.find(s => s.service_id === selectedService)?.service_name || '';
  const totalProjects = projects.length;
  const totalServices = services.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your content, projects, and website data.</p>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === 'blogs' && (
              <Link
                to="/admin/create"
                className="bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Create New Blog
              </Link>
            )}
            {activeTab === 'projects' && selectedService && (
              <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</DialogTitle>
                    <DialogDescription>
                      {editingProject ? 'Update project details' : `Add a new project to ${selectedServiceName}`}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleProjectSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="project_name">Project Name *</Label>
                      <Input
                        id="project_name"
                        value={projectFormData.project_name}
                        onChange={(e) => setProjectFormData(prev => ({ ...prev, project_name: e.target.value }))}
                        placeholder="Enter project name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="service_id">Service *</Label>
                      <Select 
                        value={projectFormData.service_id?.toString() || ''} 
                        onValueChange={(value) => setProjectFormData(prev => ({ ...prev, service_id: parseInt(value) }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map(service => (
                            <SelectItem key={service.service_id} value={service.service_id.toString()}>
                              {service.service_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project_description">Description *</Label>
                      <Textarea
                        id="project_description"
                        value={projectFormData.project_description}
                        onChange={(e) => setProjectFormData(prev => ({ ...prev, project_description: e.target.value }))}
                        placeholder="Enter project description"
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project_video">Project Video</Label>
                      <Input
                        id="project_video"
                        type="file"
                        accept="video/*"
                        onChange={(e) => setProjectFormData(prev => ({ 
                          ...prev, 
                          project_video: e.target.files ? e.target.files[0] : null 
                        }))}
                      />
                      <p className="text-sm text-muted-foreground">
                        Supported: MP4, AVI, MOV, WMV, FLV, WebM, MKV (Max: 100MB)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project_thumbnail">Thumbnail Image</Label>
                      <Input
                        id="project_thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProjectFormData(prev => ({ 
                          ...prev, 
                          project_thumbnail: e.target.files ? e.target.files[0] : null 
                        }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project_photos">Project Photos</Label>
                      <Input
                        id="project_photos"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setProjectFormData(prev => ({ 
                          ...prev, 
                          project_photos: Array.from(e.target.files || [])
                        }))}
                      />
                      <p className="text-sm text-muted-foreground">
                        Select multiple images (Max: 19 photos, 100MB each)
                      </p>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsProjectDialogOpen(false);
                          setEditingProject(null);
                          setProjectFormData({
                            project_name: '',
                            project_description: '',
                            service_id: null,
                            project_video: null,
                            project_thumbnail: null,
                            project_photos: []
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={submitting}>
                        {submitting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        ) : null}
                        {editingProject ? 'Update Project' : 'Create Project'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 bg-muted p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-6 py-2 rounded-md transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'blogs' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileText className="w-4 h-4" />
            Blog Management
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-2 rounded-md transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'projects' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            Project Management
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-lg">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{blogs.length}</p>
                <p className="text-sm text-muted-foreground">Total Blogs</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <FolderOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalProjects}</p>
                <p className="text-sm text-muted-foreground">Total Projects</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Settings className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalServices}</p>
                <p className="text-sm text-muted-foreground">Services</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {blogs.filter(b => b.is_featured).length}
                </p>
                <p className="text-sm text-muted-foreground">Featured Content</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Projects Tab - Service Selection */}
        {activeTab === 'projects' && (
          <div className="mb-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Select Service</h3>
              <p className="text-muted-foreground mb-4">Choose a service to view and manage its projects.</p>
              <Select value={selectedService?.toString() || ''} onValueChange={handleServiceChange}>
                <SelectTrigger className="max-w-md">
                  <SelectValue placeholder="Select a service to manage projects" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service.service_id} value={service.service_id.toString()}>
                      {service.service_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedService && (
                <div className="mt-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <p className="text-sm text-foreground">
                    Managing projects for: <span className="font-semibold text-accent">{selectedServiceName}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search Bar */}
        {((activeTab === 'blogs' && blogs.length > 0) || (activeTab === 'projects' && selectedService && projects.length > 0)) && (
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
              />
            </div>
          </div>
        )}

        {/* Content Tables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card border border-border rounded-lg overflow-hidden"
        >
          {error ? (
            <div className="p-6 text-center">
              <p className="text-red-500">{error}</p>
              <button
                onClick={loadInitialData}
                className="mt-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : activeTab === 'blogs' ? (
            // Blogs Table
            filteredBlogs.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No blogs found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm ? 'No blogs match your search criteria.' : 'Get started by creating your first blog post.'}
                </p>
                {!searchTerm && (
                  <Link
                    to="/admin/create"
                    className="bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Create New Blog
                  </Link>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-foreground">Title</th>
                      <th className="text-left p-4 font-medium text-foreground">Author</th>
                      <th className="text-left p-4 font-medium text-foreground">Category</th>
                      <th className="text-left p-4 font-medium text-foreground">Status</th>
                      <th className="text-left p-4 font-medium text-foreground">Date</th>
                      <th className="text-left p-4 font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBlogs.map((blog, index) => (
                      <motion.tr
                        key={blog.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-t border-border hover:bg-muted/25 transition-colors"
                      >
                        <td className="p-4">
                          <div className="max-w-xs">
                            <h3 className="font-medium text-foreground truncate">{blog.title}</h3>
                            <p className="text-sm text-muted-foreground truncate">{blog.subtitle}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-foreground">{blog.author_name}</span>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                            {blog.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            blog.is_featured 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                          }`}>
                            {blog.is_featured ? 'Featured' : 'Regular'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-muted-foreground">{formatDate(blog.published_at)}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/admin/edit/${blog.id}`}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="Edit blog"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteBlog(blog.id, blog.title)}
                              disabled={deleteLoading === blog.id}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete blog"
                            >
                              {deleteLoading === blog.id ? (
                                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            // Projects Table
            !selectedService ? (
              <div className="p-12 text-center">
                <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Select a Service</h3>
                <p className="text-muted-foreground">
                  Choose a service from the dropdown above to view and manage its projects.
                </p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="p-12 text-center">
                <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm 
                    ? 'No projects match your search criteria.' 
                    : `No projects found for ${selectedServiceName}. Create your first project.`
                  }
                </p>
                {!searchTerm && (
                  <Button
                    onClick={() => setIsProjectDialogOpen(true)}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create First Project
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-foreground">Project</th>
                      <th className="text-left p-4 font-medium text-foreground">Media</th>
                      <th className="text-left p-4 font-medium text-foreground">Description</th>
                      <th className="text-left p-4 font-medium text-foreground">Created</th>
                      <th className="text-left p-4 font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project, index) => (
                      <motion.tr
                        key={project.project_id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-t border-border hover:bg-muted/25 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {project.project_thumbnail && (
                              <img
                                src={`http://localhost:5000${project.project_thumbnail}`}
                                alt={project.project_name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <h3 className="font-medium text-foreground">{project.project_name}</h3>
                              <p className="text-sm text-muted-foreground">ID: {project.project_id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {project.project_video && (
                              <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded">
                                <Video className="w-3 h-3" />
                                Video
                              </div>
                            )}
                            {project.project_photos && JSON.parse(project.project_photos).length > 0 && (
                              <div className="flex items-center gap-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded">
                                <ImageIcon className="w-3 h-3" />
                                {JSON.parse(project.project_photos).length} Photos
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-muted-foreground max-w-xs truncate">
                            {project.project_description}
                          </p>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-muted-foreground">
                            {formatDate(project.created_at)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditProject(project)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="Edit project"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.project_id, project.project_name)}
                              disabled={deleteLoading === project.project_id}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete project"
                            >
                              {deleteLoading === project.project_id ? (
                                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </motion.div>

        {/* Project Analytics - Only show when viewing projects */}
        {activeTab === 'projects' && (
          <div className="mt-8">
            <ProjectAnalytics />
          </div>
        )}
      </div>
    </div>
  );
};
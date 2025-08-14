import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, FileText, Users, Clock, LogOut } from 'lucide-react';
import { fetchBlogs, deleteBlog, Blog } from '@/lib/api';
import { Header } from '@/components/Header';

export const AdminDashboard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    if (!localStorage.getItem('adminAuthenticated')) {
      navigate('/admin');
      return;
    }

    loadBlogs();
  }, [navigate]);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetchBlogs();
      setBlogs(response.data);
    } catch (err) {
      setError('Failed to load blogs');
      console.error('Error loading blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
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

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin');
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Blog Management Dashboard</h1>
            <p className="text-muted-foreground">Manage your blog posts, create new content, and edit existing articles.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/create"
              className="bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Create New Blog
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{blogs.filter(b => b.is_featured).length}</p>
                <p className="text-sm text-muted-foreground">Featured Blogs</p>
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
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(blogs.reduce((acc, blog) => acc + blog.reading_time, 0) / blogs.length) || 0}
                </p>
                <p className="text-sm text-muted-foreground">Avg Reading Time</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
            />
          </div>
        </div>

        {/* Blogs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card border border-border rounded-lg overflow-hidden"
        >
          {error ? (
            <div className="p-6 text-center">
              <p className="text-red-500">{error}</p>
              <button
                onClick={loadBlogs}
                className="mt-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : filteredBlogs.length === 0 ? (
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
                            onClick={() => handleDelete(blog.id, blog.title)}
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
          )}
        </motion.div>
      </div>
    </div>
  );
};
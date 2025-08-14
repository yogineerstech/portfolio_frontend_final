import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { fetchServiceProjects, Project } from '@/lib/api';
import { Header } from '@/components/Header';

export const ProjectsShowcase = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      if (!serviceId) return;
      
      try {
        setLoading(true);
        const projectsData = await fetchServiceProjects(Number(serviceId));
        setProjects(projectsData);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [serviceId]);

  const parsePhotos = (photosString: string): string[] => {
    try {
      return JSON.parse(photosString);
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => navigate('/services')}
              className="bg-accent text-accent-foreground px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Back to Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Header */}
      <div className="border-b border-border pt-20">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/services')}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </button>
            <h1 className="text-2xl font-bold text-foreground">
              Service Projects
            </h1>
            <div></div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No projects found for this service.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.project_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 group"
              >
                {/* Project Thumbnail */}
                <div className="relative aspect-video bg-muted">
                  <img
                    src={project.project_thumbnail}
                    alt={project.project_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                      const placeholder = document.createElement('div');
                      placeholder.className = 'text-muted-foreground text-sm';
                      placeholder.textContent = 'Image not available';
                      target.parentElement?.appendChild(placeholder);
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {project.project_name}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {project.project_description}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {project.project_video && (
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center gap-2 bg-accent/10 text-accent px-3 py-2 rounded-lg hover:bg-accent/20 transition-colors text-sm flex-1"
                      >
                        <Play className="w-4 h-4" />
                        View Demo
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg hover:bg-primary/20 transition-colors text-sm flex-1"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Gallery
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-border"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                {selectedProject.project_name}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* Project Video */}
              {selectedProject.project_video && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Demo Video</h3>
                  <video
                    controls
                    className="w-full rounded-lg"
                    poster={selectedProject.project_thumbnail}
                  >
                    <source src={selectedProject.project_video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Project Description */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">About This Project</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.project_description}
                </p>
              </div>

              {/* Project Photos */}
              {selectedProject.project_photos && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Screenshots</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {parsePhotos(selectedProject.project_photos).map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`${selectedProject.project_name} screenshot ${index + 1}`}
                        className="w-full rounded-lg border border-border"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

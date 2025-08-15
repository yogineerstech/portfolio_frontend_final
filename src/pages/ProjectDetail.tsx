import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Image as ImageIcon, ExternalLink, Calendar } from 'lucide-react';
import { fetchServiceProjects, fetchServices, Project, Service } from '@/lib/api';
import { Header } from '@/components/Header';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ProjectDetail = () => {
  const { serviceId, projectId } = useParams<{ serviceId: string; projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjectAndService = async () => {
      if (!serviceId || !projectId) return;
      
      try {
        setLoading(true);
        
        // Fetch projects and find the specific project
        const [projectsData, servicesData] = await Promise.all([
          fetchServiceProjects(Number(serviceId)),
          fetchServices()
        ]);
        
        const foundProject = projectsData.find(p => p.project_id === Number(projectId));
        const foundService = servicesData.find(s => s.service_id === Number(serviceId));
        
        if (!foundProject) {
          setError('Project not found');
          return;
        }
        
        setProject(foundProject);
        setService(foundService || null);
      } catch (err) {
        setError('Failed to load project');
        console.error('Error loading project:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjectAndService();
  }, [serviceId, projectId]);

  const parsePhotos = (photosString: string): string[] => {
    try {
      return JSON.parse(photosString);
    } catch {
      return [];
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || 'Project not found'}</p>
            <Link 
              to={`/projects/${serviceId}`}
              className="bg-accent text-accent-foreground px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Fixed Back Button - Always at top left, below navbar */}
      <Link 
        to={`/projects/${serviceId}`}
        className="fixed top-24 left-4 md:left-6 z-50 w-10 h-10 md:w-12 md:h-12 bg-background/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:text-accent hover:bg-background transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
      </Link>
      
      {/* Project Thumbnail as Hero */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <img 
          src={`${API_BASE_URL}${project.project_thumbnail}`}
          alt={project.project_name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzllYTNhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+';
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Project title overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent">
            <div className="max-w-4xl mx-auto px-6 py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Service category */}
                {service && (
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                      {service.service_name}
                    </span>
                  </div>
                )}
                
                {/* Project title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 font-display">
                  {project.project_name}
                </h1>
                
                {/* Project description preview */}
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
                  {project.project_description.length > 150 
                    ? `${project.project_description.substring(0, 150)}...`
                    : project.project_description
                  }
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Project Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">Project Details</p>
                <p className="text-sm text-muted-foreground">Case Study</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(project.created_at)}</span>
              </div>
              {service && (
                <div className="flex items-center gap-1">
                  <span>Service: {service.service_name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Project Video */}
          {project.project_video && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 font-display">Project Demo</h2>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <video
                  controls
                  className="w-full h-auto object-cover"
                  poster={`${API_BASE_URL}${project.project_thumbnail}`}
                >
                  <source src={`${API_BASE_URL}${project.project_video}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          )}

          {/* Project Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 font-display">About This Project</h2>
            <div className="prose prose-lg max-w-none">
              <div className="text-lg leading-relaxed text-muted-foreground">
                {project.project_description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Project Screenshots */}
          {project.project_photos && parsePhotos(project.project_photos).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 font-display">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {parsePhotos(project.project_photos).map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <img
                      src={`${API_BASE_URL}${photo}`}
                      alt={`${project.project_name} screenshot ${index + 1}`}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzllYTNhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <p className="text-white/80 text-sm">
                        Screenshot {index + 1}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">Project Completed</p>
                  <p className="text-muted-foreground">Thank you for viewing!</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Link 
                  to={`/projects/${serviceId}`}
                  className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
                >
                  More Projects
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </article>
    </div>
  );
};

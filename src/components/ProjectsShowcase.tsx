import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { fetchServiceProjects, fetchServices, Project, Service } from '@/lib/api';
import { Header } from '@/components/Header';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ProjectsShowcase = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjectsAndService = async () => {
      if (!serviceId) return;
      
      try {
        setLoading(true);
        const [projectsData, servicesData] = await Promise.all([
          fetchServiceProjects(Number(serviceId)),
          fetchServices()
        ]);
        
        setProjects(projectsData);
        
        const foundService = servicesData.find(s => s.service_id === Number(serviceId));
        setService(foundService || null);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjectsAndService();
  }, [serviceId]);

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
      
      {/* Fixed Back Button - Always at top left, below navbar */}
      <button 
        onClick={() => navigate('/services')}
        className="fixed top-24 left-4 md:left-6 z-50 w-10 h-10 md:w-12 md:h-12 bg-background/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:text-accent hover:bg-background transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>
      
      <div className="container mx-auto px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-display-lg mb-6 text-foreground">
              {service ? `${service.service_name} Projects` : 'Service Projects'}
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {service ? service.service_description : 'Explore our portfolio of completed projects and case studies.'}
            </p>
          </motion.div>
        </div>
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
                    src={`${API_BASE_URL}${project.project_thumbnail}`}
                    alt={project.project_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzllYTNhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => navigate(`/projects/${serviceId}/${project.project_id}`)}
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
                  
                  {/* View Project Button */}
                  <button
                    onClick={() => navigate(`/projects/${serviceId}/${project.project_id}`)}
                    className="w-full bg-accent text-accent-foreground px-4 py-3 rounded-lg hover:bg-accent/90 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Project
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

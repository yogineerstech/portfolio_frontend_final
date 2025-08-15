import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Image as ImageIcon, ExternalLink, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchServiceProjects, fetchServices, Project, Service } from '@/lib/api';
import { Header } from '@/components/Header';
import MaskedDiv from '@/components/ui/masked-div';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ProjectDetail = () => {
  const { serviceId, projectId } = useParams<{ serviceId: string; projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!project || selectedImageIndex === null) return;
    const photos = parsePhotos(project.project_photos);
    
    if (direction === 'prev') {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : photos.length - 1);
    } else {
      setSelectedImageIndex(selectedImageIndex < photos.length - 1 ? selectedImageIndex + 1 : 0);
    }
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeImageModal();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedImageIndex]);

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
        <div className="absolute inset-0">
          <img 
            src={`${API_BASE_URL}${project.project_thumbnail}`}
            alt={project.project_name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzllYTNhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+';
            }}
          />
        </div>
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
              <div className="max-w-5xl mx-auto">
                <MaskedDiv 
                  maskType="type-2" 
                  className="shadow-2xl hover:shadow-3xl transition-all duration-500"
                  size={0.95}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    poster={`${API_BASE_URL}${project.project_thumbnail}`}
                    onError={(e) => {
                      console.error('Video failed to load:', e);
                    }}
                  >
                    <source src={`${API_BASE_URL}${project.project_video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </MaskedDiv>
                {/* Video info */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Autoplay demo • Tap to interact
                  </p>
                </div>
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
              <h2 className="text-2xl font-bold text-foreground mb-8 font-display">Project Gallery</h2>
              
              {/* Alternating Masked and Simple Image Layout */}
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {parsePhotos(project.project_photos).map((photo, index) => {
                    // Calculate row number (0-based)
                    const rowIndex = Math.floor(index / 2);
                    // Determine if this should be masked based on row and position
                    const isLeftColumn = index % 2 === 0;
                    const shouldBeMasked = (rowIndex % 2 === 0 && isLeftColumn) || (rowIndex % 2 === 1 && !isLeftColumn);
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group cursor-pointer"
                        onClick={() => openImageModal(index)}
                        whileHover={{ y: -8 }}
                      >
                        {shouldBeMasked ? (
                          <div 
                            className="w-full h-[500px] md:h-[600px] lg:h-[650px] shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] overflow-hidden"
                            style={{
                              maskImage: rowIndex % 2 === 0 
                                ? `url("data:image/svg+xml,%3Csvg width='460' height='591' viewBox='0 0 460 591' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M0.928955 40.9769C0.928955 18.9149 18.7917 1.01844 40.8536 0.976903L289.97 0.507853C308.413 0.473128 323.521 15.1483 324.022 33.5845L324.886 65.4007C325.955 104.745 358.022 136.159 397.38 136.417L432.98 136.65C447.818 136.748 459.797 148.799 459.803 163.637L459.982 550.982C459.992 573.08 442.08 591 419.982 591H40.9289C18.8376 591 0.928955 573.091 0.928955 551V40.9769Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A")`
                                : `url("data:image/svg+xml,%3Csvg width='850' height='381' viewBox='0 0 850 381' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M0.811768 77.2118C0.811768 60.4225 14.4222 46.8121 31.2115 46.8121H180.95C192.496 46.8121 201.855 37.4527 201.855 25.9073V25.9073C201.855 11.9565 213.164 0.647217 227.115 0.647217H529.273C548.014 0.647217 563.206 15.8395 563.206 34.5802V34.5802C563.206 50.0897 575.779 62.6626 591.289 62.6626H820.388C837.177 62.6626 850.787 76.273 850.787 93.0623V350.953C850.787 367.742 837.177 381.353 820.388 381.353H366.165C349.852 381.353 336.627 368.128 336.627 351.814V351.814C336.627 335.501 323.402 322.276 307.089 322.276H31.2114C14.4222 322.276 0.811768 308.666 0.811768 291.876V77.2118Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A")`,
                              WebkitMaskImage: rowIndex % 2 === 0 
                                ? `url("data:image/svg+xml,%3Csvg width='460' height='591' viewBox='0 0 460 591' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M0.928955 40.9769C0.928955 18.9149 18.7917 1.01844 40.8536 0.976903L289.97 0.507853C308.413 0.473128 323.521 15.1483 324.022 33.5845L324.886 65.4007C325.955 104.745 358.022 136.159 397.38 136.417L432.98 136.65C447.818 136.748 459.797 148.799 459.803 163.637L459.982 550.982C459.992 573.08 442.08 591 419.982 591H40.9289C18.8376 591 0.928955 573.091 0.928955 551V40.9769Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A")`
                                : `url("data:image/svg+xml,%3Csvg width='850' height='381' viewBox='0 0 850 381' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M0.811768 77.2118C0.811768 60.4225 14.4222 46.8121 31.2115 46.8121H180.95C192.496 46.8121 201.855 37.4527 201.855 25.9073V25.9073C201.855 11.9565 213.164 0.647217 227.115 0.647217H529.273C548.014 0.647217 563.206 15.8395 563.206 34.5802V34.5802C563.206 50.0897 575.779 62.6626 591.289 62.6626H820.388C837.177 62.6626 850.787 76.273 850.787 93.0623V350.953C850.787 367.742 837.177 381.353 820.388 381.353H366.165C349.852 381.353 336.627 368.128 336.627 351.814V351.814C336.627 335.501 323.402 322.276 307.089 322.276H31.2114C14.4222 322.276 0.811768 308.666 0.811768 291.876V77.2118Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A")`,
                              maskRepeat: 'no-repeat',
                              WebkitMaskRepeat: 'no-repeat',
                              maskSize: 'cover',
                              WebkitMaskSize: 'cover',
                              maskPosition: 'center',
                              WebkitMaskPosition: 'center',
                              transform: 'translateZ(0)',
                              WebkitBackfaceVisibility: 'hidden',
                              backfaceVisibility: 'hidden',
                            }}
                          >
                            <img
                              src={`${API_BASE_URL}${photo}`}
                              alt={`${project.project_name} screenshot ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-[500px] md:h-[600px] lg:h-[650px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                            <img
                              src={`${API_BASE_URL}${photo}`}
                              alt={`${project.project_name} screenshot ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                  
                  {/* Add placeholder if odd number of images to maintain grid structure */}
                  {parsePhotos(project.project_photos).length % 2 !== 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: parsePhotos(project.project_photos).length * 0.1 }}
                      className="hidden lg:block"
                    >
                      <div className="w-full h-[500px] md:h-[600px] lg:h-[650px] rounded-3xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center bg-muted/20">
                        <div className="text-center text-muted-foreground">
                          <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                          <p className="text-lg font-medium opacity-50">More screenshots</p>
                          <p className="text-sm opacity-30">coming soon</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Gallery info */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  {parsePhotos(project.project_photos).length} screenshot{parsePhotos(project.project_photos).length > 1 ? 's' : ''} • 
                  Click any image to view full size
                </p>
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

      {/* Image Modal */}
      <AnimatePresence>
        {isModalOpen && selectedImageIndex !== null && project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeImageModal}
          >
            <div className="relative max-w-7xl max-h-[90vh] w-full mx-4">
              {/* Close button */}
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation buttons */}
              {parsePhotos(project.project_photos).length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage('prev');
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage('next');
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Modal image - Full size without mask */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative max-w-full max-h-[80vh] bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img
                    src={`${API_BASE_URL}${parsePhotos(project.project_photos)[selectedImageIndex]}`}
                    alt={`${project.project_name} screenshot ${selectedImageIndex + 1}`}
                    className="w-full h-full object-contain max-w-none"
                    style={{ maxHeight: '80vh', maxWidth: '90vw' }}
                    loading="eager"
                  />
                </div>
              </motion.div>

              {/* Image info */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                  <p className="text-white text-sm font-medium">
                    {selectedImageIndex + 1} of {parsePhotos(project.project_photos).length}
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    Press ESC to close • Use arrow keys to navigate
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

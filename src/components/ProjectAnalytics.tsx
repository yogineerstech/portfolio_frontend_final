import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Calendar, Users, Activity } from 'lucide-react';
import { Service, Project, fetchServices, fetchServiceProjects } from '@/lib/api';

interface ProjectStats {
  totalProjects: number;
  projectsByService: { serviceName: string; count: number; color: string }[];
  recentProjects: { name: string; service: string; date: string }[];
  projectsWithMedia: {
    withVideo: number;
    withPhotos: number;
    withThumbnail: number;
    withoutMedia: number;
  };
}

export const ProjectAnalytics = () => {
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjectAnalytics();
  }, []);

  const loadProjectAnalytics = async () => {
    try {
      setLoading(true);
      const services = await fetchServices();
      
      let allProjects: (Project & { serviceName: string })[] = [];
      
      // Fetch projects for each service
      for (const service of services) {
        try {
          const serviceProjects = await fetchServiceProjects(service.service_id);
          const projectsWithService = serviceProjects.map(project => ({
            ...project,
            serviceName: service.service_name
          }));
          allProjects = [...allProjects, ...projectsWithService];
        } catch (err) {
          console.warn(`Failed to fetch projects for service ${service.service_name}:`, err);
        }
      }

      // Generate colors for each service
      const colors = [
        '#F97316', // orange
        '#3B82F6', // blue
        '#10B981', // green
        '#8B5CF6', // purple
        '#F59E0B', // amber
        '#EF4444', // red
        '#06B6D4', // cyan
        '#84CC16', // lime
      ];

      const projectsByService = services.map((service, index) => ({
        serviceName: service.service_name,
        count: allProjects.filter(p => p.service_id === service.service_id).length,
        color: colors[index % colors.length]
      }));

      const recentProjects = allProjects
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)
        .map(project => ({
          name: project.project_name,
          service: project.serviceName,
          date: project.created_at
        }));

      const projectsWithMedia = {
        withVideo: allProjects.filter(p => p.project_video).length,
        withPhotos: allProjects.filter(p => p.project_photos && JSON.parse(p.project_photos).length > 0).length,
        withThumbnail: allProjects.filter(p => p.project_thumbnail).length,
        withoutMedia: allProjects.filter(p => !p.project_video && !p.project_thumbnail && (!p.project_photos || JSON.parse(p.project_photos).length === 0)).length
      };

      setStats({
        totalProjects: allProjects.length,
        projectsByService,
        recentProjects,
        projectsWithMedia
      });
    } catch (err) {
      console.error('Error loading project analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      </motion.div>
    );
  }

  if (!stats) {
    return null;
  }

  const maxCount = Math.max(...stats.projectsByService.map(s => s.count));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-accent/10 rounded-lg">
          <BarChart3 className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Project Analytics</h2>
          <p className="text-muted-foreground">Insights and statistics about your projects</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects by Service Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Projects by Service</h3>
          </div>
          
          <div className="space-y-4">
            {stats.projectsByService.map((service, index) => (
              <motion.div
                key={service.serviceName}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: service.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{service.serviceName}</span>
                    <span className="text-sm text-muted-foreground">{service.count}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${maxCount > 0 ? (service.count / maxCount) * 100 : 0}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="h-2 rounded-full"
                      style={{ backgroundColor: service.color }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Media Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Media Distribution</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            >
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.projectsWithMedia.withVideo}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">With Video</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
            >
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.projectsWithMedia.withPhotos}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">With Photos</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
            >
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {stats.projectsWithMedia.withThumbnail}
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400">With Thumbnail</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="text-center p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg"
            >
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {stats.projectsWithMedia.withoutMedia}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">No Media</div>
            </motion.div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-card border border-border rounded-lg p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Recent Projects</h3>
          </div>
          
          {stats.recentProjects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No projects found
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentProjects.map((project, index) => (
                <motion.div
                  key={`${project.name}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <div>
                      <div className="font-medium text-foreground">{project.name}</div>
                      <div className="text-sm text-muted-foreground">{project.service}</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(project.date)}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

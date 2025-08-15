import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Tag, Calendar, Eye, Heart } from 'lucide-react';
import { fetchBlogBySlug, Blog } from '@/lib/api';
import { Header } from '@/components/Header';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlog = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const blogData = await fetchBlogBySlug(slug);
        setBlog(blogData);
      } catch (err) {
        setError('Failed to load blog');
        console.error('Error loading blog:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    // Simple content formatting - split by double newlines to create paragraphs
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      // Check if it's a heading (starts with uppercase and is short)
      if (paragraph.length < 100 && paragraph === paragraph.trim() && !paragraph.includes('.')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
            {paragraph}
          </h2>
        );
      }
      
      // Check if it's a list item
      if (paragraph.startsWith('•')) {
        const items = paragraph.split('\n').filter(item => item.trim().startsWith('•'));
        return (
          <ul key={index} className="space-y-2 mb-6">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                {item.replace('•', '').trim()}
              </li>
            ))}
          </ul>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-6">
          {paragraph}
        </p>
      );
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

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || 'Blog not found'}</p>
            <Link 
              to="/companyblogs"
              className="bg-accent text-accent-foreground px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Back to Blogs
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
        to="/companyblogs"
        className="fixed top-24 left-4 md:left-6 z-50 w-10 h-10 md:w-12 md:h-12 bg-background/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground hover:text-accent hover:bg-background transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
      </Link>
      
      {/* Banner Image - Full width hero section */}
      {blog.banner_image && (
        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
          <img 
            src={`${API_BASE_URL}${blog.banner_image}`}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Banner content overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full bg-gradient-to-t from-black/60 via-black/20 to-transparent">
              <div className="max-w-4xl mx-auto px-6 py-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Category badge on banner */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                      {blog.category}
                    </span>
                    {blog.is_featured === 1 && (
                      <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  {/* Title on banner */}
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 font-display">
                    {blog.title}
                  </h1>
                  
                  {/* Subtitle on banner */}
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
                    {blog.subtitle}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title and meta for blogs without banner */}
          {!blog.banner_image && (
            <>
              {/* Category and Meta */}
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
                  {blog.category}
                </span>
                {blog.is_featured === 1 && (
                  <span className="bg-accent/20 text-accent px-3 py-1 rounded text-xs font-medium">
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6 font-display">
                {blog.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {blog.subtitle}
              </p>
            </>
          )}

          {/* Author and Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-foreground">{blog.author_name}</p>
                <p className="text-sm text-muted-foreground">Author</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.published_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{blog.reading_time} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{blog.views_count} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{blog.likes_count} likes</span>
              </div>
            </div>
          </div>

          {/* Featured Image - Medium style in-content image */}
          {blog.featured_image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={`${API_BASE_URL}${blog.featured_image}`}
                  alt={blog.title}
                  className="w-full h-auto object-cover"
                />
                {/* Optional: Image caption area */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                  <p className="text-white/80 text-sm italic">
                    Featured image for "{blog.title}"
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="text-lg leading-relaxed">
              {formatContent(blog.content)}
            </div>
          </motion.div>

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
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">{blog.author_name}</p>
                  <p className="text-muted-foreground">Thank you for reading!</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-accent/30 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>{blog.likes_count}</span>
                </button>
                <Link 
                  to="/companyblogs"
                  className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
                >
                  More Articles
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </article>
    </div>
  );
};

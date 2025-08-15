import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Upload, X, Image } from 'lucide-react';
import { createBlog, updateBlog, fetchBlogById } from '@/lib/api';
import { Header } from '@/components/Header';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface BlogFormData {
  title: string;
  content: string;
  author_name: string;
  subtitle: string;
  category: string;
  tags: string;
  featured_image: File | null;
  banner_image: File | null;
}

interface FilePreview {
  file: File | null;
  preview: string | null;
}

export const BlogForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    author_name: '',
    subtitle: '',
    category: '',
    tags: '',
    featured_image: null,
    banner_image: null,
  });

  const [featuredImagePreview, setFeaturedImagePreview] = useState<FilePreview>({
    file: null,
    preview: null
  });

  const [bannerImagePreview, setBannerImagePreview] = useState<FilePreview>({
    file: null,
    preview: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    // Check authentication
    if (!localStorage.getItem('adminAuthenticated')) {
      navigate('/admin');
      return;
    }

    // If editing, fetch the blog data
    if (isEditing && id) {
      loadBlogData(parseInt(id));
    }
  }, [isEditing, id, navigate]);

  const loadBlogData = async (blogId: number) => {
    try {
      setFetchLoading(true);
      const blog = await fetchBlogById(blogId);
      
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        author_name: blog.author_name || '',
        subtitle: blog.subtitle || '',
        category: blog.category || '',
        tags: blog.tags ? blog.tags.join(', ') : '',
        featured_image: null,
        banner_image: null,
      });

      // Set existing image previews if available
      if (blog.featured_image) {
        setFeaturedImagePreview({
          file: null,
          preview: blog.featured_image
        });
      }

      if (blog.banner_image) {
        setBannerImagePreview({
          file: null,
          preview: blog.banner_image
        });
      }
    } catch (err) {
      console.error('Error loading blog:', err);
      setError('Failed to load blog data');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'featured' | 'banner') => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        
        if (type === 'featured') {
          setFeaturedImagePreview({ file, preview });
          setFormData(prev => ({ ...prev, featured_image: file }));
        } else {
          setBannerImagePreview({ file, preview });
          setFormData(prev => ({ ...prev, banner_image: file }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (type: 'featured' | 'banner') => {
    if (type === 'featured') {
      setFeaturedImagePreview({ file: null, preview: null });
      setFormData(prev => ({ ...prev, featured_image: null }));
    } else {
      setBannerImagePreview({ file: null, preview: null });
      setFormData(prev => ({ ...prev, banner_image: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      
      // Add text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('author_name', formData.author_name);
      
      if (formData.subtitle) formDataToSend.append('subtitle', formData.subtitle);
      if (formData.category) formDataToSend.append('category', formData.category);
      if (formData.tags) formDataToSend.append('tags', formData.tags);
      
      // Add files only if new files are selected
      if (featuredImagePreview.file) {
        formDataToSend.append('featured_image', featuredImagePreview.file);
      }
      if (bannerImagePreview.file) {
        formDataToSend.append('banner_image', bannerImagePreview.file);
      }

      if (isEditing && id) {
        await updateBlog(parseInt(id), formDataToSend);
      } else {
        await createBlog(formDataToSend);
      }

      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Error saving blog:', err);
      setError(err.message || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
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
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Update your blog post details below.' : 'Fill in the details to create a new blog post.'}
            </p>
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter blog title"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                required
              />
            </div>

            {/* Subtitle */}
            <div>
              <label htmlFor="subtitle" className="block text-sm font-medium text-foreground mb-2">
                Subtitle
              </label>
              <input
                id="subtitle"
                name="subtitle"
                type="text"
                value={formData.subtitle}
                onChange={handleInputChange}
                placeholder="Enter blog subtitle (optional)"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
              />
            </div>

            {/* Author and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="author_name" className="block text-sm font-medium text-foreground mb-2">
                  Author Name *
                </label>
                <input
                  id="author_name"
                  name="author_name"
                  type="text"
                  value={formData.author_name}
                  onChange={handleInputChange}
                  placeholder="Enter author name"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                >
                  <option value="">Select category</option>
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Development">Development</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="News">News</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Enter tags separated by commas (e.g., react, javascript, web)"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-foreground mb-2">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your blog content here..."
                rows={12}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 resize-vertical"
                required
              />
            </div>

            {/* Image Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Featured Image
                </label>
                <div className="space-y-3">
                  {featuredImagePreview.preview ? (
                    <div className="relative">
                      <img
                        src={featuredImagePreview.preview}
                        alt="Featured preview"
                        className="w-full h-32 object-cover rounded-lg border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage('featured')}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Image className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">No image selected</p>
                    </div>
                  )}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'featured')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="featured-image-input"
                    />
                    <label
                      htmlFor="featured-image-input"
                      className="w-full bg-muted hover:bg-muted/80 border border-border rounded-lg py-2 px-4 text-center cursor-pointer transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Upload className="w-4 h-4" />
                      Choose Featured Image
                    </label>
                  </div>
                </div>
              </div>

              {/* Banner Image */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Banner Image
                </label>
                <div className="space-y-3">
                  {bannerImagePreview.preview ? (
                    <div className="relative">
                      <img
                        src={bannerImagePreview.preview}
                        alt="Banner preview"
                        className="w-full h-32 object-cover rounded-lg border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage('banner')}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Image className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">No image selected</p>
                    </div>
                  )}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'banner')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="banner-image-input"
                    />
                    <label
                      htmlFor="banner-image-input"
                      className="w-full bg-muted hover:bg-muted/80 border border-border rounded-lg py-2 px-4 text-center cursor-pointer transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Upload className="w-4 h-4" />
                      Choose Banner Image
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t border-border">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin"></div>
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {isEditing ? 'Update Blog' : 'Create Blog'}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, Tag, Search, X } from 'lucide-react';
import { fetchBlogs, searchBlogs, Blog } from '@/lib/api';
import { Header } from '@/components/Header';

export const CompanyBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Blog[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
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

    loadBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setShowSearchResults(false);
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const response = await searchBlogs(term.trim());
      setSearchResults(response.data);
      setShowSearchResults(true);
    } catch (err) {
      console.error('Error searching blogs:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const handleSearchInput = (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      const timeoutId = setTimeout(() => {
        handleSearch(value);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      clearSearch();
    }
  };

  const displayedBlogs = showSearchResults ? searchResults : blogs;
  const featuredBlogs = displayedBlogs.filter(blog => blog.is_featured === 1);
  const regularBlogs = displayedBlogs.filter(blog => blog.is_featured === 0);

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

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-accent text-accent-foreground px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-display-lg mb-6 text-foreground">
            Our Blogs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and thoughts from our team about technology, 
            innovation, and the future of software development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => handleSearchInput(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 text-foreground placeholder-muted-foreground"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          {showSearchResults && (
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                {searchResults.length > 0 
                  ? `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'} for "${searchTerm}"`
                  : `No results found for "${searchTerm}"`
                }
                <button 
                  onClick={clearSearch}
                  className="ml-2 text-accent hover:text-accent/80 transition-colors underline"
                >
                  Clear search
                </button>
              </p>
            </div>
          )}
        </motion.div>

        {featuredBlogs.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-foreground mb-8">Featured Articles</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredBlogs.map((blog, index) => (
                <motion.article key={blog.id}>
                  <Link to={`/blog/${blog.slug}`} className="block">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                      <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                        <Tag className="w-12 h-12 text-accent/60" />
                      </div>
                      <div className="p-8">
                        <div className="flex items-center gap-2 text-sm text-accent font-medium mb-4">
                          <span className="bg-accent/10 px-3 py-1 rounded-full">
                            {blog.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                          {blog.title}
                        </h3>
                        <p className="text-muted-foreground text-lg mb-4">
                          {blog.subtitle}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{blog.author_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{blog.reading_time} min read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">All Articles</h2>
          <div className="space-y-8">
            {regularBlogs.map((blog, index) => (
              <motion.article key={blog.id}>
                <Link to={`/blog/${blog.slug}`} className="block">
                  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-accent font-medium mb-3">
                          <span className="bg-accent/10 px-3 py-1 rounded-full">
                            {blog.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {blog.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{blog.author_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{blog.reading_time} min read</span>
                          </div>
                          <span>{formatDate(blog.published_at)}</span>
                        </div>
                      </div>
                      <div className="w-full md:w-48 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Tag className="w-8 h-8 text-accent/60" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

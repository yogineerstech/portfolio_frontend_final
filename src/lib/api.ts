const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Service {
  service_id: number;
  service_gif: string;
  service_name: string;
  service_description: string;
  service_icon: string;
  service_link: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  project_id: number;
  service_id: number;
  project_name: string;
  project_video: string;
  project_photos: string;
  project_thumbnail: string;
  project_description: string;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  content: string;
  excerpt: string;
  author_name: string;
  featured_image: string | null;
  banner_image: string | null;
  images: string[];
  reading_time: number;
  word_count: number;
  status: string;
  published_at: string;
  meta_title: string;
  meta_description: string;
  views_count: number;
  likes_count: number;
  category: string;
  tags: string[];
  is_featured: number;
  created_at: string;
  updated_at: string;
}

export interface BlogsResponse {
  success: boolean;
  data: Blog[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalBlogs: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export const fetchServices = async (): Promise<Service[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/services`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export const fetchServiceProjects = async (serviceId: number): Promise<Project[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/services/${serviceId}/projects`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching service projects:', error);
    throw error;
  }
};

export const fetchBlogs = async (): Promise<BlogsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v2/blogs`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const fetchBlogBySlug = async (slug: string): Promise<Blog> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v2/blogs/${slug}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    throw error;
  }
};

export const searchBlogs = async (searchTerm: string, page: number = 1, limit: number = 10): Promise<BlogsResponse> => {
  try {
    const params = new URLSearchParams({
      q: searchTerm,
      page: page.toString(),
      limit: limit.toString()
    });
    
    const response = await fetch(`${API_BASE_URL}/api/v2/blogs/search?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching blogs:', error);
    throw error;
  }
};

export const submitContactForm = async (formData: ContactFormData): Promise<ContactResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Admin Blog Management Functions
export const fetchBlogById = async (id: number): Promise<Blog> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v2/blogs/id/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    throw error;
  }
};

export const createBlog = async (formData: FormData): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v2/blogs`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

export const updateBlog = async (id: number, formData: FormData): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v2/blogs/${id}`, {
      method: 'PUT',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
};

export const deleteBlog = async (id: number): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v2/blogs/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};

export const likeBlog = async (id: number): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v2/blogs/${id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error liking blog:', error);
    throw error;
  }
};

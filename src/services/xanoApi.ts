
// Xano API configuration and base functions
const XANO_BASE_URL = 'https://your-workspace-id.us-east-1.xano.io/api:version/'; // Replace with your actual Xano workspace URL

interface XanoResponse<T> {
  data?: T;
  error?: string;
}

// Base API function
async function xanoRequest<T>(endpoint: string, options: RequestInit = {}): Promise<XanoResponse<T>> {
  try {
    const response = await fetch(`${XANO_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers when needed
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Xano API Error:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// User authentication functions
export const authAPI = {
  login: async (email: string, password: string) => {
    return xanoRequest<{ authToken: string; user: any }>('auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (email: string, password: string, name: string) => {
    return xanoRequest<{ authToken: string; user: any }>('auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  getCurrentUser: async (authToken: string) => {
    return xanoRequest<any>('auth/me', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  },
};

// Posts API functions
export const postsAPI = {
  getAllPosts: async (authToken: string) => {
    return xanoRequest<any[]>('posts', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  },

  createPost: async (authToken: string, postData: any) => {
    return xanoRequest<any>('posts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify(postData),
    });
  },

  updatePost: async (authToken: string, postId: string, postData: any) => {
    return xanoRequest<any>(`posts/${postId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify(postData),
    });
  },

  deletePost: async (authToken: string, postId: string) => {
    return xanoRequest<any>(`posts/${postId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    });
  },
};

// Analytics API functions
export const analyticsAPI = {
  getPostAnalytics: async (authToken: string, postId: string) => {
    return xanoRequest<any>(`analytics/post/${postId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  },

  getOverallAnalytics: async (authToken: string, dateRange?: string) => {
    const params = dateRange ? `?range=${dateRange}` : '';
    return xanoRequest<any>(`analytics/overview${params}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  },
};

// Competitors API functions
export const competitorsAPI = {
  getCompetitors: async (authToken: string) => {
    return xanoRequest<any[]>('competitors', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  },

  addCompetitor: async (authToken: string, competitorData: any) => {
    return xanoRequest<any>('competitors', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authToken}` },
      body: JSON.stringify(competitorData),
    });
  },

  getCompetitorPosts: async (authToken: string, competitorId: string) => {
    return xanoRequest<any[]>(`competitors/${competitorId}/posts`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  },
};

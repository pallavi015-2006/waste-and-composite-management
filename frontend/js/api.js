
const API_BASE_URL =
  window.API_BASE_URL ||
  localStorage.getItem('API_BASE_URL') ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:5001/api'
    : 'https://waste-and-composite-management.onrender.com/api');

const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    };

    try {
      // ⏱️ timeout handling (for Render cold start)
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal
      });

      clearTimeout(timeout);

      // Handle both JSON and text responses
      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await response.json()
        : { message: await response.text() };

      if (!response.ok) {
        throw new Error(data.message || `Request failed (${response.status})`);
      }

      return data;

    } catch (error) {
      // Network / backend unreachable / CORS issues
      if (error.name === 'AbortError') {
        const msg = 'Request timed out. Server might be waking up (Render cold start).';
        console.error(msg);
        if (window.ui) window.ui.showToast(msg, 'error');
        throw new Error(msg);
      }

      if (error.message === 'Failed to fetch') {
        const msg = `Cannot reach backend at ${API_BASE_URL}. Check deployment or CORS settings.`;
        console.error(msg);
        if (window.ui) window.ui.showToast(msg, 'error');
        throw new Error(msg);
      }

      console.error('API Error:', error);
      if (window.ui) window.ui.showToast(error.message, 'error');
      throw error;
    }
  },

  // ---------------------------------------------------------------------------
  // AUTH APIs
  // ---------------------------------------------------------------------------
  auth: {
    login: (credentials) =>
      api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      }),

    verifyOtp: (payload) =>
      api.request('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    resendOtp: (payload) =>
      api.request('/auth/resend-otp', {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    register: (userData) =>
      api.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      }),

    forgotPassword: (email) =>
      api.request('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email })
      }),

    verifyResetOtp: (payload) =>
      api.request('/auth/verify-reset-otp', {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    resetPassword: (payload) =>
      api.request('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(payload)
      })
  },

  // ---------------------------------------------------------------------------
  // SERVICES APIs
  // ---------------------------------------------------------------------------
  services: {
    getAll: (params = '') => api.request(`/services${params}`),

    add: (serviceData) =>
      api.request('/services', {
        method: 'POST',
        body: JSON.stringify(serviceData)
      })
  },

  // ---------------------------------------------------------------------------
  // BOOKINGS APIs
  // ---------------------------------------------------------------------------
  bookings: {
    getAll: () => api.request('/bookings'),

    book: (bookingData) =>
      api.request('/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData)
      }),

    updateStatus: (id, status) =>
      api.request(`/bookings/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      })
  },

  // ---------------------------------------------------------------------------
  // REVIEWS APIs
  // ---------------------------------------------------------------------------
  reviews: {
    getByService: (serviceId) =>
      api.request(`/reviews/${serviceId}`),

    add: (serviceId, reviewData) =>
      api.request(`/reviews/${serviceId}`, {
        method: 'POST',
        body: JSON.stringify(reviewData)
      })
  },

  // ---------------------------------------------------------------------------
  // ADMIN APIs
  // ---------------------------------------------------------------------------
  admin: {
    getUsers: () => api.request('/admin/users'),

    verifyUser: (id) =>
      api.request(`/admin/users/${id}/verify`, {
        method: 'PATCH'
      }),

    getStats: () => api.request('/admin/stats'),

    getAllBookings: () => api.request('/admin/bookings')
  }
};

// Make globally accessible
window.api = api;

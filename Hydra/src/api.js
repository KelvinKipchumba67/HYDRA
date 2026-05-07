const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      if (Array.isArray(errorData.detail)) {
        errorMessage = errorData.detail.map(err => err.msg).join(', ');
      } else {
        errorMessage = errorData.detail || errorData.message || errorMessage;
      }
    } catch (e) {
      // Fallback if response is not JSON
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

export const api = {
  auth: {
    register: async (name, email, password) => {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      return handleResponse(response);
    },
    login: async (email, password) => {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      });
      return handleResponse(response);
    },
  },
  products: {
    getAll: async () => {
      const response = await fetch(`${BASE_URL}/products`);
      return handleResponse(response);
    },
  },
  cart: {
    get: async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
    add: async (productId, quantity) => {
      const response = await fetch(`${BASE_URL}/cart/add`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ product_id: productId, quantity }),
      });
      return handleResponse(response);
    },
    remove: async (itemId) => {
      const response = await fetch(`${BASE_URL}/cart/remove/${itemId}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
    clear: async () => {
      const response = await fetch(`${BASE_URL}/cart/clear`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },
  orders: {
    create: async (orderData) => {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(orderData),
      });
      return handleResponse(response);
    },
    get: async (orderId) => {
      const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },
  payments: {
    initiate: async (orderId) => {
      const response = await fetch(`${BASE_URL}/payments/initiate/${orderId}`, {
        method: 'POST',
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
    verify: async (reference) => {
      const response = await fetch(`${BASE_URL}/payments/verify/${reference}`, {
        headers: getHeaders(),
      });
      return handleResponse(response);
    },
  },
};

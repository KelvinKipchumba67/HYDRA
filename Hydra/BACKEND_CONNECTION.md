# Backend Connection Documentation

This document explains how the Hydra frontend connects to its backend service.

## 1. Environment Configuration
The frontend uses Vite's environment variable system. The backend base URL is defined in the `.env` file:

```env
VITE_API_BASE_URL=https://hydra-backend-production-4f57.up.railway.app
```

In the code, this is accessed via `import.meta.env.VITE_API_BASE_URL`.

## 2. API Service Layer (`src/api.js`)
All communication with the backend is centralized in `src/api.js`. This file exports an `api` object containing methods for different modules.

### Authentication & Headers
The service automatically includes the JWT token from `localStorage` in the request headers if it exists:

```javascript
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
```

### Response Handling
A central `handleResponse` function parses the backend response and extracts error messages (supporting FastAPI-style error details).

## 3. Available Endpoints

### Authentication
- `POST /auth/register`: User registration.
- `POST /auth/login`: User login (uses `application/x-www-form-urlencoded`).

### Products
- `GET /products`: Fetches the list of all products.

### Cart
- `GET /cart`: Retrieves the user's current cart.
- `POST /cart/add`: Adds an item to the cart.
- `DELETE /cart/remove/{itemId}`: Removes an item from the cart.
- `DELETE /cart/clear`: Empties the cart.

### Orders
- `POST /orders`: Creates a new order.
- `GET /orders/{orderId}`: Retrieves details for a specific order.

### Payments
- `POST /payments/initiate/{orderId}`: Starts a payment process.
- `GET /payments/verify/{reference}`: Verifies a payment transaction.

## 4. Usage in Components
Components import the `api` object to interact with the backend. Example:

```javascript
import { api } from './api';

// Example fetching products
const products = await api.products.getAll();
```

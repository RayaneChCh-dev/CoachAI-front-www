
const API_BASE_URL =  'http://localhost/coaching-platform-backend/api';

export const endpoints = {
  auth: {
    login: `${API_BASE_URL}/auth/login.php`,
    register: `${API_BASE_URL}/auth/register.php`,
    logout: `${API_BASE_URL}/auth/logout.php`,
  },
  coaches: {
    getAll: `${API_BASE_URL}/coaches/getAll.php`,
  },
  products: {
    getAll: `${API_BASE_URL}/products/getAll.php`,
    detail: (id: string) => `${API_BASE_URL}/products/${id}`,
  },
  cart: {
    get: `${API_BASE_URL}/cart`,
    add: `${API_BASE_URL}/cart/add`,
    remove: `${API_BASE_URL}/cart/remove`,
  },
  orders: {
    create: `${API_BASE_URL}/orders`,
    list: `${API_BASE_URL}/orders`,
    detail: (id: string) => `${API_BASE_URL}/orders/${id}`,
  },
  chat: {
    chat: `${API_BASE_URL}/chat/chat.php`,
    history: `${API_BASE_URL}/chat/history.php`,
  },
};
const BASE = '/api';

async function request(url, options = {}) {
  const res = await fetch(`${BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

// Sales
export const salesApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/sales?${qs}`);
  },
  get: (id) => request(`/sales/${id}`),
  create: (data) => request('/sales', { method: 'POST', body: data }),
  update: (id, data) => request(`/sales/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/sales/${id}`, { method: 'DELETE' }),
};

// Expenses
export const expensesApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/expenses?${qs}`);
  },
  get: (id) => request(`/expenses/${id}`),
  create: (data) => request('/expenses', { method: 'POST', body: data }),
  update: (id, data) => request(`/expenses/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/expenses/${id}`, { method: 'DELETE' }),
};

// Products
export const productsApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/products?${qs}`);
  },
  create: (data) => request('/products', { method: 'POST', body: data }),
  update: (id, data) => request(`/products/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/products/${id}`, { method: 'DELETE' }),
};

// Categories
export const categoriesApi = {
  list: () => request('/categories'),
  create: (data) => request('/categories', { method: 'POST', body: data }),
  update: (id, data) => request(`/categories/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/categories/${id}`, { method: 'DELETE' }),
};

// Dashboard config
export const dashboardApi = {
  getConfig: () => request('/dashboard/config'),
  saveConfig: (data) => request('/dashboard/config', { method: 'PUT', body: data }),
  saveLayout: (data) => request('/dashboard/config/layout', { method: 'PUT', body: data }),
  saveTheme: (data) => request('/dashboard/config/theme', { method: 'PUT', body: data }),
};

// Analytics
export const analyticsApi = {
  summary: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/analytics/summary?${qs}`);
  },
  trends: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/analytics/trends?${qs}`);
  },
  breakdowns: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/analytics/breakdowns?${qs}`);
  },
  growth: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/analytics/growth?${qs}`);
  },
};

// Chat (returns ReadableStream)
export async function chatStream(messages, dateRange) {
  const res = await fetch(`${BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, dateRange }),
  });
  if (!res.ok) throw new Error('Chat request failed');
  return res.body;
}

// Export
export function getExportUrl(type, startDate, endDate) {
  const params = new URLSearchParams({ type });
  if (startDate) params.set('startDate', startDate);
  if (endDate) params.set('endDate', endDate);
  return `${BASE}/export/csv?${params}`;
}

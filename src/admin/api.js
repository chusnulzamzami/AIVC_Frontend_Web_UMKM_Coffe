const BASE = '/api'

async function request(url, options = {}) {
  const res = await fetch(`${BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || `HTTP ${res.status}`)
  }
  return res.json()
}

export const menuApi = {
  getAll: (cat) => request(`/menu${cat ? `?cat=${cat}` : ''}`),
  get: (id) => request(`/menu/${id}`),
  create: (data) => request('/menu', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/menu/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/menu/${id}`, { method: 'DELETE' }),
}

export const categoryApi = {
  getAll: () => request('/categories'),
  create: (name) => request('/categories', { method: 'POST', body: JSON.stringify({ name }) }),
  rename: (oldName, newName) => request(`/categories/${encodeURIComponent(oldName)}`, { method: 'PUT', body: JSON.stringify({ name: newName }) }),
  delete: (name) => request(`/categories/${encodeURIComponent(name)}`, { method: 'DELETE' }),
}

export const orderApi = {
  getAll: () => request('/orders'),
  create: (items) => request('/orders', { method: 'POST', body: JSON.stringify({ items }) }),
  stats: () => request('/orders/stats'),
}

export const dashboardApi = {
  summary: () => request('/dashboard'),
}

export const ewalletApi = {
  getAll: () => request('/ewallet'),
}

export const locationApi = {
  getAll: () => request('/locations'),
}

export const newsApi = {
  getAll: () => request('/news'),
}

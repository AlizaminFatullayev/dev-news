const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function fetchArticles(category = null, page = 1, limit = 30) {
  const params = new URLSearchParams({ page, limit });
  if (category && category !== 'all') {
    params.append('category', category);
  }
  
  const response = await fetch(`${API_BASE_URL}/articles?${params}`);
  if (!response.ok) throw new Error('Failed to fetch articles');
  return response.json();
}

export async function fetchFeaturedArticle() {
  const response = await fetch(`${API_BASE_URL}/articles/featured`);
  if (!response.ok) throw new Error('Failed to fetch featured article');
  return response.json();
}

export async function fetchTrendingArticles() {
  const response = await fetch(`${API_BASE_URL}/articles/trending`);
  if (!response.ok) throw new Error('Failed to fetch trending articles');
  return response.json();
}

export async function fetchArticleById(id) {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`);
  if (!response.ok) throw new Error('Failed to fetch article');
  return response.json();
}

export async function searchArticles(query, page = 1, limit = 20) {
  const params = new URLSearchParams({ q: query, page, limit });
  const response = await fetch(`${API_BASE_URL}/articles/search?${params}`);
  if (!response.ok) throw new Error('Failed to search articles');
  return response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE_URL}/articles/meta/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

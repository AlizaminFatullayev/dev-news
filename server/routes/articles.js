import express from 'express';
import {
  fetchLatestArticles,
  fetchTrendingArticles,
  fetchArticleById,
  fetchArticlesByCategory,
  searchArticles,
  CATEGORY_TAGS
} from '../services/devto.js';
import {
  getCacheKey,
  isCacheValid,
  getCache,
  setCache
} from '../services/cache.js';

const router = express.Router();

// Get all articles (with optional category filter)
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 30 } = req.query;
    const cacheKey = getCacheKey('articles', { category, page });
    
    // Check cache first
    if (isCacheValid(cacheKey)) {
      const cachedData = getCache(cacheKey);
      if (cachedData) {
        return res.json({ articles: cachedData, source: 'cache' });
      }
    }
    
    // Fetch fresh data
    let articles;
    if (category && category !== 'all') {
      articles = await fetchArticlesByCategory(category, parseInt(page), parseInt(limit));
    } else {
      articles = await fetchLatestArticles(parseInt(page), parseInt(limit));
    }
    
    // Cache the articles
    setCache(cacheKey, articles);
    
    res.json({ articles, source: 'api' });
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Try to return cached data even if expired
    const cacheKey = getCacheKey('articles', { category: req.query.category, page: req.query.page || 1 });
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      return res.json({ articles: cachedData, source: 'cache-fallback' });
    }
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Get trending articles
router.get('/trending', async (req, res) => {
  try {
    const cacheKey = getCacheKey('trending', {});
    
    if (isCacheValid(cacheKey)) {
      const cachedData = getCache(cacheKey);
      if (cachedData) {
        return res.json({ articles: cachedData.slice(0, 6), source: 'cache' });
      }
    }
    
    const articles = await fetchTrendingArticles();
    setCache(cacheKey, articles);
    
    res.json({ articles: articles.slice(0, 6), source: 'api' });
  } catch (error) {
    console.error('Error fetching trending:', error);
    const cachedData = getCache(getCacheKey('trending', {}));
    if (cachedData) {
      return res.json({ articles: cachedData.slice(0, 6), source: 'cache-fallback' });
    }
    res.status(500).json({ error: 'Failed to fetch trending articles' });
  }
});

// Get featured article (most recent with cover image)
router.get('/featured', async (req, res) => {
  try {
    const cacheKey = getCacheKey('featured', {});
    
    if (isCacheValid(cacheKey)) {
      const cachedData = getCache(cacheKey);
      if (cachedData) {
        return res.json({ article: cachedData, source: 'cache' });
      }
    }
    
    const articles = await fetchLatestArticles(1, 20);
    const featured = articles.find(a => a.cover_image) || articles[0];
    
    setCache(cacheKey, featured);
    
    res.json({ article: featured, source: 'api' });
  } catch (error) {
    console.error('Error fetching featured:', error);
    const cachedData = getCache(getCacheKey('featured', {}));
    if (cachedData) {
      return res.json({ article: cachedData, source: 'cache-fallback' });
    }
    res.status(500).json({ error: 'Failed to fetch featured article' });
  }
});

// Search articles
router.get('/search', async (req, res) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const cacheKey = getCacheKey('search', { q, page });
    
    if (isCacheValid(cacheKey)) {
      const cachedData = getCache(cacheKey);
      if (cachedData) {
        return res.json({ articles: cachedData, source: 'cache' });
      }
    }
    
    const articles = await searchArticles(q, parseInt(page), parseInt(limit));
    setCache(cacheKey, articles);
    
    res.json({ articles, source: 'api' });
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'Failed to search articles' });
  }
});

// Get categories
router.get('/meta/categories', (req, res) => {
  const categories = Object.keys(CATEGORY_TAGS).map(key => ({
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    tags: CATEGORY_TAGS[key]
  }));
  
  res.json({ categories });
});

// Get single article by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = getCacheKey('article', { id });
    
    if (isCacheValid(cacheKey)) {
      const cachedData = getCache(cacheKey);
      if (cachedData) {
        return res.json({ article: cachedData, source: 'cache' });
      }
    }
    
    const article = await fetchArticleById(id);
    setCache(cacheKey, article);
    
    res.json({ article, source: 'api' });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

export default router;

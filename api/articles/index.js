import { fetchLatestArticles, fetchArticlesByCategory } from './_lib/devto.js';
import { getCacheKey, isCacheValid, getCache, setCache } from './_lib/cache.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
}

import { searchArticles } from '../_lib/devto.js';
import { getCacheKey, isCacheValid, getCache, setCache } from '../_lib/cache.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}

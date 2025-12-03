import { fetchArticleById } from '../_lib/devto.js';
import { getCacheKey, isCacheValid, getCache, setCache } from '../_lib/cache.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'Article ID is required' });
    }
    
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
}

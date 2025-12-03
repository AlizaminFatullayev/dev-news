import { fetchTrendingArticles } from '../_lib/devto.js';
import { getCacheKey, isCacheValid, getCache, setCache } from '../_lib/cache.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    res.status(500).json({ error: 'Failed to fetch trending articles' });
  }
}

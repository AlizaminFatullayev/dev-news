import { fetchLatestArticles } from '../_lib/devto.js';
import { getCacheKey, isCacheValid, getCache, setCache } from '../_lib/cache.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    res.status(500).json({ error: 'Failed to fetch featured article' });
  }
}

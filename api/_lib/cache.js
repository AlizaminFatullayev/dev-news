// In-memory cache for serverless environment
const cache = new Map();
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export function getCacheKey(type, params = {}) {
  return `${type}_${JSON.stringify(params)}`;
}

export function isCacheValid(key) {
  const entry = cache.get(key);
  if (!entry) return false;
  
  const now = Date.now();
  return (now - entry.timestamp) < CACHE_DURATION_MS;
}

export function getCache(key) {
  const entry = cache.get(key);
  return entry ? entry.data : null;
}

export function setCache(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
  return true;
}

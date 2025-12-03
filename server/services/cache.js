import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = path.join(__dirname, '..', 'cache');
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function getCacheFilePath(key) {
  const safeKey = key.replace(/[^a-zA-Z0-9]/g, '_');
  return path.join(CACHE_DIR, `${safeKey}.json`);
}

export function getCacheKey(type, params = {}) {
  return `${type}_${JSON.stringify(params)}`;
}

export function isCacheValid(key) {
  const filePath = getCacheFilePath(key);
  
  if (!fs.existsSync(filePath)) {
    return false;
  }
  
  try {
    const stats = fs.statSync(filePath);
    const now = Date.now();
    const fileAge = now - stats.mtimeMs;
    return fileAge < CACHE_DURATION_MS;
  } catch {
    return false;
  }
}

export function getCache(key) {
  const filePath = getCacheFilePath(key);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function setCache(key, data) {
  const filePath = getCacheFilePath(key);
  
  try {
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
    return true;
  } catch (error) {
    console.error('Cache write error:', error);
    return false;
  }
}

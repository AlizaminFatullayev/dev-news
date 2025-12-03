import { useState, useEffect, useCallback } from 'react';
import {
  fetchArticles,
  fetchFeaturedArticle,
  fetchTrendingArticles,
  fetchArticleById,
  searchArticles
} from '../services/api';

export function useArticles(category = null) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Reset when category changes
  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetchArticles(category, page)
      .then(data => {
        if (page === 1) {
          setArticles(data.articles);
        } else {
          setArticles(prev => [...prev, ...data.articles]);
        }
        setHasMore(data.articles.length >= 30);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [category, page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  return { articles, loading, error, hasMore, loadMore };
}

export function useFeaturedArticle() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedArticle()
      .then(data => setArticle(data.article))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { article, loading, error };
}

export function useTrendingArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrendingArticles()
      .then(data => setArticles(data.articles))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { articles, loading, error };
}

export function useArticle(id) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    fetchArticleById(id)
      .then(data => setArticle(data.article))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { article, loading, error };
}

export function useSearch(query) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setArticles([]);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(() => {
      searchArticles(query)
        .then(data => setArticles(data.articles))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, 300); // Debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  return { articles, loading, error };
}

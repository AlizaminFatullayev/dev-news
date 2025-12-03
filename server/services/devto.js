import axios from 'axios';

const DEV_TO_API = 'https://dev.to/api';

// Category to Dev.to tags mapping
const CATEGORY_TAGS = {
  frontend: ['javascript', 'react', 'vue', 'css', 'html', 'webdev', 'frontend', 'typescript'],
  backend: ['node', 'python', 'java', 'go', 'api', 'database', 'backend', 'sql'],
  cybersecurity: ['security', 'cybersecurity', 'hacking', 'privacy', 'encryption'],
  devops: ['devops', 'docker', 'kubernetes', 'aws', 'cloud', 'cicd', 'linux'],
  aiml: ['ai', 'machinelearning', 'datascience', 'deeplearning', 'openai', 'chatgpt'],
  mobile: ['mobile', 'android', 'ios', 'flutter', 'reactnative', 'swift', 'kotlin'],
  opensource: ['opensource', 'github', 'git', 'linux', 'foss'],
  career: ['career', 'jobs', 'interview', 'productivity', 'beginners', 'tutorial']
};

// Determine category from tags
function categorizeArticle(tags) {
  if (!tags || !Array.isArray(tags)) return 'general';
  
  for (const [category, categoryTags] of Object.entries(CATEGORY_TAGS)) {
    if (tags.some(tag => categoryTags.includes(tag.toLowerCase()))) {
      return category;
    }
  }
  return 'general';
}

// Transform Dev.to article to our format
function transformArticle(article) {
  return {
    id: article.id,
    title: article.title,
    description: article.description,
    cover_image: article.cover_image || article.social_image,
    url: article.url,
    published_at: article.published_at,
    reading_time_minutes: article.reading_time_minutes,
    tag_list: article.tag_list,
    user_name: article.user?.name || 'Unknown',
    user_profile_image: article.user?.profile_image,
    category: categorizeArticle(article.tag_list)
  };
}

// Fetch latest articles
export async function fetchLatestArticles(page = 1, perPage = 30) {
  try {
    const response = await axios.get(`${DEV_TO_API}/articles`, {
      params: {
        page,
        per_page: perPage
      }
    });
    return response.data.map(transformArticle);
  } catch (error) {
    console.error('Error fetching latest articles:', error.message);
    throw error;
  }
}

// Fetch articles by tag
export async function fetchArticlesByTag(tag, page = 1, perPage = 20) {
  try {
    const response = await axios.get(`${DEV_TO_API}/articles`, {
      params: {
        tag,
        page,
        per_page: perPage
      }
    });
    return response.data.map(transformArticle);
  } catch (error) {
    console.error(`Error fetching articles for tag ${tag}:`, error.message);
    throw error;
  }
}

// Fetch trending articles (top from past week)
export async function fetchTrendingArticles() {
  try {
    const response = await axios.get(`${DEV_TO_API}/articles`, {
      params: {
        top: 7,
        per_page: 10
      }
    });
    return response.data.map(transformArticle);
  } catch (error) {
    console.error('Error fetching trending articles:', error.message);
    throw error;
  }
}

// Fetch single article by ID
export async function fetchArticleById(id) {
  try {
    const response = await axios.get(`${DEV_TO_API}/articles/${id}`);
    const article = response.data;
    return {
      ...transformArticle(article),
      body_html: article.body_html,
      body_markdown: article.body_markdown
    };
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error.message);
    throw error;
  }
}

// Search articles
export async function searchArticles(query, page = 1, perPage = 20) {
  try {
    // Dev.to doesn't have a direct search endpoint, so we use tag search
    // For better search, we fetch articles and filter locally
    const response = await axios.get(`${DEV_TO_API}/articles`, {
      params: {
        page,
        per_page: perPage * 2 // Fetch more to filter
      }
    });
    
    const filtered = response.data.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      (article.description && article.description.toLowerCase().includes(query.toLowerCase())) ||
      (article.tag_list && article.tag_list.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
    );
    
    return filtered.slice(0, perPage).map(transformArticle);
  } catch (error) {
    console.error(`Error searching articles for "${query}":`, error.message);
    throw error;
  }
}

// Fetch articles by category
export async function fetchArticlesByCategory(category, page = 1, perPage = 20) {
  const tags = CATEGORY_TAGS[category];
  if (!tags || tags.length === 0) {
    return fetchLatestArticles(page, perPage);
  }
  
  // Fetch from first tag of the category
  return fetchArticlesByTag(tags[0], page, perPage);
}

export { CATEGORY_TAGS };

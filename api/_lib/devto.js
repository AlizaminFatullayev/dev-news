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
  const response = await fetch(`${DEV_TO_API}/articles?page=${page}&per_page=${perPage}`);
  if (!response.ok) throw new Error('Failed to fetch articles');
  const data = await response.json();
  return data.map(transformArticle);
}

// Fetch articles by tag
export async function fetchArticlesByTag(tag, page = 1, perPage = 20) {
  const response = await fetch(`${DEV_TO_API}/articles?tag=${tag}&page=${page}&per_page=${perPage}`);
  if (!response.ok) throw new Error('Failed to fetch articles');
  const data = await response.json();
  return data.map(transformArticle);
}

// Fetch trending articles
export async function fetchTrendingArticles() {
  const response = await fetch(`${DEV_TO_API}/articles?top=7&per_page=10`);
  if (!response.ok) throw new Error('Failed to fetch trending');
  const data = await response.json();
  return data.map(transformArticle);
}

// Fetch single article by ID
export async function fetchArticleById(id) {
  const response = await fetch(`${DEV_TO_API}/articles/${id}`);
  if (!response.ok) throw new Error('Failed to fetch article');
  const article = await response.json();
  return {
    ...transformArticle(article),
    body_html: article.body_html,
    body_markdown: article.body_markdown
  };
}

// Search articles
export async function searchArticles(query, page = 1, perPage = 20) {
  const response = await fetch(`${DEV_TO_API}/articles?page=${page}&per_page=${perPage * 2}`);
  if (!response.ok) throw new Error('Failed to search');
  const data = await response.json();
  
  const filtered = data.filter(article => 
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    (article.description && article.description.toLowerCase().includes(query.toLowerCase())) ||
    (article.tag_list && article.tag_list.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
  );
  
  return filtered.slice(0, perPage).map(transformArticle);
}

// Fetch articles by category
export async function fetchArticlesByCategory(category, page = 1, perPage = 20) {
  const tags = CATEGORY_TAGS[category];
  if (!tags || tags.length === 0) {
    return fetchLatestArticles(page, perPage);
  }
  return fetchArticlesByTag(tags[0], page, perPage);
}

export { CATEGORY_TAGS };

# System Patterns: DevNews

## Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   React App     │────▶│   Express API   │────▶│   Dev.to API    │
│   (Frontend)    │     │   (Backend)     │     │   (External)    │
│                 │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │                 │
                        │     SQLite      │
                        │   (Cache DB)    │
                        │                 │
                        └─────────────────┘
```

## Key Design Patterns

### 1. Component-Based Architecture (Frontend)
- **Atomic Design**: Build small, reusable components
- **Container/Presentational**: Separate logic from UI
- **Custom Hooks**: Encapsulate data fetching logic

### 2. RESTful API Design (Backend)
```
GET  /api/articles              - Get all articles
GET  /api/articles/:id          - Get single article
GET  /api/articles?category=x   - Filter by category
GET  /api/articles?search=x     - Search articles
GET  /api/articles/featured     - Get featured article
GET  /api/articles/trending     - Get trending articles
GET  /api/categories            - Get all categories
```

### 3. Caching Strategy
- **Backend Cache**: Store Dev.to responses in SQLite
- **Cache Duration**: 15-30 minutes for fresh content
- **Fallback**: Serve cached content if API fails

## Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── Navigation
│   ├── SearchBar
│   └── SignUpButton (placeholder for future)
├── Main
│   ├── HeroSection
│   │   └── FeaturedArticle
│   ├── LatestNews
│   │   └── ArticleCard (multiple)
│   └── TrendingTopics
│       └── ArticleCard (multiple)
└── Footer
    ├── FooterBranding
    ├── FooterLinks
    └── FooterSocial
```

## Data Flow Patterns

### Article Fetching Flow
1. React component mounts
2. Calls custom hook `useArticles()`
3. Hook calls backend API `/api/articles`
4. Backend checks SQLite cache
5. If cache valid → return cached data
6. If cache stale → fetch from Dev.to, update cache, return
7. Data flows back to React component
8. Component renders ArticleCards

### Category Mapping
```javascript
const CATEGORIES = {
  'frontend': ['javascript', 'react', 'vue', 'css', 'html', 'webdev'],
  'backend': ['node', 'python', 'java', 'go', 'api', 'database'],
  'cybersecurity': ['security', 'hacking', 'privacy', 'encryption'],
  'devops': ['devops', 'docker', 'kubernetes', 'aws', 'cloud', 'cicd'],
  'aiml': ['ai', 'machinelearning', 'datascience', 'python'],
  'mobile': ['mobile', 'android', 'ios', 'flutter', 'reactnative'],
  'opensource': ['opensource', 'github', 'linux'],
  'career': ['career', 'jobs', 'interview', 'productivity']
};
```

## Styling Patterns

### CSS Organization
```
styles/
├── variables.css      # CSS custom properties (colors, fonts)
├── reset.css          # CSS reset/normalize
├── global.css         # Global styles
├── components/        # Component-specific styles
│   ├── Header.css
│   ├── ArticleCard.css
│   └── ...
└── pages/             # Page-specific styles
```

### Design Tokens
```css
:root {
  --color-primary: #f27f0d;
  --color-bg-dark: #121212;
  --color-bg-light: #f8f7f5;
  --color-text: #ffffff;
  --color-text-muted: rgba(255, 255, 255, 0.6);
  --font-display: 'Space Grotesk', sans-serif;
  --radius-default: 0.25rem;
  --radius-lg: 0.5rem;
}
```

## Error Handling Patterns
- **API Errors**: Show cached content with "offline" indicator
- **Empty States**: Display friendly "no articles found" message
- **Loading States**: Skeleton loaders for better UX

import { useArticle } from '../hooks/useArticles';
import '../styles/ArticleDetail.css';

function ArticleDetail({ articleId, onBack }) {
  const { article, loading, error } = useArticle(articleId);

  if (loading) {
    return (
      <div className="article-detail">
        <button className="article-detail__back" onClick={onBack}>
          ← Back to News
        </button>
        <div className="loading">
          <div className="loading__spinner"></div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="article-detail">
        <button className="article-detail__back" onClick={onBack}>
          ← Back to News
        </button>
        <div className="error">
          <h2 className="error__title">Failed to load article</h2>
          <p>{error || 'Article not found'}</p>
          <button className="btn btn--primary error__retry" onClick={onBack}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const categoryDisplay = article.category 
    ? article.category.charAt(0).toUpperCase() + article.category.slice(1)
    : 'General';

  const publishedDate = article.published_at 
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <article className="article-detail">
      <button className="article-detail__back" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to News
      </button>

      <header className="article-detail__header">
        <span className="article-detail__category">{categoryDisplay}</span>
        <h1 className="article-detail__title">{article.title}</h1>
        <div className="article-detail__meta">
          {article.user_profile_image && (
            <div className="article-detail__author">
              <img 
                src={article.user_profile_image} 
                alt={article.user_name}
                className="article-detail__author-image"
              />
              <span>{article.user_name}</span>
            </div>
          )}
          {!article.user_profile_image && article.user_name && (
            <span>{article.user_name}</span>
          )}
          {publishedDate && <span>·</span>}
          {publishedDate && <span>{publishedDate}</span>}
          {article.reading_time_minutes && (
            <>
              <span>·</span>
              <span>{article.reading_time_minutes} min read</span>
            </>
          )}
        </div>
      </header>

      {article.cover_image && (
        <img 
          src={article.cover_image} 
          alt={article.title}
          className="article-detail__cover"
        />
      )}

      {article.body_html ? (
        <div 
          className="article-detail__content"
          dangerouslySetInnerHTML={{ __html: article.body_html }}
        />
      ) : (
        <div className="article-detail__content">
          <p>{article.description}</p>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="article-detail__source"
          >
            Read full article on Dev.to
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      )}

      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="article-detail__source"
      >
        View on Dev.to
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </article>
  );
}

export default ArticleDetail;

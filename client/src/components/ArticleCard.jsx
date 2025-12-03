import '../styles/ArticleCard.css';

function ArticleCard({ article, onClick }) {
  if (!article) {
    return null;
  }

  const categoryDisplay = article.category 
    ? article.category.charAt(0).toUpperCase() + article.category.slice(1)
    : 'General';

  const handleClick = () => {
    if (onClick) {
      onClick(article);
    }
  };

  return (
    <article className="article-card" onClick={handleClick}>
      <div className="article-card__image-wrapper">
        {article.cover_image ? (
          <img 
            className="article-card__image" 
            src={article.cover_image} 
            alt={article.title}
            loading="lazy"
          />
        ) : (
          <div className="article-card__image--placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.21 2.47a1.5 1.5 0 0 1 2.12.04l2.12 2.12a1.5 1.5 0 0 1 0 2.12l-6.88 6.88a1.5 1.5 0 0 1-2.12 0l-1.41-1.41-5.18 5.18a2.5 2.5 0 1 0 3.54 3.54l5.18-5.18 1.41 1.41a1.5 1.5 0 0 1 0 2.12l-6.88 6.88a1.5 1.5 0 0 1-2.12 0L4.53 19.4a1.5 1.5 0 0 1-.04-2.12l6.88-6.88a1.5 1.5 0 0 1 2.12 0l1.41 1.41 2.37-2.37-1.41-1.41a1.5 1.5 0 0 1 0-2.12l6.88-6.88Z" />
            </svg>
          </div>
        )}
      </div>
      <div className="article-card__content">
        <span className="article-card__category">{categoryDisplay}</span>
        <h3 className="article-card__title">{article.title}</h3>
        <p className="article-card__description">{article.description}</p>
        <p className="article-card__meta">
          {article.user_name} · {article.reading_time_minutes || '5'} min read
        </p>
      </div>
    </article>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="article-card article-card--skeleton">
      <div className="article-card__image-wrapper"></div>
      <div className="article-card__content">
        <span className="article-card__category"></span>
        <h3 className="article-card__title"></h3>
        <p className="article-card__description"></p>
        <p className="article-card__meta"></p>
      </div>
    </div>
  );
}

export default ArticleCard;

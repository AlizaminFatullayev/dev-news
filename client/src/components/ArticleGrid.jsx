import ArticleCard, { ArticleCardSkeleton } from './ArticleCard';
import '../styles/ArticleCard.css';

function ArticleGrid({ title, articles, loading, onArticleClick }) {
  return (
    <section className="section">
      {title && <h2 className="section__title">{title}</h2>}
      <div className="article-grid">
        {loading ? (
          // Show skeletons while loading
          Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))
        ) : (
          articles.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={onArticleClick}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default ArticleGrid;

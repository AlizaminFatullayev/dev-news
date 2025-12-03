import ArticleCard, { ArticleCardSkeleton } from './ArticleCard';
import '../styles/ArticleCard.css';

function SearchResults({ query, articles, loading, onArticleClick, onClear }) {
  if (loading) {
    return (
      <section className="section search-results">
        <div className="search-results__header">
          <h2 className="section__title">Searching for "{query}"...</h2>
        </div>
        <div className="article-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="section search-results">
      <div className="search-results__header">
        <h2 className="section__title">
          {articles.length > 0 
            ? `Found ${articles.length} results for "${query}"`
            : `No results found for "${query}"`
          }
        </h2>
        <button className="search-results__clear" onClick={onClear}>
          ✕ Clear search
        </button>
      </div>
      
      {articles.length > 0 ? (
        <div className="article-grid">
          {articles.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={onArticleClick}
            />
          ))}
        </div>
      ) : (
        <div className="search-results__empty">
          <p>Try searching for something else, like:</p>
          <div className="search-results__suggestions">
            <button onClick={() => onClear()}>React</button>
            <button onClick={() => onClear()}>JavaScript</button>
            <button onClick={() => onClear()}>Python</button>
            <button onClick={() => onClear()}>DevOps</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default SearchResults;

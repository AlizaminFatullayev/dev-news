import '../styles/HeroSection.css';

function HeroSection({ article, loading, onArticleClick }) {
  if (loading) {
    return (
      <section className="hero hero--loading">
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__text">
              <h2 className="hero__title">Loading...</h2>
              <p className="hero__description">Loading description...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!article) {
    return null;
  }

  const backgroundImage = article.cover_image 
    ? `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(18, 18, 18, 0.8) 100%), url("${article.cover_image}")`
    : 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(18, 18, 18, 0.8) 100%), linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';

  return (
    <section className="hero">
      <div 
        className="hero__container"
        style={{ backgroundImage }}
      >
        <div className="hero__content">
          <div className="hero__text">
            <h2 className="hero__title">{article.title}</h2>
            <p className="hero__description">{article.description}</p>
          </div>
          <div className="hero__cta">
            <button 
              className="btn btn--primary hero__btn"
              onClick={() => onArticleClick && onArticleClick(article)}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

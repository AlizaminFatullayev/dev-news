import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ArticleGrid from './components/ArticleGrid';
import ArticleDetail from './components/ArticleDetail';
import CategoryFilter from './components/CategoryFilter';
import SearchResults from './components/SearchResults';
import About from './components/About';
import Footer from './components/Footer';
import { useArticles, useFeaturedArticle, useTrendingArticles, useSearch } from './hooks/useArticles';
import './styles/variables.css';
import './styles/ArticleDetail.css';

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAbout, setShowAbout] = useState(false);

  const { article: featuredArticle, loading: featuredLoading } = useFeaturedArticle();
  const { articles: latestArticles, loading: latestLoading, hasMore, loadMore } = useArticles(activeCategory);
  const { articles: trendingArticles, loading: trendingLoading } = useTrendingArticles();
  const { articles: searchResults, loading: searchLoading } = useSearch(searchQuery);

  const isSearching = searchQuery.length >= 2;

  const handleArticleClick = (article) => {
    setSelectedArticleId(article.id);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setSelectedArticleId(null);
    setSearchQuery('');
    setShowAbout(false);
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setSelectedArticleId(null);
    setSearchQuery('');
    setShowAbout(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedArticleId(null);
    setShowAbout(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleShowAbout = () => {
    setShowAbout(true);
    setSelectedArticleId(null);
    setSearchQuery('');
    window.scrollTo(0, 0);
  };

  // If viewing About page
  if (showAbout) {
    return (
      <div className="app">
        <Header 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <main className="main container">
          <About onBack={handleBackToHome} />
        </main>
        <Footer onAboutClick={handleShowAbout} />
      </div>
    );
  }

  // If viewing an article detail
  if (selectedArticleId) {
    return (
      <div className="app">
        <Header 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <main className="main container">
          <ArticleDetail 
            articleId={selectedArticleId} 
            onBack={handleBackToHome}
          />
        </main>
        <Footer onAboutClick={handleShowAbout} />
      </div>
    );
  }

  // Homepage view
  return (
    <div className="app">
      <Header 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
      <main className="main">
        <div className="container">
          {isSearching ? (
            // Search Results View
            <SearchResults
              query={searchQuery}
              articles={searchResults}
              loading={searchLoading}
              onArticleClick={handleArticleClick}
              onClear={handleClearSearch}
            />
          ) : (
            // Normal Homepage View
            <>
              <HeroSection 
                article={featuredArticle} 
                loading={featuredLoading}
                onArticleClick={handleArticleClick}
              />

              <CategoryFilter 
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />

              <ArticleGrid 
                title="Latest News"
                articles={latestArticles}
                loading={latestLoading}
                onArticleClick={handleArticleClick}
              />

              {hasMore && !latestLoading && (
                <div className="load-more">
                  <button className="load-more__btn" onClick={loadMore}>
                    Load More
                  </button>
                </div>
              )}

              {activeCategory === 'all' && (
                <ArticleGrid 
                  title="Trending Topics"
                  articles={trendingArticles}
                  loading={trendingLoading}
                  onArticleClick={handleArticleClick}
                />
              )}
            </>
          )}
        </div>
      </main>
      <Footer onAboutClick={handleShowAbout} />
    </div>
  );
}

export default App;

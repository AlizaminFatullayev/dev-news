import { useState, useEffect } from 'react';
import '../styles/Header.css';

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'frontend', name: 'Front-end' },
  { id: 'backend', name: 'Back-end' },
  { id: 'cybersecurity', name: 'Cybersecurity' },
  { id: 'devops', name: 'DevOps' },
  { id: 'aiml', name: 'AI/ML' },
  { id: 'mobile', name: 'Mobile' },
  { id: 'opensource', name: 'Open Source' },
  { id: 'career', name: 'Career' }
];

function Header({ activeCategory, onCategoryChange, onSearch, searchQuery = '' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Sync local state when external searchQuery changes (e.g., when cleared)
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleCategoryClick = (categoryId) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header__brand">
          <a href="/" className="header__logo">
            <svg className="header__logo-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.21 2.47a1.5 1.5 0 0 1 2.12.04l2.12 2.12a1.5 1.5 0 0 1 0 2.12l-6.88 6.88a1.5 1.5 0 0 1-2.12 0l-1.41-1.41-5.18 5.18a2.5 2.5 0 1 0 3.54 3.54l5.18-5.18 1.41 1.41a1.5 1.5 0 0 1 0 2.12l-6.88 6.88a1.5 1.5 0 0 1-2.12 0L4.53 19.4a1.5 1.5 0 0 1-.04-2.12l6.88-6.88a1.5 1.5 0 0 1 2.12 0l1.41 1.41 2.37-2.37-1.41-1.41a1.5 1.5 0 0 1 0-2.12l6.88-6.88Z" />
            </svg>
            <h1 className="header__logo-text">DevNews</h1>
          </a>
          <span className="header__author">by <span className="header__author-name">Alizamin</span></span>
          <div className="header__social">
            <a href="https://github.com/AlizaminFatullayev" target="_blank" rel="noopener noreferrer" className="header__social-link" aria-label="GitHub">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="https://x.com/Alizamin100" target="_blank" rel="noopener noreferrer" className="header__social-link" aria-label="Twitter">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          <nav className="header__nav">
            {CATEGORIES.slice(0, 5).map(cat => (
              <button
                key={cat.id}
                className={`header__nav-link ${activeCategory === cat.id ? 'header__nav-link--active' : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="header__actions">
          <form className="header__search" onSubmit={handleSearchSubmit}>
            <div className="header__search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <input
              type="text"
              className="header__search-input"
              placeholder="Search articles..."
              value={localSearch}
              onChange={handleSearchChange}
            />
          </form>
          <button
            className="header__mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>
      <nav className={`mobile-nav ${mobileMenuOpen ? 'mobile-nav--open' : ''}`}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`mobile-nav__link ${activeCategory === cat.id ? 'mobile-nav__link--active' : ''}`}
            onClick={() => handleCategoryClick(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </nav>
    </>
  );
}

export default Header;

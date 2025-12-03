import '../styles/ArticleDetail.css';

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

function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      {CATEGORIES.map(cat => (
        <button
          key={cat.id}
          className={`category-filter__btn ${activeCategory === cat.id ? 'category-filter__btn--active' : ''}`}
          onClick={() => onCategoryChange(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;

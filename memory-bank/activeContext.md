# Active Context: DevNews

## Current Focus
**MVP Complete** - The DevNews application is now running with full functionality.

## Recent Changes
- ✅ Initialized React frontend with Vite
- ✅ Created Node.js/Express backend with file-based caching
- ✅ Integrated Dev.to API for fetching articles
- ✅ Built all core UI components (Header, HeroSection, ArticleCard, Footer)
- ✅ Implemented category filtering and article detail views
- ✅ Created complete CSS design system from the template

## What's Running
- **Frontend**: http://localhost:5173 (Vite dev server)
- **Backend**: http://localhost:3001 (Express API)

## Next Steps
1. Test all features thoroughly
2. Add search results page
3. Improve error handling and loading states
4. Add more categories or refine existing ones
5. Consider adding dark/light mode toggle
6. Prepare for production deployment

## Active Decisions

### Confirmed Decisions
- ✅ React + Vite for frontend
- ✅ Plain CSS for styling (converted from Tailwind template)
- ✅ Node.js + Express for backend
- ✅ File-based JSON caching (15 min cache duration)
- ✅ Dev.to as primary news source
- ✅ Dark theme as default
- ✅ Self-hosted deployment
- ✅ Article detail shown in-app with full content
- ✅ "Load More" button for pagination

## Important Patterns
- Components follow BEM-style CSS naming
- All API calls go through custom hooks
- Caching prevents excessive Dev.to API calls
- Error states fall back to cached content when available

## Current Status
🟢 **MVP is functional and running**

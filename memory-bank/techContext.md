# Tech Context: DevNews

## Technology Stack

### Frontend
- **Framework**: React (Create React App or Vite)
- **Styling**: Plain CSS (custom, no frameworks)
- **Font**: Space Grotesk (Google Fonts)
- **Icons**: Material Symbols Outlined

### Backend
- **Runtime**: Node.js with Express.js
- **API Integration**: Dev.to Public API
- **Data Fetching**: Axios or Fetch API

### Database
- **Primary**: SQLite (lightweight, self-hosted friendly)
- **Purpose**: Cache articles, store metadata, improve performance
- **ORM**: Prisma (optional) or better-sqlite3

### Development Tools
- **Package Manager**: npm
- **Build Tool**: Vite (recommended for React)
- **Version Control**: Git

## External APIs

### Dev.to API
- **Base URL**: `https://dev.to/api`
- **Endpoints Used**:
  - `GET /articles` - Fetch latest articles
  - `GET /articles?tag={tag}` - Fetch by category
  - `GET /articles?top=7` - Trending articles (past week)
  - `GET /articles/{id}` - Single article details
- **Rate Limits**: Be mindful of API rate limits
- **Documentation**: https://developers.forem.com/api

## Project Structure (Planned)
```
dev-news/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/
│   ├── services/
│   ├── database/
│   ├── index.js
│   └── package.json
├── memory-bank/           # Project documentation
└── README.md
```

## Development Setup
1. Clone repository
2. Install dependencies: `npm install` in both client and server
3. Start backend: `npm run dev` in server folder
4. Start frontend: `npm run dev` in client folder
5. Access at `http://localhost:5173` (Vite default)

## Deployment (Self-Hosted)
- **Server**: Any Linux VPS (Ubuntu recommended)
- **Process Manager**: PM2 for Node.js
- **Reverse Proxy**: Nginx
- **SSL**: Let's Encrypt / Certbot

## Technical Constraints
- No paid APIs or services
- Must work offline for cached content
- Self-hosted, no cloud dependencies
- Lightweight and fast

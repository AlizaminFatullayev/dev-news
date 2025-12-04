import '../styles/About.css';

function About({ onBack }) {
  return (
    <div className="about">
      <button className="about__back" onClick={onBack}>
        ← Back to Home
      </button>
      
      <div className="about__content">
        <h1 className="about__title">About DevNews</h1>
        
        <div className="about__section">
          <h2 className="about__subtitle">What is DevNews?</h2>
          <p className="about__text">
            DevNews is your daily source for the latest news, articles, and trends in the developer world. 
            We aggregate content from Dev.to to bring you the most relevant and interesting stories 
            about coding, technology, and software development.
          </p>
        </div>

        <div className="about__section">
          <h2 className="about__subtitle">Categories We Cover</h2>
          <ul className="about__list">
            <li><strong>Front-end:</strong> React, Vue, CSS, HTML, JavaScript, TypeScript</li>
            <li><strong>Back-end:</strong> Node.js, Python, Java, Go, APIs, Databases</li>
            <li><strong>Cybersecurity:</strong> Security, Privacy, Encryption, Hacking</li>
            <li><strong>DevOps:</strong> Docker, Kubernetes, AWS, CI/CD, Cloud</li>
            <li><strong>AI/ML:</strong> Machine Learning, Data Science, ChatGPT, OpenAI</li>
            <li><strong>Mobile:</strong> Android, iOS, Flutter, React Native</li>
            <li><strong>Open Source:</strong> GitHub, Git, Linux, FOSS</li>
            <li><strong>Career:</strong> Jobs, Interviews, Productivity, Tutorials</li>
          </ul>
        </div>

        <div className="about__section">
          <h2 className="about__subtitle">About the Creator</h2>
          <p className="about__text">
            DevNews was created by <strong>Alizamin Fatullayev</strong>, a passionate developer 
            who wanted to build a clean, fast, and focused news platform for the developer community.
          </p>
          <div className="about__social">
            <a href="https://github.com/AlizaminFatullayev" target="_blank" rel="noopener noreferrer" className="about__social-link">
              <svg className="about__social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
            <a href="https://x.com/Alizamin100" target="_blank" rel="noopener noreferrer" className="about__social-link">
              <svg className="about__social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              Twitter
            </a>
            <a href="https://www.instagram.com/alizaminfatullayev/" target="_blank" rel="noopener noreferrer" className="about__social-link">
              <svg className="about__social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
          </div>
        </div>

        <div className="about__section">
          <h2 className="about__subtitle">Tech Stack</h2>
          <p className="about__text">
            DevNews is built with modern technologies:
          </p>
          <ul className="about__list">
            <li><strong>Frontend:</strong> React + Vite</li>
            <li><strong>Styling:</strong> Plain CSS with custom properties</li>
            <li><strong>Backend:</strong> Vercel Serverless Functions</li>
            <li><strong>Data Source:</strong> Dev.to API</li>
            <li><strong>Hosting:</strong> Vercel</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;

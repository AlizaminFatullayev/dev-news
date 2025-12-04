import '../styles/Footer.css';

function Footer({ onAboutClick }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <a href="/" className="footer__logo">
            <svg className="footer__logo-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.21 2.47a1.5 1.5 0 0 1 2.12.04l2.12 2.12a1.5 1.5 0 0 1 0 2.12l-6.88 6.88a1.5 1.5 0 0 1-2.12 0l-1.41-1.41-5.18 5.18a2.5 2.5 0 1 0 3.54 3.54l5.18-5.18 1.41 1.41a1.5 1.5 0 0 1 0 2.12l-6.88 6.88a1.5 1.5 0 0 1-2.12 0L4.53 19.4a1.5 1.5 0 0 1-.04-2.12l6.88-6.88a1.5 1.5 0 0 1 2.12 0l1.41 1.41 2.37-2.37-1.41-1.41a1.5 1.5 0 0 1 0-2.12l6.88-6.88Z" />
            </svg>
            <span className="footer__logo-text">DevNews</span>
          </a>
          <p className="footer__tagline">
            Your daily source for what's new and noteworthy in the developer world.
          </p>
        </div>

        <div className="footer__section">
          <h3 className="footer__section-title">Links</h3>
          <a href="https://www.instagram.com/alizaminfatullayev/" target="_blank" rel="noopener noreferrer" className="footer__link">Contact Us</a>
          <a href="#" className="footer__link">Privacy Policy</a>
          <a href="#" className="footer__link">Terms of Service</a>
          <button onClick={onAboutClick} className="footer__link footer__link--button">About</button>
        </div>

        <div className="footer__section">
          <h3 className="footer__section-title">Follow Us</h3>
          <div className="footer__social">
            <a href="https://github.com/AlizaminFatullayev" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="GitHub">
              <svg className="footer__social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="https://x.com/Alizamin100" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Twitter">
              <svg className="footer__social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="https://dev.to" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Dev.to">
              <svg className="footer__social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6v4.36h.58c.37 0 .65-.08.84-.23.21-.17.31-.48.31-.93v-2c0-.45-.1-.76-.31-.97zm14.45-7.03a2 2 0 00-1.41-1.42L18 1h-4a2 2 0 00-2 2v18a2 2 0 002 2h4l2.46-.6a2 2 0 001.41-1.42V4.02c0-.36-.1-.71-.41-1zM9.72 14.45c-.59.55-1.38.83-2.37.83H5V8.72h2.35c.99 0 1.78.27 2.37.83.59.56.88 1.31.88 2.26v.38c0 .95-.29 1.7-.88 2.26zm5.69-4.78H12.5v1.64h2.1v1.33h-2.1v1.67h2.91v1.33h-4.15V8.72h4.15v.95zm4.5 5.83c-.06.42-.24.76-.54 1-.3.26-.67.38-1.1.38-.55 0-.97-.17-1.28-.52-.3-.35-.46-.81-.46-1.38V11c0-.57.15-1.04.46-1.38.31-.35.73-.52 1.28-.52.43 0 .8.13 1.1.38.3.25.48.58.54 1h-1.35c-.04-.14-.12-.26-.23-.35a.68.68 0 00-.42-.13c-.23 0-.4.08-.52.24-.11.16-.17.4-.17.72v2.91c0 .32.06.56.17.72.12.16.29.24.52.24.18 0 .33-.04.42-.13.1-.1.18-.21.23-.35h1.35z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        © {currentYear} DevNews by Alizamin Fatullayev. Powered by Dev.to API.
      </div>
    </footer>
  );
}

export default Footer;

export default function HomePage() {
  return (
    <div className='hero'>
      <div className='hero-content'>
        <div className="badge-premium">Latest MERN Stack Template</div>
        <h1>Welcome to React App</h1>
        <p>
          A modern, production-ready MERN stack template with authentication, state management, and a beautiful UI. 
          Built to scale your next big idea.
        </p>
        
        <div className="flex justify-center gap-4">
          <a href="/signup" className='btn-black'>Get Started</a>
          <a 
            href="https://github.com/pulkitgarg04/create-latest-mern-app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className='btn-outline-pill'
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </div>
  );
}

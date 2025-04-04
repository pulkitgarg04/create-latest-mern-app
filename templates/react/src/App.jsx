export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white">
                <span className="text-xs font-bold">M</span>
              </div>
              <span className="hidden font-bold sm:inline-block">
                create-latest-mern-app
              </span>
            </a>
          </div>
          <nav className="flex items-center space-x-6">
            <a
              href="https://github.com/pulkitgarg04/create-latest-mern-app"
              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Create MERN Apps with a Single Command
            </h1>
            <p className="max-w-[42rem] leading-normal text-gray-600 sm:text-xl sm:leading-8">
              The fastest way to build full-stack MERN applications. Set up a modern MongoDB, Express, React, and Node.js app by running one command.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#getting-started"
                className="inline-flex h-11 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white hover:bg-gray-800"
              >
                Get Started
              </a>
              <a
                href="https://github.com/pulkitgarg04/create-latest-mern-app"
                className="inline-flex h-11 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>

        <section id="getting-started" className="py-8 md:py-12 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-3xl md:text-6xl">
                Getting Started
              </h2>
              <p className="max-w-[85%] leading-normal text-gray-600 sm:text-lg sm:leading-7">
                Create a new MERN app in seconds
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-10 lg:grid-cols-2">
              <div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Create a new MERN app</h3>
                  <p className="text-gray-600">
                    Run the following command to create a new MERN app:
                  </p>
                  <div className="overflow-hidden rounded-md bg-black p-6">
                    <pre className="text-white">
                      <code>npx create-latest-mern-app</code>
                    </pre>
                  </div>
                  <p className="text-gray-600">
                    This will create a new directory with a fully configured MERN stack application.
                  </p>
                </div>
                <div className="mt-8 space-y-4">
                  <h3 className="text-2xl font-bold">Start your app</h3>
                  <p className="text-gray-600">
                    Navigate to your new app and start the development server:
                  </p>
                  <div className="overflow-hidden rounded-md bg-black p-6">
                    <pre className="text-white">
                      <code>cd my-app<br />npm run dev</code>
                    </pre>
                  </div>
                  <p className="text-gray-600">
                    This will start both your frontend and backend servers concurrently.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">What's included</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2 text-sm">→</span>
                    MongoDB connection setup
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-sm">→</span>
                    Express.js API with example routes
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-sm">→</span>
                    React frontend with modern tooling
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-sm">→</span>
                    Node.js backend with best practices
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-sm">→</span>
                    Authentication templates
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-sm">→</span>
                    Database models and controllers
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-sm">→</span>
                    Production build configuration
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-sm">→</span>
                    Environment variable setup
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-200 py-6 md:py-0">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-gray-600 md:text-left">
              Built by{" "}
              <a
                href="https://github.com/pulkitgarg04"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-black underline underline-offset-4"
              >
                pulkitgarg04
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/pulkitgarg04/create-latest-mern-app"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-black underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home'));

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-body selection:bg-neon-blue/30 selection:text-neon-blue">
          <Navbar />
          <main className="flex-grow pt-20">
            <Suspense fallback={
              <div className="flex items-center justify-center h-[80vh]">
                <div className="animate-pulse neon-text-blue text-2xl font-heading flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-t-4 border-neon-blue border-solid rounded-full animate-spin"></div>
                  Loading DNA Sequence...
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

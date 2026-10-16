import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Navbar from './components/Navbar';

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home'));

function LoadingFallback() {
  const { lang } = useAppContext();

  return (
    <div role="status" className="flex items-center justify-center h-[80vh] px-6">
      <div className="flex flex-col items-center gap-5 text-gray-400">
        <div className="w-10 h-10 border-2 border-white/10 border-t-neon-blue rounded-full animate-spin" />
        <span className="text-sm tracking-wide">
          {lang === 'ar' ? 'جارٍ تحميل الموقع…' : 'Loading your portfolio…'}
        </span>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-body selection:bg-neon-blue/30 selection:text-neon-blue">
          <Navbar />
          <main className="flex-grow pt-20">
            <Suspense fallback={<LoadingFallback />}>
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

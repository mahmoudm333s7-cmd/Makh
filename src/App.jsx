import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dna } from 'lucide-react';
import { AppProvider, useAppContext } from './context/AppContext';
import Navbar from './components/Navbar';

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home'));

function LoadingFallback() {
  const { lang } = useAppContext();

  return (
    <div role="status" className="portfolio-loading min-h-[75vh] px-6">
      <div className="flex flex-col items-center">
        <div className="loader-emblem mb-6" aria-hidden="true">
          <span className="loader-ring loader-ring-outer" />
          <span className="loader-ring loader-ring-inner" />
          <Dna className="loader-glyph" />
        </div>
        <div className="loader-brand font-heading font-bold tracking-[0.28em] text-lg">
          <span>BIO</span><span>PORT</span>
        </div>
        <span className="mt-3 text-sm text-gray-400 tracking-wide">
          {lang === 'ar' ? 'جارٍ تجهيز ملفك الأكاديمي…' : 'Preparing your academic portfolio…'}
        </span>
        <div className="loader-track mt-7" aria-hidden="true"><span className="loader-progress" /></div>
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

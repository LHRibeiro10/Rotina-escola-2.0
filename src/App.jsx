// src/App.jsx
import { useEffect, useMemo, useState, Suspense } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { loadGlobal, saveGlobal } from './lib/storage.js';

export default function App() {
  const g = loadGlobal();
  const logged = g.loggedIn;
  const profiles = g.profiles || [];
  const children = useMemo(
    () => profiles.filter(p => p.responsavel === logged),
    [profiles, logged]
  );

  if (!logged) {
    return <Navigate to="/login" replace />;
  }

  const location = useLocation();
  const isRegisterChildPage = location.pathname === '/register-child';
  if (children.length === 0 && !isRegisterChildPage) {
    return <Navigate to="/register-child" replace />;
  }

  const activeId = g.activeProfileId;
  const activeBelongs = children.some(c => c.id === activeId);

  const [fixing, setFixing] = useState(false);
  useEffect(() => {
    if (!activeBelongs) {
      const first = children[0];
      saveGlobal({ activeProfileId: first.id });
      setFixing(true);
      setTimeout(() => setFixing(false), 0);
    }
  }, [activeBelongs]);

  if (fixing) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-slate-800">
      <Navbar />

      {/* Suspense agora SEM loading — fallback vazio */}
      <Suspense fallback={null}>
        <main className="max-w-6xl mx-auto px-4 py-6">
          <Outlet />
        </main>
      </Suspense>

      <footer className="text-center text-xs text-slate-500 py-6">
        Feito com finalidade educacional por{' '}
        <a
          href="https://www.linkedin.com/in/luiz-henrique-ribeiro-978590309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          className="text-indigo-500 hover:underline"
        >
          Luiz H. Ribeiro
        </a>.
        <br />
      </footer>
    </div>
  );
}
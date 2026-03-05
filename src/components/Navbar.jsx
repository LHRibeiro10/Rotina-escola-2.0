// filename: src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import { loadGlobal, saveGlobal, useGlobalLS } from '../lib/storage.js';
import Avatar from './Avatar.jsx';

export default function Navbar() {
  const g = loadGlobal();
  const activeId = g.activeProfileId;
  const profiles = g.profiles || [];
  const current = profiles.find(p => p.id === activeId);
  const coins = (g.profilesState && activeId && g.profilesState[activeId]?.coins) || 0;

  const linkBase = 'px-3 py-1 rounded-lg text-sm font-semibold transition';
  const active = 'bg-white shadow text-slate-900';
  const inactive = 'text-slate-600 hover:text-slate-800';

  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Marca (logo + nome) */}
        <div className="flex items-center gap-6">
          {/* Contêiner fixo → a navbar não muda de altura */}
          <div className="w-10 h-20 rounded-xl overflow-hidden flex items-center justify-center">
            {/* Aumente só a imagem com scale-* (ex.: scale-200 = 2x) */}
            <img
              src="/rotina.png"
              alt="logo"
              className="w-full h-full object-contain scale-175"
            />
          </div>

          <span className="font-bold">Rotina + Escola</span>
        </div>

        {/* Navegação */}
        <nav className="flex items-center gap-2 rounded-xl bg-slate-100 p-1">
          <NavLink
            to="/"
            end
            className={({isActive}) => `${linkBase} ${isActive ? active : inactive}`}
          >
            Aluno
          </NavLink>
          <NavLink
            to="/biblioteca"
            className={({isActive}) => `${linkBase} ${isActive ? active : inactive}`}
          >
            Biblioteca
          </NavLink>
          <NavLink
            to="/agenda"
            className={({isActive}) => `${linkBase} ${isActive ? active : inactive}`}
          >
            Agenda
          </NavLink>
          <NavLink
            to="/responsavel"
            className={({isActive}) => `${linkBase} ${isActive ? active : inactive}`}
          >
            Responsável
          </NavLink>
          <NavLink
            to="/perfil"
            className={({isActive}) => `${linkBase} ${isActive ? active : inactive}`}
          >
            Perfil
          </NavLink>
        </nav>

        {/* Bloco do usuário: avatar + nome + moedas + sair */}
        <div className="flex items-center gap-3 ml-6">
          {current && (
            <>
              <Avatar
                avatar={current.avatar || null}
                name={current.name}
                size={28}
              />
              <span className="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700 animate-pop">
                {current.name}
              </span>
            </>
          )}

          <div className="ml-1 text-sm font-semibold text-amber-600">
            🪙 {coins}
          </div>

          {/* Ícone/botão Sair */}
          <button
            type="button"
            onClick={() => {
              saveGlobal({ loggedIn: null });
              window.location.href = "/login";
            }}
            title="Encerrar sessão"
            className="ml-1 inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-rose-100 text-rose-700 hover:bg-rose-200"
          >
            {/* Ícone simples (cadeado/porta). Pode trocar por SVG se preferir */}
            🔒 <span className="hidden sm:inline">Sair</span>
          </button>
        </div>

      </div>
    </header>
  );
}
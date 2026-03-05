// filename: src/pages/Login.jsx
import { useState } from "react";
import { loadGlobal, saveGlobal } from "../lib/storage.js";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const g = loadGlobal();
  const accounts = g.accounts || [];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const login = () => {
    setError("");
    const acc = accounts.find(a => a.email === email && a.password === password);
    if (!acc) {
      setError("E-mail ou senha incorretos.");
      return;
    }

    // Se o responsável já tiver filhos, vai direto pro app; senão, /register-child
    const profiles = (loadGlobal().profiles || []);
    const kids = profiles.filter(p => p.responsavel === acc.idResponsavel);

    // Lembrar sessão (opcional simples): gravar flag para leitura futura
    saveGlobal({
      loggedIn: acc.idResponsavel,
      rememberMe: remember
    });

    if (kids.length === 0) {
      nav("/register-child");
    } else {
      saveGlobal({ activeProfileId: kids[0].id });
      nav("/");
    }
  };

  return (
    <section className="min-h-[calc(100vh-0px)] relative flex items-center justify-center">
      {/* Fundo bonito (gradiente) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-sky-50" />

      {/* Ornamentação opcional (bolhas com blur) */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-40" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-40" />

      {/* Card central */}
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          {/* Logo (usa /rotina.png; ajuste o src se necessário) */}
          <div className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-sm">
            <img src="/rotina.png" alt="logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
            Entrar no <span className="text-indigo-600">Rotina + Escola</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 text-center">
            Acesse sua conta de responsável para continuar.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
          {/* Campo e-mail */}
          <label className="block text-sm font-medium text-slate-700">E-mail</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">📧</span>
            <input
              type="email"
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {/* Campo senha */}
          <label className="block text-sm font-medium text-slate-700 mt-4">Senha</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">🔒</span>
            <input
              type={show ? "text" : "password"}
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="********"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              className="absolute inset-y-0 right-2 px-2 text-slate-500 hover:text-slate-700 text-sm"
              aria-label={show ? "Ocultar senha" : "Mostrar senha"}
              title={show ? "Ocultar senha" : "Mostrar senha"}
            >
              {show ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Linha: lembrar + esqueci */}
          <div className="mt-3 flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700 select-none">
              <input
                type="checkbox"
                className="accent-indigo-600"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              Lembrar-me
            </label>

            <button
              type="button"
              onClick={() => alert("Fluxo de recuperação ainda não implementado.")}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Esqueci a senha
            </button>
          </div>

          {/* Erro */}
          {error && (
            <p className="mt-3 text-rose-600 text-sm bg-rose-50 border border-rose-200 rounded-lg p-2">
              {error}
            </p>
          )}

          {/* Botão Entrar */}
          <button
            type="button"
            onClick={login}
            className="mt-5 w-full py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Entrar
          </button>

          {/* Divisor */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs uppercase tracking-wider text-slate-400">ou</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* CTA: Criar conta */}
          <p className="text-center text-sm text-slate-600">
            Ainda não tem conta?{" "}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Criar conta de responsável
            </Link>
          </p>
        </div>

        {/* Rodapé super sutil */}
        <p className="mt-4 text-center text-xs text-slate-500">
          Ao continuar, você concorda com nossos termos.
        </p>
      </div>
    </section>
  );
}
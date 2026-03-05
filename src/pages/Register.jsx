// filename: src/pages/Register.jsx
import { useState } from "react";
import { loadGlobal, saveGlobal } from "../lib/storage.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const g = loadGlobal();
  const accounts = g.accounts || [];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registrar = () => {
    if (!name || !email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    if (accounts.some(a => a.email === email)) {
      setError("Esse e‑mail já está cadastrado.");
      return;
    }

    const idResponsavel = Date.now();

    const novo = {
      idResponsavel,
      name,
      email,
      password
    };

    saveGlobal({
      accounts: [...accounts, novo],
      loggedIn: idResponsavel
    });

    nav("/register-child");
  };

  return (
    <section className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow border border-slate-200">
      <h1 className="text-2xl font-bold mb-4 text-center">Criar conta do Responsável</h1>

      <input
        className="w-full mb-3 px-3 py-2 rounded-xl border border-slate-300"
        placeholder="Seu nome"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        className="w-full mb-3 px-3 py-2 rounded-xl border border-slate-300"
        placeholder="Seu e-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
      />

      <input
        className="w-full mb-3 px-3 py-2 rounded-xl border border-slate-300"
        placeholder="Crie uma senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
      />

      {error && <p className="text-rose-600 text-sm mb-3">{error}</p>}

      <button
        onClick={registrar}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-xl font-semibold"
      >
        Criar conta
      </button>
    </section>
  );
}
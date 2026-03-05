// filename: src/pages/RegisterChild.jsx
import { useState } from "react";
import { loadGlobal, saveGlobal, useGlobalLS } from "../lib/storage.js";
import { useNavigate, Navigate } from "react-router-dom";

export default function RegisterChild() {
  const nav = useNavigate();
  const [profiles, setProfiles] = useGlobalLS("profiles", []);
  const [activeProfileId, setActiveProfileId] = useGlobalLS("activeProfileId", null);

  const g = loadGlobal();
  const idResp = g.loggedIn;

  // Se não estiver logado, volta ao login
  if (!idResp) {
    return <Navigate to="/login" replace />;
  }

  const [name, setName] = useState("");
  const [serie, setSerie] = useState("1");
  const [error, setError] = useState("");

  const cadastrarFilho = () => {
    if (!name.trim()) {
      setError("Digite o nome da criança");
      return;
    }

    const novo = {
      id: Date.now(),
      name: name.trim(),
      serie,
      avatar: null,
      responsavel: idResp
    };

    // Salva imediatamente antes de navegar (evita loop)
    const currentProfiles = (loadGlobal().profiles || []);
    const next = [...currentProfiles, novo];
    saveGlobal({ profiles: next, activeProfileId: novo.id });

    // Sincroniza hooks e navega
    setProfiles(next);
    setActiveProfileId(novo.id);
    nav("/");
  };

  return (
    <section className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow border border-slate-200">
      <h1 className="text-2xl font-bold mb-4 text-center">Cadastrar Filho(a)</h1>

      <input
        className="w-full mb-3 px-3 py-2 rounded-xl border border-slate-300"
        placeholder="Nome da criança"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <select
        className="w-full mb-3 px-3 py-2 rounded-xl border border-slate-300"
        value={serie}
        onChange={e => setSerie(e.target.value)}
      >
        <option value="1">1º ano</option>
        <option value="2">2º ano</option>
        <option value="3">3º ano</option>
        <option value="4">4º ano</option>
        <option value="5">5º ano</option>
      </select>

      {error && (
        <p className="text-rose-600 text-sm mb-3">{error}</p>
      )}

      <button
        type="button"
        onClick={cadastrarFilho}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-xl font-semibold"
      >
        Cadastrar
      </button>
    </section>
  );
}
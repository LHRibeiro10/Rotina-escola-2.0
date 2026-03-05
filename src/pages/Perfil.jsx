// filename: src/pages/Perfil.jsx
import { useEffect, useState } from 'react';
import { loadGlobal, saveGlobal, useGlobalLS } from '../lib/storage.js';
import Avatar from '../components/Avatar.jsx';
import AvatarPicker from '../components/AvatarPicker.jsx';

export default function Perfil(){
  const [profiles, setProfiles] = useGlobalLS('profiles', []);
  const [activeProfileId, setActiveProfileId] = useGlobalLS('activeProfileId', null);


  {(profiles || []).length === 0 && (
    <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-4 text-indigo-700">
      Nenhum aluno cadastrado. Use “Cadastrar Filho(a)” após criar sua conta.
    </div>
)}


  // Novo perfil
  const [name, setName] = useState('');
  const [serie, setSerie] = useState('1');
  const [avatar, setAvatar] = useState(null);

  const addProfile = () => {
    if(!name.trim()) return;
    const p = { id: Date.now(), name: name.trim(), serie, avatar };
    setProfiles([...(profiles||[]), p]);
    setName(''); setSerie('1'); setAvatar(null);
  };

  // Trocar avatar de um existente
  const [editId, setEditId] = useState(null);
  const [editAvatar, setEditAvatar] = useState(null);

  const commitAvatar = (id) => {
    if (!id) return;
    const next = (profiles||[]).map(p => p.id===id ? { ...p, avatar: editAvatar } : p);
    setProfiles(next);
    setEditId(null);
    setEditAvatar(null);
  };

  const removeProfile = (id) => {
    const next = (profiles||[]).filter(p=>p.id!==id);
    setProfiles(next);
    const g = loadGlobal();
    const ps = g.profilesState || {};
    delete ps[id];
    saveGlobal({ profilesState: ps });
    if(activeProfileId===id){ setActiveProfileId(next[0]?.id || null); }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
        <h1 className="text-2xl font-extrabold">Perfis</h1>
        <p className="text-sm text-slate-600">Crie e selecione o perfil ativo. Cada perfil tem progresso independente.</p>
      </div>

      {/* Novo perfil */}
      <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
        <h2 className="text-lg font-bold mb-3">Novo perfil</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3">
          <input
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="Nome do aluno"
            className="md:col-span-2 px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-400"
          />
          <select
            value={serie}
            onChange={e=>setSerie(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-400"
          >
            <option value="1">1º ano</option>
            <option value="2">2º ano</option>
            <option value="3">3º ano</option>
            <option value="4">4º ano</option>
            <option value="5">5º ano</option>
          </select>
          <button
            onClick={addProfile}
            className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow"
          >
            Adicionar
          </button>
        </div>

        <AvatarPicker value={avatar ?? ''} onChange={setAvatar} />
      </div>

      {/* Lista de perfis */}
      <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
        <h2 className="text-lg font-bold mb-3">Perfis existentes</h2>
        <div className="space-y-3">
          {(profiles||[]).map(p => (
            <div key={p.id} className={`rounded-xl border p-3 ${activeProfileId===p.id? 'border-indigo-300 bg-indigo-50' : 'border-slate-200'}`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar avatar={p.avatar || null} name={p.name} size={36} />
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-slate-500">Série: {p.serie}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={()=>setActiveProfileId(p.id)}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${activeProfileId===p.id? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >Ativar</button>
                  <button
                    onClick={()=>setEditId(editId===p.id ? null : p.id)}
                    className="px-3 py-1 rounded-lg text-sm font-semibold bg-amber-100 text-amber-700 hover:bg-amber-200"
                  >Trocar avatar</button>
                  <button
                    onClick={()=>removeProfile(p.id)}
                    className="px-3 py-1 rounded-lg text-sm font-semibold bg-rose-100 text-rose-700 hover:bg-rose-200"
                  >Remover</button>
                </div>
              </div>

              {editId === p.id && (
                <div className="mt-3">
                  <AvatarPicker value={editAvatar ?? p.avatar ?? ''} onChange={setEditAvatar} />
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={()=>commitAvatar(p.id)}
                      className="px-3 py-1 rounded-lg text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-600"
                    >Salvar avatar</button>
                    <button
                      onClick={()=>{ setEditId(null); setEditAvatar(null); }}
                      className="px-3 py-1 rounded-lg text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >Cancelar</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
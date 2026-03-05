import { useMemo, useState, useEffect } from 'react';
import LevelBadge from '../components/LevelBadge.jsx';
import TaskCard from '../components/TaskCard.jsx';
import RewardCard from '../components/RewardCard.jsx';
import { ES_TEMPLATES } from '../lib/templates.js';
import { useGlobalLS, useProfileState, loadGlobal, saveGlobal } from '../lib/storage.js';
import { xpNeededForLevel } from '../lib/xp.js';
import { sfx, play } from '../lib/audio.js';


export default function Aluno() {
  const [profiles] = useGlobalLS('profiles', []);
  const [activeProfileId, setActiveProfileId] = useGlobalLS('activeProfileId', null);

  // Boot: garante perfil ativo
  useEffect(() => {
// O responsável é obrigado a cadastrar o filho antes de usar o app
  if (!profiles || profiles.length === 0) {
    return (
      <section className="max-w-6xl mx-auto p-6 text-center text-slate-700">
       <h1 className="text-2xl font-bold mb-3">Nenhum aluno cadastrado</h1>
        <p>Cadastre o filho(a) para continuar.</p>
        <a
         href="/register-child"
         className="inline-block mt-4 px-4 py-2 rounded-xl bg-indigo-500 text-white font-semibold"
        >
          Cadastrar aluno
      </a>
    </section>
  );
}
  }, [profiles, activeProfileId, setActiveProfileId]);

  if (!activeProfileId) {
    return (
      <section className="max-w-6xl mx-auto">
        <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm text-slate-700">
          Preparando o perfil do aluno...
        </div>
      </section>
    );
  }

  const [badges, setBadges] = useProfileState(activeProfileId, 'badges', []); // ← NOVO
  const [profileSerie, setProfileSerie] = useProfileState(activeProfileId, 'serie', '1');
  const [level, setLevel] = useProfileState(activeProfileId, 'level', 1);
  const [xp, setXp] = useProfileState(activeProfileId, 'xp', 0);
  const [coins, setCoins] = useProfileState(activeProfileId, 'coins', 0);
  const [tasks, setTasks] = useProfileState(activeProfileId, 'tasks', []);
  const [rewards] = useProfileState(activeProfileId, 'rewards', [
    { id: 1, title: 'Escolher o lanche de hoje', cost: 40, description: 'O aluno escolhe o lanche da tarde.' },
    { id: 2, title: '30 min de jogo extra', cost: 60, description: 'Tempo extra de jogo no fim do dia.' },
    { id: 3, title: 'Crominho surpresa', cost: 80, description: 'Um adesivo colecionável virtual.' },
  ]);
  const [celebrate, setCelebrate] = useState(false);
  const todayKey = () => new Date().toISOString().slice(0,10); // 'YYYY-MM-DD'
  const hasTodayBadge = () => badges?.some(b => b?.key === todayKey());


  const xpToNext = xpNeededForLevel(level);

  const templateTasks = useMemo(() => {
    const base = ES_TEMPLATES.series[profileSerie] || [];
    return base.map((t, idx) => ({
      id: Date.now() + idx,
      title: `${t.icon || ''} ${t.title}`,
      xp: Math.max(8, Math.round(t.estimate * 1.6)),
      coins: Math.max(4, Math.round(t.estimate / 2)),
      done: false,
    }));
  }, [profileSerie]);

 const completeTask = (id) => {
     setTasks((prev) => {
       const updated = prev.map((t) => (t.id === id ? { ...t, done: true } : t));
       const task = prev.find((t) => t.id === id);
       if (!task || task.done) return updated;

       setCoins((c) => c + task.coins);
       setXp((current) => {
         let nxp = current + task.xp;
         let lvl = level;
         let need = xpNeededForLevel(lvl);
         let up = false;

         while (nxp >= need) {
           nxp -= need;
           lvl += 1;
           need = xpNeededForLevel(lvl);
           up = true;
         }

         if (up) {
           setLevel(lvl);
           setCelebrate(true);
           setTimeout(() => setCelebrate(false), 1600);
           play(sfx.levelup);
         } else {
           play(sfx.complete);
         }
         return nxp;
       });

      // ← NOVO: badge do dia se TODAS as tarefas (da lista) estiverem concluídas
      const allDone = updated.length > 0 && updated.every(t => t.done);
      if (allDone && !hasTodayBadge()) {
        setBadges((prevBadges) => [
          ...(prevBadges || []),
          { key: todayKey(), type: 'daily_complete', title: 'Missões concluídas do dia' }
        ]);
       setCelebrate(true);
        setTimeout(() => setCelebrate(false), 1600);
       play(sfx.levelup);
     }

       return updated;
     });
   };

  const redeemReward = (id) => {
    const r = rewards.find((x) => x.id === id);
    if (!r) return;
    if (coins < r.cost) return;
    setCoins((c) => c - r.cost);
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 800);
    play(sfx.complete);
  };

  const gerarMissoesHoje = () => setTasks(templateTasks);
  const resetarProgresso = () => {
    setLevel(1);
    setXp(0);
    setCoins(0);
    setTasks([]);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-3xl bg-white border border-slate-100 p-5 shadow-sm flex flex-col sm:flex-row items-center gap-5">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Rotina do Aluno</h1>
            <p className="text-slate-600 mt-1">
              Escolha a série e gere as missões do dia a partir dos seus templates.
            </p>
          </div>
          <LevelBadge level={level} xp={xp} xpToNext={xpToNext} />
        </div>

        <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-600">Série:</label>
              <select
                value={profileSerie}
                onChange={(e) => setProfileSerie(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="1">1º ano</option>
                <option value="2">2º ano</option>
                <option value="3">3º ano</option>
                <option value="4">4º ano</option>
                <option value="5">5º ano</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={gerarMissoesHoje}
                className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow"
              >
                Gerar missões de hoje
              </button>
              <button
                onClick={resetarProgresso}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
              >
                Resetar progresso
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {tasks.length === 0 ? (
              <p className="text-sm text-slate-500">
                Sem missões hoje. Clique em “Gerar missões de hoje”.
              </p>
            ) : (
              tasks.map((t) => <TaskCard key={t.id} task={t} onComplete={completeTask} />)
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
          <h2 className="text-lg font-bold mb-2">
            Loja de recompensas <span className="text-amber-600 text-sm">🪙 {coins}</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {rewards.map((r) => (
              <RewardCard
                key={r.id}
                reward={r}
                onRedeem={redeemReward}
                canAfford={coins >= r.cost}
              />
            ))}
          </div>
        </div>

        
{/* Medalhas: últimas conquistas */}
        <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
          <h2 className="text-lg font-bold mb-2">Medalhas</h2>
          <p className="text-sm text-slate-600 mb-2">
            Total: <span className="font-semibold">{badges?.length || 0}</span>
          </p>
          <ul className="text-sm text-slate-700 space-y-1">
            {(badges || []).slice(-5).reverse().map((b, i) => (
              <li key={b.key + i} className="flex items-center gap-2">
                <span>🏅</span>
                <span>{b.title}</span>
                <span className="text-xs text-slate-500">({b.key})</span>
              </li>
           ))}
            {(badges || []).length === 0 && (
              <li className="text-slate-500">Nenhuma medalha ainda — conclua todas as missões de hoje!</li>
            )}
          </ul>
        </div>


        {celebrate && (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 shadow-sm text-emerald-700 text-center animate-pop">
            🎉 Parabéns! Progresso atualizado.
          </div>
        )}
      </div>

      {/* Confete simples via Tailwind custom */}
      {celebrate && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <span
              key={i}
              className="absolute -top-10 w-2 h-4 rounded bg-gradient-to-br from-pink-400 to-amber-400 animate-confetti"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDuration: `${2.5 + Math.random()}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
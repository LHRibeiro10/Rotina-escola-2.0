
import { useState } from 'react'
import { useGlobalLS, useProfileState, saveGlobal, loadGlobal } from '../lib/storage.js'

export default function Responsavel(){
  const [activeProfileId] = useGlobalLS('activeProfileId', null)
  const [tasks, setTasks] = useProfileState(activeProfileId, 'tasks', [])

  const state = loadGlobal()
  const [events, setEvents] = useState(state.extraEvents || [])

  const [tTitle, setTTitle] = useState('')
  const [tXp, setTXp] = useState(20)
  const [tCoins, setTCoins] = useState(8)

  const [eDate, setEDate] = useState('')
  const [eTipo, setETipo] = useState('Comunicado')
  const [eTitulo, setETitulo] = useState('')

  const addTask = () => {
    if(!tTitle.trim()) return
    setTasks(prev => [...prev, { id: Date.now(), title: tTitle.trim(), xp: Number(tXp)||10, coins: Number(tCoins)||5, done: false }])
    setTTitle(''); setTXp(20); setTCoins(8)
  }

  const addEvent = () => {
    if(!eDate || !eTitulo.trim()) return
    const next = [...events, { data: eDate, tipo: eTipo, titulo: eTitulo.trim(), cor: '#14b8a6' }]
    setEvents(next)
    saveGlobal({ extraEvents: next })
    setEDate(''); setETipo('Comunicado'); setETitulo('')
  }

  const resetProfile = () => {
    setTasks([])
    // nível, xp, moedas
    // Como não temos setters aqui, limpamos direto o objeto de estado por perfil via saveGlobal
    const g = loadGlobal()
    const ps = g.profilesState || {}
    const cur = ps[activeProfileId] || {}
    const nextCur = { ...cur, level: 1, xp: 0, coins: 0 }
    saveGlobal({ profilesState: { ...ps, [activeProfileId]: nextCur } })
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Adicionar missão personalizada</h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <input value={tTitle} onChange={e=>setTTitle(e.target.value)} placeholder="Título da missão" className="sm:col-span-3 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          <input type="number" value={tXp} min={5} onChange={e=>setTXp(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="XP" />
          <input type="number" value={tCoins} min={1} onChange={e=>setTCoins(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Moedas" />
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={addTask} className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow">Adicionar missão</button>
          <button onClick={resetProfile} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold">Resetar perfil</button>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Adicionar evento na Agenda</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input type="date" value={eDate} onChange={e=>setEDate(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-400" />
          <select value={eTipo} onChange={e=>setETipo(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-400">
            <option>Comunicado</option>
            <option>Prova</option>
            <option>Evento</option>
          </select>
          <input value={eTitulo} onChange={e=>setETitulo(e.target.value)} placeholder="Título" className="px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-400" />
        </div>
        <button onClick={addEvent} className="mt-3 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow">Adicionar evento</button>
        <p className="text-xs text-slate-500 mt-2">Eventos extras são globais e ficam salvos localmente.</p>
      </div>
    </section>
  )
}

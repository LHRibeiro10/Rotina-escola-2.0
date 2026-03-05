
import { useMemo } from 'react'
import { ES_TEMPLATES } from '../lib/templates'
import { useProfileState, useGlobalLS } from '../lib/storage'

export default function Biblioteca(){
  const [activeProfileId] = useGlobalLS('activeProfileId', null)
  const [serie, setSerie] = useProfileState(activeProfileId, 'serie', '1')
  const itens = ES_TEMPLATES.biblioteca || []

  const filtrados = useMemo(()=>{
    return itens.filter(it => {
      const [ini, fim] = (it.serie || '').split('-').map(s=>parseInt(s,10))
      const s = parseInt(serie,10)
      if(!ini || !fim) return true
      return s>=ini && s<=fim
    })
  }, [itens, serie])

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Biblioteca</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">Série:</label>
          <select value={serie} onChange={e=>setSerie(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="1">1º ano</option>
            <option value="2">2º ano</option>
            <option value="3">3º ano</option>
            <option value="4">4º ano</option>
            <option value="5">5º ano</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtrados.map(item => (
          <div key={item.id} className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm flex flex-col hover:shadow transition">
            <div className="text-sm text-slate-500">{item.materia} · {item.tipo.toUpperCase()}</div>
            <h3 className="font-semibold text-slate-800 mt-1">{item.titulo}</h3>
            <a href={item.url} target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow">Abrir</a>
          </div>
        ))}
      </div>
    </section>
  )
}


import { ES_TEMPLATES } from '../lib/templates'
import { loadGlobal } from '../lib/storage'

export default function Agenda(){
  const base = ES_TEMPLATES.agenda || []
  const extra = (loadGlobal().extraEvents || [])
  const eventos = [...base, ...extra]
  const ordenados = [...eventos].sort((a,b)=> a.data.localeCompare(b.data))

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-extrabold">Agenda</h1>
      <div className="space-y-3">
        {ordenados.map((ev, idx) => (
          <div key={idx} className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500">{new Date(ev.data).toLocaleDateString()}</div>
              <div className="font-semibold text-slate-800">{ev.titulo}</div>
              <div className="text-sm text-slate-600">{ev.tipo}</div>
            </div>
            <div className="w-4 h-4 rounded-full" title={ev.tipo} style={{ backgroundColor: ev.cor || '#999' }} />
          </div>
        ))}
      </div>
    </section>
  )
}

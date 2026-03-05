
export default function TaskCard({ task, onComplete }){
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 flex items-center justify-between hover:shadow transition animate-pop">
      <div>
        <h3 className="font-semibold text-slate-800">{task.title}</h3>
        <p className="text-sm text-slate-500">+{task.xp} XP · +{task.coins} moedas</p>
      </div>
      <button onClick={()=>onComplete(task.id)} disabled={task.done}
        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${task.done ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow'}`}>
        {task.done ? 'Concluída' : 'Concluir'}
      </button>
    </div>
  )
}

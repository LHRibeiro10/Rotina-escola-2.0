
export default function RewardCard({ reward, onRedeem, canAfford }){
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 flex flex-col hover:shadow transition animate-pop">
      <div className="flex-1">
        <h3 className="font-semibold text-slate-800 mb-1">{reward.title}</h3>
        <p className="text-sm text-slate-500 mb-2">Custa {reward.cost} moedas</p>
        {reward.description && <p className="text-xs text-slate-400">{reward.description}</p>}
      </div>
      <button onClick={()=>onRedeem(reward.id)} disabled={!canAfford}
        className={`mt-3 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${canAfford ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
        Trocar
      </button>
    </div>
  )
}

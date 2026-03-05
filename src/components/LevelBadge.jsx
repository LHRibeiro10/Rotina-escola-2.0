
export default function LevelBadge({ level, xp, xpToNext }){
  return (
    <div className="flex items-center gap-3">
      <div className="relative animate-pop">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg grid place-items-center text-white font-extrabold text-xl">{level}</div>
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs bg-white/80 backdrop-blur px-2 py-0.5 rounded shadow">Nível</span>
      </div>
      <div className="flex-1 min-w-[160px]">
        <div className="flex justify-between text-xs text-slate-600 mb-1"><span>XP</span><span>{xp} / {xpToNext}</span></div>
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${Math.min(100, Math.round((xp / xpToNext) * 100))}%` }} />
        </div>
      </div>
    </div>
  )
}

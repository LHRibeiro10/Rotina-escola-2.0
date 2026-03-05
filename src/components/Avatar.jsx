// filename: src/components/Avatar.jsx
export default function Avatar({ avatar, name, size = 32 }) {
  const base = "rounded-full grid place-items-center font-bold text-white select-none overflow-hidden";
  const style = { width: size, height: size };

  // Sem avatar → bolinha com inicial e gradiente
  if (!avatar) {
    const initial = (name?.[0] || 'A').toUpperCase();
    const palettes = [
      "from-indigo-500 to-violet-500",
      "from-rose-500 to-orange-500",
      "from-emerald-500 to-teal-500",
      "from-blue-500 to-cyan-500",
      "from-amber-500 to-yellow-500",
    ];
    const pick = palettes[(name?.length || 1) % palettes.length];
    return (
      <div className={`bg-gradient-to-br ${pick} ${base}`} style={style}>
        <span className="text-lg leading-none">{initial}</span>
      </div>
    );
  }

  // Catálogo por emoji (armazenamos como "emoji:🦊")
  if (avatar.startsWith("emoji:")) {
    const emoji = avatar.slice(6);
    return (
      <div className={`bg-white ${base}`} style={style}>
        <span className="text-xl leading-none">{emoji}</span>
      </div>
    );
  }

  // Qualquer URL / dataURL (upload)
  return <img src={avatar} alt="avatar" className={base} style={style} />;
}
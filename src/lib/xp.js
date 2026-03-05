
// Curva de XP mais suave: cresce com a potência 1.25
// Ex.: L1=80, L2≈95, L3≈110, L4≈126, ...
export const xpNeededForLevel = (level) => Math.max(50, Math.round(80 * Math.pow(level, 1.25)))

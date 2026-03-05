
function make(name){
  const a = new Audio(`/sounds/${name}`)
  a.volume = 0.6
  return a
}

export const sfx = {
  complete: make('complete.mp3'),
  levelup: make('levelup.mp3'),
}

export async function play(audio){
  try { await audio.currentTime>0 ? (audio.currentTime=0, audio.play()) : audio.play() } catch {}
}


import { useEffect, useState } from 'react'

const PREFIX = 'edukids_v3'

// Estado global (profiles, activeProfileId, extraEvents, etc.)
export const saveGlobal = (partial) => {
  try {
    const raw = localStorage.getItem(PREFIX)
    const prev = raw ? JSON.parse(raw) : {}
    const next = { ...prev, ...partial }
    localStorage.setItem(PREFIX, JSON.stringify(next))
  } catch {}
}

export const loadGlobal = () => {
  try {
    const raw = localStorage.getItem(PREFIX)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function useGlobalLS(key, initialValue){
  const all = loadGlobal()
  const initial = all[key] !== undefined ? all[key] : initialValue
  const [value, setValue] = useState(initial)
  useEffect(()=>{ saveGlobal({ [key]: value }) }, [key, value])
  return [value, setValue]
}

// Estado por perfil (aninhado em profilesState[profileId])
function readProfileKV(profileId, key, initialValue){
  const all = loadGlobal()
  const ps = all.profilesState || {}
  const cur = ps[profileId] || {}
  return cur[key] !== undefined ? cur[key] : initialValue
}

function writeProfileKV(profileId, key, value){
  const all = loadGlobal()
  const ps = all.profilesState || {}
  const cur = ps[profileId] || {}
  const next = { ...ps, [profileId]: { ...cur, [key]: value } }
  saveGlobal({ profilesState: next })
}

export function useProfileState(profileId, key, initialValue){
  const initial = readProfileKV(profileId, key, initialValue)
  const [value, setValue] = useState(initial)
  useEffect(()=>{ writeProfileKV(profileId, key, value) }, [profileId, key, value])
  return [value, setValue]
}

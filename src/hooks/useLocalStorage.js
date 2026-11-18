import { useEffect, useState } from 'react'

// Igual ao useState, mas lê/grava no localStorage.
// - initialValue pode ser um valor ou uma função (inicialização preguiçosa)
// - isValid descarta dados antigos/corrompidos e volta ao valor inicial
export default function useLocalStorage(key, initialValue, isValid = () => true) {
  const [value, setValue] = useState(() => {
    const fallback = typeof initialValue === 'function' ? initialValue() : initialValue
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return fallback
      const parsed = JSON.parse(raw)
      return isValid(parsed) ? parsed : fallback
    } catch {
      return fallback
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // cota cheia ou modo privado: segue sem persistir
    }
  }, [key, value])

  return [value, setValue]
}

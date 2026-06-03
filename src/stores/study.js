import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { MODS } from '../data/content.js'

export const useStudyStore = defineStore('study', () => {
  // Persistent state
  const seen = useLocalStorage('mlops-seen', new Set(), {
    serializer: {
      read: v => new Set(JSON.parse(v || '[]')),
      write: v => JSON.stringify([...v])
    }
  })
  const mastered = useLocalStorage('mlops-mastered', new Set(), {
    serializer: {
      read: v => new Set(JSON.parse(v || '[]')),
      write: v => JSON.stringify([...v])
    }
  })
  const streak = useLocalStorage('mlops-streak', 0)
  const totalTime = useLocalStorage('mlops-time', 0)
  const theme = useLocalStorage('mlops-theme', 'dark')

  // Session state
  const curMod = ref(null)
  const cardIdx = ref(0)
  const flipped = ref(false)
  const mode = ref('flip')

  // Computed
  const totalCards = computed(() => MODS.reduce((s, m) => s + m.cards.length, 0))
  const progress = computed(() => totalCards.value > 0 ? Math.round(seen.value.size / totalCards.value * 100) : 0)

  function markSeen(modId, idx) {
    seen.value = new Set([...seen.value, `${modId}_${idx}`])
  }

  function rateSeen(modId, idx, rating) {
    const key = `${modId}_${idx}`
    if (rating === 2) {
      mastered.value = new Set([...mastered.value, key])
      streak.value++
    } else {
      const s = new Set(mastered.value)
      s.delete(key)
      mastered.value = s
      if (rating === 0 && streak.value > 0) streak.value = 0
    }
  }

  function modProgress(mod) {
    return mod.cards.filter((_, i) => mastered.value.has(`${mod.id}_${i}`)).length
  }

  function modSeen(mod) {
    return mod.cards.filter((_, i) => seen.value.has(`${mod.id}_${i}`)).length
  }

  function openMod(mod) {
    curMod.value = mod
    cardIdx.value = 0
    flipped.value = false
    mode.value = 'flip'
  }

  function closeMod() {
    curMod.value = null
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  function initTheme() {
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  return {
    seen, mastered, streak, totalTime, theme,
    curMod, cardIdx, flipped, mode,
    totalCards, progress,
    markSeen, rateSeen, modProgress, modSeen,
    openMod, closeMod, toggleTheme, initTheme
  }
})

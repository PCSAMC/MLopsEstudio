<template>
  <header class="header">
    <div class="logo" @click="$emit('navigate', 'mods')">
      <div class="logo-badge">
        <BrainCircuit :size="20" :stroke-width="1.8" />
      </div>
      <div class="logo-text">
        <span class="gradient-text logo-name">MLOps Academy</span>
        <span class="logo-sub">Suite de Estudio Interactiva</span>
      </div>
    </div>

    <div class="header-actions">
      <div class="timer-pill" @click="toggleTimer" :title="running ? 'Pausar temporizador' : 'Reanudar'">
        <div class="timer-indicator" :class="{ paused: !running }">
          <span class="timer-ring" />
        </div>
        <span class="mono timer-value">{{ formatted }}</span>
      </div>

      <button class="icon-button" @click="store.toggleTheme()" :title="store.theme === 'dark' ? 'Modo claro' : 'Modo oscuro'">
        <Sun v-if="store.theme === 'dark'" :size="17" :stroke-width="1.8" />
        <Moon v-else :size="17" :stroke-width="1.8" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStudyStore } from '../stores/study.js'
import { BrainCircuit, Sun, Moon } from 'lucide-vue-next'

defineEmits(['navigate'])

const store = useStudyStore()
const secs = ref(0)
const running = ref(true)
let interval = null

const formatted = computed(() => {
  const m = String(Math.floor(secs.value / 60)).padStart(2, '0')
  const s = String(secs.value % 60).padStart(2, '0')
  return `${m}:${s}`
})

function toggleTimer() { running.value = !running.value }

onMounted(() => { interval = setInterval(() => { if (running.value) secs.value++ }, 1000) })
onUnmounted(() => clearInterval(interval))
</script>

<style scoped>
.header {
  display: flex; align-items: center;
  justify-content: space-between;
  margin-bottom: 24px; gap: 16px;
}

/* ── Logo ── */
.logo {
  display: flex; align-items: center; gap: 12px;
  cursor: pointer; transition: opacity .2s;
}
.logo:hover { opacity: .85 }

.logo-badge {
  width: 40px; height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), #9333EA);
  display: grid; place-items: center;
  color: #fff;
  box-shadow: 0 4px 20px rgba(124,110,250,.35), inset 0 1px 0 rgba(255,255,255,.15);
}

.logo-text { display: flex; flex-direction: column }
.logo-name { font-size: 17px; font-weight: 700; letter-spacing: -.3px; line-height: 1.2 }
.logo-sub  { font-size: 11px; color: var(--text3); font-weight: 400; letter-spacing: .02em }

/* ── Actions ── */
.header-actions { display: flex; align-items: center; gap: 8px }

.timer-pill {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 14px; border-radius: 99px;
  background: var(--card);
  border: 1px solid var(--border);
  backdrop-filter: blur(20px);
  cursor: pointer; transition: all .25s var(--ease);
}
.timer-pill:hover {
  border-color: var(--border2);
  box-shadow: 0 0 20px rgba(124,110,250,.1);
}

.timer-indicator { position: relative; width: 8px; height: 8px }
.timer-ring {
  position: absolute; inset: 0;
  border-radius: 50%; background: var(--green);
  animation: glow-pulse 2s ease-in-out infinite;
}
.timer-indicator.paused .timer-ring {
  background: var(--text3);
  animation: none;
}
@keyframes glow-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(52,211,153,.4) }
  50%      { opacity: .6; box-shadow: 0 0 0 4px rgba(52,211,153,0) }
}

.timer-value { font-size: 13px; font-weight: 500; color: var(--text) }

.icon-button {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--card);
  border: 1px solid var(--border);
  display: grid; place-items: center;
  color: var(--text2);
  transition: all .25s var(--ease);
  backdrop-filter: blur(20px);
}
.icon-button:hover {
  color: var(--text);
  border-color: var(--border2);
  background: var(--bg4);
}

@media(max-width: 500px) {
  .logo-sub { display: none }
}
</style>

<template>
  <div class="app-root">
    <!-- Animated mesh background -->
    <div class="bg-mesh" aria-hidden="true">
      <div class="orb orb-1" />
      <div class="orb orb-2" />
      <div class="orb orb-3" />
      <div class="noise" />
    </div>

    <div class="shell">
      <AppHeader @navigate="view = $event" />
      <StatsBar />
      <AppNav :active="view" @navigate="view = $event" />

      <Transition name="view" mode="out-in">
        <component :is="views[view]" :key="view" @navigate="view = $event" />
      </Transition>

      <!-- Footer -->
      <footer class="footer">
        <span>MLOps Academy</span>
        <span class="dot">·</span>
        <span>Suite de estudio interactiva</span>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, markRaw } from 'vue'
import { useStudyStore } from './stores/study.js'
import AppHeader from './components/AppHeader.vue'
import StatsBar from './components/StatsBar.vue'
import AppNav from './components/AppNav.vue'
import ModulesView from './components/ModulesView.vue'
import SummaryView from './components/SummaryView.vue'
import MindMapView from './components/MindMapView.vue'
import CheatSheetView from './components/CheatSheetView.vue'
import QuizView from './components/QuizView.vue'

const store = useStudyStore()
const view = ref('mods')

const views = {
  mods: markRaw(ModulesView),
  sum: markRaw(SummaryView),
  mm: markRaw(MindMapView),
  cheat: markRaw(CheatSheetView),
  quiz: markRaw(QuizView),
}

onMounted(() => store.initTheme())
</script>

<style scoped>
.app-root { min-height: 100vh; position: relative }

/* ── Animated Background ── */
.bg-mesh {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 0; overflow: hidden;
}
.noise {
  position: absolute; inset: -50%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.025'/%3E%3C/svg%3E");
  background-size: 200px;
  animation: drift-noise 12s linear infinite;
}
@keyframes drift-noise { to { transform: translate(200px, 200px) } }

.orb {
  position: absolute; border-radius: 50%;
  filter: blur(100px); will-change: transform;
}
[data-theme="dark"] .orb { opacity: .10 }
[data-theme="light"] .orb { opacity: .05 }

.orb-1 {
  width: 700px; height: 700px;
  background: radial-gradient(circle, #7C6EFA 0%, transparent 70%);
  top: -20%; left: -15%;
  animation: float-1 22s ease-in-out infinite;
}
.orb-2 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, #34D399 0%, transparent 70%);
  bottom: -10%; right: -10%;
  animation: float-2 28s ease-in-out infinite;
}
.orb-3 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, #F472B6 0%, transparent 70%);
  top: 35%; left: 55%;
  animation: float-3 20s ease-in-out infinite;
}
@keyframes float-1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,40px) scale(1.05)} 66%{transform:translate(-30px,70px) scale(.97)} }
@keyframes float-2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-50px,-60px) scale(1.03)} }
@keyframes float-3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,30px)} }

/* ── Shell ── */
.shell {
  position: relative; z-index: 1;
  max-width: 980px; margin: 0 auto;
  padding: 28px 24px 40px;
}

/* ── View Transition ── */
.view-enter-active { animation: view-in .35s var(--ease) both }
.view-leave-active { animation: view-out .2s var(--ease) both }
@keyframes view-in {
  from { opacity: 0; transform: translateY(14px); filter: blur(4px) }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0) }
}
@keyframes view-out {
  from { opacity: 1; transform: translateY(0);    filter: blur(0) }
  to   { opacity: 0; transform: translateY(-8px); filter: blur(2px) }
}

/* ── Footer ── */
.footer {
  margin-top: 48px; padding-top: 20px;
  border-top: 1px solid var(--border);
  text-align: center; font-size: 12px; color: var(--text3);
  display: flex; align-items: center; justify-content: center; gap: 6px;
}
.dot { opacity: .4 }

@media(max-width:640px) { .shell { padding: 16px 14px 40px } }
</style>

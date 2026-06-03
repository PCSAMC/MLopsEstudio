<template>
  <div class="stats-bar card-glass">
    <div class="stat-group">
      <div class="stat">
        <Eye :size="14" :stroke-width="1.6" class="stat-icon" />
        <div class="stat-body">
          <span class="stat-val mono">{{ store.seen.size }}</span>
          <span class="stat-lbl">Vistas</span>
        </div>
      </div>

      <div class="stat-sep" />

      <div class="stat">
        <Trophy :size="14" :stroke-width="1.6" class="stat-icon green" />
        <div class="stat-body">
          <span class="stat-val mono green">{{ store.mastered.size }}</span>
          <span class="stat-lbl">Dominadas</span>
        </div>
      </div>

      <div class="stat-sep" />

      <div class="stat">
        <Flame :size="14" :stroke-width="1.6" class="stat-icon amber" />
        <div class="stat-body">
          <span class="stat-val mono amber">{{ store.streak }}</span>
          <span class="stat-lbl">Racha</span>
        </div>
      </div>
    </div>

    <div class="prog-section">
      <div class="prog-header">
        <span class="prog-label">Progreso global</span>
        <span class="prog-pct mono">{{ store.progress }}%</span>
      </div>
      <div class="prog-track">
        <div class="prog-fill" :style="{ width: store.progress + '%' }">
          <div class="prog-shimmer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStudyStore } from '../stores/study.js'
import { Eye, Trophy, Flame } from 'lucide-vue-next'
const store = useStudyStore()
</script>

<style scoped>
.stats-bar {
  display: flex; align-items: center; gap: 24px;
  padding: 14px 22px; margin-bottom: 22px;
  flex-wrap: wrap;
}

.stat-group { display: flex; align-items: center; gap: 18px }

.stat {
  display: flex; align-items: center; gap: 8px;
}
.stat-icon { color: var(--accent2); flex-shrink: 0 }
.stat-icon.green { color: var(--green) }
.stat-icon.amber { color: var(--amber) }

.stat-body { display: flex; flex-direction: column; gap: 1px }
.stat-val { font-size: 18px; font-weight: 700; color: var(--accent2); line-height: 1 }
.stat-val.green { color: var(--green) }
.stat-val.amber { color: var(--amber) }
.stat-lbl { font-size: 10px; color: var(--text3); text-transform: uppercase; letter-spacing: .08em; font-weight: 500 }

.stat-sep { width: 1px; height: 28px; background: var(--border2); flex-shrink: 0 }

.prog-section { flex: 1; min-width: 140px }
.prog-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 6px;
}
.prog-label { font-size: 10px; color: var(--text3); text-transform: uppercase; letter-spacing: .08em; font-weight: 500 }
.prog-pct { font-size: 12px; font-weight: 600; color: var(--accent2) }

.prog-track {
  height: 4px; border-radius: 99px;
  background: var(--bg5); overflow: hidden;
  position: relative;
}
.prog-fill {
  height: 100%; border-radius: 99px;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  transition: width .8s var(--ease);
  position: relative; overflow: hidden;
}
.prog-shimmer {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.25) 50%, transparent 100%);
  animation: shimmer 2.5s ease-in-out infinite;
}
@keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }

@media(max-width:540px) {
  .stat-sep { display: none }
  .stat-group { gap: 14px }
}
</style>

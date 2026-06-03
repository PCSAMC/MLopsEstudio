<template>
  <div>
    <!-- Module grid -->
    <div v-if="!store.curMod">
      <div class="sec-head">
        <BookOpen :size="18" :stroke-width="1.7" />
        <h2 class="sec-title">Módulos de Estudio</h2>
        <span class="sec-count">{{ MODS.length }} módulos · {{ totalCards }} tarjetas</span>
      </div>

      <div class="grid">
        <div
          v-for="(mod, idx) in MODS" :key="mod.id"
          class="mod-card"
          :style="{ '--c1': mod.colors[0], '--c2': mod.colors[1], '--delay': idx * 50 + 'ms' }"
          @click="store.openMod(mod)"
        >
          <div class="mod-top-line" />
          <div class="mod-icon-wrap">
            <component :is="iconMap[mod.iconName]" :size="20" :stroke-width="1.6" />
          </div>
          <div class="mod-name">{{ mod.name }}</div>
          <div class="mod-sub">{{ mod.cards.length }} tarjetas</div>

          <div class="mod-progress">
            <div class="mod-prog-bar">
              <div class="mod-prog-fill" :style="{ width: seenPct(mod) + '%' }" />
            </div>
          </div>

          <div v-if="store.modProgress(mod) > 0" class="mod-mastered">
            <CheckCircle2 :size="12" :stroke-width="2" />
            {{ store.modProgress(mod) }}/{{ mod.cards.length }}
          </div>

          <div class="mod-hover-glow" />
        </div>
      </div>
    </div>

    <!-- Flashcard session -->
    <FlashCards v-else />
  </div>
</template>

<script setup>
import { computed, markRaw } from 'vue'
import { MODS } from '../data/content.js'
import { useStudyStore } from '../stores/study.js'
import FlashCards from './FlashCards.vue'
import {
  BookOpen, CheckCircle2,
  BrainCircuit, TrendingDown, GitBranch, BarChart3,
  Wind, Bot, Database, Rocket
} from 'lucide-vue-next'

const store = useStudyStore()
const totalCards = computed(() => MODS.reduce((s, m) => s + m.cards.length, 0))

const iconMap = {
  BrainCircuit: markRaw(BrainCircuit),
  TrendingDown: markRaw(TrendingDown),
  GitBranch: markRaw(GitBranch),
  BarChart3: markRaw(BarChart3),
  Wind: markRaw(Wind),
  Bot: markRaw(Bot),
  Database: markRaw(Database),
  Rocket: markRaw(Rocket),
}

function seenPct(mod) {
  return Math.round(store.modSeen(mod) / mod.cards.length * 100)
}
</script>

<style scoped>
/* ── Section Header ── */
.sec-head {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 20px; color: var(--text2);
}
.sec-title {
  font-size: 16px; font-weight: 600; color: var(--text);
  letter-spacing: -.2px; margin: 0;
}
.sec-count {
  margin-left: auto; font-size: 12px; color: var(--text3);
}

/* ── Grid ── */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px;
}

/* ── Module Card ── */
.mod-card {
  position: relative; overflow: hidden;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--r);
  padding: 22px 18px 16px;
  cursor: pointer;
  transition: all .3s var(--ease);
  backdrop-filter: blur(20px);
  animation: card-in .45s var(--ease) both;
  animation-delay: var(--delay);
}

@keyframes card-in {
  from { opacity: 0; transform: translateY(16px) scale(.97) }
  to   { opacity: 1; transform: translateY(0) scale(1) }
}

.mod-card:hover {
  border-color: var(--border2);
  transform: translateY(-4px);
  box-shadow: var(--shadow), 0 0 0 1px var(--border2);
}

.mod-top-line {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--c1), var(--c2));
  opacity: .8;
}

.mod-hover-glow {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 0%, var(--c1), transparent 70%);
  opacity: 0; transition: opacity .3s;
  pointer-events: none;
}
.mod-card:hover .mod-hover-glow { opacity: .04 }

.mod-icon-wrap {
  width: 42px; height: 42px; border-radius: 12px;
  background: linear-gradient(135deg, var(--c1), var(--c2));
  display: grid; place-items: center;
  color: #fff; margin-bottom: 14px;
  box-shadow: 0 4px 16px color-mix(in srgb, var(--c1) 30%, transparent);
  transition: transform .3s var(--ease-spring);
}
.mod-card:hover .mod-icon-wrap { transform: scale(1.06) rotate(-2deg) }

.mod-name {
  font-size: 14px; font-weight: 600; color: var(--text);
  margin-bottom: 2px; letter-spacing: -.1px;
}
.mod-sub { font-size: 12px; color: var(--text3) }

.mod-progress { margin-top: 14px }
.mod-prog-bar {
  height: 3px; border-radius: 99px;
  background: var(--bg5); overflow: hidden;
}
.mod-prog-fill {
  height: 100%; border-radius: 99px;
  background: linear-gradient(90deg, var(--c1), var(--c2));
  transition: width .6s var(--ease);
}

.mod-mastered {
  display: flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 600; color: var(--green);
  margin-top: 8px;
}
</style>

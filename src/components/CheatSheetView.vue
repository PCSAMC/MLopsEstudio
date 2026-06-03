<template>
  <div>
    <div class="sec-head">
      <Zap :size="18" :stroke-width="1.7" />
      <h2 class="sec-title">Cheatsheet Rápido</h2>
      <span class="sec-count">{{ CHEAT_SECTIONS.length }} secciones</span>
    </div>

    <div class="grid">
      <div
        v-for="(sec, i) in CHEAT_SECTIONS" :key="i"
        class="cheat-card card-glass"
        :style="{ '--delay': i * 40 + 'ms' }"
      >
        <div class="cheat-head">
          <component :is="sectionIcons[i] || BookOpen" :size="15" :stroke-width="1.6" class="cheat-icon" />
          <span class="cheat-title">{{ sec.title }}</span>
        </div>
        <div class="cheat-items">
          <div v-for="item in sec.items" :key="item.key" class="cheat-item">
            <code class="cheat-key">{{ item.key }}</code>
            <span class="cheat-val">{{ item.val }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { markRaw } from 'vue'
import { CHEAT_SECTIONS } from '../data/content.js'
import {
  Zap, BookOpen, Calculator, Gauge, Wrench, Package,
  Wind, Bot, Database, Rocket
} from 'lucide-vue-next'

const sectionIcons = [
  markRaw(Calculator), markRaw(Gauge), markRaw(Wrench), markRaw(Package),
  markRaw(Wind), markRaw(Bot), markRaw(Database), markRaw(Rocket)
]
</script>

<style scoped>
.sec-head {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 20px; color: var(--text2);
}
.sec-title { font-size: 16px; font-weight: 600; color: var(--text); margin: 0 }
.sec-count { margin-left: auto; font-size: 12px; color: var(--text3) }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
}

.cheat-card {
  padding: 0; overflow: hidden;
  animation: card-in .4s var(--ease) both;
  animation-delay: var(--delay);
  transition: all .25s var(--ease);
}
.cheat-card:hover {
  border-color: var(--border2);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}
@keyframes card-in { from { opacity: 0; transform: translateY(14px) } }

.cheat-head {
  display: flex; align-items: center; gap: 8px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
}
.cheat-icon { color: var(--accent2) }
.cheat-title { font-size: 13px; font-weight: 700; color: var(--text); letter-spacing: -.1px }

.cheat-items { padding: 6px 18px 14px }

.cheat-item {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}
.cheat-item:last-child { border-bottom: none }

.cheat-key {
  font-family: var(--mono); font-size: 11px; font-weight: 600;
  color: var(--accent); background: rgba(124,110,250,.08);
  padding: 3px 8px; border-radius: 5px;
  white-space: nowrap; flex-shrink: 0; margin-top: 1px;
  border: 1px solid rgba(124,110,250,.12);
}
.cheat-val { font-size: 13px; color: var(--text2); line-height: 1.5 }
</style>

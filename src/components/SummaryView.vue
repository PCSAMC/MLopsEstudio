<template>
  <div>
    <div class="sec-head">
      <FileText :size="18" :stroke-width="1.7" />
      <h2 class="sec-title">Resúmenes por Módulo</h2>
    </div>

    <div class="sum-list">
      <div
        v-for="(s, i) in SUMS" :key="i"
        class="sum-card card-glass"
        :style="{ '--delay': i * 40 + 'ms' }"
      >
        <div class="sum-head" @click="toggle(i)">
          <div class="sum-icon" :style="`background:linear-gradient(135deg,${s.colors[0]},${s.colors[1]})`">
            <component :is="sumIcons[i] || FileText" :size="16" :stroke-width="1.6" />
          </div>
          <div class="sum-info">
            <div class="sum-name">{{ s.mod }}</div>
            <div class="sum-meta">{{ s.kws.length }} conceptos clave</div>
          </div>
          <ChevronDown :size="16" :stroke-width="1.8" class="chevron" :class="{ open: openIdx === i }" />
        </div>

        <Transition name="expand">
          <div v-if="openIdx === i" class="sum-body">
            <div class="sum-content" v-html="s.content" />

            <table v-if="s.table" class="sum-table">
              <thead><tr><th v-for="h in s.table.heads" :key="h">{{ h }}</th></tr></thead>
              <tbody><tr v-for="(row, ri) in s.table.rows" :key="ri"><td v-for="(cell, ci) in row" :key="ci" v-html="cell" /></tr></tbody>
            </table>

            <div class="kw-cloud">
              <span
                v-for="([kw, color], ki) in s.kws" :key="ki"
                class="kw" :class="color"
              >{{ kw }}</span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import { SUMS } from '../data/content.js'
import {
  FileText, ChevronDown,
  BrainCircuit, TrendingDown, BarChart3, Wind, Bot, Database, Rocket
} from 'lucide-vue-next'

const sumIcons = [
  markRaw(BrainCircuit), markRaw(TrendingDown), markRaw(BarChart3),
  markRaw(Wind), markRaw(Bot), markRaw(Database), markRaw(Rocket)
]

const openIdx = ref(null)
function toggle(i) { openIdx.value = openIdx.value === i ? null : i }
</script>

<style scoped>
.sec-head {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 20px; color: var(--text2);
}
.sec-title { font-size: 16px; font-weight: 600; color: var(--text); margin: 0 }

.sum-list { display: flex; flex-direction: column; gap: 10px }

.sum-card {
  overflow: hidden;
  animation: card-in .4s var(--ease) both;
  animation-delay: var(--delay);
}
@keyframes card-in { from { opacity: 0; transform: translateY(12px) } }

.sum-head {
  padding: 16px 18px; cursor: pointer;
  display: flex; align-items: center; gap: 12px;
  transition: background .2s;
}
.sum-head:hover { background: rgba(124,110,250,.03) }

.sum-icon {
  width: 36px; height: 36px; border-radius: 10px;
  display: grid; place-items: center;
  color: #fff; flex-shrink: 0;
}
.sum-info { flex: 1 }
.sum-name { font-size: 14px; font-weight: 600; color: var(--text) }
.sum-meta { font-size: 12px; color: var(--text3); margin-top: 1px }

.chevron { color: var(--text3); transition: transform .3s var(--ease) }
.chevron.open { transform: rotate(180deg) }

.sum-body {
  padding: 0 18px 18px;
  border-top: 1px solid var(--border);
  padding-top: 16px;
}
.sum-content :deep(p) { font-size: 14px; color: var(--text2); line-height: 1.8; margin-bottom: 12px }
.sum-content :deep(strong) { color: var(--text); font-weight: 600 }

.sum-table {
  width: 100%; border-collapse: collapse; font-size: 13px;
  margin: 14px 0; border-radius: var(--r-sm); overflow: hidden;
}
.sum-table th {
  text-align: left; padding: 10px 14px;
  background: rgba(124,110,250,.06); color: var(--accent2);
  font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: .06em;
}
.sum-table td { padding: 10px 14px; border-top: 1px solid var(--border); color: var(--text2) }
.sum-table tr:hover td { background: rgba(124,110,250,.03) }

.kw-cloud { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px }
.kw {
  padding: 4px 12px; border-radius: 99px;
  font-size: 11px; font-weight: 500;
  border: 1px solid transparent; transition: all .2s var(--ease); cursor: default;
}
.kw:hover { transform: translateY(-1px) }
.kw.purple { background: rgba(124,110,250,.08); color: var(--accent2); border-color: rgba(124,110,250,.2) }
.kw.teal   { background: rgba(45,212,191,.07); color: var(--teal); border-color: rgba(45,212,191,.2) }
.kw.amber  { background: rgba(251,191,36,.07); color: var(--amber); border-color: rgba(251,191,36,.2) }
.kw.coral  { background: rgba(248,113,113,.07); color: var(--red); border-color: rgba(248,113,113,.2) }
.kw.pink   { background: rgba(244,114,182,.07); color: var(--pink); border-color: rgba(244,114,182,.2) }

.expand-enter-active { animation: expand-in .3s var(--ease) }
.expand-leave-active { animation: expand-out .2s var(--ease) }
@keyframes expand-in  { from { opacity: 0; transform: translateY(-8px) } }
@keyframes expand-out { to   { opacity: 0; transform: translateY(-4px) } }
</style>

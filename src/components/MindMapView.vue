<template>
  <div>
    <div class="sec-head">
      <BrainCircuit :size="18" :stroke-width="1.7" />
      <h2 class="sec-title">Mapa Mental MLOps</h2>
      <span class="sec-hint">
        <MousePointerClick :size="13" :stroke-width="1.6" />
        Explora los nodos
      </span>
    </div>

    <!-- MAP CONTAINER -->
    <div class="map-container card-glass" ref="containerEl">
      <div class="map-area" ref="mapEl" :style="{ height: mapH + 'px' }">

        <!-- SVG Connections -->
        <svg class="connections" :viewBox="`0 0 ${mapW} ${mapH}`" :width="mapW" :height="mapH">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient v-for="n in nodesWithChildren" :key="'g-'+n.id"
              :id="'grad-'+n.id" gradientUnits="userSpaceOnUse"
              :x1="px(n)" :y1="py(n)" :x2="px(n)" :y2="py(n)"
            >
              <stop offset="0%" :stop-color="n.col" stop-opacity="0.7" />
              <stop offset="100%" :stop-color="n.col" stop-opacity="0.15" />
            </linearGradient>
          </defs>

          <template v-for="n in nodesWithChildren" :key="'e-'+n.id">
            <line
              v-for="cid in n.children" :key="n.id+'-'+cid"
              :x1="px(n)" :y1="py(n)"
              :x2="px(nodeMap[cid])" :y2="py(nodeMap[cid])"
              class="edge"
              :class="{
                lit: selected?.id === n.id || selected?.id === cid,
                dimmed: selected && selected.id !== n.id && selected.id !== cid
              }"
              :stroke="n.col"
              :filter="(selected?.id === n.id || selected?.id === cid) ? 'url(#glow)' : ''"
            />
          </template>
        </svg>

        <!-- Nodes -->
        <div
          v-for="(n, i) in MM_NODES" :key="n.id"
          class="node"
          :class="{ selected: selected?.id === n.id, center: n.id === 'center', leaf: n.r <= 20, dimmed: selected && selected.id !== n.id && !isRelated(n.id) }"
          :style="{
            left: (n.x * 100) + '%',
            top: (n.y * 100) + '%',
            '--nc': n.col,
            '--ntc': n.tc,
            '--size': (n.r * 2) + 'px',
            '--delay': (i * 35) + 'ms',
          }"
          @click="select(n)"
          @mouseenter="hovered = n.id"
          @mouseleave="hovered = null"
        >
          <div class="node-glow" />
          <div class="node-circle">
            <span class="node-label">{{ n.label }}</span>
          </div>
          <div class="node-ring" />
        </div>
      </div>
    </div>

    <!-- DETAIL PANEL -->
    <Transition name="detail">
      <div v-if="selected" class="detail-panel card-glass" :key="selected.id">
        <div class="detail-top">
          <div class="detail-dot" :style="{ background: selected.col }" />
          <h3 class="detail-title">{{ selected.label }}</h3>
          <button class="detail-close" @click="selected = null">
            <X :size="16" :stroke-width="1.8" />
          </button>
        </div>
        <p class="detail-body">{{ selected.desc }}</p>

        <!-- Connected nodes -->
        <div v-if="relatedNodes.length" class="detail-related">
          <span class="related-label">
            <Network :size="13" :stroke-width="1.6" /> Conectado a
          </span>
          <div class="related-tags">
            <button
              v-for="rn in relatedNodes" :key="rn.id"
              class="related-tag"
              :style="{ '--tc': rn.col }"
              @click="select(rn)"
            >
              <span class="tag-dot" :style="{ background: rn.col }" />
              {{ rn.label }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Empty state hint -->
    <div v-if="!selected" class="empty-hint">
      <Info :size="14" :stroke-width="1.6" />
      Haz clic en cualquier nodo del mapa para explorar su contenido
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStudyStore } from '../stores/study.js'
import { MM_NODES } from '../data/content.js'
import { BrainCircuit, MousePointerClick, X, Network, Info } from 'lucide-vue-next'

const store = useStudyStore()
const containerEl = ref(null)
const mapEl = ref(null)
const selected = ref(null)
const hovered = ref(null)
const mapW = ref(900)
const mapH = ref(520)

const nodeMap = computed(() => {
  const map = {}
  MM_NODES.forEach(n => { map[n.id] = n })
  return map
})

const nodesWithChildren = computed(() => MM_NODES.filter(n => n.children?.length))

const relatedNodes = computed(() => {
  if (!selected.value) return []
  const ids = new Set()
  const s = selected.value
  if (s.children) s.children.forEach(c => ids.add(c))
  MM_NODES.forEach(n => {
    if (n.children?.includes(s.id)) ids.add(n.id)
  })
  return [...ids].map(id => nodeMap.value[id]).filter(Boolean)
})

function px(n) { return n ? n.x * mapW.value : 0 }
function py(n) { return n ? n.y * mapH.value : 0 }

function isRelated(id) {
  if (!selected.value) return false
  const s = selected.value
  if (s.id === id) return true
  if (s.children?.includes(id)) return true
  const parent = MM_NODES.find(n => n.children?.includes(s.id))
  if (parent?.id === id) return true
  if (parent?.children?.includes(id)) return true
  return false
}

function select(n) {
  selected.value = selected.value?.id === n.id ? null : n
}

function onResize() {
  if (!containerEl.value) return
  mapW.value = containerEl.value.offsetWidth - 2
}

let ro
onMounted(() => {
  onResize()
  ro = new ResizeObserver(onResize)
  if (containerEl.value) ro.observe(containerEl.value)
})
onUnmounted(() => ro?.disconnect())
</script>

<style scoped>
.sec-head {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 20px; color: var(--text2);
}
.sec-title { font-size: 16px; font-weight: 600; color: var(--text); margin: 0; flex: 1 }
.sec-hint {
  display: flex; align-items: center; gap: 4px;
  font-size: 12px; color: var(--text3);
}

/* ═══ MAP CONTAINER ═══ */
.map-container {
  overflow: hidden; padding: 0;
  margin-bottom: 14px;
}

.map-area {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 50%, rgba(124,110,250,.04) 0%, transparent 60%),
    radial-gradient(circle at 20% 30%, rgba(52,211,153,.03) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(244,114,182,.03) 0%, transparent 40%);
}

/* ═══ SVG CONNECTIONS ═══ */
.connections {
  position: absolute; top: 0; left: 0;
  pointer-events: none; z-index: 1;
}
.edge {
  stroke-width: 1.5;
  opacity: .25;
  transition: all .5s var(--ease);
}
.edge.lit {
  stroke-width: 2.5;
  opacity: .7;
  stroke-dasharray: 6, 3;
  animation: dash-flow 1.2s linear infinite;
}
.edge.dimmed {
  opacity: .06;
}
@keyframes dash-flow {
  to { stroke-dashoffset: -18 }
}

/* ═══ NODES ═══ */
.node {
  position: absolute; z-index: 2;
  transform: translate(-50%, -50%);
  cursor: pointer;
  animation: node-pop .5s var(--ease-spring) both;
  animation-delay: var(--delay);
}
@keyframes node-pop {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0) }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1) }
}

.node.dimmed { opacity: .3; filter: grayscale(.4) }
.node.dimmed .node-circle { transform: scale(.9) }

.node-circle {
  width: var(--size); height: var(--size);
  border-radius: 50%;
  background: linear-gradient(135deg, var(--nc), color-mix(in srgb, var(--nc) 70%, #000));
  display: grid; place-items: center;
  position: relative; z-index: 2;
  transition: all .35s var(--ease-spring);
  box-shadow:
    0 4px 20px color-mix(in srgb, var(--nc) 35%, transparent),
    inset 0 1px 0 rgba(255,255,255,.18),
    inset 0 -2px 4px rgba(0,0,0,.15);
}

.node:hover .node-circle {
  transform: scale(1.12);
  box-shadow:
    0 6px 30px color-mix(in srgb, var(--nc) 50%, transparent),
    inset 0 1px 0 rgba(255,255,255,.25),
    inset 0 -2px 4px rgba(0,0,0,.15);
}

.node.selected .node-circle {
  transform: scale(1.15);
  box-shadow:
    0 0 0 3px rgba(255,255,255,.3),
    0 8px 40px color-mix(in srgb, var(--nc) 60%, transparent),
    inset 0 1px 0 rgba(255,255,255,.3);
}

.node-label {
  font-size: 10px; font-weight: 600;
  color: var(--ntc);
  text-align: center; line-height: 1.2;
  padding: 4px; user-select: none;
  text-shadow: 0 1px 2px rgba(0,0,0,.2);
}
.node.center .node-label { font-size: 13px; font-weight: 700 }
.node.leaf .node-label { font-size: 8px }

/* Glow */
.node-glow {
  position: absolute; inset: -12px; z-index: 1;
  border-radius: 50%;
  background: radial-gradient(circle, var(--nc), transparent 65%);
  opacity: 0; transition: opacity .4s;
  pointer-events: none;
}
.node:hover .node-glow { opacity: .2 }
.node.selected .node-glow { opacity: .3; animation: glow-breathe 2s ease-in-out infinite }
@keyframes glow-breathe {
  0%, 100% { opacity: .3; transform: scale(1) }
  50%      { opacity: .15; transform: scale(1.15) }
}

/* Selection ring */
.node-ring {
  position: absolute; inset: -5px; z-index: 1;
  border-radius: 50%;
  border: 2px solid transparent;
  transition: all .35s var(--ease);
  pointer-events: none;
}
.node.selected .node-ring {
  border-color: var(--nc);
  animation: ring-spin 8s linear infinite;
  border-style: dashed;
  opacity: .5;
}
@keyframes ring-spin { to { transform: rotate(360deg) } }

/* ═══ DETAIL PANEL ═══ */
.detail-panel {
  padding: 20px 22px; margin-bottom: 14px;
}

.detail-top {
  display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
}
.detail-dot {
  width: 10px; height: 10px; border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 10px currentColor;
}
.detail-title {
  font-size: 16px; font-weight: 700; color: var(--text);
  flex: 1; margin: 0;
}
.detail-close {
  width: 30px; height: 30px; border-radius: 8px;
  display: grid; place-items: center;
  color: var(--text3); background: var(--bg4);
  transition: all .2s var(--ease);
}
.detail-close:hover { color: var(--text); background: var(--bg5) }

.detail-body {
  font-size: 14px; color: var(--text2); line-height: 1.75;
  margin-bottom: 16px;
}

.detail-related { padding-top: 14px; border-top: 1px solid var(--border) }
.related-label {
  display: flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 600; color: var(--text3);
  text-transform: uppercase; letter-spacing: .06em;
  margin-bottom: 10px;
}
.related-tags { display: flex; flex-wrap: wrap; gap: 6px }
.related-tag {
  display: flex; align-items: center; gap: 6px;
  padding: 5px 12px; border-radius: 99px;
  background: var(--bg4); border: 1px solid var(--border);
  font-size: 12px; font-weight: 500; color: var(--text2);
  transition: all .2s var(--ease);
}
.related-tag:hover {
  border-color: var(--tc);
  color: var(--text);
  background: rgba(124,110,250,.06);
  transform: translateY(-1px);
}
.tag-dot {
  width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
}

/* ═══ EMPTY HINT ═══ */
.empty-hint {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: 12px; border-radius: var(--r-sm);
  background: var(--bg3); border: 1px solid var(--border);
  font-size: 13px; color: var(--text3);
}

/* ═══ TRANSITIONS ═══ */
.detail-enter-active { animation: detail-in .35s var(--ease) }
.detail-leave-active { animation: detail-out .2s var(--ease) }
@keyframes detail-in {
  from { opacity: 0; transform: translateY(14px); filter: blur(4px) }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0) }
}
@keyframes detail-out {
  from { opacity: 1 }
  to   { opacity: 0; transform: translateY(-6px) }
}

/* ═══ RESPONSIVE ═══ */
@media(max-width: 640px) {
  .node-label { font-size: 8px !important }
  .node.center .node-label { font-size: 10px !important }
}
</style>

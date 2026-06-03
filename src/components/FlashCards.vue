<template>
  <div>
    <!-- Header -->
    <div class="fc-head">
      <button class="back-btn" @click="store.closeMod()">
        <ArrowLeft :size="15" :stroke-width="1.8" />
        <span>Módulos</span>
      </button>
      <div class="fc-info">
        <span class="fc-title">{{ store.curMod.name }}</span>
        <span class="fc-sub">{{ store.curMod.cards.length }} tarjetas</span>
      </div>
      <div class="fc-controls">
        <button class="ctrl-btn" @click="prev" :disabled="store.cardIdx === 0">
          <ChevronLeft :size="16" :stroke-width="2" />
        </button>
        <span class="mono fc-pos">{{ store.cardIdx + 1 }}/{{ store.curMod.cards.length }}</span>
        <button class="ctrl-btn" @click="next" :disabled="store.cardIdx === store.curMod.cards.length - 1">
          <ChevronRight :size="16" :stroke-width="2" />
        </button>
      </div>
    </div>

    <!-- Mode switch -->
    <div class="mode-row">
      <button class="mode-pill" :class="{ active: store.mode === 'flip' }" @click="store.mode = 'flip'">
        <RotateCcw :size="14" :stroke-width="1.8" /> Voltear
      </button>
      <button class="mode-pill" :class="{ active: store.mode === 'write' }" @click="store.mode = 'write'">
        <Pencil :size="14" :stroke-width="1.8" /> Escribir
      </button>
    </div>

    <!-- Keyboard hints -->
    <div class="kbd-row">
      <kbd>← →</kbd> <span>navegar</span>
      <kbd>Espacio</kbd> <span>voltear</span>
      <kbd>1 2 3</kbd> <span>calificar</span>
      <kbd>Esc</kbd> <span>salir</span>
    </div>

    <!-- ═══ FLIP MODE ═══ -->
    <div v-if="store.mode === 'flip'" class="flip-container">
      <div class="scene" @click="toggleFlip" style="cursor:pointer">
        <div class="card-3d" :class="{ flipped: store.flipped }">
          <!-- Front -->
          <div class="card-face front">
            <span class="card-tag">Pregunta</span>
            <p class="card-q">{{ card.q }}</p>
            <span class="card-hint">
              <MousePointerClick :size="13" :stroke-width="1.6" />
              Toca para ver la respuesta
            </span>
          </div>
          <!-- Back -->
          <div class="card-face back">
            <span class="card-tag answer-tag">Respuesta</span>
            <p class="card-a">{{ card.a }}</p>
          </div>
        </div>
      </div>

      <div class="rate-row">
        <button class="rate-btn bad" @click="rate(0)">
          <XCircle :size="16" :stroke-width="1.6" /> No lo sé
        </button>
        <button class="rate-btn mid" @click="rate(1)">
          <HelpCircle :size="16" :stroke-width="1.6" /> Casi
        </button>
        <button class="rate-btn good" @click="rate(2)">
          <CheckCircle2 :size="16" :stroke-width="1.6" /> Lo sé
        </button>
      </div>
    </div>

    <!-- ═══ WRITE MODE ═══ -->
    <div v-else class="write-container">
      <div class="write-q card-glass">
        <p>{{ card.q }}</p>
      </div>
      <textarea
        v-model="userAnswer"
        class="write-input"
        placeholder="Escribe tu respuesta aquí..."
        rows="4"
      />
      <button class="reveal-btn" @click="revealed = true" v-if="!revealed">
        <Eye :size="15" :stroke-width="1.6" />
        Ver respuesta correcta
      </button>
      <Transition name="slide-up">
        <div v-if="revealed" class="answer-reveal">
          <Lightbulb :size="16" :stroke-width="1.6" class="answer-icon" />
          <p>{{ card.a }}</p>
        </div>
      </Transition>
      <div v-if="revealed" class="rate-row">
        <button class="rate-btn bad" @click="rate(0)">
          <XCircle :size="16" :stroke-width="1.6" /> Mal
        </button>
        <button class="rate-btn mid" @click="rate(1)">
          <HelpCircle :size="16" :stroke-width="1.6" /> Cerca
        </button>
        <button class="rate-btn good" @click="rate(2)">
          <CheckCircle2 :size="16" :stroke-width="1.6" /> Bien
        </button>
      </div>
    </div>

    <!-- Progress dots -->
    <div class="dots">
      <div
        v-for="(_, i) in store.curMod.cards" :key="i"
        class="dot"
        :class="{
          active: i === store.cardIdx,
          mastered: store.mastered.has(`${store.curMod.id}_${i}`),
          seen: store.seen.has(`${store.curMod.id}_${i}`)
        }"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useStudyStore } from '../stores/study.js'
import {
  ArrowLeft, ChevronLeft, ChevronRight, RotateCcw, Pencil,
  MousePointerClick, XCircle, HelpCircle, CheckCircle2,
  Eye, Lightbulb
} from 'lucide-vue-next'

const store = useStudyStore()
const userAnswer = ref('')
const revealed = ref(false)

const card = computed(() => store.curMod?.cards[store.cardIdx])

function toggleFlip() { store.flipped = !store.flipped }
function resetWrite() { userAnswer.value = ''; revealed.value = false }

function prev() {
  if (store.cardIdx > 0) { store.cardIdx--; store.flipped = false; resetWrite() }
}
function next() {
  if (store.cardIdx < store.curMod.cards.length - 1) { store.cardIdx++; store.flipped = false; resetWrite() }
}
function goTo(i) {
  store.cardIdx = i; store.flipped = false; resetWrite()
  store.markSeen(store.curMod.id, i)
}

function rate(r) {
  store.rateSeen(store.curMod.id, store.cardIdx, r)
  store.markSeen(store.curMod.id, store.cardIdx)
  if (store.cardIdx < store.curMod.cards.length - 1) {
    store.cardIdx++; store.flipped = false; resetWrite()
  } else {
    store.closeMod()
  }
}

onMounted(() => {
  if (store.curMod) store.markSeen(store.curMod.id, store.cardIdx)
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => window.removeEventListener('keydown', onKey))

function onKey(e) {
  if (e.target.tagName === 'TEXTAREA') return
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
  if (e.key === ' ') { e.preventDefault(); toggleFlip() }
  if (e.key === '1') rate(0)
  if (e.key === '2') rate(1)
  if (e.key === '3') rate(2)
  if (e.key === 'Escape') store.closeMod()
}
</script>

<style scoped>
/* ── Header ── */
.fc-head {
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 18px; flex-wrap: wrap;
}
.back-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 14px; border-radius: var(--r-sm);
  background: var(--card); border: 1px solid var(--border);
  color: var(--text2); font-size: 13px;
  backdrop-filter: blur(20px); transition: all .2s var(--ease);
}
.back-btn:hover { border-color: var(--border2); color: var(--text) }

.fc-info { flex: 1 }
.fc-title { font-size: 15px; font-weight: 600; color: var(--text); display: block }
.fc-sub { font-size: 11px; color: var(--text3) }

.fc-controls { display: flex; align-items: center; gap: 6px }
.ctrl-btn {
  width: 32px; height: 32px; border-radius: 8px;
  background: var(--card); border: 1px solid var(--border);
  color: var(--text2); display: grid; place-items: center;
  transition: all .2s var(--ease);
}
.ctrl-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--text) }
.ctrl-btn:disabled { opacity: .25; cursor: not-allowed }
.fc-pos { font-size: 12px; color: var(--text3) }

/* ── Mode Switch ── */
.mode-row {
  display: flex; gap: 6px; margin-bottom: 12px;
}
.mode-pill {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 16px; border-radius: 99px;
  font-size: 13px; font-weight: 500;
  background: var(--bg3); border: 1px solid var(--border);
  color: var(--text3); transition: all .25s var(--ease);
}
.mode-pill:hover { color: var(--text2); border-color: var(--border2) }
.mode-pill.active {
  background: linear-gradient(135deg, var(--accent), #6D5FE7);
  border-color: transparent; color: #fff;
  box-shadow: 0 2px 12px rgba(124,110,250,.3);
}

/* ── Keyboard Hints ── */
.kbd-row {
  display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
  margin-bottom: 18px;
}
.kbd-row kbd {
  font-family: var(--mono); font-size: 10px; font-weight: 600;
  padding: 2px 7px; border-radius: 4px;
  background: var(--bg4); border: 1px solid var(--border2);
  color: var(--text3);
}
.kbd-row span { font-size: 11px; color: var(--text3); margin-right: 8px }

/* ── Card ── */
.flip-container { margin-bottom: 14px }

.scene { perspective: 1200px }
.card-3d {
  position: relative; width: 100%; min-height: 280px;
  transform-style: preserve-3d;
  transition: transform .65s cubic-bezier(.4, 0, .2, 1);
}
.card-3d.flipped { transform: rotateY(180deg) }

.card-face {
  position: absolute; width: 100%; min-height: 280px;
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
  border-radius: var(--r); border: 1px solid var(--border);
  padding: 2.5rem 2rem;
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; text-align: center;
  background: var(--card); backdrop-filter: blur(24px);
}

.front {
  box-shadow: var(--glow);
}
.back {
  transform: rotateY(180deg);
  background: linear-gradient(160deg, rgba(124,110,250,.08) 0%, rgba(167,139,250,.03) 100%);
  border-color: var(--border2);
}

.card-tag {
  font-size: 10px; text-transform: uppercase; letter-spacing: .12em;
  font-weight: 600; color: var(--text3); margin-bottom: 16px;
  padding: 3px 10px; border-radius: 99px;
  background: var(--bg4);
}
.answer-tag { background: rgba(124,110,250,.12); color: var(--accent2) }

.card-q { font-size: 17px; font-weight: 600; color: var(--text); line-height: 1.65 }
.card-a { font-size: 15px; color: var(--accent2); line-height: 1.7; font-weight: 400 }
.card-hint {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; color: var(--text3); margin-top: 18px;
}

/* ── Rate Row ── */
.rate-row {
  display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;
  margin-top: 18px;
}
.rate-btn {
  display: flex; align-items: center; gap: 7px;
  padding: 10px 22px; border-radius: var(--r-sm);
  background: var(--card); border: 1px solid var(--border);
  font-size: 13px; font-weight: 500; color: var(--text2);
  transition: all .25s var(--ease);
  backdrop-filter: blur(20px);
}
.rate-btn:hover { transform: translateY(-2px) }

.rate-btn.bad  { border-color: rgba(248,113,113,.3); color: var(--red) }
.rate-btn.bad:hover  { background: rgba(248,113,113,.08); box-shadow: 0 4px 20px rgba(248,113,113,.15) }
.rate-btn.mid  { border-color: rgba(251,191,36,.3);  color: var(--amber) }
.rate-btn.mid:hover  { background: rgba(251,191,36,.08);  box-shadow: 0 4px 20px rgba(251,191,36,.15) }
.rate-btn.good { border-color: rgba(52,211,153,.3);  color: var(--green) }
.rate-btn.good:hover { background: rgba(52,211,153,.08);  box-shadow: 0 4px 20px rgba(52,211,153,.15) }

/* ── Write Mode ── */
.write-container { animation: fade-in .3s var(--ease) }
@keyframes fade-in { from { opacity: 0; transform: translateY(8px) } }

.write-q {
  padding: 1.5rem; margin-bottom: 14px;
}
.write-q p { font-size: 16px; font-weight: 600; color: var(--text); line-height: 1.6 }

.write-input {
  width: 100%; padding: 14px 16px; border-radius: var(--r-sm);
  border: 1px solid var(--border); background: var(--bg3);
  color: var(--text); font-size: 14px; resize: vertical;
  line-height: 1.6; display: block; margin-bottom: 12px;
  transition: all .25s var(--ease);
}
.write-input:focus {
  outline: none; border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(124,110,250,.12);
}

.reveal-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 22px; border-radius: var(--r-sm);
  background: linear-gradient(135deg, var(--accent), #6D5FE7);
  color: #fff; font-size: 13px; font-weight: 500;
  transition: all .25s var(--ease);
  box-shadow: 0 2px 12px rgba(124,110,250,.25);
}
.reveal-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(124,110,250,.4) }

.answer-reveal {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 1rem 1.25rem; border-radius: var(--r-sm);
  background: linear-gradient(135deg, rgba(124,110,250,.08), rgba(167,139,250,.03));
  border: 1px solid var(--border2); margin-bottom: 12px;
}
.answer-icon { color: var(--accent2); flex-shrink: 0; margin-top: 2px }
.answer-reveal p { font-size: 14px; color: var(--accent2); line-height: 1.7 }

/* ── Dots ── */
.dots {
  display: flex; gap: 5px; justify-content: center;
  flex-wrap: wrap; margin-top: 24px;
}
.dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--bg5); border: 1px solid var(--border);
  cursor: pointer; transition: all .25s var(--ease);
}
.dot:hover { border-color: var(--accent) }
.dot.seen { background: var(--border2) }
.dot.mastered { background: var(--green); border-color: var(--green) }
.dot.active {
  background: var(--accent); border-color: var(--accent);
  transform: scale(1.4);
  box-shadow: 0 0 8px rgba(124,110,250,.5);
}

/* ── Transitions ── */
.slide-up-enter-active { animation: slide-up-in .3s var(--ease) }
.slide-up-leave-active { animation: slide-up-out .2s var(--ease) }
@keyframes slide-up-in  { from { opacity: 0; transform: translateY(12px) } }
@keyframes slide-up-out { to   { opacity: 0; transform: translateY(-8px) } }
</style>

<template>
  <div>
    <div class="sec-head">
      <Target :size="18" :stroke-width="1.7" />
      <h2 class="sec-title">Quiz de Evaluación</h2>
      <span class="sec-count">15 preguntas aleatorias</span>
    </div>

    <!-- ═══ Score Screen ═══ -->
    <div v-if="done" class="score-card card-glass">
      <div class="score-ring" :style="`--p:${pct}`">
        <div class="score-inner">
          <span class="mono score-num">{{ score }}</span>
          <span class="score-of">/{{ pool.length }}</span>
        </div>
      </div>
      <div class="score-grade gradient-text">{{ grade }}</div>
      <p class="score-msg">{{ msg }}</p>
      <div class="score-stats">
        <div class="ss ok"><span class="mono ss-n">{{ score }}</span><span class="ss-l">Correctas</span></div>
        <div class="ss bad"><span class="mono ss-n">{{ pool.length - score }}</span><span class="ss-l">Incorrectas</span></div>
        <div class="ss accent"><span class="mono ss-n">{{ pct }}%</span><span class="ss-l">Puntuación</span></div>
      </div>
      <div class="score-actions">
        <button class="btn-primary" @click="start"><RotateCcw :size="15" :stroke-width="1.8" /> Repetir Quiz</button>
        <button class="btn-ghost" @click="$emit('navigate','mods')"><BookOpen :size="15" :stroke-width="1.8" /> Módulos</button>
        <button class="btn-ghost" @click="$emit('navigate','cheat')"><Zap :size="15" :stroke-width="1.8" /> Cheatsheet</button>
      </div>
    </div>

    <!-- ═══ Question ═══ -->
    <div v-else-if="currentQ">
      <div class="quiz-prog">
        <div class="quiz-prog-track">
          <div class="quiz-prog-fill" :style="{ width: (idx / pool.length * 100) + '%' }" />
        </div>
        <div class="quiz-meta">
          <span>Pregunta {{ idx + 1 }} de {{ pool.length }}</span>
          <span class="mono accent-text">{{ score }} correctas</span>
        </div>
      </div>

      <div class="quiz-q card-glass">
        <div class="q-tag">{{ currentQ.mod }}</div>
        <p class="q-text">{{ currentQ.q }}</p>
      </div>

      <div class="opts">
        <button
          v-for="(opt, i) in currentQ.opts" :key="i"
          class="opt"
          :class="{
            correct: answered && i === currentQ.correct,
            wrong: answered && chosen === i && i !== currentQ.correct,
            disabled: answered
          }"
          @click="answer(i)"
        >
          <span class="opt-letter">{{ letters[i] }}</span>
          <span class="opt-text">{{ opt }}</span>
          <CheckCircle2 v-if="answered && i === currentQ.correct" :size="16" :stroke-width="1.8" class="opt-icon ok-icon" />
          <XCircle v-if="answered && chosen === i && i !== currentQ.correct" :size="16" :stroke-width="1.8" class="opt-icon bad-icon" />
        </button>
      </div>

      <Transition name="slide-up">
        <div v-if="answered" class="feedback" :class="chosen === currentQ.correct ? 'ok' : 'bad'">
          <CheckCircle2 v-if="chosen === currentQ.correct" :size="16" :stroke-width="1.6" />
          <AlertCircle v-else :size="16" :stroke-width="1.6" />
          <span v-if="chosen === currentQ.correct">Correcto</span>
          <span v-else>Respuesta: {{ currentQ.opts[currentQ.correct] }}</span>
        </div>
      </Transition>

      <Transition name="slide-up">
        <button v-if="answered" class="btn-primary next-btn" @click="nextQ">
          {{ idx < pool.length - 1 ? 'Siguiente' : 'Ver resultado' }}
          <ArrowRight :size="15" :stroke-width="1.8" />
        </button>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { MODS } from '../data/content.js'
import { useStudyStore } from '../stores/study.js'
import {
  Target, RotateCcw, BookOpen, Zap, ArrowRight,
  CheckCircle2, XCircle, AlertCircle
} from 'lucide-vue-next'

defineEmits(['navigate'])
const store = useStudyStore()

const pool = ref([])
const idx = ref(0)
const score = ref(0)
const chosen = ref(null)
const answered = ref(false)
const done = ref(false)
const letters = ['A', 'B', 'C', 'D']

const currentQ = computed(() => pool.value[idx.value] ?? null)
const pct = computed(() => pool.value.length ? Math.round(score.value / pool.value.length * 100) : 0)
const grade = computed(() => {
  if (pct.value >= 90) return 'Excepcional'
  if (pct.value >= 75) return 'Muy Bien'
  if (pct.value >= 60) return 'Buen Progreso'
  return 'A Estudiar'
})
const msg = computed(() => {
  if (pct.value >= 90) return 'Dominas MLOps a nivel profesional. Listo para producción.'
  if (pct.value >= 75) return 'Sólido conocimiento. Repasa los módulos con más fallas.'
  if (pct.value >= 60) return 'Buen avance. Sigue repasando las tarjetas difíciles.'
  return 'Usa las tarjetas y los resúmenes para reforzar los conceptos base.'
})

function buildPool() {
  const allCards = MODS.flatMap(m => m.cards.map(c => ({ ...c, mod: m.name })))
  const allAnswers = allCards.map(c => c.a)
  return allCards.map(c => {
    const wrong = allAnswers.filter(a => a !== c.a).sort(() => Math.random() - .5).slice(0, 3)
    const opts = [c.a, ...wrong].sort(() => Math.random() - .5)
    return { q: c.q, opts, correct: opts.indexOf(c.a), mod: c.mod }
  }).sort(() => Math.random() - .5).slice(0, 15)
}

function start() {
  pool.value = buildPool()
  idx.value = 0; score.value = 0; chosen.value = null; answered.value = false; done.value = false
}

function answer(i) {
  if (answered.value) return
  chosen.value = i; answered.value = true
  if (i === currentQ.value.correct) { score.value++; store.streak++ }
  else if (store.streak > 0) store.streak--
}

function nextQ() {
  if (idx.value < pool.value.length - 1) {
    idx.value++; chosen.value = null; answered.value = false
  } else {
    done.value = true
  }
}

onMounted(start)
</script>

<style scoped>
.sec-head {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 20px; color: var(--text2);
}
.sec-title { font-size: 16px; font-weight: 600; color: var(--text); margin: 0 }
.sec-count { margin-left: auto; font-size: 12px; color: var(--text3) }
.accent-text { color: var(--accent2) }

/* ── Progress ── */
.quiz-prog { margin-bottom: 20px }
.quiz-prog-track { height: 4px; border-radius: 99px; background: var(--bg5); overflow: hidden; margin-bottom: 6px }
.quiz-prog-fill {
  height: 100%; border-radius: 99px;
  background: linear-gradient(90deg, var(--accent), var(--teal));
  transition: width .5s var(--ease);
}
.quiz-meta { display: flex; justify-content: space-between; font-size: 12px; color: var(--text3) }

/* ── Question ── */
.quiz-q { padding: 22px; margin-bottom: 18px }
.q-tag {
  display: inline-block; padding: 3px 12px; border-radius: 99px;
  font-size: 11px; font-weight: 600; margin-bottom: 12px;
  background: rgba(124,110,250,.1); color: var(--accent2);
}
.q-text { font-size: 16px; font-weight: 600; color: var(--text); line-height: 1.6 }

/* ── Options ── */
.opts { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px }
.opt {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 14px 16px; border-radius: var(--r-sm);
  background: var(--card); border: 1px solid var(--border);
  color: var(--text); font-size: 14px; text-align: left;
  line-height: 1.5; transition: all .25s var(--ease);
  backdrop-filter: blur(20px); position: relative;
}
.opt:hover:not(.disabled) {
  border-color: var(--accent);
  background: rgba(124,110,250,.04);
  transform: translateX(4px);
}
.opt.correct { border-color: var(--green) !important; background: rgba(52,211,153,.06) !important }
.opt.wrong   { border-color: var(--red)   !important; background: rgba(248,113,113,.06) !important }
.opt.disabled { cursor: not-allowed }

.opt-letter {
  width: 24px; height: 24px; border-radius: var(--r-xs);
  background: var(--bg5); color: var(--text3);
  font-size: 11px; font-weight: 700;
  display: grid; place-items: center; flex-shrink: 0;
  transition: all .25s var(--ease);
}
.opt.correct .opt-letter { background: var(--green); color: #fff }
.opt.wrong   .opt-letter { background: var(--red);   color: #fff }
.opt-text { flex: 1 }
.opt-icon { flex-shrink: 0; margin-top: 2px }
.ok-icon  { color: var(--green) }
.bad-icon { color: var(--red) }

/* ── Feedback ── */
.feedback {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 16px; border-radius: var(--r-sm);
  font-size: 13px; font-weight: 500; line-height: 1.5;
  margin-bottom: 14px;
}
.feedback.ok { background: rgba(52,211,153,.08); border: 1px solid rgba(52,211,153,.2); color: var(--green) }
.feedback.bad { background: rgba(248,113,113,.08); border: 1px solid rgba(248,113,113,.2); color: var(--red) }

/* ── Buttons ── */
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 24px; border-radius: var(--r-sm);
  background: linear-gradient(135deg, var(--accent), #6D5FE7);
  color: #fff; font-size: 14px; font-weight: 600;
  transition: all .25s var(--ease);
  box-shadow: 0 2px 12px rgba(124,110,250,.25);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(124,110,250,.4) }
.next-btn { margin-top: 4px }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 11px 20px; border-radius: var(--r-sm);
  background: var(--card); border: 1px solid var(--border);
  color: var(--text2); font-size: 14px; font-weight: 500;
  transition: all .25s var(--ease);
}
.btn-ghost:hover { border-color: var(--accent); color: var(--text) }

/* ── Score Card ── */
.score-card {
  text-align: center; padding: 3rem 2rem;
  animation: scale-in .4s var(--ease-spring);
}
@keyframes scale-in { from { opacity: 0; transform: scale(.95) } }

.score-ring {
  width: 130px; height: 130px; border-radius: 50%;
  margin: 0 auto 22px; position: relative;
  background: conic-gradient(var(--accent) calc(var(--p) * 1%), var(--bg5) 0);
}
.score-ring::before {
  content: ''; position: absolute; inset: 10px;
  border-radius: 50%; background: var(--card-solid);
}
.score-inner {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; z-index: 1;
}
.score-num { font-size: 34px; font-weight: 700; color: var(--text); line-height: 1 }
.score-of  { font-size: 13px; color: var(--text3) }

.score-grade { font-size: 22px; font-weight: 700; margin-bottom: 6px }
.score-msg   { font-size: 14px; color: var(--text2); margin-bottom: 28px; max-width: 400px; margin-inline: auto }

.score-stats {
  display: flex; gap: 14px; justify-content: center;
  margin-bottom: 28px; flex-wrap: wrap;
}
.ss {
  padding: 14px 20px; border-radius: var(--r-sm);
  background: var(--bg3); border: 1px solid var(--border);
  min-width: 90px;
}
.ss-n { font-size: 22px; font-weight: 700; display: block; line-height: 1 }
.ss.ok .ss-n     { color: var(--green) }
.ss.bad .ss-n    { color: var(--red) }
.ss.accent .ss-n { color: var(--accent2) }
.ss-l { font-size: 11px; color: var(--text3); margin-top: 3px }

.score-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap }

/* ── Transitions ── */
.slide-up-enter-active { animation: s-in .3s var(--ease) }
.slide-up-leave-active { animation: s-out .2s var(--ease) }
@keyframes s-in  { from { opacity: 0; transform: translateY(10px) } }
@keyframes s-out { to   { opacity: 0; transform: translateY(-6px) } }
</style>

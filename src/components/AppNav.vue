<template>
  <nav class="nav card-glass">
    <button
      v-for="item in items" :key="item.id"
      class="nav-item"
      :class="{ active: active === item.id }"
      @click="$emit('navigate', item.id)"
    >
      <component :is="item.icon" :size="16" :stroke-width="1.7" />
      <span class="nav-label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup>
import { BookOpen, FileText, BrainCircuit, Zap, Target } from 'lucide-vue-next'
import { markRaw } from 'vue'

defineProps({ active: String })
defineEmits(['navigate'])

const items = [
  { id: 'mods',  icon: markRaw(BookOpen),     label: 'Módulos'    },
  { id: 'sum',   icon: markRaw(FileText),     label: 'Resúmenes'  },
  { id: 'mm',    icon: markRaw(BrainCircuit), label: 'Mapa Mental' },
  { id: 'cheat', icon: markRaw(Zap),          label: 'Cheatsheet' },
  { id: 'quiz',  icon: markRaw(Target),       label: 'Quiz'        },
]
</script>

<style scoped>
.nav {
  display: flex; gap: 4px;
  padding: 5px; margin-bottom: 28px;
}

.nav-item {
  flex: 1; padding: 10px 8px;
  border-radius: var(--r-sm);
  display: flex; align-items: center; justify-content: center;
  gap: 7px;
  font-size: 13px; font-weight: 500;
  color: var(--text3);
  transition: all .25s var(--ease);
  position: relative;
  white-space: nowrap;
}
.nav-item:hover { color: var(--text2); background: var(--bg4) }

.nav-item.active {
  color: #fff;
  background: linear-gradient(135deg, var(--accent), #6D5FE7);
  box-shadow:
    0 4px 14px rgba(124,110,250,.35),
    inset 0 1px 0 rgba(255,255,255,.12);
}

.nav-label { line-height: 1 }

@media(max-width: 540px) {
  .nav-label { display: none }
  .nav-item { padding: 10px }
}
</style>

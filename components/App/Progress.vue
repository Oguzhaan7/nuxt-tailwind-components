<script setup lang="ts">
const props = defineProps({
  progress: Number,
});

const progressColor = computed(() =>
  props.progress < 60 ? "stroke-rose-500 text-rose-500" : "stroke-emerald-500 text-emerald-500"
);
</script>
<template>
  <div class="relative w-12 h-12">
    <svg class="absolute top-0 left-0 bg-slate-700 rounded-full bg-opacity-70 w-full h-full" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="15.915" fill="none" class="stroke-white" stroke-width="3" />
    </svg>

    <svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
      <circle
        cx="18"
        cy="18"
        r="15.915"
        fill="none"
        :class="progressColor"
        stroke-width="3"
        stroke-dasharray="100"
        :stroke-dashoffset="100 - progress"
        stroke-linecap="round"
        transform="rotate(-90 18 18)"
      />
    </svg>

    <div class="absolute inset-0 flex items-center justify-center">
      <span class="text-lg font-bold" :class="progressColor">{{ progress }}</span>
    </div>
  </div>
</template>

<style scoped>
circle {
  transition: stroke-dashoffset 0.5s ease, stroke 0.5s ease;
}
</style>

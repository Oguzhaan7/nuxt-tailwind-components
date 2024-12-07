<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  theme?: "primary" | "success" | "danger" | "warning" | "surface" | "gray";
  variant?: "filled" | "outline";
  icon?: string;
  isLoad?: boolean;
  onClick?: () => void;
}>();

const primaryFilledClasses =
  "bg-indigo-500 border border-indigo-500 shadow-sm text-white hover:bg-indigo-600";
const primaryOutlineClasses =
  "border-2 border-indigo-500 text-indigo-500 hover:border-indigo-600 dark:border-indigo-400 dark:text-indigo-400 dark:hover:border-indigo-500 outline-none";

const successFilledClasses =
  "bg-emerald-500 border border-emerald-500 text-white hover:bg-emerald-600 ";
const successOutlineClasses =
  "border-2 border-emerald-500 text-emerald-500 hover:border-emerald-600 dark:border-emerald-400 dark:text-emerald-400 dark:hover:border-emerald-500 outline-none";

const dangerFilledClasses =
  "bg-rose-500 border border-rose-500 text-white hover:bg-rose-600 ";
const dangerOutlineClasses =
  "border-2 border-rose-500 text-rose-500 hover:border-rose-600 dark:border-rose-400 dark:text-rose-400 dark:hover:border-rose-500 outline-none";

const warningFilledClasses =
  "bg-amber-500 border border-amber-500 text-white hover:bg-amber-600 ";
const warningOutlineClasses =
  "border-2 border-amber-500 text-amber-500 hover:border-amber-600 dark:border-amber-400 dark:text-amber-400 dark:hover:border-amber-500 outline-none";

const surfaceFilledClasses =
  "bg-zinc-500 border border-zinc-500 text-white hover:bg-zinc-600 ";
const surfaceOutlineClasses =
  "border-2 border-zinc-500 text-zinc-500 hover:border-zinc-600 dark:border-zinc-400 dark:text-zinc-400 dark:hover:border-zinc-500 outline-none";

const grayFilledClasses =
  "bg-slate-400 border border-slate-400  text-white hover:bg-slate-500";
const grayOutlineClasses =
  "border-2 border-slate-400 text-slate-500 hover:border-slate-500 dark:border-slate-300 dark:text-slate-300 dark:hover:border-slate-400 outline-none";

const getFilledClasses = (theme: string) => {
  switch (theme) {
    case "success":
      return successFilledClasses;
    case "danger":
      return dangerFilledClasses;
    case "warning":
      return warningFilledClasses;
    case "surface":
      return surfaceFilledClasses;
    case "gray":
      return grayFilledClasses;
    default:
      return primaryFilledClasses;
  }
};

const getOutlineClasses = (theme: string) => {
  switch (theme) {
    case "success":
      return successOutlineClasses;
    case "danger":
      return dangerOutlineClasses;
    case "warning":
      return warningOutlineClasses;
    case "surface":
      return surfaceOutlineClasses;
    case "gray":
      return grayOutlineClasses;
    default:
      return primaryOutlineClasses;
  }
};
</script>
<template>
  <button
    :disabled="isLoad"
    :class="[
      {
        'py-[0.25rem]': variant === 'outline',
        'py-[0.30rem]': variant !== 'outline',
      },
      'btn-with-effect group min-h-10 inline-flex items-center justify-center gap-2 px-4 rounded-md text-sm transition-all duration-200 ease-in-out transform focus:outline-none ',
      variant === 'outline'
        ? getOutlineClasses(theme)
        : getFilledClasses(theme),
    ]"
    @click="onClick"
  >
    <i
      v-if="icon || isLoad"
      :class="[
        { 'animate-spin': isLoad, 'animate-none': !isLoad },
        'material-symbols-outlined text-2xl',
      ]"
      >{{ isLoad ? "filter_tilt_shift" : icon }}</i
    >
    <span
      v-if="!isLoad"
      class="group-hover:translate-x-0.5 transition-all duration-200 ease-in-out"
      ><slot />
    </span>
  </button>
</template>

<style scoped>
.btn-with-effect:focus span {
  animation: slide-down-up 0.2s ease-in-out;
}

@keyframes slide-down-up {
  0% {
    transform: translate(2px, 0);
  }
  50% {
    transform: translate(2px, 2px);
  }
  100% {
    transform: translate(2px, 0);
  }
}
</style>

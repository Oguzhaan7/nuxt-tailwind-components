<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface Option {
  label: string;
  value: string | number;
}

const props = defineProps<{
  options: Option[];
  modelValue: string | number;
}>();

const emit = defineEmits(["update:modelValue"]);

const selectOption = (option: Option) => {
  emit("update:modelValue", option.value);
};
</script>
<template>
  <div
    class="inline-flex border border-indigo-200 dark:border-indigo-400 divide-x divide-indigo-200 dark:divide-indigo-400 rounded-md text-sm"
  >
    <button
      v-for="(item, index) in options"
      :key="index"
      @click="selectOption(item)"
      :class="[
        'px-4 py-2 first:rounded-l-md last:rounded-r-md transition-all duration-200 ease-in-out',
        item.value === modelValue
          ? 'bg-indigo-100 text-indigo-500 dark:bg-indigo-300/50 dark:text-indigo-100'
          : 'bg-transparent text-slate-500 dark:text-slate-300',
      ]"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style scoped></style>

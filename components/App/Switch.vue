<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  modelValue: boolean;
  labelOn?: string;
  labelOff?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const inputId = ref(`switch-${Math.random().toString(36).substr(2, 9)}`);

const toggleSwitch = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <div class="flex items-center space-x-3 my-2">
    <label
      v-if="labelOff"
      for="inputId"
      class="text-sm text-slate-500 dark:text-slate-300 cursor-pointer"
      @click="toggleSwitch"
    >
      {{ labelOff }}
    </label>

    <button
      @click="toggleSwitch"
      type="button"
      @submit.prevent
      :id="inputId"
      :class="[
        'relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 focus:outline-none',
        props.modelValue ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600',
      ]"
    >
      <span
        :class="[
          'transform transition-transform duration-200 bg-white dark:bg-slate-700 inline-block w-5 h-5 rounded-full',
          props.modelValue ? 'translate-x-5' : 'translate-x-1',
        ]"
      ></span>
    </button>

    <label
      v-if="labelOn"
      for="inputId"
      class="text-sm text-slate-500 dark:text-slate-300 cursor-pointer"
      @click="toggleSwitch"
    >
      {{ labelOn }}
    </label>
  </div>
</template>

<style scoped>
button {
  padding: 0;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>

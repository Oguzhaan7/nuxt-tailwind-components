<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  modelValue: boolean;
  label?: string;
  small?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const checkboxId = ref(`checkbox-${Math.random().toString(36).substr(2, 9)}`);

const toggleCheckbox = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <div class="flex items-center space-x-3 my-1">
    <input
      type="checkbox"
      :id="checkboxId"
      :checked="modelValue"
      @change="toggleCheckbox"
      class="hidden peer"
    />
    <label
      :for="checkboxId"
      :class="{ 'text-xs': small, 'text-sm': !small }"
      class="relative flex items-center cursor-pointer text-slate-500 dark:text-slate-300"
    >
      <span
        :class="{ 'w-4 h-4 ': small, 'w-6 h-6 ': !small }"
        class="rounded-md border-2 mr-2 border-slate-300 dark:border-slate-600 transition-colors duration-200 peer-checked:bg-indigo-500 peer-checked:border-indigo-500 flex items-center justify-center"
      >
        <svg
          v-if="modelValue"
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 text-white transition-opacity duration-200"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
input[type="checkbox"].peer:checked + label > span {
  background-color: #6366f1;
  border-color: #6366f1;
}
input[type="checkbox"].peer:not(:checked) + label > span {
  background-color: transparent;
  border-color: #cbd5e0;
}
</style>

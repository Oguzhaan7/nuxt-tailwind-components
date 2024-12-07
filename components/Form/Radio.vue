<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  modelValue: string | number;
  label: string;
  value: string | number;
  name: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const radioId = ref(`radio-${Math.random().toString(36).substr(2, 9)}`);

const onChange = () => {
  emit("update:modelValue", props.value);
};
</script>

<template>
  <div class="flex gap-4 items-center space-x-3 my-1">
    <input
      type="radio"
      :id="radioId"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      @change="onChange"
      class="hidden peer"
    />
    <label
      :for="radioId"
      class="relative flex items-center cursor-pointer text-sm text-slate-500 dark:text-slate-300"
    >
      <span
        class="w-4 h-4 rounded-full mr-2 border-2 border-slate-300 dark:border-slate-600 transition-colors ease-in-out duration-200 peer-checked:bg-indigo-500 peer-checked:border-indigo-500 flex items-center justify-center"
      >
        <span
          class="w-2 h-2 bg-white dark:bg-[#2b333b] rounded-full transition-opacity ease-in-out duration-200"
          v-if="modelValue === value"
        ></span>
      </span>
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
input[type="radio"].peer:checked + label > span {
  background-color: #6366f1;
  border-color: #6366f1;
}
input[type="radio"].peer:not(:checked) + label > span {
  background-color: transparent;
  border-color: #a5a5a5;
}
</style>

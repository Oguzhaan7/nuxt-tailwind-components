<script setup lang="ts">
import * as yup from "yup";
const props = defineProps<{
  modelValue: any;
  label: string;
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", modelValue: any): void;
}>();

const baseStore = useBaseStore();
const { handleValidationError } = useValidation();

const errorMessage = ref("");

let schema = yup.date().nullable();

if (props.required) {
  schema = schema.required(`${props.label} alanı zorunludur`);
}

if (props.minDate) {
  schema = schema.min(props.minDate, `${props.label}, ${props.minDate.toLocaleDateString()} değerinden büyük olmalı`);
}

if (props.maxDate) {
  schema = schema.max(props.maxDate, `${props.label}, ${props.maxDate.toLocaleDateString()} değerinden küçük olmalı`);
}

const handleFormValidation = async () => {
  try {
    await schema.validate(props.modelValue);
    errorMessage.value = "";
    handleValidationError(props.label, null);
  } catch (err: any) {
    errorMessage.value = err.message;
    handleValidationError(props.label, err.message);
  }
};

onMounted(async () => {
  if (props.required) {
    try {
      await schema.validate(props.modelValue);
      handleValidationError(props.label, null);
    } catch (err: any) {
      handleValidationError(props.label, err.message);
    }
  }
});

watchEffect(async () => {
  if (baseStore.isSubmit && props.required) {
    handleFormValidation();
  }
});

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
  if (props.required) handleFormValidation();
};

const onBlur = () => {
  if (props.required) handleFormValidation();
};
</script>

<template>
  <div class="relative my-1">
    <transition name="slide-fade">
      <span
        v-if="errorMessage"
        class="text-red-500 dark:text-red-400 text-[.65rem] ml-4 mt-0.5 z-40 bg-white absolute"
        >{{ errorMessage }}</span
      >
    </transition>
    <input
      type="date"
      :id="inputId"
      :value="modelValue"
      @input="onInput"
      @blur="onBlur"
      :class="[
        {
          'border-rose-500 dark:border-rose-400': errorMessage,
          'border-slate-300 dark:border-slate-600': !errorMessage,
        },
      ]"
      class="border bg-white0 dark:bg-slate-700 text-sm border-slate-300 dark:border-slate-600 dark:text-slate-400 rounded-md pt-4 pb-2 pl-11 pr-4 w-full focus:border-indigo-500 focus:outline-indigo-500 focus:outline-opacity-70"
      placeholder=" "
    />
    <label
      :for="inputId"
      class="absolute text-sm left-9 top-[.15rem] cursor-text transition-all translate-x-2 transform origin-top-left -translate-y-0 scale-75 text-slate-500 dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-0 peer-focus:text-indigo-500"
    >
      {{ label }}
    </label>
    <span class="absolute left-3 top-[.9rem] text-slate-500 dark:text-slate-400">
      <i class="material-symbols-rounded text-[1.4rem] text-xl">calendar_today</i>
    </span>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 1rem;
  color: transparent;
  background: none;
  z-index: 10;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { useBaseStore } from "../../stores/baseStore";

const props = defineProps<{
  modelValue: any;
  label: string;
  icon?: string;
  type: string;
  required?: boolean;
  maxLenght?: number;
  minLenght?: number;
  validations?: any;
  numberPattern?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", modelValue: any): void;
}>();

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`);
const errorMessage = ref("");
const isFocused = ref(false);

const baseStore = useBaseStore();
const { handleValidationError } = useValidation();

const customSchema = createSchema(props.label, props.type, props.maxLenght, props.minLenght, props.validations);

const requiredInput = async (value: string) => {
  if (!props.required) {
    return;
  }
  try {
    await customSchema.validate(props.modelValue);
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
      await customSchema.validate(props.modelValue);
      handleValidationError(props.label, null);
    } catch (err: any) {
      handleValidationError(props.label, err.message);
    }
  }
});

watchEffect(async () => {
  if (baseStore.isSubmit) {
    requiredInput(props.modelValue);
  }
});

const onInput = (event: Event) => {
  let target = event.target as HTMLInputElement;
  if (props.numberPattern) {
    target.value = target.value.replace(/[^0-9]/g, "");
  }
  emit("update:modelValue", target.value);
  requiredInput(target.value);
};

const onFocus = () => {
  isFocused.value = true;
};

const onBlur = () => {
  requiredInput(props.modelValue);
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
      :type="type"
      :id="inputId"
      :value="modelValue"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      :class="[
        {
          'border-rose-500 dark:border-rose-400': errorMessage,
          'border-slate-300 dark:border-slate-600': !errorMessage,
          'pl-8': !icon,
          'pl-11 ': icon,
        },
      ]"
      class="flex w-full peer border bg-white dark:bg-slate-700 text-sm dark:text-slate-300 rounded-md pt-4 pb-2 pr-4 focus:border-light-primary focus:ring-light-primary focus:ring-1 focus:ring-opacity-70 outline-none"
      placeholder=" "
    />
    <label
      :for="inputId"
      :class="{ 'left-6': !icon, 'left-9': icon }"
      class="absolute text-sm top-[.15rem] cursor-text transition-all translate-x-2 transform origin-top-left -translate-y-0 scale-75 text-slate-400 dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-0 peer-focus:text-primary peer-focus:font-light"
    >
      {{ label }}
    </label>
    <span class="absolute left-4 top-[.9rem] text-slate-500 dark:text-slate-400">
      <i class="material-symbols-rounded text-xl">{{ icon }}</i>
    </span>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

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

input[type="number"] {
  -moz-appearance: textfield;
}
</style>

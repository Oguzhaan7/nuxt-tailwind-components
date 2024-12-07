<script setup lang="ts">
import * as yup from "yup";
import { useBaseStore } from "../../stores/baseStore";

const props = defineProps({
  options: Array,
  label: String,
  icon: String,
  modelValue: Number,
  required: Boolean,
  tabIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", modelValue: any): void;
}>();

const baseStore = useBaseStore();
const { handleValidationError } = useValidation();

const selectedIndex = ref(-1);
const selectedLabel = ref(null);
const isOpen = ref(false);
const isFocused = ref(false);
const errorMessage = ref("");
const optionRefs = ref([]);
const searchTerm = ref("");
let typingTimeout = null;

const schema = yup.object({
  value: yup.string().required(`${props.label} alanı zorunludur`),
});

const requiredInput = async (value: any) => {
  if (props.required) {
    try {
      await schema.validate({ value });
      errorMessage.value = "";
      handleValidationError(props.label, null);
    } catch (err: any) {
      errorMessage.value = err.message;
      handleValidationError(props.label, err.message);
    }
  }
};

const openDropdown = () => {
  isFocused.value = true;
  toggleDropdown();
};

const toggleDropdown = (event) => {
  if (isFocused.value) {
    scrollToSelected();
    if (!isOpen.value) {
      isOpen.value = true;
    }
  } else {
    if (isOpen.value) {
      isOpen.value = false;
    }
  }
};

const closeDropdown = () => {
  isFocused.value = false;
  toggleDropdown();
  requiredInput(selectedLabel.value);
};
const selectOption = (option) => {
  selectedLabel.value = option.name;
  selectedIndex.value = props.options.indexOf(option);
  emit("update:modelValue", option.id);
  closeDropdown();
};

const onKeyDown = (e) => {
  if (isFocused.value) {
    if (e.key === "ArrowDown") {
      if (selectedIndex.value < props.options.length - 1 && isOpen.value) {
        selectedIndex.value++;
        scrollToSelected();
      }
    } else if (e.key === "ArrowUp") {
      if (selectedIndex.value > 0 && isOpen.value) {
        selectedIndex.value--;
        scrollToSelected();
      }
    } else if (e.key === "Enter" && selectedIndex.value >= 0) {
      selectOption(props.options[selectedIndex.value]);
    } else if (e.key.length === 1) {
      searchTerm.value += e.key;
      matchAndSelectOption();

      if (typingTimeout) clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        searchTerm.value = "";
        typingTimeout = null;
      }, 400);
    }
  }
};

const matchAndSelectOption = () => {
  const match = props.options.find((option) => option.name.toLowerCase().startsWith(searchTerm.value.toLowerCase()));
  if (match) {
    const index = props.options.indexOf(match);
    selectedIndex.value = index;
    scrollToSelected();
  }
};

const scrollToSelected = () => {
  const selectedOption = optionRefs.value[selectedIndex.value];
  if (selectedOption) {
    selectedOption.scrollIntoView({ behavior: "smooth", block: "nearest" });

    selectedOption.style.scrollBehavior = "auto";
    setTimeout(() => {
      selectedOption.style.scrollBehavior = "smooth";
    }, 100);
  }
};

const handleClickOutside = (e) => {
  if (isOpen.value && !e.target.closest(".relative")) {
    closeDropdown();
  }
};

const handleOptionClick = (option) => {
  selectOption(option);
  closeDropdown();
};

onMounted(async () => {
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("click", handleClickOutside);

  const initialValue = props.options.find((option) => option.id === props.modelValue);

  if (initialValue) {
    selectedLabel.value = initialValue.name;
    selectedIndex.value = props.options.indexOf(initialValue);
  }

  if (props.required) {
    try {
      await schema.validate({});
      handleValidationError(props.label, null);
    } catch (err: any) {
      handleValidationError(props.label, err.message);
    }
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeyDown);
  document.removeEventListener("click", handleClickOutside);
});

watchEffect(async () => {
  if (baseStore.isSubmit && props.required) {
    requiredInput(selectedLabel.value);
  }
});
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
    <div
      :tabindex="tabIndex"
      @focus="openDropdown"
      @click="toggleDropdown"
      @focusout="closeDropdown"
      :class="[
        {
          'border-rose-500 dark:border-rose-400': errorMessage,
          'border-slate-300 dark:border-slate-600': !errorMessage,
        },
      ]"
      class="relative border bg-white dark:bg-slate-700 text-sm dark:text-slate-300 rounded-md pt-2 pb-2 pl-4 pr-4 w-full cursor-pointer focus:border-light-primary focus:ring-light-primary focus:ring-1 focus:ring-opacity-70 outline-none"
    >
      <span
        :class="{ 'w-0': !icon }"
        class="material-symbols-outlined text-xl relative top-1 w-4 h-6 text-slate-500 dark:text-slate-400"
        >{{ icon }}</span
      >
      <span
        :class="[
          {
            '-translate-y-2 translate-x-3 text-[.65rem] text-slate-500 dark:text-slate-400 font-light':
              selectedLabel !== null,
            'translate-y-2 translate-x-3 text-sm text-slate-400 dark:text-slate-400': selectedLabel === null,
          },
          'absolute transition-transform duration-150 ease-in-out ',
        ]"
        >{{ label }}</span
      >
      <span class="relative left-3" v-if="selectedLabel">{{ selectedLabel }}</span>
      <i class="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2"> expand_more </i>
    </div>
    <transition name="slide-fade">
      <div
        v-if="isOpen"
        class="absolute z-50 w-full bg-white dark:bg-slate-700 border border-slate-300 dark:text-slate-400 dark:border-slate-500 mt-2 rounded-md shadow-lg scroll-container"
      >
        <div
          v-for="(option, index) in options"
          :key="option.id"
          ref="optionRefs"
          @click="handleOptionClick(option)"
          :class="[
            'cursor-pointer px-4 py-2 text-sm transition-colors',
            {
              'bg-light-primary text-white rounded-md': index === selectedIndex,
              'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md hover:bg-light-primary hover:text-white':
                index !== selectedIndex,
            },
          ]"
        >
          {{ option.name }}
        </div>
      </div>
    </transition>
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

.scroll-container {
  max-height: 200px;
  overflow-y: auto;
}

.hover\:bg-light-primary:hover {
  background-color: #6366f1;
}

.hover\:text-white:hover {
  color: #ffffff;
}
</style>

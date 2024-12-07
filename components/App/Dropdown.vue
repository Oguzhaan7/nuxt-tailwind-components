<script setup lang="ts">
const props = defineProps<{
  options: Array<{ label: string; action: Function; icon?: string }>;
  id: any;
  icon?: string;
  columnId?: number;
  buttonName?: string;
  buttonIcon?: string;
  buttonVariant?: "filled" | "outline";
  buttonTheme?: "primary" | "success" | "danger" | "warning" | "surface" | "gray";
}>();

const emit = defineEmits<{
  (e: "update:isOpenExternal", value: boolean): void;
}>();

const left = ref(0);
const top = ref(0);

const isOpen = ref(false);

const openDropdown = (e: MouseEvent) => {
  if (!isOpen.value) {
    setTimeout(() => {
      isOpen.value = true;
      const buttonElement = e.target.closest(".button");
      if (buttonElement) {
        let rects = buttonElement.getBoundingClientRect();

        if (rects.right + 200 > window.innerWidth + window.scrollX) {
          left.value = rects.left - 178;
        } else {
          left.value = rects.right;
        }

        if (e.pageY + 140 > window.innerHeight + window.scrollY) {
          top.value = e.pageY - 100;
        } else {
          top.value = e.pageY;
        }
      }
    }, 50);
  } else {
    setTimeout(() => {
      isOpen.value = false;
    }, 100);
  }
};

onMounted(() => {
  document.addEventListener("click", calcutePosition);
});

const calcutePosition = (e: MouseEvent) => {
  if (e.target.id !== `button-${props.id}` && e.target.id !== `dropdown-${props.id}`) {
    isOpen.value = false;
  } else {
  }
};
</script>

<template>
  <div v-if="options.length > 1">
    <button
      v-if="icon"
      :id="'button-' + props.id"
      @click="openDropdown"
      class="button material-symbols-outlined text-xl"
    >
      {{ icon }}
    </button>
    <AppButton
      v-else
      class="button text-right"
      :theme="buttonTheme"
      :icon="buttonIcon"
      :variant="buttonVariant"
      :id="'button-' + props.id"
      @click="(e) => openDropdown(e)"
      ><span :id="'button-' + props.id">{{ buttonName }}</span></AppButton
    >
  </div>
  <div
    class="inline-flex items-center justify-end text-sm gap-1 py-1 px-4 cursor-pointer rounded-lg transition-all duration-300 border shadow-md shadow-white border-indigo-300 text-indigo-500 hover:shadow-indigo-200 dark:shadow-slate-700 dark:border-indigo-400 dark:text-indigo-400 dark:hover:shadow-indigo-500"
    v-if="options.length === 1"
    @click="
      () => {
        options[0].action(columnId);
        emit('update:isOpenExternal', false);
      }
    "
  >
    <span class="material-symbols-rounded text-[1rem]">{{ options[0].icon }}</span>
    <span>{{ options[0].label }}</span>
  </div>
  <transition name="dropdown">
    <div
      :id="'dropdown-' + props.id"
      v-if="isOpen && options.length > 1"
      :style="{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
      }"
      class="dropdown overflow-y-auto max-h-[170px] bg-white text-slate-500 border-slate-200 border text-sm shadow-md rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-slate-400 py-2 w-44 z-50"
    >
      <ul>
        <li
          v-for="(option, index) in props.options"
          :key="index"
          @click="
            () => {
              option.action(columnId);
              emit('update:isOpenExternal', false);
            }
          "
          class="flex items-center px-4 py-2 rounded-md hover:bg-indigo-500 hover:text-white cursor-pointer"
        >
          <i v-if="option.icon" class="material-symbols-rounded text-[1.2rem] mr-2">{{ option.icon }}</i>
          {{ option.label }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: top;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: scaleY(1);
}
</style>

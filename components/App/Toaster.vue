<script setup lang="ts">
const props = defineProps<{
  theme?: "primary" | "success" | "danger" | "warning";
  title: string;
  message: string;
  duration?: number;
}>();

const visible = ref(false);
const duration = props.duration || 3000;
const icon = ref<string>("primary");

const showToast = () => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, duration);
};

const themeClasses = ref("");

watch(
  () => props.theme,
  (newTheme) => {
    switch (newTheme) {
      case "success":
        themeClasses.value =
          "bg-emerald-200 border border-emerald-300 opacity-80 shadow-md text-emerald-600";
        icon.value = "check_circle";
        break;
      case "danger":
        themeClasses.value =
          "bg-rose-200 border border-rose-300 opacity-80 shadow-md text-rose-600";
        icon.value = "report";
        break;
      case "warning":
        themeClasses.value =
          "bg-amber-200 border border-amber-300 opacity-80 shadow-md text-amber-600";
        icon.value = "error";
        break;
      default:
        themeClasses.value =
          "bg-sky-200 border border-sky-300 opacity-80 shadow-md text-sky-600";
        icon.value = "info";
    }
  },
  { immediate: true }
);

onMounted(() => {
  showToast();
});
</script>

<template>
  <transition name="slide-fade">
    <div
      v-if="visible"
      :class="[
        ' flex items-center gap-4 px-6 py-3 rounded-md transition-all duration-300 ease-in-out',
        themeClasses,
      ]"
      role="alert"
    >
      <i :class="`material-symbols-outlined `">{{ icon }}</i>
      <div class="flex flex-col">
        {{ title }}
        <span class="text-sm">{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>

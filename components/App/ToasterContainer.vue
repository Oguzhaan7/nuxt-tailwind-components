<script lang="ts" setup>
import { ref } from "vue";
import Toaster from "./Toaster.vue";

const toasts = ref<any[]>([]);

const addToast = (toast: any) => {
  toasts.value.push(toast);
  setTimeout(() => {
    toasts.value.shift();
  }, toast.duration || 2000);
};

provide("addToast", addToast);
</script>

<template>
  <div class="fixed top-10 right-10 z-50 flex flex-col gap-12">
    <transition-group name="slide-fade" tag="div" class="space-y-4">
      <Toaster
        v-for="(toast, index) in toasts"
        :key="index"
        v-bind="toast"
        class="mb-4"
      />
    </transition-group>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>

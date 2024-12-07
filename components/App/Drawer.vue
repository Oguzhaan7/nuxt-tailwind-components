<script setup lang="ts">
const isOpen = ref(false);

function openDrawer() {
  isOpen.value = true;
}

function closeDrawer() {
  isOpen.value = false;
}

defineExpose({
  openDrawer,
  isOpen,
});
</script>
<template>
  <teleport to="body">
    <Transition name="fade">
      <div v-show="isOpen" class="fixed inset-0 z-50 overflow-hidden" @click.self="closeDrawer">
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="closeDrawer"></div>
        <Transition name="slide">
          <div
            v-show="isOpen"
            class="flex flex-col justify-center items-center fixed right-0 top-0 h-full bg-white dark:bg-[#21262c] shadow-lg"
            @click.stop
          >
            <div class="w-full flex justify-end px-8">
              <button class="material-symbols-outlined text-3xl h-6 p-0 mt-4 text-slate-500" @click="closeDrawer">
                close
              </button>
            </div>
            <div class="h-full overflow-y-auto">
              <slot></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 1;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>

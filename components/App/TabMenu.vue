<script setup>
const props = defineProps({
  tabs: Array,
});
const activeTab = ref(0);
</script>

<template>
  <div class="flex flex-col gap-2 px-4">
    <div class="relative">
      <div class="flex border-gray-200">
        <button
          v-for="(tab, i) in tabs"
          :key="i"
          @click="activeTab = i"
          class="py-2 px-2 text-xs sm:text-base sm:px-4 md:px-4 lg:px-8 xl:px-12 border-b-4 focus:outline-none transition-all duration-200 ease-in-out outline-none rounded-t-lg"
          :class="{
            'text-indigo-500 dark:text-indigo-400 border-indigo-500 dark:border-indigo-400 ': activeTab === i,
            'text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-300 ': activeTab !== i,
          }"
        >
          {{ tab }}
        </button>
      </div>
      <div class="absolute bottom-0 h-0.5 bg-indigo-500 transition-transform duration-300"></div>
    </div>
    <div class="mt-4 mb-4 overflow-hidden relative">
      <div class="flex transition-transform duration-300" :style="{ transform: `translateX(-${activeTab * 100}%)` }">
        <div v-for="(tab, i) in tabs" :key="i" class="w-full flex-shrink-0">
          <slot :name="'tab-' + i"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

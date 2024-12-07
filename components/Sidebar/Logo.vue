<script setup lang="ts">
const emits = defineEmits(["handleCollapse"]);
const props = defineProps({ collapseMenu: Boolean });
const collapseMenu = ref(false);
const handleOnClick = () => {
  collapseMenu.value = !collapseMenu.value;
  emits("handleCollapse", collapseMenu.value);
};

watchEffect(() => {
  collapseMenu.value = props.collapseMenu;
});
</script>

<template>
  <NuxtLink
    to="/"
    class="flex gap-2 text-dark-primary text-2xl items-center justify-center h-16 border-b border-slate-700/60 hover:opacity-80 transition-all ease-out"
  >
    <span class="material-symbols-outlined">pets</span>
    <span class="font-semibold">dogs</span>
  </NuxtLink>
  <button
    class="absolute lg:hidden top-3 left-52 text-gray-200 text-3xl material-symbols-outlined scale-x-[-1]"
    @click="handleOnClick()"
  >
    logout
  </button>
</template>

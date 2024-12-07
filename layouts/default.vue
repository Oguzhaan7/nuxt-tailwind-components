<script setup lang="ts">
const collapseMenu = ref(false);
const route = useRoute();
</script>

<template>
  <div
    class="min-h-screen bg-[#fbfbfb] dark:bg-[#21262c] text-light-text dark:text-dark-text"
  >
    <div
      class="grid grid-rows-[4rem_1fr] lg:grid-cols-[16rem_1fr] min-h-screen"
    >
      <aside
        :class="[
          {
            'visible translate-x-0': collapseMenu,
            'invisible -translate-x-full': !collapseMenu,
          },
          'bg-dark-background text-slate-400 border-slate-700/40 border-r w-64 h-[100vh]  overflow-y-auto overflow-x-hidden fixed lg:sticky top-0 transition-all duration-200 ease-in-out lg:row-span-3  lg:visible lg:translate-x-0  z-30',
        ]"
      >
        <SidebarLogo
          :collapseMenu="collapseMenu"
          @handleCollapse="(value) => (collapseMenu = value)"
        />

        <SidebarMenu />
      </aside>

      <header
        class="bg-white border-gray-200/70 border mx-6 z-20 rounded-b-md sticky top-0 lg:col-start-2 transition-all duration-200 ease-in-out dark:bg-[#2b333b] dark:border-gray-700"
      >
        <div class="flex justify-between items-center h-full px-6">
          <div class="flex gap-2 w-full">
            <button
              class="block lg:hidden material-symbols-outlined"
              @click="collapseMenu = !collapseMenu"
            >
              menu
            </button>
            <div
              class="flex gap-1 text-slate-400 dark:text-slate-400 font-light text-sm"
            >
              <span
                v-for="(item, index) in route.meta.title?.split(',')"
                :class="[
                  {
                    'text-indigo-500':
                      route.meta.title?.split(',').length - 1 === index,
                  },
                  'flex items-center gap-1',
                ]"
                class=""
              >
                <label
                  v-if="index !== 0"
                  :class="['material-symbols-outlined text-xl']"
                  >line_end</label
                >
                {{ item }}
              </span>
            </div>
          </div>

          <HeaderProfile />
        </div>
      </header>

      <main
        class="overflow-x-auto p-6 m-6 lg:min-h-[30rem] rounded-md border bg-white border-gray-200/70 dark:bg-[#2b333b] dark:border-gray-700"
      >
        <div class="block overflow-x-auto w-full">
          <NuxtPage />
        </div>
      </main>
    </div>
  </div>
</template>
<style scoped></style>

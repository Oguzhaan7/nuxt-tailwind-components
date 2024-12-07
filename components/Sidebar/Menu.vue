<script setup lang="ts">
const baseStore = useBaseStore();
</script>

<template>
  <nav class="flex flex-col">
    <transition-group tag="ul" name="slide" class="menu-list">
      <div
        @click="baseStore.selectedMenu = index"
        :class="[
          {
            'bg-dark-background text-indigo-400':
              baseStore.selectedMenu === index,
          },
          'flex flex-col gap-2 py-3 cursor-pointer text-sm transition-all duration-200 ',
        ]"
        v-for="(items, index) in menuItems"
        :key="index"
      >
        <div class="flex justify-between">
          <span class="pl-6 flex gap-2 items-stretch">
            <label
              class="material-symbols-outlined cursor-pointer text-[1.3rem]"
              >{{ items.icon }}</label
            >
            <label
              :class="[
                {
                  'text-slate-400': baseStore.selectedMenu !== index,
                  'text-indigo-400': baseStore.selectedMenu === index,
                },
              ]"
              class="cursor-pointer font-medium"
              >{{ items.header }}</label
            >
          </span>
          <span class="pr-6 material-symbols-outlined text-[1.2rem]">{{
            baseStore.selectedMenu === index
              ? "fiber_manual_record"
              : "keyboard_arrow_down"
          }}</span>
        </div>
        <transition
          enter-active-class="transition-all duration-200 ease-in-out"
          leave-active-class="transition-all duration-200 ease-in-out"
          enter-from-class="max-h-0"
          enter-to-class=" max-h-80"
          leave-from-class="max-h-80"
          leave-to-class="max-h-0"
        >
          <ul
            v-if="baseStore.selectedMenu === index"
            class="overflow-hidden pl-14 text-sm text-slate-400"
          >
            <li
              class="hover:translate-x-1 hover:text-dark-primary py-2 transition-all ease-in duration-200"
              v-for="item in items.items"
              :key="item.title"
            >
              <NuxtLink :to="item.path" class="p-2 rounded-lg">
                <label class="cursor-pointer">{{ item.title }}</label>
              </NuxtLink>
            </li>
          </ul>
        </transition>
      </div>
    </transition-group>
  </nav>
</template>

<style scoped>
.menu-list .slide-enter-active,
.menu-list .slide-leave-active {
  transition: max-height 0.2s ease-in-out;
}

.menu-list .slide-enter,
.menu-list .slide-leave-to {
  max-height: 0;
  overflow: hidden;
}

.menu-list .slide-enter-to,
.menu-list .slide-leave {
  max-height: 400px;
}

.router-link-active {
  color: rgb(93 108 252 / var(--tw-text-opacity));
  font-weight: 500;
  transition: border-color 0.3s ease-in-out;
}
</style>

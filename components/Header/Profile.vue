<script setup lang="ts">
const isOpen = ref(false);

const toggleProfile = () => {
  isOpen.value = !isOpen.value;
};

onMounted(() => {
  document.addEventListener("click", (e) => {
    const profile = e.target.closest(".profile");
    if (
      !profile &&
      isOpen.value &&
      e.target.id !== "toggleProfile" &&
      e.target.id !== "menu"
    ) {
      isOpen.value = false;
    }
    if (e.target.closest(".menu")) {
      isOpen.value = false;
    }
  });
});

const logout = () => {
  useNuxtApp().$toast({
    theme: "success",
    title: "Başarılı",
    message: "Çıkış işlemi başarılı, yönlendiriliyorsunuz.",
    duration: 2000,
  });
  setTimeout(() => {
    return navigateTo("/login");
  }, 2000);
};

const profileMenu = {
  header: [
    {
      label: "Oğuzhan Dağ",
    },
    {
      label: "123123",
    },
  ],
  main: [
    {
      label: "Profile",
      action: () => console.log("2"),
      icon: "person",
    },
    {
      label: "Messages",
      action: () => console.log("2"),
      icon: "mail",
    },
    {
      label: "Settings",
      action: () => console.log("2"),
      icon: "settings",
    },
  ],
  footer: [
    {
      label: "Help",
      action: () => console.log("2"),
      icon: "help",
    },
    {
      label: "Logout",
      action: () => console.log("2"),
      icon: "logout",
    },
  ],
};
</script>

<template>
  <div class="flex gap-1 items-center justify-end px-2 relative">
    <button
      v-tooltip="{ content: 'Notifications', position: 'bottom' }"
      class="flex relative items-center gap-2 w-8 h-8 transition-all duration-200 justify-center text-indigo-500 rounded-full mr-2"
    >
      <i class="material-symbols-outlined text-2xl">notifications</i>
      <label
        class="absolute -top-2 left-4 text-[.6rem] w-4 h-4 flex items-center justify-center bg-rose-400 text-white rounded-full"
        >4</label
      >
    </button>

    <div class="flex px-2 w-16 text-slate-600 dark:text-gray-300">
      <img
        src="../../assets/images/avatar.png"
        alt="Avatar"
        class="w-10 h-10 rounded-full object-cover"
      />
    </div>
    <button
      id="toggleProfile"
      @click="toggleProfile"
      class="material-symbols-outlined text-2xl"
    >
      more_vert
    </button>

    <Transition name="profile">
      <div
        v-if="isOpen"
        id="profile"
        class="profile absolute bg-white dark:bg-gray-700 dark:border-gray-800/60 border-l border-r border-b rounded-lg z-50 w-56 mt-1 top-12 lg:pt-2"
      >
        <div
          v-for="(profile, index) in profileMenu.header"
          :key="index"
          class="flex justify-center first:text-sm first:text-slate-600 dark:first:text-slate-300 text-slate-400 text-xs"
        >
          {{ profile.label }}
        </div>

        <span class="flex border-b dark:border-slate-600 lg:py-1"></span>

        <div
          v-for="(profile, index) in profileMenu.main"
          @click="profile.action"
          :key="index"
          class="menu flex gap-2 items-center px-4 lg:py-1 text-sm rounded-md text-slate-600 dark:text-slate-300 hover:text-white hover:dark:text-slate-100 hover:bg-indigo-500 transition-colors duration-150 cursor-pointer"
        >
          <label
            v-if="profile.icon"
            class="material-symbols-outlined text-xl cursor-pointer"
            >{{ profile.icon }}</label
          >
          <label class="cursor-pointer">
            {{ profile.label }}
          </label>
        </div>
        <div
          class="flex gap-2 items-center px-4 lg:py-1 text-sm rounded-md text-slate-600 dark:text-slate-300 hover:text-white hover:dark:text-slate-100 hover:bg-indigo-500 transition-colors duration-150"
        >
          <label class="material-symbols-outlined text-xl">contrast</label>
          <label>Tema</label>
          <label class="material-symbols-outlined text-base ml-4 mr-2"
            >light_mode</label
          >
          <label
            ><button
              id="theme"
              @click="
                $colorMode.preference =
                  $colorMode.preference === 'dark' ? 'light' : 'dark'
              "
              type="button"
              @submit.prevent
              :class="[
                'relative bg-slate-300 dark:bg-slate-400 inline-flex items-center h-5 rounded-full w-8 transition-colors duration-200 focus:outline-none',
              ]"
            >
              <span
                :class="[
                  'transform transition-transform duration-200 bg-white dark:bg-slate-700 inline-block w-3 h-3 rounded-full',
                  $colorMode.preference === 'dark'
                    ? 'translate-x-4'
                    : 'translate-x-1',
                ]"
              ></span></button
          ></label>
          <label class="material-symbols-outlined text-base mr-4 ml-2 mb-1"
            >dark_mode</label
          >
        </div>

        <span class="flex border-b dark:border-slate-600 lg:py-1"></span>

        <div
          v-for="(profile, index) in profileMenu.footer"
          @click="profile.action"
          :key="index"
          class="menu flex gap-2 items-center px-4 lg:py-1 text-sm rounded-md text-slate-600 dark:text-slate-300 hover:text-white hover:dark:text-slate-100 hover:bg-indigo-500 transition-colors duration-150 cursor-pointer"
        >
          <label
            v-if="profile.icon"
            class="material-symbols-outlined text-xl cursor-pointer"
            >{{ profile.icon }}</label
          >
          <label class="cursor-pointer">
            {{ profile.label }}
          </label>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.profile-enter-active,
.profile-leave-active {
  transition: all 0.3s ease;
}

.profile-enter-from,
.profile-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

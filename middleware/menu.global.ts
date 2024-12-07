import { useBaseStore } from "../stores/baseStore";
export default defineNuxtRouteMiddleware((to, from) => {
  const baseStore = useBaseStore();

  let index = menuItems.findIndex((x) => x.path === to.path.split("/")[1]);

  if (index !== -1) {
    baseStore.selectedMenu = index;
  } else {
    baseStore.selectedMenu = 0;
  }
});

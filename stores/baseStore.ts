export const useBaseStore = defineStore("baseStore", () => {
  const selectedMenu = ref<Number>(-1);
  const isSubmit = ref<Boolean>(false);
  const errors = reactive([]);

  return { selectedMenu, isSubmit, errors };
});

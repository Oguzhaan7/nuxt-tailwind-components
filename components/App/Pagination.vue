<script lang="ts" setup>
interface PaginationProps {
  total: number;
  currentPage: number;
  pageSize: number;
}

const props = defineProps<PaginationProps>();
const emit = defineEmits(["pageChange"]);

const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit("pageChange", page);
  }
};

const nextPage = () => {
  if (props.currentPage < totalPages.value) {
    changePage(props.currentPage + 1);
  }
};

const previousPage = () => {
  if (props.currentPage > 1) {
    changePage(props.currentPage - 1);
  }
};

const paginationRange = computed(() => {
  const total = totalPages.value;
  const current = props.currentPage;
  const delta = 2;
  const range: (number | string)[] = [];
  const left = Math.max(1, current - delta);
  const right = Math.min(total, current + delta);

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  return range;
});

const startRecord = computed(() => {
  return (props.currentPage - 1) * props.pageSize + 1;
});

const endRecord = computed(() => {
  return Math.min(props.currentPage * props.pageSize, props.total);
});
</script>

<template>
  <div
    class="w-full flex flex-col gap-2 justify-center text-gray-500 dark:text-gray-400 dark:border-gray-600 pb-2 items-center"
  >
    <nav class="flex items-center justify-center space-x-2 mt-4 w-full">
      <button
        @click="changePage(1)"
        :disabled="props.currentPage === 1"
        class="text-gray-500 rounded disabled:opacity-50"
      >
        <span class="material-symbols-outlined text-2xl">keyboard_double_arrow_left</span>
      </button>

      <button @click="previousPage" :disabled="props.currentPage === 1" class="disabled:opacity-50">
        <span class="material-symbols-outlined text-2xl">keyboard_arrow_left</span>
      </button>

      <span v-for="page in paginationRange" :key="page">
        <button
          @click="changePage(page)"
          :class="[
            'w-10 h-10 rounded-full',
            page === props.currentPage
              ? 'bg-indigo-500 text-white'
              : 'bg-transparent hover:text-indigo-600 dark:hover:text-indigo-400',
          ]"
        >
          {{ page }}
        </button>
      </span>

      <button @click="nextPage" :disabled="props.currentPage === totalPages" class="disabled:opacity-50">
        <span class="material-symbols-outlined text-2xl">keyboard_arrow_right</span>
      </button>

      <button @click="changePage(totalPages)" :disabled="props.currentPage === totalPages" class="disabled:opacity-50">
        <span class="material-symbols-outlined text-2xl">keyboard_double_arrow_right</span>
      </button>
    </nav>
    <div class="flex justify-end gap-4 text-sm text-slate-400">
      <span>
        {{ `${props.total} kayıttan ${startRecord} - ${endRecord} gösteriliyor` }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>

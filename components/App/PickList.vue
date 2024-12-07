<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  items: { id: number; name: string }[];
  selected: { id: number; name: string }[];
  itemLabel: string;
  selectLabel: string;
  updatable?: boolean;
  addAction?: Function;
  removeAction?: Function;
}>();

const emit = defineEmits<{
  (e: "update:selected", selectedItems: any): void;
}>();

const selectedItems = ref<{ id: number; name: string }[]>([]);

const remainingItems = ref(props.items);

onMounted(async () => {
  await nextTick();
  selectedItems.value = props.selected;
  remainingItems.value = remainingItems.value.filter(
    (x) => !selectedItems.value.map((y) => y.id).includes(x.id)
  );
});

const moveToSelected = (item: { id: number; name: string }) => {
  selectedItems.value.push(item);
  remainingItems.value = remainingItems.value.filter((i) => i.id !== item.id);
  emit("update:selected", selectedItems.value);
};

const moveToRemaining = (item: { id: number; name: string }) => {
  remainingItems.value.push(item);
  selectedItems.value = selectedItems.value.filter((i) => i.id !== item.id);
  emit("update:selected", selectedItems.value);
};
</script>

<template>
  <div class="flex space-x-10 p-4 w-full h-96">
    <div
      v-auto-animate
      class="overflow-x-auto w-1/2 p-2 border rounded-lg relative"
    >
      <div class="flex items-center justify-between py-2 px-6 mb-2">
        <h3 class="text-lg sticky top-0 bg-white dark:bg-[#2b333b]">
          {{ itemLabel ? itemLabel : "Seçilebilir Değerler Listesi" }}
        </h3>
        <div v-if="updatable" class="flex gap-2">
          <button
            @click="addAction"
            class="h-7 w-12 bg-indigo-500 hover:bg-indigo-600 text-white text-xs rounded-lg transition-all duration-200"
          >
            Ekle
          </button>
          <button
            @click="removeAction"
            class="h-7 w-12 bg-gray-500 hover:bg-gray-600 text-white text-xs rounded-lg transition-all duration-200"
          >
            Kaldır
          </button>
        </div>
      </div>
      <div
        v-for="item in remainingItems"
        :key="item.id"
        @click="moveToSelected(item)"
        class="flex cursor-pointer pl-2 p-1 text-slate-500 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <label class="material-symbols-outlined text-base text-emerald-400 px-2"
          >add_circle</label
        >
        {{ item.name }}
      </div>
    </div>

    <div
      v-auto-animate
      class="overflow-x-auto w-1/2 p-2 border rounded-lg relative"
    >
      <h3
        class="text-lg mb-2 sticky top-0 bg-white dark:bg-[#2b333b] py-2 px-6"
      >
        {{ selectLabel ? selectLabel : "Seçilen Değerler Listesi" }}
      </h3>
      <div
        v-for="item in selectedItems"
        :key="item.id"
        @click="moveToRemaining(item)"
        class="flex cursor-pointer pl-2 p-1 text-slate-500 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <label class="material-symbols-outlined text-base text-rose-400 px-2"
          >do_not_disturb_on</label
        >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
type Column = {
  label: string;
  key: string;
  sortable?: boolean;
  filterable?: boolean;
  filterList?: [];
  type?: string | "text" | "date" | "image";
  selectedFilterType?: number;
  selectedFilterValue?: any;
};

type Filter = {
  columnName: string;
  value: string | string[];
  filterType: number;
};

type CheckboxFilter = {
  column: string;
  value: boolean;
  key: string;
};

const props = defineProps<{
  columns: Column[];
  data: any[];
  header?: string;
  total?: number;
  currentPage?: number;
  pageSize?: number;
  paged?: boolean;
  actions?: any[];
}>();

const emit = defineEmits(["update:filter"]);

const page = ref(1);
const sortedColumn = ref("");
const sortDirection = ref("asc");

const checkboxArray = ref<CheckboxFilter[]>([]);

const filters = ref<Filter[][]>([]);
const isFilterOpen = ref({ key: "", isOpen: false });
const filterTypes = [
  {
    id: 1,
    name: "Eşittir",
  },
  {
    id: 2,
    name: "Eşit Değildir",
  },
  {
    id: 3,
    name: "Büyüktür",
  },
  {
    id: 4,
    name: "Küçüktür",
  },
  {
    id: 5,
    name: "Büyük veya Eşit",
  },
  {
    id: 6,
    name: "Küçük veya Eşit",
  },
  {
    id: 3,
    name: "İçerir",
  },
];

const sort = (column: Column) => {
  if (sortedColumn.value === column.key) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortedColumn.value = column.key;
    sortDirection.value = "asc";
  }
  emit("update:filter", {
    filter: filters.value,
    page: page.value,
    sortedColumn: sortedColumn.value,
    sortDirection: sortDirection.value,
  });
};

const toggleFilter = (key: any) => {
  if (isFilterOpen.value.key === key && isFilterOpen.value.isOpen) {
    isFilterOpen.value.isOpen = false;
  } else {
    isFilterOpen.value.key = key;
    isFilterOpen.value.isOpen = true;
  }
};

const addFilter = (filter: Filter) => {
  let isExist = filters.value.filter(
    (x) => x.filter((y) => y.columnName === filter.columnName)[0]
  )[0];
  if (!isExist) {
    filters.value.push([
      {
        columnName: filter.columnName,
        value: filter.value,
        filterType: filter.filterType,
      },
    ]);
  } else {
    isExist.value = filter.value;
    isExist.filterType = filter.filterType;
  }

  toggleFilter(filter.columnName);
  emit("update:filter", {
    filter: filters.value,
    page: page.value,
    sortedColumn: sortedColumn.value,
    sortDirection: sortDirection.value,
  });
};

const clearFilter = (key: string) => {
  filters.value = filters.value.filter(
    (x) => !x.filter((y) => y.columnName === key)[0]
  );

  let column = props.columns.filter((x) => x.key === key)[0];
  if (column) {
    column.selectedFilterType = 1;
    column.selectedFilterValue = null;
  }
  toggleFilter(column.key);
  emit("update:filter", {
    filter: filters.value,
    page: page.value,
    sortedColumn: sortedColumn.value,
    sortDirection: sortDirection.value,
  });
};

const addCheckboxFilter = (filter: CheckboxFilter[]) => {
  let selectedValues = filter.filter((x) => x.value).map((x) => x.key);
  let isExist = filters.value.filter(
    (x) => x.filter((y) => y.columnName === filter[0].column)[0]
  )[0];

  if (isExist) {
    console.log(isExist, selectedValues.length);
    filters.value = filters.value.filter(
      (x) => !x.filter((y) => y.columnName === filter[0].column)[0]
    );
  }
  if (selectedValues.length > 0) {
    let values = [];
    selectedValues.map((x) => {
      values.push({
        columnName: filter[0].column,
        value: x,
        filterType: 1,
      });
    });
    filters.value.push(values);
  }
  toggleFilter(filter[0].column);
  emit("update:filter", {
    filter: filters.value,
    page: page.value,
    sortedColumn: sortedColumn.value,
    sortDirection: sortDirection.value,
  });
};

const clearChecboxFilter = (key: string) => {
  filters.value = filters.value.filter(
    (x) => !x.filter((y) => y.columnName === key)[0]
  );

  toggleFilter(key);
  checkboxArray.value.map((x) => (x.value = false));
  emit("update:filter", {
    filter: filters.value,
    page: page.value,
    sortedColumn: sortedColumn.value,
    sortDirection: sortDirection.value,
  });
};

const handlePageChange = (e) => {
  if (page.value === e) return;
  page.value = e;
  emit("update:filter", {
    filter: filters.value,
    page: page.value,
    sortedColumn: sortedColumn.value,
    sortDirection: sortDirection.value,
  });
};

onMounted(() => {
  props.columns.map((x) => {
    if (x.filterable) {
      x.selectedFilterType = 1;

      if (x.filterList) {
        x.filterList.map((y) =>
          checkboxArray.value.push({ column: x.key, value: false, key: y })
        );
      }
    }
  });
});
</script>

<template>
  <div class="flex flex-col gap-8 w-full overflow-x-auto p-2">
    <div class="flex flex-col sm:flex-row items-center justify-between px-4">
      <div class="flex w-full text-lg font-semibold">{{ header }}</div>
      <div class="flex w-full">
        <slot name="header" />
      </div>
    </div>
    <table
      class="w-full divide-y bg-white dark:bg-gray-700 rounded-md ring-1 ring-gray-200 dark:ring-gray-600 divide-gray-200 dark:divide-gray-600"
    >
      <thead class="select-none">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 text-left font-medium text-sm text-nowrap tracking-wider"
          >
            <div
              v-if="column.key !== 'kopekCinsiyet'"
              :class="{
                'text-slate-600 dark:text-slate-200':
                  sortedColumn !== column.key,
                'text-slate-700 dark:text-slate-100':
                  sortedColumn === column.key,
              }"
              class="flex gap-3 items-center"
            >
              <span class="font-bold">{{ column.label }}</span>

              <span
                v-if="column.sortable"
                @click="column.sortable && sort(column)"
                :class="{
                  'opacity-50 ': sortedColumn !== column.key,
                  'opacity-100': sortedColumn === column.key,
                }"
                class="material-symbols-outlined text-2xl ml-2 cursor-pointer"
              >
                {{
                  sortDirection === "asc"
                    ? "keyboard_arrow_down"
                    : "keyboard_arrow_up"
                }}
              </span>
              <div class="relative">
                <span
                  :key="column.key"
                  :class="{
                    'opacity-50': !filters.some(
                      (x) => x.filter((y) => y.columnName === column.key)[0]
                    ),
                    'opacity-100': filters.some(
                      (x) => x.filter((y) => y.columnName === column.key)[0]
                    ),
                  }"
                  class="material-symbols-outlined text-xl cursor-pointer"
                  v-if="column.filterable"
                  @click="toggleFilter(column.key)"
                  >filter_list</span
                >
                <Transition v-if="!column.filterList" name="filter">
                  <div
                    class="flex flex-col absolute py-2 px-4 w-64 shadow-sm border bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md z-50 top-8 right-0"
                    v-if="
                      isFilterOpen.isOpen && isFilterOpen.key === column.key
                    "
                  >
                    <FormSelect
                      label="Filtre"
                      :options="filterTypes"
                      v-model="column.selectedFilterType"
                    />
                    <FormField
                      v-model="column.selectedFilterValue"
                      :label="column.label"
                      :type="column.type || 'text'"
                    />
                    <div class="flex justify-between py-2 px-4">
                      <AppButton
                        theme="gray"
                        class="text-xs"
                        @click="clearFilter(column.key)"
                        >Temizle</AppButton
                      >
                      <AppButton
                        @click="
                          addFilter({
                            columnName: column.key,
                            value: column.selectedFilterValue,
                            filterType: column.selectedFilterType,
                          })
                        "
                        >Uygula</AppButton
                      >
                    </div>
                  </div>
                </Transition>
                <Transition v-else name="filter">
                  <div
                    class="flex flex-col absolute py-2 px-4 w-64 shadow-sm border bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md z-50 top-8 right-0"
                    v-if="
                      isFilterOpen.isOpen && isFilterOpen.key === column.key
                    "
                  >
                    <div class="flex flex-col gap-2 max-h-32 overflow-y-auto">
                      <ul>
                        <li
                          v-for="list in checkboxArray.filter(
                            (x) => x.column === column.key
                          )"
                        >
                          <FormCheckbox
                            v-model="list.value"
                            :label="list.key"
                          />
                        </li>
                      </ul>
                    </div>
                    <div class="flex justify-between py-6 px-4">
                      <AppButton
                        theme="gray"
                        class="text-xs"
                        @click="clearChecboxFilter(column.key)"
                        >Temizle</AppButton
                      >
                      <AppButton
                        class="text-xs"
                        @click="
                          addCheckboxFilter(
                            checkboxArray.filter((x) => x.column === column.key)
                          )
                        "
                        >Uygula</AppButton
                      >
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </th>
          <th class="px-12 text-right" v-if="actions"></th>
        </tr>
      </thead>
      <tbody
        class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600"
      >
        <tr
          class="hover:bg-slate-50 dark:hover:bg-gray-800/20 transition-colors duration-200 ease-in-out"
          v-for="(row, index) in data"
          :key="index"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 whitespace-nowrap text-sm"
          >
            <span v-if="column.type === 'image'">
              <div class="relative inline-flex rounded-lg">
                <img
                  class="min-w-36 w-36 rounded-lg"
                  src="ttp://localhost:3000/kopek.webp"
                />
                <span
                  v-if="columns.some((x) => x.key === 'kopekCinsiyet')"
                  :class="[
                    {
                      'bg-blue-200 text-blue-500': row['kopekCinsiyet'] === 1,
                      'bg-rose-200 text-rose-500': row['kopekCinsiyet'] === 2,
                    },
                    'flex items-center justify-center absolute top-2 left-2 rounded-full h-5 w-5  material-symbols-outlined text-base',
                  ]"
                  >{{ row["kopekCinsiyet"] === 1 ? "male" : "female" }}</span
                >
              </div>
            </span>
            <span v-else-if="column.type === 'date'">{{
              useDateToString(row[column.key])
            }}</span>
            <span else>
              {{
                column.key !== "kopekCinsiyet" && column.type !== "date"
                  ? row[column.key]
                  : ""
              }}
            </span>
          </td>
          <td class="px-12 text-right" v-if="actions">
            <AppDropdown
              :id="index"
              :columnId="row.id"
              :options="actions"
              icon="more_vert"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex w-full overflow-x-auto p-2">
    <AppPagination
      v-if="paged"
      @pageChange="(e) => handlePageChange(e)"
      :total="props.total"
      :currentPage="props.currentPage"
      :pageSize="props.pageSize"
    />
  </div>
</template>

<style scoped>
.filter-enter-active,
.filter-leave-active {
  transition: all 0.2s ease;
}

.filter-enter-from,
.filter-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

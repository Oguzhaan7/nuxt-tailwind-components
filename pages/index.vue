<script setup lang="ts">
definePageMeta({
  title: "Home",
});

const handleClick = (theme: string, title: string, message: string) => {
  useNuxtApp().$toast({
    theme: theme,
    title: title,
    message: message,
    duration: 3000,
  });
};

const sicil = ref<string>("");
const selectedValue = ref({});
const date = ref("");

const isModalOpen = ref(false);
const isModalOpen2 = ref(false);

const isToggled = ref(false);
const isChecked = ref(false);
const selectedOption = ref("");

const cities = [
  { id: 1, name: "New York" },
  { id: 2, name: "Los Angeles" },
  { id: 3, name: "Chicago" },
  { id: 4, name: "Houston" },
  { id: 5, name: "Phoenix" },
  { id: 6, name: "Philadelphia" },
  { id: 7, name: "San Antonio" },
  { id: 8, name: "San Diego" },
  { id: 9, name: "Dallas" },
  { id: 10, name: "San Jose" },
  { id: 11, name: "Austin" },
  { id: 12, name: "Jacksonville" },
  { id: 13, name: "Fort Worth" },
  { id: 14, name: "Columbus" },
  { id: 15, name: "Indianapolis" },
];

const menuOptions = [
  {
    label: "Profile",
    action: () => navigateTo(""),
    icon: "person",
  },
  {
    label: "Settings",
    action: () => console.log("2"),
    icon: "settings",
  },
  {
    label: "Logout",
    action: () => console.log("2"),
    icon: "logout",
  },
];

const tableData = [
  {
    imageUrl: "",
    dogName: "Buddy",
    dogGender: "Male",
    totalScore: 85,
    date: "2024-12-01",
    test: "Agility",
  },
  {
    imageUrl: "",
    dogName: "Bella",
    dogGender: "Female",
    totalScore: 92,
    date: "2024-12-02",
    test: "Obedience",
  },
  {
    imageUrl: "",
    dogName: "Max",
    dogGender: "Male",
    totalScore: 78,
    date: "2024-12-03",
    test: "Tracking",
  },
  {
    imageUrl: "",
    dogName: "Luna",
    dogGender: "Female",
    totalScore: 88,
    date: "2024-12-04",
    test: "Agility",
  },
];

const columns = [
  {
    label: "",
    key: "imageUrl",
    type: "image",
  },
  {
    label: "Name",
    key: "dogName",
    sortable: true,
    filterable: true,
  },
  {
    label: "Gender",
    key: "dogGender",
    filterable: true,
    filterList: ["Male", "Female", "Other"],
  },
  {
    label: "Score",
    key: "totalScore",
    sortable: true,
  },
  {
    label: "Date",
    key: "date",
    sortable: true,
    type: "date",
  },
  {
    label: "Test",
    key: "test",
    filterable: true,
  },
];

const tableOptions = [
  {
    label: "Detail",
    action: (id: number) => console.log("2"),
    icon: "login",
  },
  {
    label: "Settings",
    action: (id: number) => console.log("2"),
    icon: "settings",
  },
];

const dropdownOpen = ref(false);
const triggerRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
</script>

<template>
  <div class="pb-16">
    <div class="flex px-12 pt-6 pb-0 space-x-16">
      <!-- Filled and Outline Buttons Groups (2x2 grid) -->
      <div class="flex space-x-16">
        <!-- Filled Buttons Group (2x2 Grid) -->
        <div>
          <h2 class="text-lg font-bold mb-4">Filled Buttons</h2>
          <div class="grid grid-cols-2 gap-y-6 gap-x-12">
            <!-- Primary Filled Button -->
            <AppButton
              theme="primary"
              variant="filled"
              icon="pets"
              class="w-48"
              @click="
                handleClick(
                  'primary',
                  'Başarılı İşlem',
                  'Birincil butona tıkladınız.'
                )
              "
            >
              Primary
            </AppButton>

            <!-- Success Filled Button -->
            <AppButton
              theme="success"
              variant="filled"
              icon="check_circle"
              class="w-48"
              @click="
                handleClick('success', 'Başarılı!', 'Başarıyla işlem yapıldı.')
              "
            >
              Success
            </AppButton>

            <!-- Danger Filled Button -->
            <AppButton
              theme="danger"
              variant="filled"
              icon="error"
              class="w-48"
              @click="
                handleClick(
                  'danger',
                  'Hata',
                  'Tehlikeli bir işlem gerçekleştirdiniz!'
                )
              "
            >
              Danger
            </AppButton>

            <!-- Warning Filled Button -->
            <AppButton
              theme="warning"
              variant="filled"
              icon="report_problem"
              class="w-48"
              @click="
                handleClick(
                  'warning',
                  'Uyarı!',
                  'Dikkat gerektiren bir işlem yaptınız.'
                )
              "
            >
              Warning
            </AppButton>

            <AppButton
              theme="surface"
              variant="filled"
              icon="apps"
              class="w-48"
              @click="
                handleClick(
                  'warning',
                  'Uyarı!',
                  'Dikkat gerektiren bir işlem yaptınız.'
                )
              "
            >
              Surface
            </AppButton>

            <AppButton
              theme="gray"
              variant="filled"
              icon="database"
              class="w-48"
              @click="
                handleClick(
                  'warning',
                  'Uyarı!',
                  'Dikkat gerektiren bir işlem yaptınız.'
                )
              "
            >
              Gray
            </AppButton>
          </div>
        </div>

        <!-- Outline Buttons Group (2x2 Grid) -->
        <div>
          <h2 class="text-lg font-bold mb-4">Outline Buttons</h2>
          <div class="grid grid-cols-2 gap-y-6 gap-x-12">
            <!-- Primary Outline Button -->
            <AppButton
              theme="primary"
              variant="outline"
              icon="pets"
              class="w-48"
              @click="isModalOpen = true"
            >
              Primary
            </AppButton>

            <!-- Success Outline Button -->
            <AppButton
              theme="success"
              variant="outline"
              icon="check_circle"
              class="w-48"
              @click="isModalOpen2 = true"
            >
              Success
            </AppButton>

            <!-- Danger Outline Button -->
            <AppButton
              theme="danger"
              variant="outline"
              icon="error"
              class="w-48"
            >
              Danger
            </AppButton>

            <!-- Warning Outline Button -->
            <AppButton
              theme="warning"
              variant="outline"
              icon="report_problem"
              class="w-48"
            >
              Warning
            </AppButton>

            <AppButton
              theme="surface"
              variant="outline"
              icon="apps"
              class="w-48"
            >
              Surface
            </AppButton>

            <AppButton
              theme="gray"
              variant="outline"
              icon="database"
              class="w-48"
            >
              Gray
            </AppButton>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-bold mb-4">Loading Buttons</h2>
          <div class="flex gap-4 space-x-10">
            <!-- Primary Loading Button -->
            <AppButton
              theme="primary"
              variant="filled"
              :isLoad="true"
              class="w-48"
            >
              Primary Loading
            </AppButton>

            <!-- Success Loading Button -->
            <AppButton
              theme="success"
              variant="outline"
              :isLoad="true"
              class="w-48"
            >
              Success Loading
            </AppButton>
          </div>
        </div>
      </div>
    </div>

    <div class="flex px-12 mt-12 space-x-8">
      <div class="flex space-x-10">
        <!-- Filled Buttons Group (2x2 Grid) -->
        <div>
          <h2 class="text-lg font-bold mb-4">Field</h2>
          <div>
            <FormField v-model="sicil" label="Id" icon="person" type="number" />
          </div>
        </div>
      </div>
      <div class="flex space-x-10">
        <!-- Filled Buttons Group (2x2 Grid) -->
        <div>
          <h2 class="text-lg font-bold mb-4">Select</h2>
          <div>
            <FormSelect
              class="w-64"
              label="City"
              v-model="selectedValue"
              :options="cities"
              icon="location_on"
            />
          </div>
        </div>
      </div>
      <div class="flex space-x-10">
        <!-- Filled Buttons Group (2x2 Grid) -->
        <div>
          <h2 class="text-lg font-bold mb-4">Date</h2>
          <div>
            <FormDate v-model="date" label="Date" />
          </div>
        </div>

        <div>
          <h2 class="text-lg font-bold mb-7">Checkbox</h2>
          <div>
            <FormCheckbox v-model="isChecked" label="I agree" />
          </div>
        </div>

        <div>
          <h2 class="text-lg font-bold mb-7">Switch</h2>
          <div>
            <AppSwitch
              v-model="isToggled"
              label="Dark Mode"
              labelOn="On"
              labelOff="Off"
            />
          </div>
        </div>

        <div>
          <h2 class="text-lg font-bold mb-6">Radio</h2>
          <div class="flex gap-2">
            <FormRadio
              v-model="selectedOption"
              name="example"
              value="male"
              label="Male"
            />
            <FormRadio
              v-model="selectedOption"
              name="example"
              value="female"
              label="Female"
            />
          </div>
        </div>
        <div>
          <h2 class="text-lg font-bold mb-4">Dropdown</h2>
          <div>
            <AppDropdown
              buttonName="Dropdown"
              buttonIcon="more_vert"
              :options="menuOptions"
              :isOpenExternal="dropdownOpen"
              :triggerElement="triggerRef"
              @update:isOpenExternal="dropdownOpen = $event"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex w-full px-12 mt-8 space-x-8">
      <div class="flex space-x-10 w-full">
        <div class="flex w-full flex-col">
          <h2 class="text-lg font-bold">Filterable Table</h2>
          <div class="w-full">
            <AppTable
              class="w-full"
              :columns="columns"
              :data="tableData"
              :actions="tableOptions"
              paged
              :currentPage="1"
              :pageSize="10"
              :total="100"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex px-12 mt-0 space-x-8">
      <div class="flex space-x-10">
        <!-- Filled Buttons Group (2x2 Grid) -->
        <div>
          <div>
            <AppTabMenu :tabs="['Tab 1', 'Tab 2', 'Tab 3']">
              <template #tab-0>
                <div>Tab 1</div>
              </template>
              <template #tab-1>
                <div>Tab 2</div>
              </template>
              <template #tab-2>
                <div>Tab 3</div>
              </template>
            </AppTabMenu>
          </div>
        </div>
      </div>
    </div>

    <AppModal
      :isOpen="isModalOpen"
      header="Özel Başlık"
      content="Bu, props ile verilen içeriktir."
      size="large"
      @close="isModalOpen = false"
      @action="isModalOpen = false"
    />
    <AppModal
      v-if="isModalOpen2"
      :isOpen="isModalOpen2"
      size="medium"
      @close="isModalOpen2 = false"
      @action="isModalOpen2 = false"
    >
      <template #content>
        <p class="text-gray-600 dark:text-gray-300">
          Bu, şık ve modern bir modalın özel içeriğidir.
        </p>
      </template>
      <template #footer>
        <button
          @click="isModalOpen2 = false"
          class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Kapat
        </button>
        <button
          @click="isModalOpen2 = false"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Özel İşlem
        </button>
      </template>
    </AppModal>
  </div>
</template>

<style scoped></style>

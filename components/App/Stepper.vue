<script setup lang="ts">
interface StepProps {
  header: string;
  icon?: string;
}
const baseStore = useBaseStore();
const props = defineProps<{ steps: StepProps[]; onClick: Function }>();

const activeStep = ref(0);
let fields: Array<string> = [];

const slots = defineSlots();

const getActiveSlotContent = () => {
  fields = [];
  const currentSlot = slots[`step-${activeStep.value}`];
  if (currentSlot) {
    const renderedContent = currentSlot();
    renderedContent[0]?.children?.map((x) => fields.push(x.props.label));
  }
};

onMounted(() => {
  getActiveSlotContent();
});

const handleStepValidation = () => {
  let isValid = true;
  baseStore.isSubmit = true;
  if (fields.length > 0) {
    let isHaveValidationRule = fields.filter((x) =>
      Object.keys(baseStore.errors).some((y) => y === x)
    );
    isHaveValidationRule.map((x) => {
      let value = baseStore.errors[x];
      if (value) {
        isValid = false;
      }
    });
    return isValid;
  }
};

const previousStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--;
    getActiveSlotContent();
  }
};

const nextStep = () => {
  if (activeStep.value < props.steps.length - 1) {
    if (handleStepValidation()) {
      activeStep.value++;
      getActiveSlotContent();
      baseStore.isSubmit = false;
    } else {
      useNuxtApp().$toast({
        theme: "danger",
        title: "Hata",
        message: "Zorunlu alanları doldurmadınız",
        duration: 2000,
      });
    }
  } else {
    if (handleStepValidation()) {
      baseStore.isSubmit = false;
      props.onClick();
    } else {
      useNuxtApp().$toast({
        theme: "danger",
        title: "Hata",
        message: "Zorunlu alanları doldurmadınız",
        duration: 2000,
      });
    }
  }
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="relative">
      <div class="flex w-full justify-center overflow-x-auto border-gray-200">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="flex relative text-nowrap justify-center items-center w-full gap-2 py-2 px-4 focus:outline-none transition-all duration-200 ease-in-out outline-none cursor-default"
          :class="{
            'text-indigo-500 border-indigo-500 dark:text-indigo-400 ':
              activeStep === index,
            'text-gray-500 border-slate-100 dark:text-slate-300 dark:border-slate-500':
              activeStep !== index,
          }"
        >
          <div
            class="inline-flex w-full xl:max-w-40 xl:min-w-40 items-center justify-center text-right gap-2"
          >
            <span
              v-if="step.icon"
              :class="{
                'bg-indigo-500 text-white border-indigo-500 ':
                  activeStep === index,
                'bg-transparent text-gray-500 border-slate-200 dark:text-slate-400 dark:border-slate-400 ':
                  activeStep !== index,
              }"
              class="material-symbols-outlined p-1 rounded-full border transition-colors duration-200 ease-in-out cursor-pointer"
              >{{ step.icon }}</span
            >
            <span class="cursor-pointer">{{ step.header }}</span>
          </div>
          <div class="flex w-full justify-center">
            <span
              v-if="steps.length - 1 !== index"
              :class="[
                {
                  'w-0': steps.length - 1 !== index,
                  'w-16': steps.length - 1 === index,
                  'bg-gray-300': index >= activeStep,
                  'bg-indigo-500': index < activeStep,
                },
                'hidden lg:flex h-1 opacity-80 rounded-xl w-full transition-colors duration-200 ease-in-out justify-center',
              ]"
            ></span>
          </div>
        </div>
      </div>
      <div
        class="absolute bottom-0 h-0.5 bg-indigo-500 transition-transform duration-300"
      ></div>
    </div>
    <div class="mt-4 mx-8 mb-4 min-h-96 overflow-hidden relative">
      <div
        class="flex transition-transform duration-300"
        :style="{ transform: `translateX(-${activeStep * 100}%)` }"
      >
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="w-full flex-shrink-0"
        >
          <slot :name="'step-' + index"></slot>
          <div class="flex justify-evenly py-6">
            <AppButton
              @click="previousStep"
              theme="gray"
              class="w-40 h-12"
              icon="keyboard_double_arrow_left"
              >Önceki</AppButton
            >
            <AppButton
              @click="nextStep"
              class="w-40 h-12"
              :theme="index !== steps.length - 1 ? 'gray' : 'primary'"
              :icon="
                index !== steps.length - 1
                  ? 'keyboard_double_arrow_right'
                  : 'check_circle'
              "
              >{{
                index !== steps.length - 1 ? "Sonraki" : "Onayla"
              }}</AppButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

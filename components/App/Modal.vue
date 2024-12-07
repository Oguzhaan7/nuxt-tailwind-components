<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  header: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
  actionLabel: {
    type: String,
    default: "Uygula",
  },
});

const emit = defineEmits(["close", "action"]);

const isVisible = ref(false);

const closeModal = () => {
  isVisible.value = false;
  setTimeout(() => {
    emit("close");
  }, 200);
};

const onAction = () => {
  emit("action");
};

const modalSizeClass = computed(() => {
  switch (props.size) {
    case "small":
      return "w-full max-w-sm";
    case "large":
      return "w-full max-w-3xl";
    default:
      return "w-full max-w-md";
  }
});

watchEffect(() => {
  if (props.isOpen) {
    setTimeout(() => {
      isVisible.value = true;
    }, 100);
  } else {
    setTimeout(() => {
      isVisible.value = false;
    }, 100);
  }
});
</script>

<template>
  <teleport to="body">
    <Transition name="modal">
      <div
        v-if="isVisible"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="fixed inset-0 bg-black opacity-50 transition-opacity"
          @click="closeModal"
        ></div>

        <div
          :class="modalSizeClass"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-lg mx-auto p-6 relative z-10 transform transition-all"
          @click.stop
        >
          <div class="mb-4">
            <slot name="header">
              <h3 class="text-lg font-semibold">
                {{ header || "Varsayılan Başlık" }}
              </h3>
            </slot>
          </div>

          <div class="mb-4">
            <slot name="content">
              <p class="text-gray-600 dark:text-gray-300">
                {{ content || "Varsayılan içerik metni." }}
              </p>
            </slot>
          </div>

          <div class="flex justify-end space-x-2">
            <slot name="footer">
              <AppButton @click="closeModal" theme="gray">Kapat</AppButton>
              <AppButton @click="onAction">{{ actionLabel }}</AppButton>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}
</style>

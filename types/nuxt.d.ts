import { ToastOptions } from "~/plugins/toast.client";

declare module "#app" {
  interface NuxtApp {
    $toast: (options: ToastOptions) => void;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $toast: (options: ToastOptions) => void;
  }
}

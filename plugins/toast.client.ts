import { defineNuxtPlugin } from "#app";
import { createApp } from "vue";
import ToasterContainer from "@/components/App/ToasterContainer.vue"; // ToasterContainer import ediyoruz

export default defineNuxtPlugin((nuxtApp) => {
  // ToasterContainer'ı sayfaya ekleyelim
  const mountPoint = document.createElement("div");
  document.body.appendChild(mountPoint);
  const containerApp = createApp(ToasterContainer);
  const containerInstance = containerApp.mount(mountPoint);

  // ToasterContainer içinde sağladığımız addToast fonksiyonunu inject edelim
  nuxtApp.provide("toast", (options) => {
    const addToast = containerInstance.$.provides.addToast;
    if (addToast) {
      addToast(options);
    }
  });
});

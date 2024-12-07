import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("tooltip", {
    beforeMount(el, binding) {
      const content =
        typeof binding.value === "object"
          ? binding.value.content
          : binding.value || "Tooltip";
      const position =
        typeof binding.value === "object"
          ? binding.value.position || "top"
          : "top";

      const tooltipDiv = document.createElement("div");
      tooltipDiv.className =
        "absolute z-10 p-2 bg-zinc-900  text-white text-sm rounded-md shadow-lg opacity-0 transition-opacity duration-300";
      tooltipDiv.innerText = content;
      el.style.position = "relative"; // Ensure positioning context for the tooltip
      el.appendChild(tooltipDiv);

      const updateTooltipPosition = (event: MouseEvent) => {
        const { clientX, clientY } = event;
        const { offsetWidth: tooltipWidth, offsetHeight: tooltipHeight } =
          tooltipDiv;
        const { offsetWidth: elWidth, offsetHeight: elHeight } = el;

        switch (position) {
          case "top":
            tooltipDiv.style.top = `${-tooltipHeight - 10}px`;
            tooltipDiv.style.left = `${elWidth / 2 - tooltipWidth / 2}px`;
            break;
          case "bottom":
            tooltipDiv.style.top = `${elHeight + 10}px`;
            tooltipDiv.style.left = `${elWidth / 2 - tooltipWidth / 2}px`;
            break;
          case "left":
            tooltipDiv.style.top = `${elHeight / 2 - tooltipHeight / 2}px`;
            tooltipDiv.style.left = `${-tooltipWidth - 10}px`;
            break;
          case "right":
            tooltipDiv.style.top = `${elHeight / 2 - tooltipHeight / 2}px`;
            tooltipDiv.style.left = `${elWidth + 10}px`;
            break;
        }
      };

      el.addEventListener("mouseenter", () => {
        tooltipDiv.style.display = "block";
        tooltipDiv.style.opacity = ".8";
      });

      el.addEventListener("mouseleave", () => {
        tooltipDiv.style.opacity = "0";
        setTimeout(() => (tooltipDiv.style.display = "none"), 300); // Match transition duration
      });

      el.addEventListener("mousemove", updateTooltipPosition);
    },
  });
});

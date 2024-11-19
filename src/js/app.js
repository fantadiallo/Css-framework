import router from "./js/index.js";

await router(window.location.pathname);


document.addEventListener('DOMContentLoaded', () => {
  router(window.location.pathname); 
});

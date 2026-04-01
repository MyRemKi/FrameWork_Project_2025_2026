// main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // ton router
import "./index.css"; // Tailwind CSS ou ton CSS global

const app = createApp(App);

app.use(router);

app.mount("#app");
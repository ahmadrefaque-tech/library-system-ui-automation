import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  }
});

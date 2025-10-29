import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  framework: "@storybook/nextjs",
  stories: [
    "../components/**/*.stories.@(ts|tsx)",
    "../stories/**/*.stories.@(ts|tsx)"
  ],
  addons: ["@storybook/addon-essentials"],
  staticDirs: ["../public"]
};
export default config;

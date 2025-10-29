import type { Preview } from "@storybook/react";
import "../app/globals.css";
const preview: Preview = {
  parameters: { layout: "centered", controls: { expanded: true } }
};
export default preview;

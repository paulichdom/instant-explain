import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  background: {
    service_worker: "src/background/main.ts",
  },
  permissions: ["sidePanel", "tabs"],
  icons: {
    48: "public/logo.png",
  },
  action: {
    default_icon: {
      48: "public/logo.png",
    },
  },
  side_panel: {
    default_path: "src/sidepanel/index.html",
  },
});

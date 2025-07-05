import { BackgroundController } from "./controllers/background.controller";
import { TabService } from "./services/tab.service";
import { StorageService } from "./services/storage.service";
import { MessagingService } from "./services/messaging.service";
import { SidePanelService } from "./services/side-panel.service";

const storageService = new StorageService("local");
const tabService = new TabService();
const messagingService = new MessagingService();
const sidePanelService = new SidePanelService();

new BackgroundController(
  storageService,
  tabService,
  messagingService,
  sidePanelService
);

console.log("Background Service Worker initialized.");

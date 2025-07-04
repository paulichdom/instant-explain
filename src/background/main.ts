import { ChromeApiService } from "./chrome-api.service";
import { SidePanelModule } from "./modules/side-panel.module";

const sidePanelModule = new SidePanelModule();
new ChromeApiService(sidePanelModule);

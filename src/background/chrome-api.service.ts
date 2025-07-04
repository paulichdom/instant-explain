import { SidePanelModule } from "./modules/side-panel.module";

export class ChromeApiService {
  private sidePanelModule: SidePanelModule;

  constructor(sidePanelModule: SidePanelModule) {
    this.sidePanelModule = sidePanelModule;
    this.addActionListener();
  }

  private addActionListener = () => {
    chrome.action.onClicked.addListener(() => {
      this.sidePanelModule.open();
    });
  };
}

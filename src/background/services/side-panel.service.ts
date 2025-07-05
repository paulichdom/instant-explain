import { ISidePanelService } from "../../shared/interfaces/ISidePanelService";

export class SidePanelService implements ISidePanelService {
  constructor() {
    this.setPanelBehavior(true);
  }

  public async setPanelBehavior(openPanelOnActionClick: boolean): Promise<void> {
    try {
      await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick });
    } catch (error) {
      console.error("Error setting side panel behavior:", error);
      throw error;
    }
  }

  public async setOptions(
    tabId: number | undefined,
    path: string | undefined,
    enabled: boolean | undefined
  ): Promise<void> {
    try {
      await chrome.sidePanel.setOptions({
        tabId,
        path,
        enabled,
      });
    } catch (error) {
      console.error("Error setting side panel options:", error);
      throw error;
    }
  }

  public async open(tabId?: number, windowId?: number): Promise<void> {
    try {
      if (tabId !== undefined) {
        const options: chrome.sidePanel.OpenOptions = { tabId: tabId };
        if (windowId !== undefined) {
          options.windowId = windowId;
        }
        await chrome.sidePanel.open(options);
      } else {
        const options: chrome.sidePanel.OpenOptions = {
          windowId: windowId !== undefined ? windowId : chrome.windows.WINDOW_ID_CURRENT,
        };
        await chrome.sidePanel.open(options);
      }
    } catch (error) {
      console.error("Error opening side panel:", error);
      throw error;
    }
  }
}

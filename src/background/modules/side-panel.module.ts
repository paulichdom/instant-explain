export class SidePanelModule {
  constructor() {
    this.initializeBehavior();
  }

  private initializeBehavior = () => {
    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) =>
        console.error("Error setting side panel behavior:", error)
      );
  };

  public open = () => {
    chrome.sidePanel
      .open({
        windowId: chrome.windows.WINDOW_ID_CURRENT,
      })
      .catch((error) => console.error("Error opening side panel:", error));
  };
}

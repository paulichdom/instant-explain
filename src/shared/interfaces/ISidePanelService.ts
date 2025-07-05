export interface ISidePanelService {
  setPanelBehavior(openPanelOnActionClick: boolean): Promise<void>;
  setOptions(tabId: number | undefined, path: string | undefined, enabled: boolean | undefined): Promise<void>;
  open(tabId?: number, windowId?: number): Promise<void>;
}

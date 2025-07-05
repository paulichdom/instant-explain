export interface ITabService {
  createTab(url: string, active?: boolean): Promise<chrome.tabs.Tab>;
  updateTab(tabId: number, updateProperties: chrome.tabs.UpdateProperties): Promise<chrome.tabs.Tab | undefined>;
  removeTab(tabId: number | number[]): Promise<void>;
  queryTabs(queryInfo: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]>;
  getCurrentTab(): Promise<chrome.tabs.Tab | undefined>;
} 
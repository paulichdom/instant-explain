import { ITabService } from "../../shared/interfaces/ITabService";

export class TabService implements ITabService {
  async getCurrentTab(): Promise<chrome.tabs.Tab | undefined> {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      return tab;
    } catch (error) {
      console.error("Error getting current tab:", error);
      return undefined;
    }
  }

  async createTab(url: string, active: boolean = true): Promise<chrome.tabs.Tab> {
    try {
      return await chrome.tabs.create({ url, active });
    } catch (error) {
      console.error(`Error creating tab with URL ${url}:`, error);
      throw error;
    }
  }

  async executeScript(tabId: number, file: string): Promise<void> {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [file]
      });
    } catch (error) {
      console.error(`Error executing script ${file} on tab ${tabId}:`, error);
      throw error;
    }
  }

  async updateTab(tabId: number, updateProperties: chrome.tabs.UpdateProperties): Promise<chrome.tabs.Tab | undefined> {
    try {
      return await chrome.tabs.update(tabId, updateProperties);
    } catch (error) {
      console.error(`Error updating tab ${tabId}:`, error);
      throw error;
    }
  }

  async removeTab(tabId: number | number[]): Promise<void> {
    try {
      if (Array.isArray(tabId)) {
        const tabIdsArray: number[] = tabId;
        await chrome.tabs.remove(tabIdsArray);
      } else {
        const tabIdNumber: number = tabId;
        await chrome.tabs.remove(tabIdNumber);
      }
    } catch (error) {
      console.error(`Error removing tab(s) ${tabId}:`, error);
      throw error;
    }
  }

  async queryTabs(queryInfo: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]> {
    try {
      return await chrome.tabs.query(queryInfo);
    } catch (error) {
      console.error("Error querying tabs:", error);
      throw error;
    }
  }
}
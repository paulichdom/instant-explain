import { HighlightMessage, PerformHighlightMessage } from "@/shared/types";
import { MessagingService } from "../services/messaging.service";
import { StorageService } from "../services/storage.service";
import { TabService } from "../services/tab.service";
import { SidePanelService } from "../services/side-panel.service";

export class BackgroundController {
  private storageService: StorageService;
  private tabService: TabService;
  private messagingService: MessagingService;
  private sidePanelService: SidePanelService;

  constructor(
    storageService: StorageService,
    tabService: TabService,
    messagingService: MessagingService,
    sidePanelService: SidePanelService
  ) {
    this.storageService = storageService;
    this.tabService = tabService;
    this.messagingService = messagingService;
    this.sidePanelService = sidePanelService;

    this.initializeListeners();
    this.setupOnInstalled();
  }

  private setupOnInstalled() {
    chrome.runtime.onInstalled.addListener(() => {
      console.log(
        "Extension installed or updated. Performing initial setup..."
      );
      // Example: Set default settings
      this.storageService.set({
        settings: {
          enableFeatureX: true,
          defaultColor: "blue",
        },
      });
    });
  }

  private initializeListeners() {
    // Listen for messages from popup/content scripts
    this.messagingService.on(
      "HIGHLIGHT_TEXT",
      async (_message, sender, sendResponse) => {
        const message = _message as HighlightMessage;
        if (!message.payload) {
          console.error("HighlightMessage payload is missing.");
          sendResponse({
            status: "error",
            message: "Missing message payload.",
          });
          return false;
        }
        const { text, tabId } = message.payload;
        console.log(`Received request to highlight "${text}" on tab ${tabId}`);
        try {
          await this.tabService.executeScript(
            tabId,
            "content-scripts/highlight.js"
          );
          const highlightMessage: PerformHighlightMessage = {
            type: "PERFORM_HIGHLIGHT",
            payload: { text },
          };
          await this.messagingService.sendTabMessage(tabId, highlightMessage);
          sendResponse({
            status: "success",
            message: "Highlight request sent.",
          });
        } catch (error) {
          console.error("Failed to process highlight request:", error);
          sendResponse({ status: "error", message: "Failed to highlight." });
        }
        return true;
      }
    );

    // Example: Listening for tab updates
    chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
      if (
        changeInfo.status === "complete" &&
        tab.url &&
        tab.url.includes("example.com")
      ) {
        console.log(
          `Tab ${tab.id} loaded example.com. Injecting content script.`
        );
        try {
          await this.tabService.executeScript(
            tabId,
            "content-scripts/page-analyzer.js"
          );
        } catch (error) {
          console.error("Failed to inject page-analyzer.js:", error);
        }
      }
    });

    // Example: Handle message from content script
    this.messagingService.on(
      "REQUEST_PAGE_INFO",
      async (message, sender, sendResponse) => {
        if (!sender.tab || !sender.tab.url || !sender.tab.title) {
          sendResponse({
            type: "PAGE_INFO_RESPONSE",
            payload: { url: "N/A", title: "N/A" },
          });
          return;
        }
        sendResponse({
          type: "PAGE_INFO_RESPONSE",
          payload: {
            url: sender.tab.url,
            title: sender.tab.title,
          },
        });
      }
    );
  }

  // Public methods that could be invoked if needed, e.g., for testing
  async getSettings() {
    return this.storageService.get("settings");
  }
}

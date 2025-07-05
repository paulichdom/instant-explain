import { IMessage } from "./interfaces/IMessage";

export type HighlightMessage = IMessage<{
  text: string;
  tabId: number;
}>;

export type SettingsUpdateMessage = IMessage<{
  settings: { [key: string]: any };
}>;

export type PageInfoRequestMessage = IMessage<undefined>;

export type PageInfoResponseMessage = IMessage<{
  url: string;
  title: string;
}>;

export type PerformHighlightMessage = IMessage<{
  text: string;
}>;

export type MessageMap = {
  HIGHLIGHT_TEXT: HighlightMessage;
  SETTINGS_UPDATED: SettingsUpdateMessage;
  REQUEST_PAGE_INFO: PageInfoRequestMessage;
  PAGE_INFO_RESPONSE: PageInfoResponseMessage;
  PERFORM_HIGHLIGHT: PerformHighlightMessage;
};

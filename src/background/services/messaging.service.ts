import { IMessage, IMessagingService } from '../../shared/interfaces/IMessage';
import { MessageMap } from '../../shared/types';

type MessageHandler<T extends IMessage> = (
  message: T,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => boolean | undefined | void | Promise<boolean | undefined | void>;

export class MessagingService implements IMessagingService {
  private handlers: { [K in keyof MessageMap]?: MessageHandler<MessageMap[K]>[] } = {};
  private genericOnMessageCallbacks: ((message: IMessage<any>, sender: chrome.runtime.MessageSender) => void)[] = [];

  constructor() {
    chrome.runtime.onMessage.addListener(this.onMessageReceived.bind(this));
  }

  private onMessageReceived(
    message: IMessage<any>,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ): boolean | undefined | void | Promise<boolean | undefined | void> {
    const handlers = this.handlers[message.type as keyof MessageMap];
    if (handlers) {
      const results = handlers.map(handler => handler(message as any, sender, sendResponse));
      if (results.some(result => result === true)) {
        return true;
      }
    }

    // Call generic onMessage callbacks
    this.genericOnMessageCallbacks.forEach(callback => callback(message, sender));
    
    return false;
  }

  on<K extends keyof MessageMap>(type: K, handler: MessageHandler<MessageMap[K]>): void {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }
    this.handlers[type]!.push(handler);
  }

  onMessage(callback: (message: IMessage<any>, sender: chrome.runtime.MessageSender) => void): void {
    this.genericOnMessageCallbacks.push(callback);
  }

  async sendMessage<T = any>(
    message: IMessage<T>
  ): Promise<any> {
    try {
      const response = await chrome.runtime.sendMessage(message);
      return response;
    } catch (error) {
      if (error instanceof Error && error.message.includes('receiving end does not exist')) {
          console.warn(`No listener for message type ${message.type}.`);
          return undefined; // Keep undefined for consistency in this internal method, interface expects any
      }
      console.error(`Error sending runtime message of type ${message.type}:`, error);
      throw error;
    }
  }

  async sendTabMessage<K extends keyof MessageMap>(
    tabId: number,
    message: MessageMap[K]
  ): Promise<any | undefined> {
    try {
      return await chrome.tabs.sendMessage(tabId, message);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Could not establish connection')) {
          console.warn(`No content script listener for message type ${message.type} on tab ${tabId}.`);
          return undefined;
      }
      console.error(`Error sending tab message of type ${message.type} to tab ${tabId}:`, error);
      throw error;
    }
  }
}
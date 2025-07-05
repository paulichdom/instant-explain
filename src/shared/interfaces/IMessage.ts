export interface IMessage<T = any> {
  type: string;
  payload?: T;
}

export interface IMessagingService {
  sendMessage<T = any>(message: IMessage<T>): Promise<any>;
  onMessage(callback: (message: IMessage<any>, sender: chrome.runtime.MessageSender) => void): void;
} 
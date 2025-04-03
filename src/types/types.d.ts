import { MESSAGE_TYPES } from '../constants';

export interface Report {
  id?: string;
  url: string;
  elementType?: string;
  elementText: string;
  note: string;
  timestamp: string;
}

export interface ChromeMessage {
  type: typeof MESSAGE_TYPES[keyof typeof MESSAGE_TYPES];
  report?: Report;
  source?: 'supabase' | 'local_only';
}

export interface ChromeStorage {
  reports?: Report[];
}

export interface ChromeAPI {
  storage: {
    local: {
      get: (keys: string[], callback: (result: ChromeStorage) => void) => void;
      set: (data: ChromeStorage, callback?: () => void) => void;
    };
  };
  runtime: {
    onMessage: {
      addListener: (callback: (message: ChromeMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => void | boolean) => void;
      removeListener: (callback: (message: ChromeMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => void | boolean) => void;
    };
    sendMessage: (message: ChromeMessage) => void;
  };
  tabs: {
    query: (queryInfo: { active: boolean; currentWindow: boolean }, callback: (tabs: chrome.tabs.Tab[]) => void) => void;
    sendMessage: (tabId: number, message: ChromeMessage) => void;
  };
}

declare global {
  interface Window {
    chrome: ChromeAPI;
  }
}

declare const chrome: ChromeAPI;

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
} 
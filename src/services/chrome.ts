import { Report, ChromeMessage } from '../types/types';
import { MAX_REPORTS } from '../constants';

export const ChromeStorageService = {
  getReports: async (): Promise<Report[]> => new Promise((resolve) => {
    window.chrome.storage.local.get(['reports'], (result: { reports?: Report[] }) => {
      resolve(result.reports?.slice(-MAX_REPORTS) || []);
    });
  })
};

export const ChromeMessagingService = {
  addMessageListener: (callback: (message: ChromeMessage) => void): (() => void) => {
    window.chrome.runtime.onMessage.addListener(callback);
    return () => window.chrome.runtime.onMessage.removeListener(callback);
  }
};

export const ChromeTabService = {
  getCurrentTab: async (): Promise<chrome.tabs.Tab> => {
    const [tab] = await new Promise<chrome.tabs.Tab[]>((resolve) => {
      window.chrome.tabs.query({ active: true, currentWindow: true }, resolve);
    });

    if (!tab?.id) {
      throw new Error('No active tab found');
    }

    return tab;
  }
};

export const ChromeService = {
  getReports: async (): Promise<Report[]> => ChromeStorageService.getReports(),

  toggleHighlightMode: async (): Promise<void> => {
    try {
      const tab = await ChromeTabService.getCurrentTab();
      await window.chrome.tabs.sendMessage(tab.id!, { type: 'TOGGLE_HIGHLIGHT' });
    } catch (error) {
      console.error('Failed to toggle highlight mode:', error);
      throw error;
    }
  },

  addMessageListener: (callback: (message: ChromeMessage) => void): (() => void) => 
    ChromeMessagingService.addMessageListener(callback)
}; 
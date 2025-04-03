import { ChromeAPI } from '.';

declare global {
  interface Window {
    chrome: ChromeAPI;
  }
}

export {}; 
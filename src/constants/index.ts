export const NOTIFICATION_DURATION = 3000;
export const MAX_REPORTS = 5;
export const DEFAULT_ICON_SIZE = 3;

export const KEYBOARD_SHORTCUTS = {
  TOGGLE_HIGHLIGHT: {
    keys: ['Ctrl', 'Shift', 'B'],
    label: 'Toggle Highlight'
  }
} as const;

export const DEFAULT_MESSAGES = {
  NO_REPORTS: 'No reports yet',
  NO_REPORTS_SUBTEXT: 'Reports will appear here after submission',
  NO_TEXT: 'No text',
  NO_NOTES: 'No notes provided'
} as const;

export const MESSAGE_TYPES = {
  TOGGLE_HIGHLIGHT: "TOGGLE_HIGHLIGHT",
  SUBMIT_REPORT: "SUBMIT_REPORT",
  NEW_REPORT: "NEW_REPORT"
};

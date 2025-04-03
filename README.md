# Chrome Extension Bug Reporter

A Chrome extension that helps users report broken buttons and links on any webpage. The extension allows users to highlight interactive elements, flag them as broken, and store the reports in a Supabase database.

## Features

- 🔍 **Element Highlighting**: Automatically outlines all `<button>` and `<a>` elements on any webpage
- 🚩 **Quick Flagging**: Hover over any button/link to reveal a flag icon
- 📝 **Report Submission**: Add notes to your reports through a simple form
- 💾 **Cloud Storage**: All reports are stored in Supabase
- 📊 **Report History**: View your 5 most recent reports in the extension popup
- ⌨️ **Keyboard Shortcuts**: Toggle highlight mode with keyboard shortcuts

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/3mmar3mmarYasser/bug-reporter.git
   cd bug-reporter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` directory from this project

## Development

- Run the development server:
  ```bash
  npm run dev
  ```

- Build for production:
  ```bash
  npm run build
  ```

- Lint the code:
  ```bash
  npm run lint
  ```

## Usage

1. Click the extension icon to activate the bug reporter
2. Hover over any button or link on the webpage
3. Click the flag icon that appears
4. Add a note describing the issue
5. Submit the report
6. View your recent reports in the extension popup

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- Chrome Extension API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

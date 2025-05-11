# Selenium Javascript Component Pattern

---

Ready-to-use UI Test Automation Architecture using Javascript and Selenium

# Run Test using GitHub Actions

---

## Test Execution

To execute tests using GitHub Actions, follow these steps:

1. Go to the "Actions" tab of your selenium-js-component-pattern repository.
2. Click on "Workflow" from the side menu.
3. Click on Run workflow dropdown button.
4. Select the branch you want to execute (e.g., "master").
5. Click on the "Run workflow" button.

# Run Test Locally

---

## Installation

1. Install Node.js (v16 or later recommended).
2. Clone the repository:

`git clone https://github.com/Bh-bts/selenium-js-component-pattern.git`

`cd selenium-js-component-pattern`

3. Install Dependencies ```npm install```
4. Run the Test ```npm test```

Folder Structure:

```

javascript-selenium-framework/
├── .github/
│   └── workflows/
│       └── chrome-build.yml           # GitHub Actions CI workflow
├── tests/
│   ├── baseUI/
│   │   ├── Components/
│   │   │   ├── Button.js              # Button UI component
│   │   │   ├── CheckBox.js            # Checkbox UI component
│   │   │   ├── DropDown.js            # Dropdown UI component
│   │   │   ├── TextInput.js           # Text input field
│   │   │   ├── TextView.js            # Text display component
│   │   │   └── WebComponent.js        # Base web component
│   │   ├── Browser.js                 # WebDriver setup
│   │   ├── BrowserFactory.js          # Browser factory logic
│   │   ├── SelectorType.js            # Enum for selector strategies
│   ├── pages/
│   │   ├── AllPages.js                # Central page object export
│   │   ├── BasePage.js                # Base class for all pages
│   │   └── LoginPage.js               # Page object for login screen
│   ├── specs/
│   │   └── login.spec.js              # Login test case
│   └── utils/
│       ├── AssertUtil.js              # Custom assertion helpers
│       ├── ConfigFactory.js           # Loads test configurations
│       ├── FileUtil.js                # File operation utilities
│       ├── Logger.js                  # Logger setup and usage
│       ├── ProcessUtil.js             # Process management helpers
│       ├── ScreenshotUtil.js          # Screenshot capture utility
│       ├── StringUtil.js              # String manipulation helpers
│       └── TestConfig.js              # Test configuration constants
├── .gitignore
├── README.md

```

# Languages and Frameworks

- JavaScript (ES6+)
- Selenium WebDriver
- Node.js & NPM
- GitHub Actions for CI/CD






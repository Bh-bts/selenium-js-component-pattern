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
│       └── chrome-build.yml              # GitHub Actions CI workflow
├── tests/
│   ├── baseUI/
│   │   ├── Components/
│   │   │   ├── Button.js
│   │   │   ├── CheckBox.js
│   │   │   ├── DropDown.js
│   │   │   ├── TextInput.js
│   │   │   ├── TextView.js
│   │   │   └── WebComponent.js
│   │   ├── Browser.js
│   │   ├── BrowserFactory.js
│   │   ├── ConfigFactory.js
│   │   ├── FileUtil.js
│   │   ├── ProcessUtil.js
│   │   ├── SelectorType.js
│   │   ├── StringUtil.js
│   │   └── TestConfig.js
│   ├── pages/
│   │   ├── AllPages.js
│   │   ├── BasePage.js
│   │   └── LoginPage.js
│   └── specs/
│       └── login.spec.js              # Sample test script
├── .gitignore
├── README.md

```

# Languages and Frameworks

- JavaScript (ES6+)
- Selenium WebDriver
- Node.js & NPM
- GitHub Actions for CI/CD






class TestConfig {
    // Properties
    baseURL;                  // Base URL for the application
    browser;                  // Browser type
    headless;                 // Flag indicating whether the browser should run in headless mode
    defaultElementTimeout
    defaultPageLoadTimeout
    defaultTestTimeout
    reportFormat;             // Format of the reports
    reportOutputPath;         // Path where the reports are stored
    logLevel;                 // Level of logging
    logOutputPath;            // Path where the log file is stored

    // Constructor
    constructor() {
        // Set default values for the properties
        this.baseURL = "https://demo.opencart.com/";
        this.browser = "chrome";
        this.headless = false;
        this.defaultElementTimeout = 30000
        this.defaultPageLoadTimeout = 60000
        this.defaultTestTimeout = 300000
        this.reportFormat = "html";
        this.reportOutputPath = "reports/";
        this.logLevel = "info";
        this.logOutputPath = "logs/test-log.txt";
    }
}

// Export the TestConfig class
module.exports = TestConfig;

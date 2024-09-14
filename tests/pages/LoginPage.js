const BasePage = require("./BasePage");

class LoginPage extends BasePage {
    constructor(browser) {
        super(browser);
        this.browser = browser;
        this.url = browser.getOpencartBaseUrl();
    }

    async goToLoginPage() {
        await super.goTo(this.url);
        await this.browser.waitUntilPageIsLoaded();
    }
}

module.exports = LoginPage;

const Button = require('./../baseUI/Components/Button');
const BasePage = require("./BasePage");
const SelectorType = require("../baseUI/SelectorType");

class LoginPage extends BasePage {

    myAccountLink = '//li/div/a[@class="dropdown-toggle"]';
    loginLink = '//a[text()="Login"]';
    verifyYouAreHumanText = '//h2[text()="Verifying you are human. This may take a few seconds."]';

    constructor(browser) {
        super(browser);
        this.browser = browser;
        this.url = browser.getOpencartBaseUrl();
    }

    async goToLoginPage() {
        await super.goTo(this.url);
        await this.browser.waitUntilPageIsLoaded();
    }

    getMyAccountLink() {
        return new Button(this.browser, SelectorType.XPATH, this.myAccountLink);
    }

    async clickOnMyAccountLink() {
        await this.getMyAccountLink().click();
        await this.browser.waitForElementInvisible(this.verifyYouAreHumanText);
    }

    getLoginLink() {
        return new Button(this.browser, SelectorType.XPATH, this.loginLink);
    }

    async clickOnLoginLink() {
        await this.getLoginLink().click();
    }
}

module.exports = LoginPage;

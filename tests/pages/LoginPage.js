const Button = require('./../baseUI/Components/Button');
const BasePage = require("./BasePage");
const SelectorType = require("../baseUI/SelectorType");
const TextInput = require('../baseUI/Components/TextInput');

class LoginPage extends BasePage {

    userName = '//input[@name="username"]';
    passWord = '//input[@type="password"]';
    submitButton = '//button[@type="submit"]';

    constructor(browser) {
        super(browser);
        this.browser = browser;
        this.url = browser.getOpencartBaseUrl();
    }

    async goToLoginPage() {
        await super.goTo(this.url);
        await this.browser.waitUntilPageIsLoaded();
    }

    getUserName() {
        return new TextInput(this.browser, SelectorType.XPATH, this.myAccountLink);
    }

    async sendTextOnUsername() {
        await this.getUserName().fastType()
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

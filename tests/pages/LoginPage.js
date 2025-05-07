const Button = require('./../baseUI/Components/Button');
const BasePage = require("./BasePage");
const SelectorType = require("../baseUI/SelectorType");
const TextInput = require('../baseUI/Components/TextInput');

class LoginPage extends BasePage {

    login = '//button[@id="loginBtn"]';
    userName = '//input[@name="username"]';
    passWord = '//input[@type="password"]';
    submitButton = '//button[@type="submit"]';

    constructor(browser) {
        super(browser);
        this.browser = browser;
        this.url = browser.getMypustakBaseUrl();
    }

    async goToLoginPage() {
        await super.goTo(this.url);
        await this.browser.waitUntilPageIsLoaded();
    }

    getLoginButton(){
        return new Button(this.browser, SelectorType.XPATH, this.login)
    }

    async clickLoginButton(){
        await this.getLoginButton().click()
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

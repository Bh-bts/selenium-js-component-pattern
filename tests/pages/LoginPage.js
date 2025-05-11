const Button = require('./../baseUI/Components/Button');
const BasePage = require("./BasePage");
const SelectorType = require("../baseUI/SelectorType");
const TextInput = require('../baseUI/Components/TextInput');
const logger = require('../utils/Logger');

class LoginPage extends BasePage {

    login = '//button[@id="loginBtn"]';
    email = '//input[@id=":r2:"]';
    passWord = '//input[@id=":rr:"]';
    proceedButton = '//button[text()="Proceed"]';
    popUpLoginButton = '//form/button[text()="Login"]';

    constructor(browser) {
        super(browser);
        this.browser = browser;
        this.url = browser.getMypustakBaseUrl();
    }

    async goToLoginPage() {
        logger.info("Navigating to login page");
        await super.goTo(this.url);
        await this.browser.waitUntilPageIsLoaded();
    }

    getLoginButton(){
        return new Button(this.browser, SelectorType.XPATH, this.login);
    }

    async clickLoginButton(){
        logger.info("Clicking login button");
        await this.getLoginButton().click();
    }

    async getLoginButtonText() {
        return await this.getLoginButton().getText();
    }

    getEmail() {
        return new TextInput(this.browser, SelectorType.XPATH, this.email);
    }

    async sendTextOnEmail(email) {
        logger.info("Entering email...");
        await this.getEmail().slowType(email);
    }

    getPassword() {
        return new TextInput(this.browser, SelectorType.XPATH, this.passWord);
    }

    async sendTextOnPassword(password) {
        logger.info("Entering password...");
        await this.getPassword().slowType(password);
    }

    getSubmitButton() {
        return new Button(this.browser, SelectorType.XPATH, this.proceedButton);
    }

    async clickProceedButton() {
        logger.info("Clicking Proceed...");
        await this.getSubmitButton().click();
    }

    getPopUpLoginButton() {
        return new Button(this.browser, SelectorType.XPATH, this.popUpLoginButton);
    }

    async clickPopUpLoginButton() {
        logger.info('Clicking Login Button')
        await this.getPopUpLoginButton().click();
    }

}

module.exports = LoginPage;

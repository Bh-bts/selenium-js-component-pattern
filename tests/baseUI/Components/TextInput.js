const { Key } = require('selenium-webdriver');
const WebComponent = require("./WebComponent");

class TextInput extends WebComponent {
    constructor(browser, selectorType, locator) {
        super(browser, selectorType, locator);
    }

    async slowType(text, pressEnter = false) {
        try {
            await this.browser.slowType(this.selectorType, this.locator, text, pressEnter);
        } catch (error) {
            await this.browser.issueError(error);
        }
    }

    async fastType(text) {
        try {
            let inputField;
            if (await this.browser.getBrowserName() === 'safari') {
                inputField = await this.browser.sendKeysJS(this.selectorType, this.locator, text);
            } else {
                inputField = await this.browser.sendKeysJS(this.selectorType, this.locator, text);
            }
            await inputField.getAttribute('value');
        } catch (error) {
            await this.browser.issueError(error);
        }
    }

    async pressEnter() {
        const element = await this.findElementOrFailStep();
        try {
            element.sendKeys(Key.ENTER);
        } catch (error) {
            await this.browser.issueError(error);
        }
    }

    async clickJS() {
        await this.browser.clickJS(this.selectorType, this.locator);
    }
}

module.exports = TextInput;

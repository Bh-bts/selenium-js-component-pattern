const WebComponent = require("./WebComponent");

class Button extends WebComponent {
    constructor(browser, selectorType, locator){
        super(browser, selectorType, locator);
    }

    async click(){
        await this.browser.click(this.selectorType, this.locator);
        await this.browser.delay(1000);
    }

    async clickJS(){
        await this.browser.clickJS(this.selectorType, this.locator);
        await this.browser.delay(1000);
    }

    async getText(){
        return await this.browser.getText(this.selectorType, this.locator);
    }
}

module.exports = Button;

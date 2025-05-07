/**
 * @class BasePage
 * @description Abstract base class for all page objects. Handles common navigation and utility methods.
 *
 * @author Bhavin Thumar
 */

class BasePage {
    constructor(browser) {
        if (this.constructor === BasePage) {
            throw new Error("Abstract class cannot be instantiated!");
        }
        this.url = "";
        this.browser = browser;
    }

    getPageName() {
        return this.constructor.name;
    }

    async goTo(url = null) {
        try {
            if (!url) {
                url = this.url
            }
            await this.browser.navigate(url);
        } catch(error){
            await ProcessUtil.errorToPromiseError(`Page: '${this.getPageName()}' tried to go to URL: ${this.url}`);
        }
    }

    currentUrl(){
        return this.browser.getCurrentUrl();
    }
}

module.exports = BasePage;

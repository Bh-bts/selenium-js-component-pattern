class DropDown {
    constructor(browser, selectorType, locator) {
        super(browser, selectorType, locator);
    }

    async selectDropdownByText(text) {
        try {
            return await this.browser.selectDropdownByText(this.selectorType, this.locator, text);
        } catch (error) {
            return await this.browser.issueError(error);
        }
    }

    async selectDropdownByValue(value) {
        try {
            return await this.browser.selectDropdownByValue(this.selectorType, this.locator, value);
        } catch (error) {
            return await this.browser.issueError(error);
        }
    }
}

module.exports = DropDown

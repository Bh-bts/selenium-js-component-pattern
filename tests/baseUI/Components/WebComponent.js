class WebComponent {
    constructor(browser, selectorType, locator) {
        this.browser = browser;
        this.selectorType = selectorType;
        this.locator = locator;
    }

    async click() {
        try {
            await this.browser.scrollIntoView(this.selectorType, this.locator);
            await this.browser.click(this.selectorType, this.locator)
        } catch (error) {
            console.log("Error is: " + error);
            await this.browser.clickJs(this.selectorType, this.locator);
        }
    }

    async hover() {
        try {
            await this.browser.hover(this.selectorType, this.locator);
        } catch (error) {
            await this.browser.issueError(error);
        }
    }

    async findElementOrFailStep() {
        let element;
        try {
            element = await this.browser.findBySelectorType(this.selectorType, this.locator);
            return element;
        } catch (error) {
            await this.browser.issueError(error);
            throw error
        }
    }

    async isAvailableAndDisplayed(withinSeconds) {
        try {
            const element = await this.findElementOrFailStep(withinSeconds);
            const isElementDisplayed = await element.isDisplayed();
            return isElementDisplayed;
        } catch (error) {
            console.log(`Element '${this.selectorType}': '${this.locator}' is not found within: ${withinSeconds}. Timeout error occurred! \n${e} `);
            return false;
        }
    }

    async isDisplayedOnView(withinSeconds) {
        const element = await this.findElementOrFailStep(withinSeconds);
        const isElementVisible = await element.isElementVisibleOnView(element);
        console.info(`isElementVisibleOnView: For element '${this.selectorType}': '${this.locator}' is '${isElementVisible}'!`);
        return isElementVisible;
    }

    async waitUntilEnabled() {
        try {
            await this.browser.waitUntilEnabled(this.selectorType, this.locator);
        } catch (error) {
            await this.browser.issueError(error, `To wait until element: ${this.selectorType}': '${this.locator}' is enabled.`, error.message);
        }
    }

    async getAttributeError(attributeName) {
        const element = await this.findElementOrFailStep();
        return await element.getAttribute(attributeName);
    }

    async getElementSize() {
        const elements = await this.browser.findAllBySelectorType(this.selectorType, this.locator);
        return elements.length;
    }
}

module.exports = WebComponent;

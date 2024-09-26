const ConfigFactory = require("./ConfigFactory");
const SelectorType = require("./SelectorType");
const ProcessUtil = require("./ProcessUtil");
const { until, By, WebElement, Key } = require("selenium-webdriver");

class Browser {
    mainWindowHandler = "";

    constructor(mochaContext, driver) {
        this.testConfig = ConfigFactory.getConfig();
        this.mochaContext = mochaContext;
        this.driver = driver;
    }

    /**
    * Waits for the page to load completely.
    * @param {number} timeout - Timeout in milliseconds (optional).
    */
    async waitForPageLoad(timeout = 60000) {
        const waitTimeout = timeout || this.testConfig.defaultPageLoadTimeout
        await this.driver.wait(until.elementLocated({ css: 'body' }), waitTimeout);
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement({ css: 'body' })), waitTimeout);
    }

    /**
     * Waits for the element to become visible.
     * @param {string} selector - CSS selector for the element.
     * @param {number} timeout - Timeout in milliseconds (optional).
     * @returns {WebElement} - The visible element.
     */
    async waitForElementVisible(selector, timeout = 5000) {
        const waitTimeout = timeout || this.testConfig.defaultElementTimeout;
        const element = await this.driver.wait(until.elementIsVisible(await this.driver.findElement(By.css(selector))), waitTimeout);
        return element;
    }

    /**
     * Waits for the element to become visible.
     * @param {string} selector - Xpath selector for the element.
     * @param {number} timeout - Timeout in milliseconds (optional).
     * @returns {WebElement} - The visible element.
     */
    async waitForElementVisibleXpath(selector, timeout = 5000) {
        const waitTimeout = timeout || this.testConfig.defaultElementTimeout
        const element = await this.driver.wait(until.elementIsVisible(await this.driver.findElement(By.xpath(selector))), waitTimeout);
        return element;
    }

    /**
     * Waits for the element to become Invisible.
     * @param {string} selector - Xpath selector for the element.
     * @param {number} timeout - Timeout in milliseconds (optional).
     * @returns {WebElement} - The Invisible element.
     */
    async waitForElementInvisible(selector, timeout = 5000) {
        const waitTimeout = timeout || this.testConfig.defaultElementTimeout;
        try {
            const element = await this.driver.findElement(By.xpath(selector));

            await this.driver.wait(async () => {
                try {
                    // Check if the element is not displayed (i.e., invisible)
                    const isDisplayed = await element.isDisplayed();
                    return !isDisplayed; // Wait until it returns false (element is not visible)
                } catch (error) {
                    // If element is not found or stale (removed from DOM), consider it as invisible
                    if (error.name === 'StaleElementReferenceError' || error.name === 'NoSuchElementError') {
                        return true; // Treat as invisible since it's not in the DOM
                    }
                    throw error; // Re-throw other unexpected errors
                }
            }, waitTimeout);
        } catch (error) {
            console.error('Error waiting for element to become invisible:', error);
            throw error;
        }

    }

    /**
     * Executes JavaScript code on the browser.
     * Used for enabling Safari Developer options on remote browsers.
     */
    javascriptExecutor() {
        return this.driver.executeScript("safariOptions = {technologyPreview: true};");
    }

    /**
     * Get the selected browser.
     * @returns {string} - The browser name.
     */
    getBrowserName() {
        return this.testConfig.browser;
    }

    /**
     * Get the Opencart application URL.
     * @returns {string} - The Opencart application URL.
     */
    getOpencartBaseUrl() {
        return this.testConfig.baseURL;
    }

    /**
     * Waits until the page is loaded.
     * @returns {Promise<void>} - A promise that resolves when the page is loaded.
     */
    async getCurrentUrl() {
        await this.waitUntilPageIsLoaded();
        return await this.driver.getCurrentUrl();
    }

    /**
     * Navigate to a specified URL.
     * @param {string} url - The URL to navigate to.
     */
    async navigate(url) {
        await this.driver.navigate().to(url);
        this.clearMainWindowHandler();
    }

    /**
     * Clear the main window handler.
     */
    clearMainWindowHandler() {
        this.mainWindowHandler = "";
    }

    /**
     * Close the browser.
     */
    async close() {
        await this.driver.quit();
    }

    /**
     * Finds a web element based on the selector type and locator.
     * @param {string} selectorType - The type of selector to use. Either 'css' or 'xpath'.
     * @param {string} locator - The selector to locate the element.
     * @param {number} [timeout] - Optional. The maximum time to wait for the element to appear in milliseconds.
     * @return {Promise} A Promise that resolves to the located web element.
     */
    async findBySelectorType(selectorType, locator, timeout) {
        return selectorType === SelectorType.CSS ?
            (timeout ? await this.findByCss(locator, timeout) : await this.findByCss(locator)) :
            (timeout ? await this.findByXPath(locator, timeout) : await this.findByXPath(locator))
    }

    /**
     * Find an element by CSS selector.
     * @param {string} cssPath - The CSS selector.
     * @param {number} timeout - Timeout in milliseconds (optional).
     * @param {boolean} multipleElements - Whether to find multiple elements or not (default: false).
     * @return {Promise<WebElement|Array<WebElement>>} - A promise that resolves to the found element(s) (or an array of elements).
     * @throws {Error} - If the element(s) cannot be located within the specified timeout.
     */
    async findByCss(cssPath, timeout, multipleElements = false) {
        const optTimeout = timeout || this.testConfig.defaultElementTimeout;
        const condition = until.elementLocated(By.css(cssPath));
        return new Promise((resolve, reject) => {
            this.driver.wait(condition.fn, optTimeout, `could not load element with given css selector: ${cssPath}`)
                .then(() => {
                    if (multipleElements) {
                        return this.driver.findElements(By.css(cssPath))
                    } else {
                        return this.driver.findElement(By.css(cssPath))
                    }
                })
                .then(resolve)
                .catch(reject)
        })
    }

    /**
     * Find an element by XPath selector.
     * @param {string} xPath - The XPath selector.
     * @param {number} timeout - Timeout in milliseconds (optional).
     * @param {boolean} multipleElements - Whether to find multiple elements or not (default: false).
     * @return {Promise<WebElement|Array<WebElement>>} A promise that resolves to a single WebElement or an array of WebElements.
     */
    async findByXPath(xPath, timeout, multipleElements = false) {
        const optTimeout = timeout || this.testConfig.defaultElementTimeout;
        const condition = until.elementLocated(By.xpath(xPath));
        return new Promise((resolve, reject) => {
            this.driver.wait(condition.fn, optTimeout, `could not load the element with given xpath selector: ${xPath}`)
                .then(() => {
                    if (multipleElements) {
                        return this.driver.findElements(By.xpath(xPath))
                    } else {
                        return this.driver.findElement(By.xpath(xPath))
                    }
                })
                .then(resolve)
                .catch(reject)
        })
    }

    /**
     * Finds all elements based on the selector type and locator.
     *
     * @param {string} selectorType - The selector type to be used. Must be a valid value from the SelectorType enum.
     * @param {string} locator - The locator value to be used for finding the elements.
     * @return {Promise<Array>} - A promise that resolves to an array of WebElements matching the selector and locator.
     */
    async findAllBySelectorType(selectorType, locator) {
        return selectorType = SelectorType.CSS ?
            await this.findByCss(locator, this.testConfig.defaultElementTimeout, true) :
            await this.findByXPath(locator, this.testConfig.defaultElementTimeout, true)
    }

    /**
     * Delay execution for a specified time.
     * @param {number} timeInMillis - The delay time in milliseconds.
     * @returns {Promise<void>}
     */
    async delay(timeInMillis) {
        return await new Promise((resolve) => setTimeout(resolve, timeInMillis))
    }

    /**
     * Wait until an element is both visible and enabled.
     * @param {WebElement} element - The element to wait for.
     */
    async waitUntilElementEnabled(element) {
        await this.driver.wait(
            async () => {
                try {
                    return (await element?.isDisplayed()) === true;
                } catch (error) {
                    return false; // Handle if the element doesn't exist
                }
            },
            this.testConfig.defaultElementTimeout,
            'Element is not visible!'
        );

        await this.driver.wait(
            async () => {
                try {
                    return (await element?.isEnabled()) === true;
                } catch (error) {
                    return false; // Handle if the element doesn't exist
                }
            },
            this.testConfig.defaultElementTimeout,
            'Element is not enabled!'
        );
    }

    /**
     * Wait until an element specified by selector type and locator is enabled.
     * @param {string} selectorType - The selector type (CSS or XPath).
     * @param {string} locator - The locator value.
     */
    async waitUntilEnabled(selectorType, locator) {
        const element = await this.findBySelectorType(selectorType, locator);
        await this.waitUntilElementEnabled(element);
    }

    /**
     * Wait until the page is fully loaded.
     * @returns {Promise<boolean>} - Resolves to true if the page is loaded, false otherwise.
     */
    async waitUntilPageIsLoaded() {
        return await this.driver.executeScript('return document.readyState', this.testConfig.defaultPageLoadTimeout)
            .then((readyState) => readyState === 'complete');
    }

    /**
     * Scroll an element specified by selector type and locator into view.
     * @param {string} selectorType - The selector type (CSS or XPath).
     * @param {string} locator - The locator value.
     */
    async scrollIntoView(selectorType, locator) {
        const element = await this.findBySelectorType(selectorType, locator);
        const javaScript = "arguments[0].scrollIntoView(true);";
        await this.executeJavaScript(javaScript, element);
    }

    /**
    * Check if an element is visible within the current view.
    * @param {WebElement} element - The element to check visibility for.
    * @returns {boolean} - True if the element is visible, false otherwise.
    */
    async isElementVisibleOnView(element) {
        return await this.executeJavaScript("return window.getComputedStyle(arguments[0]).visibility!=='hidden'", element);
    }

    /**
    * Clear the value of a text field element.
    * @param {WebElement} element - The text field element to clear.
    */
    async clear(element) {
        await element.clear();
    }

    /**
    * Enter text into a text field element.
    * @param {string} selectorType - The selector type (CSS or XPath).
    * @param {string} locator - The locator value.
    * @param {string} text - The text to enter.
    * @returns {WebElement} - The text field element.
    */
    async sendKeys(selectorType, locator, text, clear = true) {
        const element = await this.findBySelectorType(selectorType, locator);
        await this.waitUntilElementEnabled(element);

        if (clear) {
            await element.clear();
        }

        await element.sendKeys(text);
        return element;
    }

    /**
    * Enter text into a text field element using JavaScript.
    * @param {string} selectorType - The selector type (CSS or XPath).
    * @param {string} locator - The locator value.
    * @param {string} text - The text to enter.
    * @returns {WebElement} - The text field element.
    */
    async sendKeysJS(selectorType, locator, text) {
        const element = await this.findBySelectorType(selectorType, locator);
        await this.waitUntilElementEnabled(element);
        await this.delay(200);
        await this.executeJavaScript(`arguments[0].value=''`, element);
        await this.delay(200);
        const javaScript = `arguments[0].value='${text}'`;
        await this.executeJavaScript(javaScript, element);
        return element;
    }

    /**
    * Slowly type text into a text field element.
    * @param {string} selectorType - The selector type (CSS or XPath).
    * @param {string} locator - The locator value.
    * @param {string} text - The text to type.
    * @param {boolean} pressEnter - Whether to press Enter key after typing.
    * @returns {WebElement} - The text field element.
    */
    async slowType(selectorType, locator, text, pressEnter) {
        const element = await this.findBySelectorType(selectorType, locator);
        await element.clear();
        for (let i = 0; i < text.length; i++) {
            await element.sendKeys(text[i]);
            await this.delay(text.length - i > 4 ? 50 : 150);
        }
        if (pressEnter) await element.sendKeys(Key.ENTER);
        return element;
    }

    /**
     * Get the text of an element specified by selector type and locator.
     * @param {string} selectorType - The selector type (CSS or XPath).
     * @param {string} locator - The locator value.
     * @returns {string} - The text of the element.
     */
    async getText(selectorType, locator) {
        const element = await this.findBySelectorType(selectorType, locator);
        const result = await element.getText();
        return result;
    }

    /**
   * 
   * Select an option from a dropdown by its visible text.
   * @param {string} selectorType - The selector type (CSS or XPath).
   * @param {string} locator - The locator value.
   * @param {string} text - The visible text of the option to select.
   */
    async selectDropdownByText(selectorType, locator, text) {
        const element = await this.findBySelectorType(selectorType, locator);
        const options = await element.findElements(By.css("option"));

        for (const option of options) {
            const optionText = await option.getText();
            if (optionText == text) {
                await option.click();
                return;
            }
        }
        throw new Error(`SelectDropdownByText text not found "${text}" for control with path: ${path}`);
    }

    /**
     * Select an option from a dropdown by its value attribute.
     * @param {string} selectorType - The selector type (CSS or XPath).
     * @param {string} locator - The locator value.
     * @param {string} value - The value attribute of the option to select.
     */
    async selectDropdownByValue(selectorType, locator, value) {
        const element = await this.findBySelectorType(selectorType, locator);
        const options = await element.findElements(By.css(`option[value="${value}"]`));

        if (options.length > 0) {
            await options[0].click();
        } else {
            throw new Error(`SelectDropdownByValue text not found "${value}" for control with path: ${path}`);
        }
    }

    /**
     * Click on an element.
     * @param {string} selectorType - The selector type (CSS or XPath).
     * @param {string} locator - The locator value.
     */
    async click(selectorType, locator) {
        const element = await this.findBySelectorType(selectorType, locator);
        await this.waitUntilElementEnabled(element);
        await element.click();
    }

    /**
     * Click on an element using JavaScript.
     * @param {string} selectorType - The selector type (CSS or XPath).
     * @param {string} locator - The locator value.
     */
    async clickJS(selectorType, locator) {
        const element = await this.findBySelectorType(selectorType, locator);
        await this.waitUntilElementEnabled(element);
        await this.executeJavaScript("arguments[0].click();", element);
    }

    /**
   * Capture a screenshot of the current page.
   */
    async captureScreenshot() {
        try {
            const screenshot = await this.driver.takeScreenshot();
            return `data:image/png;base64,${screenshot}`;
        } catch (error) {
            console.error('Error capturing screenshot: ', error);
        }
    }

    /**
     * Switch to the first browser tab.
     */
    async switchToFirstBrowserTab() {
        await this.switchToBrowserTab(0);
    }

    /**
     * Get all window handles.
     * @returns {Promise<string[]>} - An array of window handles.
     */
    async getAllWindowHandles() {
        return await this.driver.getAllWindowHandles();
    }

    /**
     * Get the current window handle.
     * @returns {Promise<string>} - The current window handle.
     */
    async getCurrentWindowHandle() {
        return await this.driver.getWindowHandle();
    }

    /**
     * Switch to the last browser tab.
     */
    async switchToLastBrowserTab() {
        const allWinHandles = await this.getAllWindowHandles();
        const lastBrowserTabIndex = allWinHandles.length - 1;
        await this.switchToBrowserTab(lastBrowserTabIndex);
    }

    /**
     * Switch to a specific browser tab by index.
     * @param {number} index - The index of the tab to switch to.
     * @returns {Promise<number>} - The index of the switched tab.
     */
    async switchToBrowserTab(index) {
        const tabs = await this.driver.getAllWindowHandles();
        const handle = tabs[index];
        await this.driver.switchTo().window(handle);
        const currentUrl = await this.driver.getCurrentUrl();
        return index;
    }

    /**
     * Close the current browser tab.
     */
    async closeBrowserTab() {
        try {
            await this.driver.getCurrentUrl();
            await this.driver.close();
        } catch (e) {
            console.info("[Error while closing browser tab!]", e);
        }
    }

    /**
     * Clear the main window handler.
     */
    clearMainWindowHandler() {
        this.mainWindowHandler = "";
    }

    /**
     * Switch to an iframe.
     * @param {string} selectorType - The selector type for the iframe element.
     * @param {string} locator - The locator for the iframe element.
     */
    async switchToIFrame(selectorType, locator) {
        if (!this.mainWindowHandler) {
            this.mainWindowHandler = await this.driver.getWindowHandle();
        }

        const element = await this.findBySelectorType(selectorType, locator);
        if (element.length > 1) {
            console.warn("WARNING: More than 1 iframes are found. Please fix the locator.");
        }
        await this.waitUntilElementEnabled(element);
        await this.driver.switchTo().frame(element);
    }

    /**
     * Switch to the default frame.
     */
    async switchToDefaultFrame() {
        await this.driver.switchTo().frame(0);
    }

    /**
     * Switch to the main window.
     */
    async switchToMainWindow() {
        if (!this.mainWindowHandler) {
            await this.driver.switchTo().window(this.mainWindowHandler);
            this.clearMainWindowHandler();
        }
        await this.driver.switchTo().defaultContent();
    }

    /**
     * Execute JavaScript code.
     * @param {string} javaScript - The JavaScript code to execute.
     * @param {*} args - Arguments to pass to the JavaScript code.
     * @returns {*} - The output of the JavaScript execution.
     */
    async executeJavaScript(javaScript, args) {
        const jsOutput = await this.driver.executeScript(javaScript, args);
        return jsOutput;
    }

    /**
     * Issue an error.
     * @param {Error} error - The error to issue.
     */
    async issueError(error) {
        await ProcessUtil.errorToPromiseError(error);
    }

    /**
     * Hover over an element.
     * @param {string} selectorType - The selector type for the element to hover over.
     * @param {string} locator - The locator for the element to hover over.
     */
    async hover(selectorType, locator) {
        const element = await this.findBySelectorType(selectorType, locator);
        await this.waitUntilElementEnabled(element);
        await this.driver.actions({ bridge: true }).move({ duration: 100, origin: element, x: 0, y: 0 }).perform();
        const hoverJS = "if(document.createEvent){var evObj = document.createEvent('MouseEvents');evObj.initEvent('mouseover', true, false); arguments[0].dispatchEvent(evObj);} else if(document.createEventObject) { arguments[0].fireEvent('onmouseover');}";
        await this.executeJavaScript(hoverJS, element);
        await this.delay(1000);
    }

    /**
     * Refresh the current page.
     */
    async refresh() {
        await this.driver.navigate().refresh();
    }

    /**
     * Navigate back to the previous page.
     */
    async back() {
        await this.driver.navigate().back();
    }

    /**
     * Perform dynamic waiting for an element to become visible.
     * @param {string} selectorType - The selector type (CSS or XPath).
     * @param {string} locator - The locator value.
     * @param {number} waitTimeForElement - Total time to wait for the element in milliseconds.
     * @param {number} intervalTime - Interval time between visibility checks in milliseconds.
     */
    async dynamicWaitForElement(selectorType, locator, waitTimeForElement, intervalTime) {
        while (!(await this.isVisible(selectorType, locator))) {
            this.delay(intervalTime);
            waitTimeForElement -= intervalTime;
            if (waitTimeForElement < 1) break;
        }
    }

    /**
     * Check if an element identified by selector is visible.
     * @param {string} selectorType - The selector type (CSS or XPath).
     * @param {string} locator - The locator value.
     * @returns {Promise<boolean>} - Resolves to true if the element is visible, false otherwise.
     * @throws {Error} - Throws an error if the element is not visible or an error occurs.
     */
    async isVisible(selectorType, locator) {
        try {
            const el = await this.findBySelectorType(selectorType, locator);
            return !!(await el.isDisplayed());
        } catch (err) {
            console.error(err);
            throw new Error(`element is not visible: ${err}`);
        }
    }
}

module.exports = Browser;

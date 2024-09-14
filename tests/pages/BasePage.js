class BasePage {
    constructor(browser) {
        if (this.constructor == BasePage) {
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

    currenturl(){
        return this.browser.getCurrentUrl();
    }
}

module.exports = BasePage;

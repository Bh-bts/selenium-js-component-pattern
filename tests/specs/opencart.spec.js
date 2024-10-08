const BrowserFactory = require("../baseUI/BrowserFactory");
const AllPages = require('../pages/AllPages');
const testConfig = require('../../testconfig.json')
const browser = testConfig.browser

describe(`Opencart tests ${browser}`, function () {
    let appUrl;
    let allPages;

    const openBrowser = async function () {
        this.browser = await BrowserFactory.createBrowser(this);
        appUrl = this.browser.getOpencartBaseUrl();
        allPages = new AllPages(this.browser);
    }

    const closeBrower = async function () {
        if (this.currentTest.state == 'failed') {
            const screenshot = await this.browser.captureScreenshot()
            addContext(this, {
                title: this.currentTest.title,
                value: screenshot,
                type: 'image/png'
            })
        }
        await this.browser.close();
    }

    describe("Verify user can able to login to opencart website", function () {
        before(openBrowser);

        it("Goto Login page", async function () {
            await allPages.loginPage.goToLoginPage();

        })
    })
})
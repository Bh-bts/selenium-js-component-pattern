const BrowserFactory = require("../baseUI/BrowserFactory");
const AllPages = require('../pages/AllPages');
const testConfig = require('../../testconfig.json')
const browser = testConfig.browser
const addContext = require('mochawesome/addContext');
const logger = require('../utils/Logger');
const assert = require('../utils/AssertUtil')
const ScreenshotUtil = require('../utils/ScreenshotUtil');
require('dotenv').config();

describe(`Mypustak tests ${browser}`, function () {
    let appUrl;
    let allPages;

    this.timeout(30000);

    const openBrowser = async function () {
        logger.info('Browser open...')
        this.browser = await BrowserFactory.createBrowser(this);
        appUrl = this.browser.getMypustakBaseUrl();
        allPages = new AllPages(this.browser);
    }

    const closeBrowser = async function () {
        if (this.currentTest.state === 'failed') {
            const screenshot = await this.browser.captureScreenshot()
            addContext(this, {
                title: this.currentTest.title,
                value: screenshot,
                type: 'image/png'
            })
        }
        await this.browser.close();
        logger.info('Closed Browser');
    }

    describe("Verify user can able to login to mypustak website", async function () {
        before(openBrowser);

        it("Goto Login page", async function () {
            await allPages.loginPage.goToLoginPage();
            await allPages.loginPage.clickLoginButton();
            await allPages.loginPage.sendTextOnEmail(process.env.EMAIL);
            await allPages.loginPage.clickProceedButton();
            await allPages.loginPage.sendTextOnPassword(process.env.PASSWORD);
            await allPages.loginPage.clickPopUpLoginButton();

            const actualText = await allPages.loginPage.getLoginButtonText();
            logger.info(`Validating login button text. Expected: 'Hi! Reader', Actual: '${actualText}'`);
            assert.assertEqual(actualText, "Hi! Reader", `Expected login button text to be 'Hi! Reader' but got '${actualText}`);
        });

        afterEach(async function () {
            if (this.currentTest.state === 'failed') {
                await ScreenshotUtil.capture(this.browser, this.currentTest.title);
            }
        });

        after(closeBrowser);
    })
})
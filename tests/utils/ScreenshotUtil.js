const fs = require('fs');
const path = require('path');
const logger = require('../baseUI/Logger')

/**
 * @class ScreenshotUtil
 * @description Captures a screenshot using the caller's test file and function name, with timestamp.
 *              Automatically creates the 'screenshots' folder at runtime if not present.
 * @author Bhavin Thumar
 */

class ScreenshotUtil {
    static screenshotDir = path.join(process.cwd(), 'screenshots');
    static isCleared = false; // Track if already cleared

    static async capture(browser, testTitle = "UnknownTest") {
        // Clear folder only once per test run
        if (!this.isCleared) {
            this.clearOldScreenshots();
            this.isCleared = true;
        }

        fs.mkdirSync(this.screenshotDir, { recursive: true });

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const safeTitle = testTitle.replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
        const screenshotPath = path.join(
            this.screenshotDir,
            `${safeTitle}_${timestamp}.png`
        );

        const imageBase64 = await browser.captureScreenshot();
        const image = imageBase64.replace(/^data:image\/png;base64,/, '');
        fs.writeFileSync(screenshotPath, image, 'base64');
        logger.info(`Screenshot saved to: ${screenshotPath}`);
    }

    static clearOldScreenshots() {
        if (fs.existsSync(this.screenshotDir)) {
            fs.readdirSync(this.screenshotDir).forEach(file => {
                fs.unlinkSync(path.join(this.screenshotDir, file));
            });
            logger.info("Cleared old screenshots.");
        }
    }
}

module.exports = ScreenshotUtil;

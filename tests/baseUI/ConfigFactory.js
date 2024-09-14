const FileUtil = require("./FileUtil");
const TestConfig = require("./TestConfig");

class ConfigFactory {
  static config;

  /**
   * Retrieve the test configuration object, either from a JSON file or from a new TestConfig instance
   * @return {TestConfig} - The test configuration object
   */
  static getConfig() {
    if (this.config) {
      return this.config;
    }

    const filePath = FileUtil.pathCombine(
      FileUtil.getCurrentDirectory(),
      "testconfig.json"
    );

    if (FileUtil.fileExists(filePath)) {
      console.log(`Found config file at: ${filePath}`);
      this.config = FileUtil.readJsonFile(filePath);
    } else {
      this.config = new TestConfig();
    }
    return this.config;
  }
}

module.exports = ConfigFactory;

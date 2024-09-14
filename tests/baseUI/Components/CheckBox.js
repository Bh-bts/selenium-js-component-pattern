const WebComponent = require("./WebComponent");

class CheckBox extends WebComponent{
    constructor(browser, selectorType, locator){
        super(browser, selectorType, locator);
    }

    async select(){
        await super.click(this.selectorType, this.locator);
    }
}

module.exports = CheckBox;

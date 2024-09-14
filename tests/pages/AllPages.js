const LoginPage = require('./LoginPage')

class AllPages {
    constructor(browser) {
        this.loginPage = new LoginPage(browser);
    }
}
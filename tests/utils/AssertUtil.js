const assert = require('assert');

/**
 * @class AssertUtil
 * @description Utility class for performing common assertions.
 * @author Bhavin Thumar
 */

class AssertUtil {
    static assertEqual(actual, expected, message = '') {
        assert.strictEqual(actual, expected, message || `Expected ${expected}, but got ${actual}`);
    }

    static assertTrue(condition, message = 'Expected condition to be true') {
        assert.ok(condition, message);
    }

    static assertFalse(condition, message = 'Expected condition to be false') {
        assert.ok(!condition, message);
    }

    static assertContains(text, substring, message = '') {
        assert.ok(text.includes(substring), message || `Expected '${text}' to include '${substring}'`);
    }
}

module.exports = AssertUtil;

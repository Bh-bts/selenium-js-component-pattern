class StringUtil {
    /**
     * Escapes characters in a string that have special meaning in regular expressions.
     * @param {string} text - The string to escape.
     * @return {string} - The escaped string.
     */
    static regExEscape(text) {
        return text.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&");
    }

    /**
     * Removes one or more characters from the end of a string.
     * @param {string} text - The string to trim.
     * @param {string} textTOTrim - The characters to remove from the end of the string.
     * @return {string} - The trimmed string.
     */
    static trimEnd(text, textToTrim) {
        textToTrim = this.regExEscape(textToTrim);
        return text.replace(new RegExp("[" + textToTrim + "]+$"), "");
    }
}

module.exports = StringUtil;

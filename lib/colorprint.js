/**
 * Colorpint context.
 * @memberof module:colorprint/lib
 * @inner
 * @constructor Colorprint
 * @param {object} config - Context configuration.
 */

"use strict";

var ext = require('./ext'),
    formatMsg = require('./format_msg'),
    decorateMsg = require('./decorate_msg'),
    extend = ext.extend;

/** @lends Colorprint */
function Colorprint() {
    var s = this;
    s.init.apply(s, arguments);
}

Colorprint.prototype = {
    _format: function () {
        var s = this;
        var msg = formatMsg.apply(formatMsg, arguments);
        return [s.prefix, msg, s.suffix].join('');
    },
    _printLog: function (msg, color) {
        console.log(decorateMsg(msg, color));
    },
    _printError: function (msg, color) {
        console.error(decorateMsg(msg, color));
    },
    /** @constructs Colorprint */
    init: function (config) {
        var s = this;
        extend(s, config);
    },
    /** Message prefix */
    prefix: '',
    /** Message suffix */
    suffix: '',
    /**
     * Print info message.
     * @param {...string} msg - Message to print.
     */
    info: function (msg) {
        var s = this;
        s._printLog(s._format.apply(s, arguments), 'green');
    },
    /**
     * Print debug message.
     * @param {...string} msg - Message to print.
     */
    debug: function (msg) {
        var s = this;
        s._printLog(s._format.apply(s, arguments), 'black');
    },
    /**
     * Print trace message.
     * @param {...string} msg - Message to print.
     */
    trace: function (msg) {
        var s = this;
        s._printLog(s._format.apply(s, arguments), 'white');
    },
    /**
     * Print error message.
     * @param {...string} msg - Message to print.
     */
    error: function (msg) {
        var s = this;
        s._printError(s._format.apply(s, arguments), 'red');
    },
    /**
     * Print fatal message.
     * @param {...string} msg - Message to print.
     */
    fatal: function (msg) {
        var s = this;
        s._printError(s._format.apply(s, arguments), 'bgRed');
    }
};


module.exports = Colorprint;
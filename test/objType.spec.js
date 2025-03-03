"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objType_js_1 = require("../src/objType.js");
describe('objType', function () {
    it('should determine the correct type', function () {
        expect((0, objType_js_1.default)({})).toBe('Object');
        expect((0, objType_js_1.default)([])).toBe('Array');
        expect((0, objType_js_1.default)(new Map())).toBe('Map');
        expect((0, objType_js_1.default)(new WeakMap())).toBe('WeakMap');
        expect((0, objType_js_1.default)(new Set())).toBe('Set');
        expect((0, objType_js_1.default)(new WeakSet())).toBe('WeakSet');
        expect((0, objType_js_1.default)(new Error())).toBe('Error');
        expect((0, objType_js_1.default)(new Date())).toBe('Date');
        expect((0, objType_js_1.default)(function () {
            // noop
        })).toBe('Function');
        expect((0, objType_js_1.default)('')).toBe('String');
        expect((0, objType_js_1.default)(true)).toBe('Boolean');
        expect((0, objType_js_1.default)(null)).toBe('Null');
        expect((0, objType_js_1.default)(undefined)).toBe('Undefined');
        expect((0, objType_js_1.default)(10)).toBe('Number');
        expect((0, objType_js_1.default)(Symbol.iterator)).toBe('Symbol');
    });
});

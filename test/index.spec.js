"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var shallow_1 = require("react-test-renderer/shallow");
var src_1 = require("../src");
var JSONNode_js_1 = require("../src/JSONNode.js");
var BASIC_DATA = { a: 1, b: 'c' };
function render(component) {
    var renderer = shallow_1.default.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
}
describe('JSONTree', function () {
    it('should render basic tree', function () {
        var result = render(<src_1.JSONTree data={BASIC_DATA}/>);
        expect(result.type).toBe('ul');
        expect(result.props.children.type.name).toBe(JSONNode_js_1.default.name);
    });
});

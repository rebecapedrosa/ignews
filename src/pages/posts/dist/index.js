"use strict";
exports.__esModule = true;
var head_1 = require("next/head");
var styles_module_scss_1 = require("./styles.module.scss");
function React() {
    return (React.createElement(React.Fragment, null,
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "Posts | Ignews ")),
        React.createElement("main", { className: styles_module_scss_1["default"].container },
            React.createElement("div", { className: styles_module_scss_1["default"].posts },
                React.createElement("a", { href: "" },
                    React.createElement("time", null, "12 de mar\u00E7o de 2021"),
                    React.createElement("strong", null, "Banana macaco banana macaco banana macaco"),
                    React.createElement("p", null, "Bnanana nmananamanananananana")),
                React.createElement("a", { href: "" },
                    React.createElement("time", null, "12 de mar\u00E7o de 2021"),
                    React.createElement("strong", null, "Banana macaco banana macaco banana macaco"),
                    React.createElement("p", null, "Bnanana nmananamanananananana"))))));
}
exports["default"] = React;

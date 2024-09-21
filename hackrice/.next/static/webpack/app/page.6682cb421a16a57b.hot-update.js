"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./components/Model.tsx":
/*!******************************!*\
  !*** ./components/Model.tsx ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Model; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @react-three/drei */ \"(app-pages-browser)/./node_modules/@react-three/drei/core/useGLTF.js\");\n/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @react-three/drei */ \"(app-pages-browser)/./node_modules/@react-three/drei/core/OrbitControls.js\");\n/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @react-three/drei */ \"(app-pages-browser)/./node_modules/@react-three/drei/web/Html.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three */ \"(app-pages-browser)/./node_modules/three/build/three.module.js\");\n/* harmony import */ var _react_spring_three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-spring/three */ \"(app-pages-browser)/./node_modules/@react-spring/three/dist/react-spring_three.modern.mjs\");\n/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-three/fiber */ \"(app-pages-browser)/./node_modules/@react-three/fiber/dist/events-3515660a.esm.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n // For animations\n // For camera controls\n// Preload both models\n_react_three_drei__WEBPACK_IMPORTED_MODULE_3__.useGLTF.preload(\"/mountain.glb\");\n_react_three_drei__WEBPACK_IMPORTED_MODULE_3__.useGLTF.preload(\"/mappointer.glb\");\nfunction Model() {\n    _s();\n    const group = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    // Load the mountain and the map pointer models\n    const mountain = (0,_react_three_drei__WEBPACK_IMPORTED_MODULE_3__.useGLTF)(\"/mountain.glb\");\n    const mapPointer = (0,_react_three_drei__WEBPACK_IMPORTED_MODULE_3__.useGLTF)(\"/mappointer.glb\");\n    const [clickedPointer, setClickedPointer] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // Track which pointer is clicked\n    const { camera } = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.D)(); // Get the camera reference\n    // Function to calculate the required rotation for a clicked pointer\n    function getRotationForPointer(pointerIndex) {\n        const pointerPositions = [\n            new three__WEBPACK_IMPORTED_MODULE_5__.Vector3(0, 0.75, 0),\n            new three__WEBPACK_IMPORTED_MODULE_5__.Vector3(-1, 1, 0)\n        ];\n        const pointerPosition = pointerPositions[pointerIndex];\n        // Calculate the angle around the Y-axis to face the marker\n        const angleToPointer = Math.atan2(pointerPosition.x - camera.position.x, pointerPosition.z - camera.position.z);\n        // Convert the angle to Euler angles for rotation\n        return [\n            0,\n            angleToPointer,\n            0\n        ]; // Only rotating around Y-axis (up axis)\n    }\n    // Spring animation for rotating the mountain\n    const { rotation } = (0,_react_spring_three__WEBPACK_IMPORTED_MODULE_2__.useSpring)({\n        rotation: clickedPointer === null ? [\n            0,\n            0,\n            0\n        ] : getRotationForPointer(clickedPointer),\n        config: {\n            mass: 1,\n            tension: 170,\n            friction: 26\n        }\n    });\n    // Handle pointer click logic\n    const handlePointerClick = (pointerIndex)=>{\n        setClickedPointer(pointerIndex); // Mark the clicked pointer\n    };\n    // Reset logic to reset the mountain rotation and reset view\n    const resetView = ()=>{\n        setClickedPointer(null); // Reset clicked pointer state\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_react_spring_three__WEBPACK_IMPORTED_MODULE_2__.animated.group, {\n                ref: group,\n                rotation: rotation,\n                position: [\n                    0,\n                    -1,\n                    0\n                ],\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"primitive\", {\n                        object: mountain.scene\n                    }, void 0, false, {\n                        fileName: \"/Users/TrexK/Documents/HackRice2024/hackrice/components/Model.tsx\",\n                        lineNumber: 71,\n                        columnNumber: 9\n                    }, this),\n                    \" \",\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"primitive\", {\n                        object: mapPointer.scene,\n                        position: [\n                            0,\n                            0.75,\n                            0\n                        ],\n                        scale: [\n                            0.1,\n                            0.1,\n                            0.1\n                        ],\n                        onClick: ()=>handlePointerClick(0)\n                    }, void 0, false, {\n                        fileName: \"/Users/TrexK/Documents/HackRice2024/hackrice/components/Model.tsx\",\n                        lineNumber: 73,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"primitive\", {\n                        object: mapPointer.scene,\n                        position: [\n                            -1,\n                            1,\n                            0\n                        ],\n                        scale: [\n                            0.1,\n                            0.1,\n                            0.1\n                        ],\n                        onClick: ()=>handlePointerClick(1)\n                    }, void 0, false, {\n                        fileName: \"/Users/TrexK/Documents/HackRice2024/hackrice/components/Model.tsx\",\n                        lineNumber: 79,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/TrexK/Documents/HackRice2024/hackrice/components/Model.tsx\",\n                lineNumber: 65,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_react_three_drei__WEBPACK_IMPORTED_MODULE_6__.OrbitControls, {\n                enableZoom: clickedPointer === null,\n                enablePan: clickedPointer === null\n            }, void 0, false, {\n                fileName: \"/Users/TrexK/Documents/HackRice2024/hackrice/components/Model.tsx\",\n                lineNumber: 87,\n                columnNumber: 7\n            }, this),\n            \" \",\n            clickedPointer !== null && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_react_three_drei__WEBPACK_IMPORTED_MODULE_7__.Html, {\n                position: [\n                    0,\n                    0,\n                    0\n                ],\n                center: true,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    style: {\n                        background: \"white\",\n                        padding: \"10px\",\n                        cursor: \"pointer\"\n                    },\n                    onClick: resetView,\n                    children: \"Reset View\"\n                }, void 0, false, {\n                    fileName: \"/Users/TrexK/Documents/HackRice2024/hackrice/components/Model.tsx\",\n                    lineNumber: 95,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/TrexK/Documents/HackRice2024/hackrice/components/Model.tsx\",\n                lineNumber: 94,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(Model, \"UQiCemGVqdppCgCQLEbkeBsBYGs=\", false, function() {\n    return [\n        _react_three_drei__WEBPACK_IMPORTED_MODULE_3__.useGLTF,\n        _react_three_drei__WEBPACK_IMPORTED_MODULE_3__.useGLTF,\n        _react_three_fiber__WEBPACK_IMPORTED_MODULE_4__.D,\n        _react_spring_three__WEBPACK_IMPORTED_MODULE_2__.useSpring\n    ];\n});\n_c = Model;\nvar _c;\n$RefreshReg$(_c, \"Model\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvTW9kZWwudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFpRTtBQUN4QjtBQUNGO0FBQ21CLENBQUMsaUJBQWlCO0FBQzlCLENBQUMsc0JBQXNCO0FBR3JFLHNCQUFzQjtBQUN0QkEsc0RBQU9BLENBQUNTLE9BQU8sQ0FBQztBQUNoQlQsc0RBQU9BLENBQUNTLE9BQU8sQ0FBQztBQUVELFNBQVNDOztJQUN0QixNQUFNQyxRQUFRUiw2Q0FBTUEsQ0FBUTtJQUU1QiwrQ0FBK0M7SUFDL0MsTUFBTVMsV0FBV1osMERBQU9BLENBQUM7SUFDekIsTUFBTWEsYUFBYWIsMERBQU9BLENBQUM7SUFFM0IsTUFBTSxDQUFDYyxnQkFBZ0JDLGtCQUFrQixHQUFHWCwrQ0FBUUEsQ0FBZ0IsT0FBTyxpQ0FBaUM7SUFDNUcsTUFBTSxFQUFFWSxNQUFNLEVBQUUsR0FBR1IscURBQVFBLElBQUksMkJBQTJCO0lBRTFELG9FQUFvRTtJQUNwRSxTQUFTUyxzQkFDUEMsWUFBb0I7UUFFcEIsTUFBTUMsbUJBQW1CO1lBQ3ZCLElBQUlkLDBDQUFPQSxDQUFDLEdBQUcsTUFBTTtZQUNyQixJQUFJQSwwQ0FBT0EsQ0FBQyxDQUFDLEdBQUcsR0FBRztTQUNwQjtRQUVELE1BQU1lLGtCQUFrQkQsZ0JBQWdCLENBQUNELGFBQWE7UUFFdEQsMkRBQTJEO1FBQzNELE1BQU1HLGlCQUFpQkMsS0FBS0MsS0FBSyxDQUMvQkgsZ0JBQWdCSSxDQUFDLEdBQUdSLE9BQU9TLFFBQVEsQ0FBQ0QsQ0FBQyxFQUNyQ0osZ0JBQWdCTSxDQUFDLEdBQUdWLE9BQU9TLFFBQVEsQ0FBQ0MsQ0FBQztRQUd2QyxpREFBaUQ7UUFDakQsT0FBTztZQUFDO1lBQUdMO1lBQWdCO1NBQUUsRUFBRSx3Q0FBd0M7SUFDekU7SUFFQSw2Q0FBNkM7SUFDN0MsTUFBTSxFQUFFTSxRQUFRLEVBQUUsR0FBR3JCLDhEQUFTQSxDQUFDO1FBQzdCcUIsVUFDRWIsbUJBQW1CLE9BQ2Y7WUFBQztZQUFHO1lBQUc7U0FBRSxHQUNURyxzQkFBc0JIO1FBQzVCYyxRQUFRO1lBQUVDLE1BQU07WUFBR0MsU0FBUztZQUFLQyxVQUFVO1FBQUc7SUFDaEQ7SUFFQSw2QkFBNkI7SUFDN0IsTUFBTUMscUJBQXFCLENBQUNkO1FBQzFCSCxrQkFBa0JHLGVBQWUsMkJBQTJCO0lBQzlEO0lBRUEsNERBQTREO0lBQzVELE1BQU1lLFlBQVk7UUFDaEJsQixrQkFBa0IsT0FBTyw4QkFBOEI7SUFDekQ7SUFFQSxxQkFDRTs7MEJBRUUsOERBQUNSLHlEQUFRQSxDQUFDSSxLQUFLO2dCQUNidUIsS0FBS3ZCO2dCQUNMZ0IsVUFBVUE7Z0JBQ1ZGLFVBQVU7b0JBQUM7b0JBQUcsQ0FBQztvQkFBRztpQkFBRTs7a0NBR3BCLDhEQUFDVTt3QkFBVUMsUUFBUXhCLFNBQVN5QixLQUFLOzs7Ozs7b0JBQUk7a0NBRXJDLDhEQUFDRjt3QkFDQ0MsUUFBUXZCLFdBQVd3QixLQUFLO3dCQUN4QlosVUFBVTs0QkFBQzs0QkFBRzs0QkFBTTt5QkFBRTt3QkFDdEJhLE9BQU87NEJBQUM7NEJBQUs7NEJBQUs7eUJBQUk7d0JBQ3RCQyxTQUFTLElBQU1QLG1CQUFtQjs7Ozs7O2tDQUVwQyw4REFBQ0c7d0JBQ0NDLFFBQVF2QixXQUFXd0IsS0FBSzt3QkFDeEJaLFVBQVU7NEJBQUMsQ0FBQzs0QkFBRzs0QkFBRzt5QkFBRTt3QkFDcEJhLE9BQU87NEJBQUM7NEJBQUs7NEJBQUs7eUJBQUk7d0JBQ3RCQyxTQUFTLElBQU1QLG1CQUFtQjs7Ozs7Ozs7Ozs7OzBCQUl0Qyw4REFBQy9CLDREQUFhQTtnQkFDWnVDLFlBQVkxQixtQkFBbUI7Z0JBQy9CMkIsV0FBVzNCLG1CQUFtQjs7Ozs7O1lBQzdCO1lBR0ZBLG1CQUFtQixzQkFDbEIsOERBQUNaLG1EQUFJQTtnQkFBQ3VCLFVBQVU7b0JBQUM7b0JBQUc7b0JBQUc7aUJBQUU7Z0JBQUVpQixNQUFNOzBCQUMvQiw0RUFBQ0M7b0JBQ0NDLE9BQU87d0JBQ0xDLFlBQVk7d0JBQ1pDLFNBQVM7d0JBQ1RDLFFBQVE7b0JBQ1Y7b0JBQ0FSLFNBQVNOOzhCQUNWOzs7Ozs7Ozs7Ozs7O0FBT1g7R0FqR3dCdkI7O1FBSUxWLHNEQUFPQTtRQUNMQSxzREFBT0E7UUFHUFEsaURBQVFBO1FBd0JORiwwREFBU0E7OztLQWhDUkkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9Nb2RlbC50c3g/YzRhMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VHTFRGLCBPcmJpdENvbnRyb2xzLCBIdG1sIH0gZnJvbSBcIkByZWFjdC10aHJlZS9kcmVpXCI7XG5pbXBvcnQgeyB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBHcm91cCwgVmVjdG9yMyB9IGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgdXNlU3ByaW5nLCBhbmltYXRlZCB9IGZyb20gXCJAcmVhY3Qtc3ByaW5nL3RocmVlXCI7IC8vIEZvciBhbmltYXRpb25zXG5pbXBvcnQgeyB1c2VUaHJlZSB9IGZyb20gXCJAcmVhY3QtdGhyZWUvZmliZXJcIjsgLy8gRm9yIGNhbWVyYSBjb250cm9sc1xuXG5cbi8vIFByZWxvYWQgYm90aCBtb2RlbHNcbnVzZUdMVEYucHJlbG9hZChcIi9tb3VudGFpbi5nbGJcIik7XG51c2VHTFRGLnByZWxvYWQoXCIvbWFwcG9pbnRlci5nbGJcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1vZGVsKCkge1xuICBjb25zdCBncm91cCA9IHVzZVJlZjxHcm91cD4obnVsbCk7XG5cbiAgLy8gTG9hZCB0aGUgbW91bnRhaW4gYW5kIHRoZSBtYXAgcG9pbnRlciBtb2RlbHNcbiAgY29uc3QgbW91bnRhaW4gPSB1c2VHTFRGKFwiL21vdW50YWluLmdsYlwiKTtcbiAgY29uc3QgbWFwUG9pbnRlciA9IHVzZUdMVEYoXCIvbWFwcG9pbnRlci5nbGJcIik7XG5cbiAgY29uc3QgW2NsaWNrZWRQb2ludGVyLCBzZXRDbGlja2VkUG9pbnRlcl0gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPihudWxsKTsgLy8gVHJhY2sgd2hpY2ggcG9pbnRlciBpcyBjbGlja2VkXG4gIGNvbnN0IHsgY2FtZXJhIH0gPSB1c2VUaHJlZSgpOyAvLyBHZXQgdGhlIGNhbWVyYSByZWZlcmVuY2VcblxuICAvLyBGdW5jdGlvbiB0byBjYWxjdWxhdGUgdGhlIHJlcXVpcmVkIHJvdGF0aW9uIGZvciBhIGNsaWNrZWQgcG9pbnRlclxuICBmdW5jdGlvbiBnZXRSb3RhdGlvbkZvclBvaW50ZXIoXG4gICAgcG9pbnRlckluZGV4OiBudW1iZXJcbiAgKTogW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcbiAgICBjb25zdCBwb2ludGVyUG9zaXRpb25zID0gW1xuICAgICAgbmV3IFZlY3RvcjMoMCwgMC43NSwgMCksIC8vIFBvc2l0aW9uIG9mIFBvaW50ZXIgMVxuICAgICAgbmV3IFZlY3RvcjMoLTEsIDEsIDApLCAvLyBQb3NpdGlvbiBvZiBQb2ludGVyIDJcbiAgICBdO1xuXG4gICAgY29uc3QgcG9pbnRlclBvc2l0aW9uID0gcG9pbnRlclBvc2l0aW9uc1twb2ludGVySW5kZXhdO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBhbmdsZSBhcm91bmQgdGhlIFktYXhpcyB0byBmYWNlIHRoZSBtYXJrZXJcbiAgICBjb25zdCBhbmdsZVRvUG9pbnRlciA9IE1hdGguYXRhbjIoXG4gICAgICBwb2ludGVyUG9zaXRpb24ueCAtIGNhbWVyYS5wb3NpdGlvbi54LFxuICAgICAgcG9pbnRlclBvc2l0aW9uLnogLSBjYW1lcmEucG9zaXRpb24uelxuICAgICk7XG5cbiAgICAvLyBDb252ZXJ0IHRoZSBhbmdsZSB0byBFdWxlciBhbmdsZXMgZm9yIHJvdGF0aW9uXG4gICAgcmV0dXJuIFswLCBhbmdsZVRvUG9pbnRlciwgMF07IC8vIE9ubHkgcm90YXRpbmcgYXJvdW5kIFktYXhpcyAodXAgYXhpcylcbiAgfVxuXG4gIC8vIFNwcmluZyBhbmltYXRpb24gZm9yIHJvdGF0aW5nIHRoZSBtb3VudGFpblxuICBjb25zdCB7IHJvdGF0aW9uIH0gPSB1c2VTcHJpbmcoe1xuICAgIHJvdGF0aW9uOlxuICAgICAgY2xpY2tlZFBvaW50ZXIgPT09IG51bGxcbiAgICAgICAgPyBbMCwgMCwgMF1cbiAgICAgICAgOiBnZXRSb3RhdGlvbkZvclBvaW50ZXIoY2xpY2tlZFBvaW50ZXIpLFxuICAgIGNvbmZpZzogeyBtYXNzOiAxLCB0ZW5zaW9uOiAxNzAsIGZyaWN0aW9uOiAyNiB9LCAvLyBTbW9vdGggcm90YXRpb25cbiAgfSk7XG5cbiAgLy8gSGFuZGxlIHBvaW50ZXIgY2xpY2sgbG9naWNcbiAgY29uc3QgaGFuZGxlUG9pbnRlckNsaWNrID0gKHBvaW50ZXJJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgc2V0Q2xpY2tlZFBvaW50ZXIocG9pbnRlckluZGV4KTsgLy8gTWFyayB0aGUgY2xpY2tlZCBwb2ludGVyXG4gIH07XG5cbiAgLy8gUmVzZXQgbG9naWMgdG8gcmVzZXQgdGhlIG1vdW50YWluIHJvdGF0aW9uIGFuZCByZXNldCB2aWV3XG4gIGNvbnN0IHJlc2V0VmlldyA9ICgpID0+IHtcbiAgICBzZXRDbGlja2VkUG9pbnRlcihudWxsKTsgLy8gUmVzZXQgY2xpY2tlZCBwb2ludGVyIHN0YXRlXG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgey8qIEdyb3VwIHRoZSBtb3VudGFpbiBhbmQgdGhlIHBvaW50ZXJzIHRvZ2V0aGVyICovfVxuICAgICAgPGFuaW1hdGVkLmdyb3VwXG4gICAgICAgIHJlZj17Z3JvdXB9XG4gICAgICAgIHJvdGF0aW9uPXtyb3RhdGlvbn0gLy8gQXBwbHkgYW5pbWF0ZWQgcm90YXRpb25cbiAgICAgICAgcG9zaXRpb249e1swLCAtMSwgMF19IC8vIEFkanVzdCB0aGUgcG9zaXRpb24gb2YgdGhlIGVudGlyZSBncm91cCAoTW91bnRhaW4gYW5kIFBvaW50ZXJzKVxuICAgICAgPlxuICAgICAgICB7LyogTW91bnRhaW4gTW9kZWwgKi99XG4gICAgICAgIDxwcmltaXRpdmUgb2JqZWN0PXttb3VudGFpbi5zY2VuZX0gLz4gey8qIFJlbmRlciB0aGUgbW91bnRhaW4gKi99XG4gICAgICAgIHsvKiBNYXAgUG9pbnRlcnMgKi99XG4gICAgICAgIDxwcmltaXRpdmVcbiAgICAgICAgICBvYmplY3Q9e21hcFBvaW50ZXIuc2NlbmV9XG4gICAgICAgICAgcG9zaXRpb249e1swLCAwLjc1LCAwXX0gLy8gUG9pbnRlciAxIFBvc2l0aW9uXG4gICAgICAgICAgc2NhbGU9e1swLjEsIDAuMSwgMC4xXX0gLy8gS2VlcCB0aGUgc2NhbGUgY29uc3RhbnRcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVQb2ludGVyQ2xpY2soMCl9IC8vIFJvdGF0ZSBtb3VudGFpbiBvbiBjbGlja1xuICAgICAgICAvPlxuICAgICAgICA8cHJpbWl0aXZlXG4gICAgICAgICAgb2JqZWN0PXttYXBQb2ludGVyLnNjZW5lfVxuICAgICAgICAgIHBvc2l0aW9uPXtbLTEsIDEsIDBdfSAvLyBQb2ludGVyIDIgUG9zaXRpb25cbiAgICAgICAgICBzY2FsZT17WzAuMSwgMC4xLCAwLjFdfSAvLyBLZWVwIHRoZSBzY2FsZSBjb25zdGFudFxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVBvaW50ZXJDbGljaygxKX0gLy8gUm90YXRlIG1vdW50YWluIG9uIGNsaWNrXG4gICAgICAgIC8+XG4gICAgICA8L2FuaW1hdGVkLmdyb3VwPlxuICAgICAgey8qIE9yYml0IENvbnRyb2xzICovfVxuICAgICAgPE9yYml0Q29udHJvbHNcbiAgICAgICAgZW5hYmxlWm9vbT17Y2xpY2tlZFBvaW50ZXIgPT09IG51bGx9XG4gICAgICAgIGVuYWJsZVBhbj17Y2xpY2tlZFBvaW50ZXIgPT09IG51bGx9XG4gICAgICAvPntcIiBcIn1cbiAgICAgIHsvKiBEaXNhYmxlIG9yYml0IGNvbnRyb2xzIHdoZW4gem9vbWVkICovfVxuICAgICAgey8qIFJlc2V0IFZpZXcgQnV0dG9uIChhcHBlYXJzIHdoZW4gYSBwb2ludGVyIGlzIGNsaWNrZWQpICovfVxuICAgICAge2NsaWNrZWRQb2ludGVyICE9PSBudWxsICYmIChcbiAgICAgICAgPEh0bWwgcG9zaXRpb249e1swLCAwLCAwXX0gY2VudGVyPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwid2hpdGVcIixcbiAgICAgICAgICAgICAgcGFkZGluZzogXCIxMHB4XCIsXG4gICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25DbGljaz17cmVzZXRWaWV3fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFJlc2V0IFZpZXdcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9IdG1sPlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VHTFRGIiwiT3JiaXRDb250cm9scyIsIkh0bWwiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsIlZlY3RvcjMiLCJ1c2VTcHJpbmciLCJhbmltYXRlZCIsInVzZVRocmVlIiwicHJlbG9hZCIsIk1vZGVsIiwiZ3JvdXAiLCJtb3VudGFpbiIsIm1hcFBvaW50ZXIiLCJjbGlja2VkUG9pbnRlciIsInNldENsaWNrZWRQb2ludGVyIiwiY2FtZXJhIiwiZ2V0Um90YXRpb25Gb3JQb2ludGVyIiwicG9pbnRlckluZGV4IiwicG9pbnRlclBvc2l0aW9ucyIsInBvaW50ZXJQb3NpdGlvbiIsImFuZ2xlVG9Qb2ludGVyIiwiTWF0aCIsImF0YW4yIiwieCIsInBvc2l0aW9uIiwieiIsInJvdGF0aW9uIiwiY29uZmlnIiwibWFzcyIsInRlbnNpb24iLCJmcmljdGlvbiIsImhhbmRsZVBvaW50ZXJDbGljayIsInJlc2V0VmlldyIsInJlZiIsInByaW1pdGl2ZSIsIm9iamVjdCIsInNjZW5lIiwic2NhbGUiLCJvbkNsaWNrIiwiZW5hYmxlWm9vbSIsImVuYWJsZVBhbiIsImNlbnRlciIsImRpdiIsInN0eWxlIiwiYmFja2dyb3VuZCIsInBhZGRpbmciLCJjdXJzb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/Model.tsx\n"));

/***/ })

});
"use strict";
var createBinding = (this && this.createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var exportStar = (this && this.exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });

console.log({ttt:createBinding, exports});

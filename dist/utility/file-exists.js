"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function fileExists(filePath) {
    const file = fs.existsSync(filePath);
    return Boolean(file);
}
exports.fileExists = fileExists;

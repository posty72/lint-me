"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(isQuiet) {
        this.isQuiet = false;
        this.isQuiet = isQuiet;
    }
    log(...args) {
        if (!this.isQuiet) {
            console.log(...args);
        }
    }
    info(...args) {
        if (!this.isQuiet) {
            console.info(...args);
        }
    }
    error(...args) {
        if (!this.isQuiet) {
            console.error(...args);
        }
    }
    warning(...args) {
        if (!this.isQuiet) {
            console.warn(...args);
        }
    }
    time(timeKey) {
        if (!this.isQuiet) {
            console.time('⏱  ' + timeKey);
        }
    }
    timeEnd(timeKey) {
        if (!this.isQuiet) {
            console.timeEnd('⏱  ' + timeKey);
        }
    }
}
exports.Logger = Logger;

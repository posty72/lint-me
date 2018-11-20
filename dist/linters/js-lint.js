"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const eslint_1 = require("eslint");
const LINT_TIMER = '⏱ ESLint finished running in';
function lintJSFiles(fileGlob, cli) {
    console.time(LINT_TIMER);
    glob(fileGlob, (error, files) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        const userConfig = cli.flags.config || cli.flags.c || process.cwd() + '/.eslintrc';
        const config = (fs.existsSync(userConfig)) ? userConfig : path.resolve(__dirname, '../../config/.eslintrc');
        const esCLI = new eslint_1.CLIEngine({
            configFile: config,
            fix: cli.flags.fix
        });
        const report = esCLI.executeOnFiles(files);
        const formatter = esCLI.getFormatter('stylish');
        console.timeEnd(LINT_TIMER);
        if (report.errorCount > 0) {
            console.log(formatter(report.results));
            process.exit(1);
        }
        console.log('Eslint reported no errors 🎉');
        process.exit(1);
    });
}
exports.lintJSFiles = lintJSFiles;

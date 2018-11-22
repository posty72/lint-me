"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const eslint_1 = require("eslint");
const logger_1 = require("../utility/logger");
const LINT_TIMER = 'ESLint finished running in';
function lintJSFiles(fileGlob, cli) {
    const logger = new logger_1.Logger(cli.flags.quiet || cli.flags.q);
    logger.time(LINT_TIMER);
    glob(fileGlob, (error, files) => {
        files = files.filter((file) => !file.includes('node_modules'));
        if (error) {
            logger.error(error);
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
        logger.timeEnd(LINT_TIMER);
        if (report.errorCount > 0) {
            logger.log(formatter(report.results));
            process.exit(1);
        }
        logger.log('Eslint reported no errors 🎉');
        process.exit(1);
    });
}
exports.lintJSFiles = lintJSFiles;

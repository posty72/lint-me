"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const stylelint = require("stylelint");
const logger_1 = require("../utility/logger");
const LINT_TIMER = 'Stylelint finished running in';
function lintStyleFiles(fileGlob, cli) {
    const logger = new logger_1.Logger(cli.flags.quiet || cli.flags.q);
    logger.time(LINT_TIMER);
    const userConfig = cli.flags.config || cli.flags.c || process.cwd() + '/.stylelintrc.json';
    const config = (fs.existsSync(userConfig)) ? userConfig : path.resolve(__dirname, '../../config/.stylelintrc.json');
    stylelint.lint({
        files: fileGlob,
        formatter: 'string',
        configFile: config,
        fix: Boolean(cli.flags.fix)
    }).then((result) => {
        logger.timeEnd(LINT_TIMER);
        if (result.errored === true) {
            logger.log(result.output);
            process.exit(1);
        }
        process.exit(0);
    });
}
exports.lintStyleFiles = lintStyleFiles;

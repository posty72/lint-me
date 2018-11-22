"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = require("fs");
const path = require("path");
const stylelint = require("stylelint");
const logger_1 = require("../utility/logger");
const LINT_TIMER = 'Stylelint finished running in';
function lintStyleFiles(fileGlob, cli) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const logger = new logger_1.Logger(cli.flags.quiet || cli.flags.q);
        logger.time(LINT_TIMER);
        const userConfig = cli.flags.config || cli.flags.c || process.cwd() + '/.stylelintrc.json';
        const config = (fs.existsSync(userConfig)) ? userConfig : path.resolve(__dirname, '../../config/.stylelintrc.json');
        const result = yield stylelint.lint({
            files: fileGlob,
            formatter: 'string',
            configFile: config,
            fix: Boolean(cli.flags.fix)
        });
        logger.timeEnd(LINT_TIMER);
        if (result.errored === true) {
            logger.warning(result.output);
            process.exit(1);
        }
        process.exit(0);
    });
}
exports.lintStyleFiles = lintStyleFiles;

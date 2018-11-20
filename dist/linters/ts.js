"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const runner_1 = require("tslint/lib/runner");
const logger_1 = require("../utility/logger");
const LINT_TIMER = 'TSLint finished running in';
function lintTypeScriptFiles(fileGlob, cli) {
    const logger = new logger_1.Logger(cli.flags.quiet || cli.flags.q);
    logger.time(LINT_TIMER);
    glob(fileGlob, (error, files) => {
        if (error) {
            logger.error(error);
            process.exit(1);
        }
        const userConfig = cli.flags.config || cli.flags.c || process.cwd() + '/tslint.json';
        const rules = (fs.existsSync(userConfig)) ? userConfig : path.resolve(__dirname, '../../config/tslint.json');
        runner_1.run({
            config: rules,
            fix: cli.flags.fix,
            format: 'stylish',
            exclude: [],
            files: files,
            typeCheck: true
        }, {
            log(message) {
                logger.log(message);
            },
            error(message) {
                process.stderr.write(message);
            }
        }).then((rc) => {
            logger.timeEnd(LINT_TIMER);
            process.exit(rc);
        }).catch((error) => {
            logger.warning(error);
            process.exit(1);
        });
    });
}
exports.lintTypeScriptFiles = lintTypeScriptFiles;

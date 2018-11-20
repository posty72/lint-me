#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meow = require("meow");
const js_1 = require("../linters/js");
const style_1 = require("../linters/style");
const ts_1 = require("../linters/ts");
const logger_1 = require("../utility/logger");
const cli = meow(` 
	Usage  
	  $ lint-me <files> <options> 

    Files   <file-glob>     Files you would like to lint
    Options
        --fix           Autofix linting errors where possible
        --config, -c    Path to linting config file
        --type, -t      The type of linter you would like to use. Options are js, ts and style
        --quiet, -q     Hides logging

    Options relate to the type of file you're trying to lint. See the linters docs for complete options.

	Examples 
	  $ lint-me ./**/*.ts --fix -t ts
	  $ lint-me ./src/**/*.js --config ./config/.eslintrc --type js
	  $ lint-me ./**/*.scss
`, {
    flags: {
        type: {
            type: 'string',
        },
        fix: {
            type: 'boolean',
        },
        config: {
            type: 'string',
            alias: 'c'
        },
        quiet: {
            type: 'boolean',
            alias: 'q'
        }
    }
});
const fileGlob = cli.input[0];
const type = cli.flags.type || cli.flags.t;
const logger = new logger_1.Logger(cli.flags.quiet || cli.flags.q);
switch (type) {
    case 'ts':
        logger.info('Starting linting of Typescipt files');
        ts_1.lintTypeScriptFiles(fileGlob, cli);
        break;
    case 'js':
        logger.info('Starting linting  of Javascipt files');
        js_1.lintJSFiles(fileGlob, cli);
        break;
    case 'style':
        logger.info('Starting linting  of style files ');
        style_1.lintStyleFiles(fileGlob, cli);
        break;
    default:
        logger.log('lint-me requires the "type" flag to be set to either ts, js or style');
        process.exit(0);
}

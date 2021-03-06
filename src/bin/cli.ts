#!/usr/bin/env node

import * as meow from 'meow'
import { lintJSFiles } from '../linters/js'
import { lintStyleFiles } from '../linters/style'
import { lintTypeScriptFiles } from '../linters/ts'
import { Logger } from '../utility/logger';

const cli = meow(` 
	Usage  
	  $ lint-me <options> 

    Options
        --path, p       File glob of the files to lint
        --fix           Autofix linting errors where possible
        --config, -c    Path to linting config file
        --type, -t      The type of linter you would like to use. Options are js, ts and style
        --quiet, -q     Hides logging

    Options relate to the type of file you're trying to lint. See the linters docs for complete options.

	Examples 
	  $ lint-me './**/*.ts' --fix -t ts
	  $ lint-me './src/**/*.js' --config ./config/.eslintrc --type js
	  $ lint-me './**/*.scss'
`, {
        flags: {
            path: {
                type: 'string',
                alias: 'p'
            },
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
    }
)

const filePaths = cli.input[0]
const type: string = cli.flags.type || cli.flags.t
const logger = new Logger(cli.flags.quiet || cli.flags.q)

if (typeof filePaths !== 'string') {
    logger.warning('Please pass a string for the file glob')
    process.exit(1)
}

switch (type) {
    case 'ts':
        logger.info('Starting linting of Typescipt files')
        lintTypeScriptFiles(filePaths, cli)
        break
    case 'js':
        logger.info('Starting linting  of Javascipt files')
        lintJSFiles(filePaths, cli)
        break
    case 'style':
        logger.info('Starting linting  of style files ')
        lintStyleFiles(filePaths, cli)
        break
    default:
        logger.log('lint-me requires the "type" flag to be set to either ts, js or style')
        process.exit(0)
}

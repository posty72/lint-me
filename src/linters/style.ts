import * as fs from 'fs'
import * as path from 'path'
import * as meow from 'meow'
import * as stylelint from 'stylelint'
import { Logger } from '../utility/logger';

const LINT_TIMER = 'Stylelint finished running in'

export function lintStyleFiles(fileGlob: string, cli: meow.Result) {
    const logger = new Logger(cli.flags.quiet || cli.flags.q)

    logger.time(LINT_TIMER)

    const userConfig = cli.flags.config || cli.flags.c || process.cwd() + '/.stylelintrc.json'
    const config = (fs.existsSync(userConfig)) ? userConfig : path.resolve(__dirname, '../../config/.stylelintrc.json')
    stylelint.lint({
        files: fileGlob,
        formatter: 'string',
        configFile: config,
        fix: Boolean(cli.flags.fix)
    }).then((result) => {
        logger.timeEnd(LINT_TIMER)

        if (result.errored === true) {
            logger.log(result.output)
            process.exit(1)
        }

        process.exit(0)
    })
}
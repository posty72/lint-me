import * as fs from 'fs'
import * as path from 'path'
import * as glob from 'glob'
import * as meow from 'meow'
import { CLIEngine } from 'eslint';
import { Logger } from '../utility/logger';

const LINT_TIMER = 'ESLint finished running in'

export function lintJSFiles(fileGlob: string, cli: meow.Result) {
    const logger = new Logger(cli.flags.quiet || cli.flags.q)

    logger.time(LINT_TIMER)
    glob(fileGlob, (error: any, files: Array<string>) => {
        files = files.filter((file) => !file.includes('node_modules'))

        if (error) {
            logger.error(error)
            process.exit(1)
        }

        const userConfig = cli.flags.config || cli.flags.c || process.cwd() + '/.eslintrc'
        const config = (fs.existsSync(userConfig)) ? userConfig : path.resolve(__dirname, '../../config/.eslintrc')
        const esCLI = new CLIEngine({
            configFile: config,
            fix: cli.flags.fix
        })

        const report = esCLI.executeOnFiles(files)
        const formatter = esCLI.getFormatter('stylish');


        logger.timeEnd(LINT_TIMER)

        if (report.errorCount > 0) {
            logger.log(formatter(report.results))
            process.exit(1)
        }

        logger.log('Eslint reported no errors 🎉')
        process.exit(1)
    })
}
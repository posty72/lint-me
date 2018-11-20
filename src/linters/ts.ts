import * as fs from 'fs'
import * as path from 'path'
import * as glob from 'glob'
import { run } from 'tslint/lib/runner'
import * as meow from 'meow'
import { Logger } from '../utility/logger';

const LINT_TIMER = 'TSLint finished running in'

export function lintTypeScriptFiles(fileGlob: string, cli: meow.Result) {
    const logger = new Logger(cli.flags.quiet || cli.flags.q)

    logger.time(LINT_TIMER)

    glob(fileGlob, (error: any, files: Array<string>) => {
        if (error) {
            logger.error(error)
            process.exit(1)
        }
        const userConfig = cli.flags.config || cli.flags.c || process.cwd() + '/tslint.json'
        const rules = (fs.existsSync(userConfig)) ? userConfig : path.resolve(__dirname, '../../config/tslint.json')

        run({
            config: rules,
            fix: cli.flags.fix,
            format: 'stylish',
            exclude: [],
            files: files,
            typeCheck: true
        },
            {
                log(message: string) {
                    logger.log(message)
                },
                error(message: string) {
                    process.stderr.write(message);
                }
            }
        ).then((rc) => {
            logger.timeEnd(LINT_TIMER)
            process.exit(rc);
        }).catch((error) => {
            logger.warning(error)
            process.exit(1)
        })
    })
}
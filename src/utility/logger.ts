export class Logger {
    isQuiet = false

    constructor(isQuiet?: false) {
        this.isQuiet = isQuiet
    }

    log(...args: any) {
        if (!this.isQuiet) {
            console.log(...args)
        }
    }

    info(...args: any) {
        if (!this.isQuiet) {
            console.info(...args)
        }
    }

    error(...args: any) {
        if (!this.isQuiet) {
            console.error(...args)
        }
    }

    warning(...args: any) {
        if (!this.isQuiet) {
            console.warn(...args)
        }
    }

    time(timeKey: string) {
        if (!this.isQuiet) {
            console.time('⏱  ' + timeKey)
        }
    }

    timeEnd(timeKey: string) {
        if (!this.isQuiet) {
            console.timeEnd('⏱  ' + timeKey)
        }
    }
}
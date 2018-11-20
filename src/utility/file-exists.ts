import * as fs from 'fs'

export function fileExists(filePath: string) {
    const file = fs.existsSync(filePath)

    return Boolean(file)
}   
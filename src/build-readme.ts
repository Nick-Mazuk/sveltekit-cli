import { exec } from 'child_process'
import { promisify } from 'util'

import fs from 'fs-extra'

const execute = promisify(exec)

const main = async () => {
    const output = await execute('node index.js -h')
    const helpText = output.stdout === '' ? output.stderr : output.stdout
    const helpOutput = helpText.replace(/\n$/u, '')
    let readmeContents = fs.readFileSync('templates/build-readme/README.md').toString()
    readmeContents = readmeContents.replace('YARGS_HELP_OUTPUT', helpOutput)
    fs.writeFileSync('README.md', readmeContents)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises -- this is the main function
main()

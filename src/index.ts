#!/usr/bin/env node
import yargs from 'yargs'

import { createPage } from './create-page'

const args = yargs(process.argv.slice(2))
    .scriptName('kit')
    .usage('$0 <cmd> [args]')
    .command('create-page', 'Creates a new page')
    .command('create-layout', 'Creates a new layout')
    .command('create-endpoint', 'Creates a new endpoint')
    .help()
    .alias('version', 'v')
    .alias('help', 'h').argv

const main = async () => {
    const [command] = args._

    if (command === 'create-page') await createPage(args)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises -- it's the main function!
main()

export type Args = typeof args

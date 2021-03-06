#!/usr/bin/env node
import yargs from 'yargs'

import { createEndpoint } from './create-endpoint'
import { createLayout } from './create-layout'
import { createPage } from './create-page'

const args = yargs(process.argv.slice(2))
    .scriptName('kit')
    .usage('$0 <cmd> [args]')
    .command('create-page', 'Creates a new page')
    .command('create-layout', 'Creates a new layout', {
        reset: {
            type: 'boolean',
            describe: 'Create a layout reset',
        },
    })
    .command('create-endpoint', 'Creates a new endpoint')
    .help()
    .alias('version', 'v')
    .alias('help', 'h').argv

const main = async () => {
    const [command] = args._

    if (command === 'create-page') await createPage(args)
    if (command === 'create-endpoint') await createEndpoint(args)
    if (command === 'create-layout') await createLayout(args)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises -- it's the main function!
main()

export type Args = typeof args

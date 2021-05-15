import type { Args } from '.'
import type { Replacements } from './utilities'
import {
    cloneFileToProduction,
    getOptions,
    validatePath,
    doesProductionFileExist,
} from './utilities'

export const createLayout = async (args: Args): Promise<void> => {
    const options = await getOptions(args, {
        path: {
            command: true,
            prompt: "What's the path for the endpoint?",
            type: 'string',
            validate: validatePath,
        },
        reset: {
            prompt: 'Should this also reset the layout?',
            type: 'boolean',
            alias: 'r',
        },
    })
    const pagePath = String(options.path)
        .replace('.svelte', '')
        .replace('__layout', '')
        .replace('.reset', '')
        .replace(/^\//u, '')
        .replace(/\/$/u, '')

    if (options.reset) {
        const hasCustomFont = doesProductionFileExist('src/lib/css/fonts.css')
        const replacements: Replacements = []
        if (!hasCustomFont) replacements.push(["import '$lib/css/fonts.css'", ''])
        cloneFileToProduction(
            'create-layout/__layout.reset.svelte',
            `src/routes/${pagePath}/__layout.reset.svelte`,
            replacements
        )
        return
    }
    cloneFileToProduction('create-layout/__layout.svelte', `src/routes/${pagePath}/__layout.svelte`)
}

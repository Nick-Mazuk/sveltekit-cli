import type { Args } from '.'
import { getOptions, validatePath, cloneFileToProduction } from './utilities'

export const createPage = async (args: Args): Promise<void> => {
    const options = await getOptions(args, {
        path: { command: true, prompt: 'path', type: 'string', validate: validatePath },
    })
    const pagePath = String(options.path).replace('.svelte', '')
    cloneFileToProduction('create-page/page.svelte', `src/routes/${pagePath}.svelte`)
}

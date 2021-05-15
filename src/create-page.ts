import type { Args } from '.'
import { getOptions, validatePath, cloneFileToProduction } from './utilities'

const getUrlPath = (pagePath: string): string => {
    const relativePath = `/${pagePath}`
    if (relativePath === '/index') return '/'
    if (relativePath.endsWith('index')) return relativePath.replace(/\/index$/u, '')
    return relativePath
}

export const createPage = async (args: Args): Promise<void> => {
    const options = await getOptions(args, {
        path: {
            command: true,
            prompt: "What's the path for the page?",
            type: 'string',
            validate: validatePath,
        },
    })
    const pagePath = String(options.path)
        .replace('.svelte', '')
        .replace(/^\//u, '')
        .replace(/\/$/u, '')
    cloneFileToProduction('create-page/page.svelte', `src/routes/${pagePath}.svelte`)
    cloneFileToProduction('create-page/cypress.ts', `cypress/integration/${pagePath}.test.ts`, [
        ['PAGE_PATH', getUrlPath(pagePath)],
    ])
}

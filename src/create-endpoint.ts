import type { Args } from '.'
import {
    getOptions,
    validatePath,
    getTemplateContents,
    getProductionFileContent,
    replaceFileContents,
    writeFileToProduction,
} from './utilities'

const validateMethod = (input: string) => {
    return ['get', 'post', 'put', 'patch', 'del'].includes(input.toLowerCase())
        ? true
        : 'Can only be "get", "post", "put", "patch", or "del"'
}

export const createEndpoint = async (args: Args): Promise<void> => {
    const options = await getOptions(args, {
        path: {
            command: true,
            prompt: "What's the path for the endpoint?",
            type: 'string',
            validate: validatePath,
        },
        method: {
            prompt: 'What should the method be (e.g, GET)?',
            type: 'string',
            validate: validateMethod,
        },
    })
    const pagePath = String(options.path).replace('.ts', '').replace(/^\//u, '').replace(/\/$/u, '')
    const endpointContents = getTemplateContents('create-endpoint/endpoint.ts')
    const endpointFunctionContents = getTemplateContents('create-endpoint/endpoint-function.ts')
    let contents = getProductionFileContent(`src/routes/${pagePath}.ts`)
    if (contents.includes(`export const ${options.method}`)) return
    if (contents === '') contents += endpointContents
    contents += '\n'
    contents += replaceFileContents(endpointFunctionContents, [['METHOD', String(options.method)]])
    writeFileToProduction(`src/routes/${pagePath}.ts`, contents)
}

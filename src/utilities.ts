import path from 'path'
import { fileURLToPath } from 'url'

import fs from 'fs-extra'
import prompts from 'prompts'

import type { Args } from '.'

export type Options = { [option: string]: string | boolean }
export type RequiredOptions = {
    [option: string]: {
        command?: boolean
        alias?: string
        type: 'boolean' | 'string'
        validate?: (input: string) => boolean | string
        prompt: string
    }
}

export const validatePath = (input: string): boolean | string => {
    if (input === '') return 'This cannot be blank'
    if (input.match(/\s/u)) return 'do not use spaces'
    // eslint-disable-next-line no-useless-escape -- actually needed
    if (!input.match(/^[[a-z\/\-\].\d]+$/u)) return 'use kabob case'
    if (input.match(/--/u)) return 'cannot use two dashes in a row'
    if (input.match(/\/\//u)) return 'cannot use two slashes in a row'
    return true
}

export const getOptions = async (args: Args, options: RequiredOptions): Promise<Options> => {
    const questions: prompts.PromptObject[] = []
    const output: Options = {}

    Object.keys(options).forEach((name) => {
        const option = options[name]
        if (
            option.command &&
            args._.length > 1 &&
            (typeof option.validate === 'undefined' || option.validate(String(args._[1])))
        )
            output[name] = String(args._[1])
        else if (args[name]) output[name] = true
        else if (option.alias && args[option.alias]) output[name] = true

        if (typeof output[name] !== 'undefined') return

        if (option.type === 'boolean') {
            questions.push({
                type: 'toggle',
                message: option.prompt,
                active: 'yes',
                inactive: 'no',
                name,
            })
        } else {
            questions.push({
                type: 'text',
                message: option.prompt,
                name,
                validate: option.validate,
            })
        }
    })
    const response = await prompts(questions, { onCancel: () => process.exit(0) })
    return { ...output, ...response }
}

export const createValidFilePath = (inputPath: string): string => {
    const splitPath = inputPath.split('/')
    return path.join(...splitPath)
}

export const cloneFileToProduction = (
    templateName: string,
    finalLocation: string,
    replacements?: [string, string][]
): void => {
    const templatePath = fileURLToPath(
        new URL(createValidFilePath(`./templates/${templateName}`), import.meta.url).href
    )
    let contents = fs.readFileSync(templatePath).toString()
    if (replacements) {
        replacements.forEach(([target, replacement]) => {
            const regex = new RegExp(target, 'gu')
            contents = contents.replace(regex, replacement)
        })
    }
    const location = createValidFilePath(`./${finalLocation}`)
    fs.ensureFileSync(location)
    fs.writeFileSync(createValidFilePath(`./${finalLocation}`), contents)
}

export const getAllTemplateFilePaths = (command: string): string[] => {
    const folderPath = fileURLToPath(
        new URL(createValidFilePath(`./templates/${command}`), import.meta.url).href
    )
    const files = fs.readdirSync(folderPath)
    return files.map((file) => createValidFilePath(`${command}/${file}`))
}

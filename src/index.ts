#!/usr/bin/env node
import fs from 'fs'
import { fileURLToPath } from 'url'

console.log('running')
console.log('template path', fileURLToPath(new URL(`.`, import.meta.url).href))
console.log('local path', fs.readdirSync('.'))

export {}

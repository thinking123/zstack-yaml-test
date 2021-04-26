#!/usr/bin/env node


import { Command } from 'commander'
import { ParserMode, ParserConfig } from './types';

import { transform } from './'
import { StdoutType, LogType } from '../types';
import { Logger } from './logger';

const program = new Command();


/**
 * commander
 *
 * dir | files :Pattern
 * file extention : Pattern
 * mode : [combined , single ]
 * watch : boolean
 * import-resource-path: string
 * over-write: boolean
 */
const logger = Logger.logger(StdoutType.Console)

program
  .option('-d, --dir [value]', 'directory for parser')
  .option('-f, --files [value...]', 'files for parser')
  .option('-p, --pattern [value]', 'file math pattern')
  .option('-m, --mode [items]', 'parser mode', 'single')
  .option('-w, --watch', 'watch files', false)
  .option('-r, --over-write', 'over write parser files', false)
  .option('-i, --import-resource-path [value]', 'resource import path', '@test/features/helper/env-generator')

program.parse()

const options = program.opts()


const watch = options.watch as boolean
const pattern = options.pattern as RegExp ? new RegExp(options.pattern) : /\.e2e-spec\.ts$/
const overWrite = options.overWrite as boolean
const importResourcePath = options.importResourcePath as string

const modes = (String(options.mode))?.split(',') ?? ['single']

let mode: ParserMode = ParserMode.Single
if (modes.length === 2) {
  mode = ParserMode.All
} else {
  mode = modes[0] === 'single' ? ParserMode.Single : ParserMode.Combine
}


let dir: string, files: string[]
if (!options.dir && !options.files) {
  logger.log('dir or files all not set')
  process.exit(1)
}

if (options.dir) {
  dir = options.dir
}
if (options.files) {
  files = options.files
}

const config: ParserConfig = {
  watch,
  overWrite,
  importResourcePath,
  dir,
  files,
  mode,
  pattern
}


transform(config).then(err => {
  if (err) {
    logger.log(`[transform]: ${err}`)
    return
  }

  logger.log(`[transform]: ok`, LogType.Info)
})
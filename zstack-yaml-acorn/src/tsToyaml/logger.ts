import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { LogType, StdoutType } from '../types'


let logger: Logger

export class Logger {
  logFilePath: string
  index = 1
  // debug = process.env.NODE_ENV === 'debug'

  constructor(private stdout: StdoutType = StdoutType.Console, private logFileName: string = 'log.txt', private context: string = process.cwd(),) {


    // if (!this.debug) return

    if (logFileName && stdout === StdoutType.File) {
      this.logFilePath = path.join(context, logFileName)
      fs.openSync(this.logFilePath, 'w+')
      fs.truncateSync(this.logFilePath, 0)
    }
  }

  private writeToFile(message: string, type: LogType) {
    const msg = `${this.index++}: [${type}]: ${message}\n`
    if (this.logFileName) {
      fs.appendFileSync(this.logFileName, msg, 'utf8')
    } else {
      switch (type) {
        case LogType.Info:
          console.log(msg)
          break
      }
    }
  }

  private writeToConsole(message: string, type: LogType) {
    const titleReg = /\[([^\[\]]+)\]/
    const match = message?.match(titleReg)
    const [, title] = match ?? []
    let chalkTitle: string = title
    if (title) {
      switch (type) {
        case LogType.Error:
          chalkTitle = chalk.red(title)
          break;
        case LogType.Warning:
          chalkTitle = chalk.yellow(title)
          break;
      }

      const msg = `[${chalkTitle}]` + message.substring(match?.[0]?.length ?? 0)
      console.log(msg)
      return
    }
    let msg: string = message
    switch (type) {
      case LogType.Error:
        msg = chalk.red(message)
        break;
      case LogType.Warning:
        msg = chalk.yellow(message)
    }
    console.log(msg)
  }

  log(message: string, type: LogType = LogType.Error) {

    if (process.env.NODE_ENV !== 'debug') return

    if (this.stdout === StdoutType.File) {
      this.writeToFile(message, type)
    } else {
      this.writeToConsole(message, type)
    }
  }

  static logger(stdout?: StdoutType) {
    if (!logger) {
      logger = new Logger(stdout)
    }

    return logger
  }
}

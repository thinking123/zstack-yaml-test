import fs from 'fs'
import path from 'path'
import { LogType } from '../types'


let logger: Logger

export class Logger {
  logFilePath: string
  index = 1
  constructor(private logFileName: string = 'log.txt', private context: string = process.cwd()) {
    if (logFileName) {
      this.logFilePath = path.join(context, logFileName)
      fs.openSync(this.logFilePath, 'w+')
      fs.truncateSync(this.logFilePath, 0)
    }
  }

  private write(message: string, type: LogType) {
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

  log(message: string) {
    this.write(message, LogType.Info)
  }

  static logger() {
    if (!logger) {
      logger = new Logger()
    }

    return logger
  }
}

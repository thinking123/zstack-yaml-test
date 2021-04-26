
import glob from 'glob'
import path from 'path'

const valToString = varObj => Object.keys(varObj)[0]

const isYamlNode = node => node && typeof node === 'object' && 'name' in node && 'children' in node

async function getAllFilesByPatterns(dirOrFiles: string, pattern: RegExp, extension: string): Promise<string[]>
async function getAllFilesByPatterns(dirOrFiles: string[], pattern: RegExp, extension: string): Promise<string[]>
async function getAllFilesByPatterns(dirOrFiles: string | string[], pattern: RegExp, extension: string): Promise<string[]> {

  let files: string[] = []
  if (Array.isArray(dirOrFiles)) {
    files = dirOrFiles?.filter((file) => file.match(pattern))
  } else {
    const dir = path.join(process.cwd(), dirOrFiles as string, './')

    return new Promise((res, rej) => {
      glob(`${dir}**/*${extension}`, (err, _files: string[]) => {
        if (err) {
          return rej(err)
        }
        files = _files?.filter((file) => file.match(pattern)) ?? []
        res(files)
      })
    })
  }

  return files
}

export {
  isYamlNode,
  valToString,
  getAllFilesByPatterns
}
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

import circularJson from 'circular-json'
// import { transform } from '.'

const yp = path.join(process.cwd(), 'test/assets/ipsec-connection.yaml')

const fc = fs.readFileSync(yp, { encoding: "utf-8" })
const json = yaml.load(fc)

// const res = transform(json, 'ipsecCreate')
// console.log('res', res)
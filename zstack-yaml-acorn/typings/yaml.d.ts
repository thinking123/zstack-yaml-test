declare module '*.css';
declare module '*.yaml'
declare module 'js-yaml' {
  export function load(str: string): any
  export function dump(obj: object): any
}
declare module 'circular-json' {
  export function stringify(json: object): string
}
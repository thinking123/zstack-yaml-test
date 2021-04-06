declare module '*.css';
declare module '*.yaml'
declare module 'js-yaml' {
  export function load(str: string): any
}
declare module 'circular-json' {
  export function stringify(json: object): string
}
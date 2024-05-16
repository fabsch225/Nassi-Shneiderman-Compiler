export type token = {
    type: number,
    name: string,
    arguments: string[],
    branches: token[][]
}
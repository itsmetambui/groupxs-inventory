export const sleep = (ms: number): Promise<Function> => new Promise((resolve) => setTimeout(resolve, ms))

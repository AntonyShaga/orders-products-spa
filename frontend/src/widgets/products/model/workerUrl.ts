export const createProductsWorker = () =>
  new Worker(new URL('./products.worker.ts', import.meta.url), {
    type: 'module',
  })

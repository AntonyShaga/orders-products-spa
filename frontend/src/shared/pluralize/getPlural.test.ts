import { getPlural } from './getPlural'

describe('getPlural', () => {
  const en = {
    one: 'product',
    few: 'products',
    many: 'products',
  }

  const ru = {
    one: 'товар',
    few: 'товара',
    many: 'товаров',
  }

  const ua = {
    one: 'товар',
    few: 'товари',
    many: 'товарів',
  }

  const cases = [
    { count: 0, type: 'many' },
    { count: 1, type: 'one' },
    { count: 2, type: 'few' },
    { count: 3, type: 'few' },
    { count: 4, type: 'few' },
    { count: 5, type: 'many' },
    { count: 11, type: 'many' },
    { count: 12, type: 'many' },
    { count: 14, type: 'many' },
    { count: 21, type: 'one' },
    { count: 22, type: 'few' },
    { count: 25, type: 'many' },
    { count: 101, type: 'one' },
    { count: 111, type: 'many' },
  ] as const

  describe('EN', () => {
    test.each(cases)('%i → %s', ({ count, type }) => {
      expect(getPlural(count, en)).toBe(en[type])
    })
  })

  describe('RU', () => {
    test.each(cases)('%i → %s', ({ count, type }) => {
      expect(getPlural(count, ru)).toBe(ru[type])
    })
  })

  describe('UA', () => {
    test.each(cases)('%i → %s', ({ count, type }) => {
      expect(getPlural(count, ua)).toBe(ua[type])
    })
  })
})

import { formatDateLong, formatDateShort } from './formatDate'

describe('formatDate', () => {
  const date = '2025-04-15T00:00:00.000Z'

  it('formats long date for en locale', () => {
    const result = formatDateLong(date, 'en')
    expect(result).toMatch(/Apr|Apr\./)
  })

  it('formats long date for ru locale', () => {
    const result = formatDateLong(date, 'ru')
    expect(result).toMatch(/апр/i)
  })

  it('formats long date for ua locale (normalized to uk-UA)', () => {
    const result = formatDateLong(date, 'ua')
    expect(result).toMatch(/квіт|кві/i)
  })

  it('formats short date correctly', () => {
    const result = formatDateShort(date, 'en')
    expect(result).toMatch(/\d{2}\/\d{2}/)
  })

  it('uses fallback locale if unknown', () => {
    const result = formatDateLong(date, 'unknown')
    expect(result).toBeTruthy()
  })

  it('does not crash on invalid locale', () => {
    expect(() => formatDateLong(date, '???')).not.toThrow()
  })
})

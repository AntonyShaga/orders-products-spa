import { formatDateLong, formatDateShort, formatTime } from './formatDate'

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

describe('formatTime', () => {
  const date = new Date('2025-04-15T13:05:00Z')

  it('formats time in 24h format for en locale', () => {
    const result = formatTime(date, 'en')
    expect(result).toMatch(/\d{2}:\d{2}/)
  })

  it('formats time for ru locale', () => {
    const result = formatTime(date, 'ru')
    expect(result).toMatch(/\d{2}:\d{2}/)
  })

  it('formats time for ua locale (normalized)', () => {
    const result = formatTime(date, 'ua')
    expect(result).toMatch(/\d{2}:\d{2}/)
  })

  it('uses fallback locale for unknown locale', () => {
    const result = formatTime(date, 'unknown')
    expect(result).toMatch(/\d{2}:\d{2}/)
  })

  it('does not throw on invalid locale', () => {
    expect(() => formatTime(date, '???')).not.toThrow()
  })

  it('returns consistent format (HH:mm)', () => {
    const result = formatTime(date, 'en')
    expect(result.length).toBe(5)
    expect(result[2]).toBe(':')
  })
})

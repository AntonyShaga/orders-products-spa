const normalizeLocale = (locale: string) => {
  switch (locale) {
    case 'ua':
      return 'uk-UA'
    case 'ru':
      return 'ru-RU'
    case 'en':
      return 'en-US'
    default:
      return 'en-US'
  }
}

export const formatDateLong = (date: string, locale: string) => {
  return new Intl.DateTimeFormat(normalizeLocale(locale), {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export const formatDateShort = (date: string, locale: string) => {
  return new Intl.DateTimeFormat(normalizeLocale(locale), {
    day: '2-digit',
    month: '2-digit',
  }).format(new Date(date))
}

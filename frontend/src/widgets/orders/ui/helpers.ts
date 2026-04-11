export const formatDateShort = (date: string) => {
  const d = new Date(date)

  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')

  return `${day} / ${month}`
}
export const formatDateLong = (date: string) => {
  const d = new Date(date)

  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const month = months[d.getMonth()]

  return `${day} / ${month} / ${year}`
}

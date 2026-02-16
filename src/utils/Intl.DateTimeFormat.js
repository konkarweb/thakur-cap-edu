export const formatToIST = (utcDateString) => {
  if (!utcDateString) return ''

  const date = new Date(utcDateString.replace(' ', 'T') + 'Z')

  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}
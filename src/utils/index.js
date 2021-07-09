export function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatDate (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

export function formatTime (date) {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [hour, minute, second].map(formatNumber).join(':')
}

export function formatDateTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()

  const t1 = [year, month, day].join('-')
  const t2 = [hour, minute].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatDate,
  formatTime,
  formatDateTime
}

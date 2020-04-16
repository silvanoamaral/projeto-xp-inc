export const msConversion = ms => {
  const min = Math.floor((ms/1000/60) << 0)
  const sec = Math.floor((ms/1000) % 60)

  return `${min}:${sec}`
}
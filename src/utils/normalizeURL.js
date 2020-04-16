export const normalizeURL = (str, query) => {
  if(str) {
    return str.replace(/\s+/g, '-').toLowerCase()
  } else {
    return query.replace(/\s+/g, '-').toLowerCase()
  }
}
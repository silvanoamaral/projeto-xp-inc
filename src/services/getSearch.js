import axios from 'axios'

export const getSearch = async (token, query) => {
  const urlBase = `https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=21&offset=1`

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  return await axios.get(urlBase, config)
  .then(res => {
    if(res.status != 200)
      return {'erro': 'Algo deu errado ;('}

    return res.data
  })
  .catch(error => {
    return error.response
  })
}
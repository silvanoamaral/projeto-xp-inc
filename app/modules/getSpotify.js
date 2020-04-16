'use strict'

const axios = require('axios')

const baseURL = 'https://private-afe609-testefront.apiary-mock.com'
const auth = require('../auth/authPublicKey')

const getDados = async (req, res, next) => {
  const path = req.query.path || 'anual-result'

  await axios.get(`${baseURL}/${path}`)
  .then(response => {
    if(response.status != 200)
      return {error: 'Sistema indisponível, tente mais tarde.'}

    return response.data
  }).then(data => {
    res.json(data)
  })
  .catch(error => {
    return {error: error.message}
  })

  next({})
}
const refreshToken = (req, res) => {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
}

const url = require('url')
const querystring = require('querystring')

const callback = async (req, res, next) => {
  const { code } = req.query
  let parsedUrl = url.parse(req.url)
  console.log('parsedUrl', parsedUrl)
  try {
    await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Authorization': 'Basic ' + code
      },
      auth: {
        username: auth.clientID,
        password: auth.clientSecret
      }
    }).then(function(response) {
      const data = response.data
      //console.log(response)
      
      res.cookie('access_token', data.access_token, {expire : new Date() + data.expires_in })
      //res.redirect('http://localhost:8002/')
    }).catch(function(error) {
      clearCookie('access_token')
      res.redirect(`http://localhost:8002/error?${error.message}`)
    })
  } catch(err) {
    res.redirect(`http://localhost:8002/error`)
  }
  next({})
}

module.exports = {
  callback,
  getDados,
  refreshToken
}
import axios from 'axios'

export const request = axios.create({
  baseURL: "https://conduit.productionready.io/"
})

export default ({ store }) => {
  request.interceptors.request.use(function (config) {
    const { userInfo } = store.state
    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Token ${userInfo.token}`
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })
}
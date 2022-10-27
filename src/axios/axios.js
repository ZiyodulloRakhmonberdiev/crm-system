import axios from 'axios'

const instance = axios.create({
  baseURL: "https://crm.my-project.site"
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem("crm_token")
  return config
})

export default instance
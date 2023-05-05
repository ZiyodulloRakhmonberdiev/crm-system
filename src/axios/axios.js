import axios from 'axios'

const instance = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? window.location.origin
			: 'http://crm.paydali.uz',
})

instance.interceptors.request.use(config => {
	config.headers.Authorization =
		'Bearer ' + window.localStorage.getItem('crm_token')
	return config
})

export default instance

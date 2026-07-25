const app = require('../apps/express-api/src/app')

module.exports = (req, res) => {
	const prefix = '/api/_express'
	if (req.url.startsWith(prefix) || req.url === '/api/_express/') {
		req.url = req.url.slice(prefix.length) || '/'
	}
	app(req, res)
}

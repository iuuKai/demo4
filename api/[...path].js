const app = require('../apps/express-api/src/app')

const PREFIX = '/_site/'

module.exports = (req, res) => {
	if (req.url.startsWith(PREFIX) || req.url === '/_site') {
		req.url = req.url.slice(PREFIX.length - 1) || '/'
	}
	app(req, res)
}

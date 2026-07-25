const app = require('../apps/express-api/src/app')

const PREFIX = '/api/_express'

function handler(req, res) {
	if (req.url.startsWith(PREFIX)) {
		req.url = req.url.slice(PREFIX.length) || '/'
	}
	app(req, res)
}

module.exports = handler
module.exports.handle = handler

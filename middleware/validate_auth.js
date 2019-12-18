const jwt = require('jsonwebtoken');
const constants = require('../constants.js')


module.exports = function (req, res, next) {
	console.log('START: ' + req.url)

	if (req.url == '/login' || req.url.toString().startsWith('/signup') || req.url.toString().startsWith('/changePassword') || req.url == '/forgot' ) {
		console.log('EXEMPTED: ' + req.url)
		return next();
	}

	const user_jwt_token = req.cookies.jwt_token;

	if (user_jwt_token) {
		try {
			let payload = jwt.verify(user_jwt_token, process.env.SESSION_SECRET);
			console.log(payload);
			return next();
		} catch (e) {
			return res.redirect('/account/login')
		}
	} else {
		return res.redirect('/account/login')
	}
}
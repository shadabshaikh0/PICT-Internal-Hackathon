const constants = require('../constants.js')
const jwt = require('jsonwebtoken')

let profilePage = function (req, res) {
	console.log('profilePage')
	res.render('dashboard', {
		title: 'Dashboard'
	});
}

let loginPage = function (req, res) {
	console.log('Login Page function')
	res.render('login', {
		title: 'Login'
	});
}

let validateLogin = function (req, res) {
	// Suppose Login credential is OK
	credentials_ok = true;
	const jwtExpirySeconds = constants.JWT_EXPIRY_SECONDS;
	const jwt_secret_key = process.env.SESSION_SECRET;

	if (credentials_ok) {

		payload = {
			uid: '12334'
		}
		let generated_token = jwt.sign({
			payload
		}, jwt_secret_key, {
			algorithm: 'HS256',
			expiresIn: jwtExpirySeconds
		})

		res.cookie(constants.JWT_TOKEN_KEY, generated_token, {
			maxAge: jwtExpirySeconds * 1000
		});
		return res.redirect('/account/profile');
	}
	else{
		return res.redirect('/');
	}
}

module.exports = {
	loginPage: loginPage,
	validateLogin: validateLogin,
	profilePage: profilePage
}
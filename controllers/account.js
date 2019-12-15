const constants = require('../constants.js')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const bcrypt = require('bcrypt');
const crypto = require('crypto');


let profilePage = function (req, res) {
	res.render('dashboard', {
		title: 'Dashboard'
	});
}

let loginPage = function (req, res) {
	res.render('login', {
		title: 'Login'
	});
}

let validateLogin = async function (req, res) {
	const user = await User.findOne({
		_id: req.body.reg_id
	});
	if (!user) return res.status(400).json({
		registered: false
	});

	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).json({
		password: false
	});

	// Suppose Login credential is OK
	const jwtExpirySeconds = constants.JWT_EXPIRY_SECONDS;
	const jwt_secret_key = process.env.SESSION_SECRET;
	payload = {
		uid: user._id
	}
	let generated_token = jwt.sign({
		payload
	}, jwt_secret_key, {
		algorithm: 'HS256',
		expiresIn: jwtExpirySeconds
	})

	res.cookie(constants.UUID, user._id, {
		maxAge: jwtExpirySeconds * 1000
	});

	res.cookie(constants.JWT_TOKEN_KEY, generated_token, {
		maxAge: jwtExpirySeconds * 1000
	});
	return res.redirect('/account/profile');

}

let signUpPage = function (req, res) {
	res.render('signup', {
		title: 'Signup'
	});
}

let signUpUser = function (req, res) {
	const new_user = new User(req.body)
	new_user.save()
		.then(() => {
			return res.redirect('/account/login')
		})
}

module.exports = {
	loginPage: loginPage,
	validateLogin: validateLogin,
	profilePage: profilePage,
	signUpPage: signUpPage,
	signUpUser: signUpUser
}
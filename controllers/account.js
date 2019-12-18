const constants = require('../constants.js')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');

const enc_dec = require('../utils/enc_dec');

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

let profilePage = function (req, res) {
	console.log('profilePage')
	res.render('dashboard', {
		title: 'Dashboard'
	});
}
let changePasswordPage = function (req, res) {
	console.log('change Password')
	res.render('changePassword', {
		title: 'change Password'
	});
}
let changePass = function (req, res) {
	console.log('change pass function')
}
let loginPage = function (req, res) {
	console.log('Login Page function')
	res.render('login', {
		title: 'Login'
	});
}

let renderUpdatePage= function (req, res) {
	console.log('Update GET REQuest')
	res.render('update', {
		title: 'update'
	});
}

let saveUpdatePage = function (req, res) {

	const update_user_fields = req.body ;
	User.updateOne({ _id: update_user_fields._id }, 
		update_user_fields,
		function (err, affected, resp) {
		return res.redirect('/account/profile?tab=profile')
	});
}

function hashID(id) {
	let reset_link = enc_dec.encrypt(id)
	console.log(reset_link);
	return reset_link.encryptedData;
}

let sendMail = function (email) {

	console.log('send Mail function')

	let transport = nodemailer.createTransport({
		// host: 'smtp.mailtrap.io',
		service: 'gmail',
		// port: 2525,
		auth: {
			user: process.env.NODEMAILER_EMAIL,
			pass: process.env.NODEMAILER_PASS
		}
	});
	/// To do : assume already reg students has unique email
	transport.sendMail(email, function (err, info) {
		if (err) {
			console.log(err)
			console.log("error")
		} else {
			console.log("email sent ");
		}
	});
}

let sendForgotMail = async function (req, res) {

	const user = await User.findOne({
		_id: req.body.regid
	});

	if (user) {
		console.log(user._id);
		let password_hash = hashID(user._id);
		let reset_link = process.env.BASE_URL + '/account/changePassword?time=' + password_hash + "?id=" + user._id;
		var email = {
			from: 'internalhack2020@gmail.com',
			to: user.email,
			subject: 'Internal hackathon password reset link mail',
			text: 'Hello' + user.name + '</strong>,<br><br>you recently requested password reset Link. This link is only valid for 30 minutes.',
			html: 'Hello<strong>' + user.name + '</strong>,<br><br>you recently requested password reset Link. This link is only valid for 30 minutes\n Reset Link ' + reset_link
		};
		// Send Mail
		sendMail(email) ; 
		return res.redirect('/');
	}
	else {
		return res.send('Error No Mail')
	}
}

let sendWelcomeMail = async function (email, user) {
	readHTMLFile('./public/emailconfirm.html', function(err, html) {
		var template = handlebars.compile(html);
		var replacements = {
			 username: user.name
		};
		var htmlToSend = template(replacements);
		var email = {
			from: 'internalhack2020@gmail.com',
			to: user.email,
			subject: 'Registration Successful',
			//text: 'ested password reset Link. This link is only valid for 30 minutes.',
			html: htmlToSend
		};
		sendMail(email) ; 
	});
}


let validateLogin = async function (req, res) {
	console.log(req.body);
	
	const user = await User.findOne({
		_id: req.body.reg_id
	});
	console.log(user);
	
	if (!user) return res.json({
		problem: 'invalid_username'
	});
	console.log(req.body);
	
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.json({
		problem: 'invalid_password'
	});

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
	
	return res.json({
		problem: 'no_problem'
	});
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
			console.log('done')
			let email = { }
			sendWelcomeMail(email, new_user) ; 
			return res.redirect('/account/login')
		})
}
let forgotPasswordPage = function (req, res) {
	console.log('forgotPassword function')
	res.render('forgot', {
		title: 'Forgot'
	});
}
let updatePass = async function (req, res) {
	console.log('update password function')
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	let id = req.body.id;
	let challenge = req.body.time;

	console.log(challenge)

	const user = await User.findOne({
		_id: req.body.regid
	});

	let challenge_id = enc_dec.decrypt(challenge);
	console.log(challenge_id);

	if (user._id == challenge_id) {
		User.updateOne({ _id: user._id }, {
			password: hashedPassword
		}, function (err, affected, resp) {
			//console.log(resp);
			return res.redirect('/account/login')
		});
	}
}
module.exports = {
	loginPage: loginPage,
	validateLogin: validateLogin,
	profilePage: profilePage,
	signUpPage: signUpPage,
	signUpUser: signUpUser,
	forgotPasswordPage: forgotPasswordPage,
	sendForgotMail: sendForgotMail,
	changePasswordPage: changePasswordPage,
	updatePass: updatePass,
	renderUpdatePage : renderUpdatePage,
	saveUpdatePage : saveUpdatePage,
	sendMail : sendMail,
	readHTMLFile : readHTMLFile

}

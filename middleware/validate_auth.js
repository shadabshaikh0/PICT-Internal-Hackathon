const jwt  = require('jsonwebtoken');
const constants = require('../constants.js')


module.exports = function(req, res, next){
	console.log(req.url)
	
	if(req.url == '/login' || req.url == '/signup'){
		console.log(req.url)
		return next();
	}
	
	const user_jwt_token = req.cookies.jwt_token ; 

	if(user_jwt_token){
		try{
			let payload = jwt.verify(user_jwt_token, process.env.SESSION_SECRET);
			console.log(payload);
			return next();
		}
		catch(e){
			return res.redirect('/account/login')
		}
	}
	else{
		return res.redirect('/account/login')
	}

}

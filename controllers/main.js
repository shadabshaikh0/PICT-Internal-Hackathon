let landingPage = function (req, res) {
	console.log("index page");
	res.sendFile('public/index.html');
}

module.exports = {
	landingPage: landingPage
}
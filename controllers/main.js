let landingPage = function (req, res) {
	res.sendFile('public/index.html');
}

module.exports = {
	landingPage: landingPage
}
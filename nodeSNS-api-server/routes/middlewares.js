const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');

exports.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()) {
		next();
	} else {
		res.status(403).send('need to login');
	}
};

exports.isNotLoggedIn = (req, res, next) => {
	if(!req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/');
	}
};

exports.verifyToken = (req, res, next) => {
	try{
		req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
		return next();
	} catch (error) {
		if(error.name === 'TokenExpiredError') {
			return res.status(419).json({
				code: 419,
				message: 'Token has been expired',
			});
		}
		return res.status(401).json({
			code:401,
			message: 'invalid token',
		});
	}
};

exports.apiLimiter = new RateLimit({
	windowMs: 60 * 1000,
	max : 1,
	delayMs: 0,
	handler(req, res) {
		res.status(this.statusCode).json({
			code: this.statusCode,
			message: 'request only one per minute',
		});
	},
});

exports.deprecated = (req, res) => {
	res.status(410).json({
		code: 410,
		message: 'version updated. please use new version',
	});
};

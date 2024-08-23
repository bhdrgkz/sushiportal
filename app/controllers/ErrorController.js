exports.pageNotFound = (req, res, next) => {
	res.status(404).render('404');
};

exports.forbidden = (req, res, next) => {
	res.status(403);
	res.redirect('/login');
};
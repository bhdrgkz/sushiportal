//const bcrypt 					= require('bcryptjs');
const CryptoJS 					= require("crypto-js");
const validator 				= require("validator");
const Members 					= require("../models/Members");
const Session 					= require("../models/Session");
const flashMessageEditer 		= require("../../lib/helpers/flashMessageEditer");

const message = (req) => {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}

	return message;
}

const oldInput = (req) => {
	let oldInput = req.flash('oldInput');
	if (oldInput.length > 0) {
		oldInput = oldInput[0];
	} else {
		oldInput = null;
	}
	
	return oldInput;
}

exports.loginPage = async (req, res, next) => {
	if(res.locals.isAuthenticated){
		res.redirect('/');
	} else {

		const page = {
			asset: {
				title: "Giriş",
				style: "login.css",
				view: "login",
			},
			data: {
				flashMessage: flashMessageEditer.message(req),
			}
		}

		res.render(page.asset.view, page);

	}
};

exports.login = (req, res, next) => {
	const validationErrors = [];
	if (!validator.isEmail(req.body.inputEmail)) validationErrors.push('Geçerli bir email adresi girin.');
	if (validator.isEmpty(req.body.inputPassword)) validationErrors.push('Şifre alanı boş olamaz.');
	if (validationErrors.length) {
		req.flash('error', validationErrors);
		return res.redirect('/login');
	}
	Members.findOne({
		where: {
			email: req.body.inputEmail
		}
	}).then(member => {
		if(member) {
			let inputPassword = req.body.inputPassword.replace(/\s+/g, '');
			let hashedInputPassword = CryptoJS.MD5(inputPassword).toString();

			if (hashedInputPassword === member.password) {
				req.session.isLoggedIn = true;
				req.session.member = member.dataValues;
				return req.session.save(err => {
					if (err) {
						console.log(err);
					}
					res.redirect('/dashboard');
				});
			} else {
				req.flash('error', 'Geçersiz email ya da şifre girdiniz.');
				req.flash('oldInput', { email: req.body.inputEmail });
				return res.redirect('/login');
			}
		} else {
			req.flash('error', 'Bu email adresi ile kayıtlı bir kullanıcı bulunamadı.');
			req.flash('oldInput',{email: req.body.inputEmail});
			return res.redirect('/login');
		}
	})
	.catch(err => console.log(err));
};

exports.logout = (req, res, next) => {
	if(res.locals.isAuthenticated){
		req.session.destroy(err => {
			return res.redirect('/login');
		});
	} else {
		return res.redirect('/login');
	}
};

exports.signUpPage = (req, res, next) => {
	res.render('sign_up',{layout: 'login_layout', signUpPage: true, errorMessage: message(req), oldInput: oldInput(req)});
};

exports.signUp = (req, res, next) => {
	Members.findOne({
		where: {
			email: req.body.email
		}
	}).then(member => {
		if(!member) {

			let string = req.body.password.replace(/\s+/g, '');
			let hashedPassword = CryptoJS.MD5(string).toString();
			const member = new Members({
				fullName: req.body.name,
				email: req.body.email,
				password: hashedPassword,
			});

			member.save().then(result => {
				console.log(result)
				return res.redirect('/login');
			}).catch(err => {
				console.log(err)
				req.flash('error', 'Hata meydana geldi.');
				return res.redirect('/sign-up');
			});

		} else {
			req.flash('error', 'Email kullanılıyor..');
			req.flash('oldInput',{name: req.body.name});
        	return res.redirect('/sign-up');
		}
	})
	.catch(err => console.log(err));
};

exports.forgotPasswordPage = (req, res, next) => {
	if(res.locals.isAuthenticated){
		return res.redirect('/');
	} else {
		return res.render('forgot_password',{layout: 'login_layout', loginPage: true, pageTitle: 'Forgot Password', errorMessage: message(req), oldInput: oldInput(req)});
	}
};

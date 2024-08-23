const Members                       = require("../models/Members");

const _                             = require("lodash");
const axios                         = require("axios");
const request                       = require("request");

const {DataTypes}                   = require("sequelize");
const packageJson                   = require('../../package.json');

const flashMessageEditer            = require("../../lib/helpers/flashMessageEditer");


exports.dashboardPage = (req, res, next) => {

	if(!res.locals.isAuthenticated){
		return res.redirect('/login');
	}

	const pageSettings = {
		title: "Dashboard",
		style: "dashboard",
	}

	const data = {
		pageSettings: pageSettings,
		flashMessage: flashMessageEditer.message(req)
	}

	res.render('dashboard', data);
};
const Members                       = require("../models/Members");

const _                             = require("lodash");
const axios                         = require("axios");
const request                       = require("request");

const { DataTypes }                 = require("sequelize");
const packageJson                   = require('../../package.json');

const flashMessageEditer            = require("../../lib/helpers/flashMessageEditer");


exports.dashboardPage = (req, res, next) => {

	if(!res.locals.isAuthenticated || !req.session.isLoggedIn){
		return res.redirect('/login');
	}

	const page = {
		asset: {
			title: "Dashboard",
			style: "dashboard.css",
			view: "dashboard/dashboard",
		},
		data: {
			flashMessage: flashMessageEditer.message(req),
		}
	}

	res.render(page.asset.view, page);
};

exports.dashboardPointRequestPage = (req, res, next) => {

	if(!res.locals.isAuthenticated || !req.session.isLoggedIn){
		return res.redirect('/login');
	}

	const page = {
		asset: {
			title: "Puan Talep",
			style: "dashboard.css",
			view: "dashboard/point_request",
		},
		data: {
			flashMessage: flashMessageEditer.message(req),
		}
	}

	res.render(page.asset.view, page);
};
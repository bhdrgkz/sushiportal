const path 				= require('path');
const env 				= require('dotenv');
const csrf 				= require('csurf');
const express 			= require('express');
const flash 			= require('express-flash');
const bodyParser 		= require('body-parser');
const session 			= require('express-session');
const SequelizeStore 	= require("connect-session-sequelize")(session.Store); // initalize sequelize with session store
const nunjucks 			= require('nunjucks');

const app 				= express();
const csrfProtection 	= csrf();
const router 			= express.Router();

const webRoutes 		= require('./routes/web');
const sequelize 		= require('./config/database');
const errorController 	= require('./app/controllers/ErrorController');

env.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// required for csurf
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  	cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
    store: new SequelizeStore({
    	db: sequelize,
    	table: "sessions",
    }),
}));

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	res.locals.csrfToken = req.csrfToken();
	next();
});

const nunjucks_env = nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.use((req, res, next) => {
	nunjucks_env.globals = require('./lib/nunjucks/globals')(req, res, next);

	return next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(webRoutes);
app.use(errorController.pageNotFound);

sequelize
	//.sync({force : true})
	.sync()
	.then(() => {
		app.listen(process.env.PORT);
		//pending set timezone
		console.log("App listening on port " + process.env.PORT);
	})
	.catch(err => {
		console.log(err);
	});

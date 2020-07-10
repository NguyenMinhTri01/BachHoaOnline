import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import initRouteAdmin from './routers/admin/web';
import initRouteUser from './routers/users/index';
// import initRouteTest from './routers/RouteTest';
import configViewEngine from './config/viewEngine';
import connectDB from './config/connectDB';
import connectFlash from 'connect-flash';
import passport from 'passport';
import configSession from './config/session';


// config .env
//require('dotenv').config();
dotenv.config();




let app = express();
// config connection mongoose
let db = connectDB();
// view engine setup
configViewEngine(app);
// config session
configSession(app, db);
// config express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//config cookieParser
app.use(cookieParser());
//Enable flash messages
app.use(connectFlash());
//config passport
app.use(passport.initialize());
app.use(passport.session());
// init all router admin
initRouteAdmin(app);
// init all router user
initRouteUser(app);
// init all test
// initRouteTest(app);
// error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.render('admin/error_500');
})
// app.use((err, req, res) => {
//   // set locals, only providing error in development
//   res.locals.messages = err.messages;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send("loi");
//   //res.render('error');
// });
module.exports = app;

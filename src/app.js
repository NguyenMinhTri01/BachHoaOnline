import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import initRouteAdmin from './routers/admin/index'




let app = express();
// confind connection mongoose

// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// init all router
initRouteAdmin(app);

// error handler
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

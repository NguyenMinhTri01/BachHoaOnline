import session from 'express-session';
import connectMongo from 'connect-mongo';

let mongoStore = connectMongo(session);
// let sessionStore = new mongoStore({
//   url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`,
//   autoReconnect: true
//   //autoRemove: "native"
// });
/**
 * config session for application
 * @param {*} app from exactly express module 
 */


let configSession = (app, db) => {
  app.use(session({
    key : 'express.sid',
    secret : process.env.SECRET_KEY,
    store: new mongoStore({mongooseConnection: db, autoReconnect: true}),
    resave : true,
    saveUninitialized : false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  }))

};

module.exports = configSession;
import passport from 'passport';
import passportLocal from 'passport-local';
import passportFacebook from 'passport-facebook';
import admin_M from './../../models/admin.model';
import {transErrors, transSuccess} from './../../../lang/vi'

let localStrategy = passportLocal.Strategy;
let facebookStrategy = passportFacebook.Strategy;

/**
 * valid admin account type local
 */

const initPassportLocal = (local) => { 
  passport.use(new localStrategy({
    usernameField: "ad_userName",
    passwordField: "ad_password",
    passReqToCallback: true,  
  },async (req, ad_userName, ad_password, done) => {
    try {
      
      let admin = await admin_M.findByUserName(ad_userName);
      if (!admin){
        return done(null, false, req.flash("errors", transErrors.login_failed));
      };
      let checkPassword = await admin.comparePassword(ad_password);
      if (!checkPassword){
        return done(null, false, req.flash("errors", transErrors.login_failed));
      };
      return done(null, admin, req.flash("success", transSuccess.login_success));
    } catch (error) {
      return done(null, false, req.flash("errors", transErrors.login_failed));
    }
  }));
  // save admin to session
  passport.serializeUser((admin, done)=>{
    done(null, admin);
  });

  passport.deserializeUser((admin, done)=>{
    return done(null, admin);
  });
};

const initPassportFacebook = () => {
  passport.use(new facebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
}

module.exports = {
  initPassportLocal,
  initPassportFacebook
}
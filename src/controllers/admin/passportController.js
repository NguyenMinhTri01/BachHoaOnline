import passport from 'passport';
import passportLocal from 'passport-local';
import admin_M from './../../models/admin.model';
import { transErrors, transSuccess } from './../../../lang/vi'

let localStrategy = passportLocal.Strategy;

/**
 * valid admin account type local
 */

let initPassportLocal = (local) => {
  passport.use(new localStrategy({
    usernameField: "ad_userName",
    passwordField: "ad_password",
    passReqToCallback: true,
  }, async (req, ad_userName, ad_password, done) => {
    try {

      let admin = await admin_M.findByUserName(ad_userName);
      if (!admin) {
        return done(null, false, req.flash("errors", transErrors.login_failed));
      };
      let checkPassword = await admin.comparePassword(ad_password);
      if (!checkPassword) {
        return done(null, false, req.flash("errors", transErrors.login_failed));
      };
      return done(null, admin, req.flash("success", transSuccess.login_success));
    } catch (error) {
      return done(null, false, req.flash("errors", transErrors.login_failed));
    }
  }));
  // save admin to session
  passport.serializeUser((admin, done) => {
    done(null, admin);
  });

  passport.deserializeUser((admin, done) => {
    return done(null, admin);
  });
}

module.exports = initPassportLocal;
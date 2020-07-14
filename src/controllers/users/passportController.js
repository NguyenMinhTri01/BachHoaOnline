import passport from 'passport';
import passportLocal from 'passport-local';
import passportFacebook from 'passport-facebook';
import passportGoogle from 'passport-google-oauth20';
import users_M from '../../models/users.model';
import {transErrors, transSuccess} from './../../../lang/vi'
import dotenv from 'dotenv' ;
dotenv.config();

let localStrategy = passportLocal.Strategy;
let facebookStrategy = passportFacebook.Strategy;
let googleStrategy = passportGoogle.Strategy;
/**
 * valid admin account type local
 */

const initPassportLocal = () => { 
  passport.use(new localStrategy({
    usernameField: "u_email",
    passwordField: "u_localPassword",
    passReqToCallback: true,  
  },async (req, u_email, u_localPassword, done) => {
    try {
      
      let user = await users_M.findUserByEmail(u_email);
      if (!user){
        return done(null, false, req.flash("errors", transErrors.login_failed));
      };
      let checkPassword = await user.comparePassword(u_localPassword);
      
      if (!checkPassword){
        return done(null, false, req.flash("errors", transErrors.login_failed));
      };
      return done(null, user, req.flash("success", transSuccess.login_success));
    } catch (error) {
      return done(null, false, req.flash("errors", transErrors.login_failed));
    }
  }));
  // save admin to session
  passport.serializeUser((user, done)=>{
    done(null, user._id);
  });
  passport.deserializeUser( async (_id, done)=>{
    const user = await users_M.findUserById(_id);
    return done(null, user);
  });
};

const initPassportFacebook = () => {
  passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields : ['email', 'displayName']
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = await users_M.findUserByFacebookID(profile._json.id);
    if (!user){
      let checkExists = await users_M.findUserByEmail(profile._json.email);
      if (checkExists){
        let newUser = await users_M.findAndUpdateNewInfoFacebook(profile._json);
        return done(null,newUser);
      }
      let newItem = {
        u_name : profile.displayName,
        u_facebookID : profile.id,
        u_email : profile.emails[0].value
      };
      let newUser = await users_M.createNew(newItem);
      return done(null, newUser);
    }
    return done(null, user);
  }));
    // save admin to session
    passport.serializeUser((user, done)=>{
      done(null, user._id);
    });
    passport.deserializeUser(async (_id, done)=>{
      const user = await users_M.findUserById(_id);
      return done(null, user);
    });
};

const initPassportGoogle = () => {
  passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    profileFields : ['email']
  }, 
  async (accessToken, refreshToken, profile, done) => {
    let user = await users_M.findUserByGoogleID(profile._json.sub);
    if (!user){
      let checkExists = await users_M.findUserByEmail(profile._json.email);
      if (checkExists){
        let newUser = await users_M.findAndUpdateNewInfoGoogle(profile._json);
        return done(null,newUser);
      }
      let newItem = {
        u_name : `${profile._json.family_name} ${profile._json.given_name}`,
        u_googleID : profile._json.sub,
        u_email : profile._json.email,
      };
      let newUser = await users_M.createNew(newItem);
      return done(null, newUser);
    }
    return done(null, user);
  }));
    // save admin to session
    passport.serializeUser((user, done)=>{
      done(null, user._id);
    });
    passport.deserializeUser(async (_id, done)=>{
      const user = await users_M.findUserById(_id);
      return done(null, user);
    });
}

module.exports = {
  initPassportLocal,
  initPassportFacebook,
  initPassportGoogle
}
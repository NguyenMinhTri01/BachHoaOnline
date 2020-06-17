import passport from 'passport';
import {auth_C} from '../../controllers/users/index';
import { initPassportLocal, 
         initPassportFacebook, 
         initPassportGoogle
        } from '../../controllers/users/passportController';


//init passport local
initPassportLocal();
//innit passport facebook
initPassportFacebook();
//init passport google
initPassportGoogle();


const initAllRoute_AuthenticationUser = (router) => {

    //get view login admin
    router.get("/login",/*auth_C.checkLoggedOut,*/auth_C.getLoginUser);
    router.get("/register", auth_C.getRegisterUser);
    router.post("/register", auth_C.registerUser);
    // authentication with Facebook
    router.get("/auth/facebook", passport.authenticate("facebook", {scope: ['email']}));
    router.get("/auth/facebook/callback", passport.authenticate("facebook", {
      failureRedirect : '/login',
      successRedirect : '/',
    }));
    // authentication with Google
    router.get("/auth/google", passport.authenticate('google', {scope: ['profile', 'email']}));
    router.get("/auth/google/callback", passport.authenticate('google', {
      failureRedirect : '/login',
      successRedirect : '/',
    }))

    // authentication with account local
    router.post("/auth/local", passport.authenticate("local", {
      successRedirect : '/',
      failureRedirect : '/login',
      successFlash: true,
      featureFlash: true
    }));
    // // get logout 
    // router.get("/logout", auth_C.checkLogin, auth_C.getLogout);
  
};
module.exports = initAllRoute_AuthenticationUser;


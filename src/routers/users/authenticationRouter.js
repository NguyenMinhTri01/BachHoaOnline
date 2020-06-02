import passport from 'passport';
import {auth_C} from '../../controllers/users/index';
import initPassportLocal from '../../controllers/admin/passportController';


//init passport local
initPassportLocal();

const initAllRoute_AuthenticationUser = (router) => {

    //get view login admin
    router.get("/login",/*auth_C.checkLoggedOut,*/auth_C.getLoginUser);
    router.get("/register", auth_C.getRegisterUser);
    // //post admin login
    // router.post("/login", passport.authenticate("local", {
    //   successRedirect : '/admin',
    //   failureRedirect : '/admin/login',
    //   successFlash: true,
    //   featureFlash: true
    // }));
    // // get logout 
    // router.get("/logout", auth_C.checkLogin, auth_C.getLogout);
  
};
module.exports = initAllRoute_AuthenticationUser;


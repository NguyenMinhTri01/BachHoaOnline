import express from 'express';
import passport from 'passport';
import {auth_C, dashboard_C, admin_C} from '../../controllers/admin/index';
import {example_validation} from '../../validation/adminValidation/index';
import initPassportLocal from '../../controllers/admin/passportController';

//init passport local
initPassportLocal();


let router = express.Router();

let initRouteAdmin = (app) => {
  // get dashboard admin
  router.get('/',auth_C.checkLogin,dashboard_C.getDashboard);
  //get view login admin
  router.get("/login",auth_C.checkLogedOut,auth_C.getLogin);
  //post admin login
  router.post("/login", passport.authenticate("local", {
    successRedirect : './',
    failureRedirect : './login',
    successFlash: true,
    featureFlash: true
  }));
  // get logout 
  router.get("/logout", auth_C.checkLogin, auth_C.getLogout);
  // get info admin
  router.get("/info", auth_C.checkLogin, admin_C.getInfoAdmin);

  



  router.post("/example_validation", example_validation.login, auth_C.functionExamples);


  router.get("/test", (req, res) => {
    res.render("admin/form_InfoAndEditAdmin", {base_Url : process.env.BASE_URL});
  })

  return app.use("/admin", router);
}

module.exports = initRouteAdmin;
import express from 'express';
import {auth_C} from '../../controllers/admin/index';
import {example_validation} from '../../validation/adminValidation/index';
import initAllRoute_Category from './categoryRouter';
import initAllRoute_Brand from './brandRouter';
import initAllRoute_UserAdmin from './userAdminRouter';
import initAllRoute_Authentication from './authenticationRouter';
import initAllRoute_Home from './homeRouter';
import initAllRoute_Product from './productRouter';

let router = express.Router();

let initRouteAdmin = (app) => {

  // init all router of home 
  initAllRoute_Home(router);
  // init all router of Authentication
  initAllRoute_Authentication (router);
  //init all router of user admin
  initAllRoute_UserAdmin(router);
  // init all router of category
  initAllRoute_Category(router);
  // init all router of brand
  initAllRoute_Brand(router);
  // init all router of product
  initAllRoute_Product(router);
  
  router.post("/example_validation", example_validation.login, auth_C.functionExamples);

  router.get("/test", (req, res) => {
    res.render("admin/form_InfoAndEditAdmin", {base_Url : process.env.BASE_URL});
  })

  return app.use("/admin", router);
}

module.exports = initRouteAdmin;
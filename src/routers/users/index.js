import express from 'express';
import { auth_C } from '../../controllers/admin/index';
import { home_C } from '../../controllers/users/index';
import { example_validation } from '../../validation/adminValidation/index';
import initAllRoute_AuthenticationUser from '../users/authenticationRouter'
import initAllRoute_User from '../users/userRoute'
import initAllRoute_Product from '../users/productRouter'

let router = express.Router();

let initRouteUser = (app) => {
  initAllRoute_User(router);
  initAllRoute_AuthenticationUser(router);
  router.get('/', home_C.getHome);
  router.get('/checkout',/*auth_C.checkLoggedOut,*/home_C.getCheckOut);
  router.get('/contact', home_C.getContact);
  router.get('/about', home_C.getAbout);
  // router.get('/product(/:c_slug)?/:pr_slug',home_C.getProductDetail);
  router.get('/addOnItem/id/:id/count/:count', home_C.addOnItem);
  router.get('/addOnHotItem/count/:count', home_C.addOnHotItem);
  router.post('/search', home_C.getProductsToSearch);
  initAllRoute_Product(router);

  router.post("/example_validation", example_validation.login, auth_C.functionExamples);
  return app.use("/", router);
}

module.exports = initRouteUser;
import express from 'express';
import { auth_C } from '../../controllers/admin/index';
import { home_C } from '../../controllers/users/index';
import { example_validation } from '../../validation/adminValidation/index';
import initAllRoute_AuthenticationUser from '../users/authenticationRouter'

let router = express.Router();

let initRouteUser = (app) => {

  router.get('/', home_C.getHome);
  router.get('/checkout',/*auth_C.checkLoggedOut,*/home_C.getCheckOut);
  router.get('/contact', home_C.getContact)
  router.get('/about', home_C.getAbout)
  router.get('/products', home_C.getProducts)
  router.get('/beverages', home_C.getBeverages)
  router.get('/single', home_C.getSingle)

  initAllRoute_AuthenticationUser(router);

  router.post("/example_validation", example_validation.login, auth_C.functionExamples);
  return app.use("/", router);
}

module.exports = initRouteUser;
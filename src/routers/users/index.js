import express from 'express';
import { auth_C } from '../../controllers/admin/index';
import { home_C } from '../../controllers/users/index';
import { example_validation } from '../../validation/adminValidation/index';
import initAllRoute_AuthenticationUser from '../users/authenticationRouter'
import initAllRoute_User from '../users/userRoute'

let router = express.Router();

let initRouteUser = (app) => {
  initAllRoute_User(router);
  initAllRoute_AuthenticationUser(router);
  router.get('/', home_C.getHome);
  router.post('/getProductsAddCart', home_C.getProductsAddCart);
  router.get('/checkout',/*auth_C.checkLoggedOut,*/home_C.getCheckOut);
  router.get('/contact', home_C.getContact);
  router.get('/about', home_C.getAbout);
  router.get('/products', home_C.getProducts);
  router.get('/products/sort/:sort', home_C.getProductsBySort);
  router.get('/products/viewMore/sort/:sort/skip/:skip', home_C.getProductsViewMore);
  router.get('/beverages', home_C.getBeverages);
  router.get('/single', home_C.getSingle);
  router.get('/product(/:c_slug)?/:pr_slug',home_C.getProductDetail);
  router.get('/addOnItem/id/:id/count/:count', home_C.addOnItem);
  router.get('/addOnHotItem/count/:count', home_C.addOnHotItem);
  router.post('/search', home_C.getProductsToSearch);






  router.get('/:c_slug', home_C.getProductToCategory);
  router.post("/example_validation", example_validation.login, auth_C.functionExamples);
  return app.use("/", router);
}

module.exports = initRouteUser;
import express from 'express';
import {auth_C} from '../../controllers/admin/index';
import {home_C} from '../../controllers/users/index';
import {example_validation} from '../../validation/adminValidation/index';
import initAllRoute_AuthenticationUser from '../users/authenticationRouter'

let router = express.Router();

let initRouteUser = (app) => {

  router.get('/', home_C.getHome);  

  initAllRoute_AuthenticationUser(router);

  router.post("/example_validation", example_validation.login, auth_C.functionExamples);

  router.get("/test", (req, res) => {
    res.send('test');
  })

  return app.use("/", router);
}

module.exports = initRouteUser;
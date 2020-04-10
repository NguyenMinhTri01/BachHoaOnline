import express from 'express';
import {auth_C, dashboard_C} from '../../controllers/admin/index'


let router = express.Router();

let initRouteAdmin = (app) => {
  // get dashboard admin
  router.get('/',dashboard_C.getDashboard);
  //admin authentication
  router.get("/login",auth_C.getLogin);

  return app.use("/admin", router);
}

module.exports = initRouteAdmin;
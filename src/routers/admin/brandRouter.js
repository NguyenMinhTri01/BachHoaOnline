import {auth_C, brand_C} from '../../controllers/admin/index';

/**
 * 
 * @param {*} route from Web.js
 */

const initAllRoute_Brand = (router) => {

  router.get("/brand/add", auth_C.checkLogin, brand_C.getViewAdd);
  router.get("/brand/getCategoryOfGroup/:id", auth_C.checkLogin, brand_C.getCategoryOfGroup);
}

module.exports = initAllRoute_Brand
import {auth_C, brand_C} from '../../controllers/admin/index';

/**
 * 
 * @param {*} route from Web.js
 */

const initAllRoute_Brand = (router) => {

  router.get("/brand", auth_C.checkLogin, brand_C.getViewIndex);
  router.get("/brand/add", auth_C.checkLogin, brand_C.getViewAdd);
  router.get("/brand/getCategoryOfGroup/:id", auth_C.checkLogin, brand_C.getCategoryOfGroup);
  router.post("/brand/add",brand_C.addBrand);
  router.get("/brand/edit/:id", auth_C.checkLogin, brand_C.getViewEdit);
  router.post("/brand/edit", auth_C.checkLogin, brand_C.editBrand);
  router.get("/brand/active/:id", auth_C.checkLogin, brand_C.activeBrand);
}

module.exports = initAllRoute_Brand
import {auth_C, product_C} from '../../controllers/admin/index';

const initAllRoute_Product = (router) => {
  router.get("/product/add", auth_C.checkLogin, product_C.getViewAdd);
  router.post("/product/add", auth_C.checkLogin, product_C.addProduct);
  router.get("/product", auth_C.checkLogin, product_C.getViewIndex);
  router.get("/product/active/:id", auth_C.checkLogin, product_C.activeProduct);
  router.get("/product/hot/:id", product_C.hotProduct);
  router.get("/product/edit/:id", auth_C.checkLogin, product_C.getViewEdit);
}
module.exports = initAllRoute_Product
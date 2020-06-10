import {auth_C, product_C} from '../../controllers/admin/index';

const initAllRoute_Product = (router) => {
  router.get("/product/add", auth_C.checkLogin, product_C.getViewAdd);
}

module.exports = initAllRoute_Product
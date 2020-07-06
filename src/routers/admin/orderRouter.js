import {auth_C, order_C} from '../../controllers/admin/index';

const initAllRoute_Order = (router) => {
  router.get("/order", auth_C.checkLogin, order_C.getViewIndex);
  router.get("/order/detail/:id", auth_C.checkLogin, order_C.getViewDetail);
  router.get("/order/status/:or_status/id/:id", auth_C.checkLogin, order_C.editStatus);
}
module.exports = initAllRoute_Order
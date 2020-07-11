import {auth_C, attribute_C} from '../../controllers/admin/index';

const initAllRoute_attribute = (router) => {
  router.get("/attribute", auth_C.checkLogin, attribute_C.getViewIndex);
  router.get("/attribute/add", auth_C.checkLogin, attribute_C.getViewAdd);
}
module.exports = initAllRoute_attribute
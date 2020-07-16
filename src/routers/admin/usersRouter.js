import {auth_C, users_C} from '../../controllers/admin/index';

const initAllRoute_Users = (router) => {
  router.get("/users", auth_C.checkLogin, users_C.getViewIndex);
  router.get("/users/delete/:id", auth_C.checkLogin, users_C.deleteUser);
}
module.exports = initAllRoute_Users
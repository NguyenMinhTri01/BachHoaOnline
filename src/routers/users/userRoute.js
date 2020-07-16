
import { user_C ,auth_C } from '../../controllers/users/index';

const initAllRoute_User = (router) => {
  router.get('/pay',user_C.getPay);
  router.get('/user/purchase', auth_C.checkLogin, user_C.getPurchase);
  router.get('/user/profile',auth_C.checkLogin, user_C.getProfileUser);
  router.post('/user/profile',auth_C.checkLogin, user_C.updateProfileUser);
  router.get('/user/forgotPassword', user_C.getForgotPasswordUser);
  router.get('/user/logout',auth_C.checkLogin ,auth_C.getLogout);
  router.get('/user/forgotPassword/:email', user_C.forgotPassword);
  router.post('/sentDataPayToServer', user_C.addNewOrder);
  router.get('/user/purchase/view/:id', auth_C.checkLogin, user_C.getViewDetailPurchase);
  router.get('/user/purchase/delete/:id', auth_C.checkLogin, user_C.deleteOrder);
}
module.exports = initAllRoute_User

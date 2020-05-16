
import {auth_C, home_C} from '../../controllers/admin/index';


const initAllRoute_Home  = (router) => {
  
  // get dashboard admin
  router.get('/',auth_C.checkLogin,home_C.getDashboard);
}


module.exports = initAllRoute_Home;
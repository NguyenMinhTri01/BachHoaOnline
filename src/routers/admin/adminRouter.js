import {auth_C, admin_C} from '../../controllers/admin/index';


const initAllRoute_UserAdmin = (router) => {
    // get info admin
    router.get("/info", auth_C.checkLogin, admin_C.getInfoAdmin);
    router.post("/updateInfo", auth_C.checkLogin, admin_C.updateInfoAdmin);
}

module.exports = initAllRoute_UserAdmin;

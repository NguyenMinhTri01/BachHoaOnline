import express from 'express';
import passport from 'passport';
import {auth_C, dashboard_C, admin_C, category_C} from '../../controllers/admin/index';
import {example_validation} from '../../validation/adminValidation/index';
import initPassportLocal from '../../controllers/admin/passportController';

//init passport local
initPassportLocal();


let router = express.Router();

let initRouteAdmin = (app) => {
  // get dashboard admin
  router.get('/',auth_C.checkLogin,dashboard_C.getDashboard);


  //get view login admin
  router.get("/login",auth_C.checkLogedOut,auth_C.getLogin);
  //post admin login
  router.post("/login", passport.authenticate("local", {
    successRedirect : '/admin',
    failureRedirect : '/admin/login',
    successFlash: true,
    featureFlash: true
  }));
  // get logout 
  router.get("/logout", auth_C.checkLogin, auth_C.getLogout);
  // get info admin
  router.get("/info", auth_C.checkLogin, admin_C.getInfoAdmin);


  //get view categories
  router.get("/category", auth_C.checkLogin, category_C.getViewIndex);
  // get view add category  
  router.get("/category/add", auth_C.checkLogin, category_C.getViewAdd);
  //get delete category
  router.get("/category/delete/:id.:parentId",auth_C.checkLogin, category_C.getDeleteCategory);
  // post add category
  router.post("/category/add", auth_C.checkLogin, category_C.addCategory);
  // get view edit
  router.get("/category/edit/:id", auth_C.checkLogin, category_C.getViewEditCategory);
  // post update category
  router.post("/category/edit", auth_C.checkLogin, category_C.editCategory);
  // get active category
  router.get("/category/active/:id", auth_C.checkLogin, category_C.getActiveCategory);



  // get view add group_category
  router.get("/category/add_group", auth_C.checkLogin, category_C.getViewAddGroupCategory);
  // post add group_category
  router.post("/category/add_group", auth_C.checkLogin, category_C.addGroup);
  // get delete group_category
  router.get("/category/delete_group/:id", auth_C.checkLogin, category_C.getDeleteGroup);
  // get view edit group category
  router.get("/category/edit_group/:id", auth_C.checkLogin, category_C.getViewEditGroupCategory);
  // post edit group category
  router.post("/category/edit_group", auth_C.checkLogin, category_C.editGroupCategory);
  // get group active
  router.get("/category/active_group/:id", auth_C.checkLogin, category_C.getActiveGroup);

  



  router.post("/example_validation", example_validation.login, auth_C.functionExamples);


  router.get("/test", (req, res) => {
    res.render("admin/form_InfoAndEditAdmin", {base_Url : process.env.BASE_URL});
  })

  return app.use("/admin", router);
}

module.exports = initRouteAdmin;
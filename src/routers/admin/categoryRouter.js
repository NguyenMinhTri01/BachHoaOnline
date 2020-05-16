import {auth_C, category_C} from '../../controllers/admin/index';

/**
 * 
 * @param {*} router from Web.js
 */

const initAllRoute_Category = (router) => {

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

}

module.exports = initAllRoute_Category
 




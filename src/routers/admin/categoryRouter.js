import {auth_C, category_C} from '../../controllers/admin/index';

/**
 * 
 * @param {*} router from Web.js
 */

const initAllRoute_Category = (router) => {

  // get view index category
  router.get("/category", auth_C.checkLogin, category_C.getViewIndex);
  // get view add category  
  router.get("/category/add", auth_C.checkLogin, category_C.getViewAdd);
  //get delete category
  router.get("/category/delete/:id",auth_C.checkLogin, category_C.getDeleteCategory);
  // get category parent
  router.get("/category/getC_parent/:c_level", auth_C.checkLogin, category_C.getC_parent);
  // post add category
  router.post("/category/add", auth_C.checkLogin, category_C.addCategory);
  // get view edit
  router.get("/category/edit/:id", auth_C.checkLogin, category_C.getViewEditCategory);
  // post update category
  router.post("/category/edit", auth_C.checkLogin, category_C.editCategory);
  // get active category
  router.get("/category/active/:id", auth_C.checkLogin, category_C.getActiveCategory);
  // get
  router.get("/category/getCategoryChild/:id", auth_C.checkLogin, category_C.getCategoryChild);
}

module.exports = initAllRoute_Category
 




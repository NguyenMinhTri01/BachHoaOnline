import {category_S, dashboard_S} from '../../services/index'

let getViewAdd = async (req, res) => {
  let maxLevelCategory = await category_S.getMaxLevel();
  res.render("admin/category/add", {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user,
    maxLevelCategory : maxLevelCategory,
    title : "Bach Hóa Online | Thêm Danh Mục Sản Phẩm"
  });
}

let getC_parent = async (req, res) => {
  let c_level = req.params.c_level - 1;
  let categories = await category_S.getCategoriesByC_level(c_level);
  if (categories) {
    res.send(categories);
  }
}

let getViewIndex = async(req, res) => {
  let notification = req.flash('notification');
  let listData = await category_S.getListDataCategories();
  let adminInfo = await dashboard_S.getInfoAdmin(req.adminId);
  res.render("admin/category/index", {
    base_Url : process.env.BASE_URL,
    adminInfo: adminInfo,
    listData : listData,
    notification : notification,
    title : "Bach Hóa Online | Danh Mục Sản Phẩm"
  });
};

let addCategory = async (req, res) => {
  let object = JSON.parse(JSON.stringify(req.body));
  let notification = await category_S.createNewCategory(object);
  res.send(notification);
};


let getDeleteCategory = async (req, res) => {
  let id = req.params.id;
  let notification = await category_S.deleteCategory(id);
  req.flash('notification' , notification);
  res.redirect('/admin/category');
};

let getViewEditCategory = async (req, res) => {
  let id = req.params.id;
  let category = await category_S.getOneCategory(id);
  let maxLevelCategory = await category_S.getMaxLevel();
  let c_parents = await category_S.getCategoriesByC_level(category.c_level - 1);
  res.render('admin/category/edit', {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user,
    category : category,
    maxLevelCategory : maxLevelCategory,
    c_parents : c_parents,
    title : "Bach Hóa Online | Sửa Danh Mục Sản Phẩm"
  })
};



let editCategory = async (req, res) => {
  let object =  JSON.parse(JSON.stringify(req.body));
  let notification = await category_S.updateCategory(object);
  res.send(notification);
};

  let getActiveCategory = async (req, res) => {
    let id = req.params.id;
    let notification = await category_S.activeCategory(id);
    res.send(notification);
  }

module.exports = {
  getViewAdd : getViewAdd,
  getC_parent : getC_parent,
  addCategory : addCategory,
  editCategory : editCategory,
  getViewIndex : getViewIndex,
  getActiveCategory : getActiveCategory,
  getDeleteCategory : getDeleteCategory,
  getViewEditCategory : getViewEditCategory,
}
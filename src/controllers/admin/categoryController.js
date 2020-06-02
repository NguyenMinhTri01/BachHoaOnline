import {category_S} from '../../services/index'

let getViewAddGroupCategory = (req, res) => {
  res.render("admin/category/addGroup", {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user,
    title : "Bach Hóa Online | Thêm Nhóm Danh Mục Sản Phẩm"
  });
};

let getViewAdd = async (req, res) => {
  let maxLevelCategory = await category_S.getMaxLevel();
  res.render("admin/category/add", {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user,
    maxLevelCategory : maxLevelCategory,
    title : "Bach Hóa Online | Thêm Danh Mục Sản Phẩm"
  });
}

let getViewIndex = async(req, res) => {
  let groups = await category_S.getListGroups();
  let categories = await category_S.getListCategories();
  res.render("admin/category/index", {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user,
    groups: groups,
    categories : categories,
    title : "Bach Hóa Online | Danh Mục Sản Phẩm"
  });
}

let addCategory = async (req, res) => {
  let object = JSON.parse(JSON.stringify(req.body));
  let notification = await category_S.createNewcategory(object);
  res.send(notification);
}
let addGroup = async (req, res) => {
  let object = JSON.parse(JSON.stringify(req.body));
  let notification = await category_S.createNewGroup(object.gc_name);
  res.send(notification);
}

let getDeleteCategory = async (req, res) => {
  let id = req.params.id;
  let parentId = req.params.parentId;
  let notification = await category_S.deleteCategory(id, parentId);
  res.send(notification);
}

let getDeleteGroup = async (req, res) => {
  let id = req.params.id;
  let notification = await category_S.deleteGroup(id);
  res.send(notification)
}

let getViewEditCategory = async (req, res) => {
  let id = req.params.id;
  let category = await category_S.getOneCategory(id);
  let groups = await category_S.getListGroups();
  res.render('admin/category/edit', {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user,
    groups: groups,
    category : category,
    title : "Bach Hóa Online | Sửa Danh Mục Sản Phẩm"
  })
};

let editGroupCategory = async (req, res) => {
  let group = JSON.parse(JSON.stringify(req.body));
  let notification = await category_S.updateGroupCategory(group);
  res.send(notification);
}


let editCategory = async (req, res) => {
  let object =  JSON.parse(JSON.stringify(req.body));
  let notification = await category_S.updateCategory(object);
  res.send(notification);
}

let getViewEditGroupCategory = async (req, res) => {
  let id = req.params.id;
  let group = await category_S.getOneGroup(id);
  let categories = await category_S.getListCategoriesOfGroup(id);
  res.render('admin/category/editGroup', {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user,
    group: group,
    categories : categories,
    title : "Bach Hóa Online | Sửa Nhóm Danh Mục Sản Phẩm"
  })};

  let getActiveGroup = async (req, res) => {
    let id = req.params.id;
    let notification = await category_S.activeGroup(id);
    res.send(notification);
  };

  let getActiveCategory = async (req, res) => {
    let id = req.params.id;
    let notification = await category_S.activeCategory(id);
    res.send(notification);
  }

module.exports = {
  addGroup : addGroup,
  getViewAdd : getViewAdd,
  addCategory : addCategory,
  editCategory : editCategory,
  getViewIndex : getViewIndex,
  getDeleteGroup : getDeleteGroup,
  getActiveGroup : getActiveGroup,
  editGroupCategory : editGroupCategory,
  getActiveCategory : getActiveCategory,
  getDeleteCategory : getDeleteCategory,
  getViewEditCategory : getViewEditCategory,
  getViewAddGroupCategory : getViewAddGroupCategory,
  getViewEditGroupCategory : getViewEditGroupCategory,
}
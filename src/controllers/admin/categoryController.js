import {category_S} from '../../services/admin/index'

let getViewAddGroupCategory = (req, res) => {
  res.render("admin/category/addGroup", {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user
  });
};

let getViewAdd = async (req, res) => {
  let groups = await category_S.getListGroups();
  res.render("admin/category/add", {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user,
    groups: groups
  });
}

let getViewIndex = async(req, res) => {
  let groups = await category_S.getListGroups();
  let categories = await category_S.getListCategories();
  res.render("admin/category/index", {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user,
    groups: groups,
    categories : categories
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
    category : category
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
    categories : categories
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
import {category_S} from '../../services/admin/index'

const getViewAdd = async (req, res) => {
  let groups = await category_S.getListGroups();
  res.render("admin/brand/add", {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user,
    groups : groups,
    title : "Bach Hóa Online | Thêm Thương Hiệu Sản Phẩm"
  })
};

const getCategoryOfGroup = async (req, res) => {
  let groupId = req.params.id;
  let listCategories = await category_S.getListCategoriesOfGroup(groupId);
  res.send(listCategories);
}

module.exports = {
  getViewAdd : getViewAdd,
  getCategoryOfGroup : getCategoryOfGroup,
}
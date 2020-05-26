import {category_S, brand_S} from '../../services/admin/index';
import config_storage from '../../config/uploadFIleLocal';
import multer from 'multer';

//var cloudinary_v2 = require('cloudinary').v2;


const storage = config_storage;
let uploadImageLocal = multer({
  storage : storage
}).single('br_image');

const getViewAdd = async (req, res) => {
  let groups = await category_S.getListGroups();
  res.render("admin/brand/add", {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user,
    groups : groups,
    title : "Bach Hóa Online | Thêm Thương Hiệu Sản Phẩm"
  });
  
};

const getCategoryOfGroup = async (req, res) => {
  let groupId = req.params.id;
  let listCategories = await category_S.getListCategoriesOfGroup(groupId);
  res.send(listCategories);
};

const addBrand = (req, res) => {
  // upload image location
  uploadImageLocal  (req, res, async (err) => {
    if (err) {
      console.log(err);
      res.send(false);
    }
    else {
      let path = req.file.path;
      let notification = await brand_S.createNewBrand(req.body.br_name, req.body.c_id, path);
      res.send(notification);
      // xử lý không load submit của giao diện
    }
  });
}

module.exports = {
  addBrand : addBrand,
  getViewAdd : getViewAdd,
  getCategoryOfGroup : getCategoryOfGroup,
}
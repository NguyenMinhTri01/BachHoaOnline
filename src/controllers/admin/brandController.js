import {category_S, brand_S, dashboard_S} from '../../services/index';
import config_storage from '../../config/uploadFIleLocal';
import multer from 'multer';

//var cloudinary_v2 = require('cloudinary').v2;





const storage = config_storage;
let uploadImageLocal = multer({
  storage : storage
}).single('br_image');


const getViewIndex = async (req, res) => {
  let notification = req.flash('notification');
  let brands = await brand_S.getListBrands();
  let adminInfo = await dashboard_S.getInfoAdmin(req.adminId);
  res.render('admin/brand/index', {
    base_Url : process.env.BASE_URL,
    adminInfo: adminInfo,
    title : "Bach Hóa Online | Thương Hiệu Sản Phẩm",
    secure_Delivery_URL : process.env.SECURE_DELIVERY_URL,
    brands : brands,
    notification : notification,
  });
}

const getViewAdd = async (req, res) => {
  res.render("admin/brand/add", {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user,
    title : "Bach Hóa Online | Thêm Thương Hiệu Sản Phẩm",
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
      let notification = await brand_S.createNewBrand(req.body.br_name, path);
      res.send(notification);
    }
  });
};


const getViewEdit = async (req, res) => {
  let brandModel = await brand_S.getBrandById(req.params.id);
  // let category = await category_S.getOneCategory(brandModel.c_id);
  // let categories = await category_S.getListCategoriesOfGroup(category.c_parent.id);
  let brand = new Object({
    br_imageName : brandModel.br_image.split('/')[2],
    br_image : brandModel.br_image,
    br_name : brandModel.br_name,
    _id : brandModel._id,
  })
  res.render("admin/brand/edit", {
    base_Url : process.env.BASE_URL,
    adminInfo: req.user,
    brand : brand,
    title : "Bach Hóa Online | Cập Nhật Thương Hiệu Sản Phẩm",
  })
};

const editBrand = (req, res) => {
  // upload image location
  uploadImageLocal  (req, res, async (err) => {
    if (err) {
      console.log(err);
      res.send({
        type : false,
        message : 'không thành công' 
      });
    }
    else {
      let path = null;
      if(typeof req.file != 'undefined'){
        path = req.file.path;
      }
      let notification = await brand_S.editBrand(req.body._id, req.body.br_name, req.body.c_id, path);
      res.send(notification);
    }
  });
};

const activeBrand = async(req, res) => {
  let notification = await brand_S.activeBrand(req.params.id);
  res.send(notification);
};

const deleteBrand = async(req, res) => {
  let notification = await brand_S.deleteBrand(req.params.id);
  req.flash('notification', notification);
  res.redirect('/admin/brand');
}

module.exports = {
  addBrand : addBrand,
  editBrand : editBrand,
  getViewAdd : getViewAdd,
  getViewEdit: getViewEdit,
  deleteBrand : deleteBrand,
  activeBrand : activeBrand,
  getViewIndex: getViewIndex,
  getCategoryOfGroup : getCategoryOfGroup,
}
import { category_S, brand_S, product_S } from '../../services/index';
import product_M from '../../models/product.model'
import configStorage from '../../config/uploadFIleLocal';
import multer from 'multer';
import fs from 'fs-extra';

const units = ["gam", "kg", "ml", "lit", "Hộp", "Thùng", "Chai", "Cây", "Gói", "Lon","mm", "cm" , "m", "cái", "miếng","Đôi", "Chiết", "Hũ"];
const storageProductAvatar = configStorage('/product/productAvatar');
let uploadProductAvatar = multer({
  storage: storageProductAvatar
}).single('pr_avatar');



const getViewIndex = async (req, res) => {
  await product_M.updateAmountProduct();
  let notification = req.flash('notification');
  let products = await product_S.getListProducts();
  res.render("admin/product/index", {
    base_Url: process.env.BASE_URL,
    SECURE_DELIVERY_URL : process.env.SECURE_DELIVERY_URL,
    adminInfo: req.adminInfo,
    products: products,
    notification: notification,
    title: "Bach Hóa Online | Quản Lý Sản Phẩm",
  })
};
const getViewAdd = async (req, res) => {
  const categories = await category_S.getListCategoriesByLevel(2);
  const brandList = await brand_S.getListBrands();
  fs.removeSync(`${process.env.PATH_ALBUM_IMAGE}${req.adminInfo._id}`);
  res.render("admin/product/add", {
    base_Url: process.env.BASE_URL,
    adminInfo: req.adminInfo,
    brandList,
    categories,
    units,
    title: "Bach Hóa Online | Thêm Sản Phẩm",
  });
};

const addProduct = async (req, res) => {
  uploadProductAvatar(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.send(false);
    }
    else {
      let idAdmin = req.adminInfo._id;
      let path = req.file.path;
      let infoProduct = JSON.parse(JSON.stringify(req.body));
      let notification = await product_S.createNewProduct(infoProduct, path, idAdmin);
      res.send(notification);
    }
  });
};

const activeProduct = async (req, res) => {
  let notification = await product_S.activeProductById(req.params.id);
  res.send(notification);
};

const hotProduct = async (req, res) => {
  let notification = await product_S.hotProductById(req.params.id);
  res.send(notification);
};

const getViewEdit = async (req, res) => {
  const product = await product_S.getProductById(req.params.id);
  if(product) {
    const categories = await category_S.getListCategoriesByLevel(2);
    const brandList = await brand_S.getListBrands();
    const listAlbumImage = await product_S.getAlbumImageByPrId(req.params.id);
    fs.removeSync(`${process.env.PATH_ALBUM_IMAGE}${req.adminInfo._id}`);
    res.render("admin/product/edit", {
      base_Url: process.env.BASE_URL,
      adminInfo: req.adminInfo,
      SECURE_DELIVERY_URL : process.env.SECURE_DELIVERY_URL,
      listAlbumImage,
      brandList,
      categories,
      product,
      units,
      title: "Bach Hóa Online | Sửa Sản Phẩm",
    });
  } else {
    return res.render('admin/error_500');
  }
};

const uploadImage = async (req, res) => {
  const storageProductListImage = configStorage(`/product/productListImage/${req.adminInfo._id}`);
  let uploadProductListImage = multer({
    storage: storageProductListImage
  }).array('pr_listImage');
  uploadProductListImage(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.send({ error: 'upload error' });
    }
    else {
      //let path = req.file.path;
      // let arrayResponse = [];
      // req.files.forEach((file) => {
      //   let object = new Object({
      //     url : `http://localhost:3000/admin/product/deleteImage/${file.filename}`
      //   })
      //   arrayResponse.push(object);
      // });
      //let infoProduct = JSON.parse(JSON.stringify(req.body));
      res.send({ 
        append: true ,
        uploadToken : req.adminInfo._id
      });

      // res.send({
      //   type: true,
      //   message: "thêm thành công"
      // })
    }
  });
};


const editProduct = async (req, res) => {
  uploadProductAvatar(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.send(false);
    }
    else {
      let path = null;
      if (typeof req.file != 'undefined') {
        path = req.file.path;
      }
      let idAdmin = req.adminInfo._id;
      let infoProduct = JSON.parse(JSON.stringify(req.body));
      let notification = await product_S.editProduct(infoProduct, path, idAdmin);
      res.send(notification);
    }
  });
};

const deleteImageById = async (req, res) => {
  try {
    let notification = await product_S.deleteImageById(req.params.id);
    res.send(notification || null);
  } catch (error) {
    console.log(error);
  }

}

module.exports = {
  getViewAdd,
  addProduct,
  hotProduct,
  getViewIndex,
  activeProduct,
  getViewEdit,
  uploadImage,
  editProduct,
  deleteImageById
}
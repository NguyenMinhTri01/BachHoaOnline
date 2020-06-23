import { category_S, brand_S, product_S } from '../../services/index';
import configStorage from '../../config/uploadFIleLocal';
import multer from 'multer';


const storage = configStorage('/product/productAvatar');
let uploadImageLocal = multer({
  storage: storage
}).single('pr_avatar');

const getViewIndex = async (req, res) => {
  let notification = req.flash('notification');
  let products = await product_S.getListProducts();
  res.render("admin/product/index", {
    base_Url: process.env.BASE_URL,
    adminInfo: req.adminInfo,
    products: products,
    notification : notification,
    title: "Bach Hóa Online | Quản Lý Sản Phẩm",
  })
};
const getViewAdd = async (req, res) => {
  let maxLevelCategory = await category_S.getMaxLevel();
  let brandList = await brand_S.getListBrands();
  res.render("admin/product/add", {
    base_Url: process.env.BASE_URL,
    adminInfo: req.adminInfo,
    brandList: brandList,
    maxLevelCategory: maxLevelCategory,
    title: "Bach Hóa Online | Thêm Sản Phẩm",
  });
};

const addProduct = async (req, res) => {
  uploadImageLocal(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.send(false);
    }
    else {
      let path = req.file.path;
      let infoProduct = JSON.parse(JSON.stringify(req.body));
      let notification = await product_S.createNewProduct(infoProduct, path);
      res.send(notification);
      
      // res.send({
      //   type: true,
      //   message: "thêm thành công"
      // })
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

}

module.exports = {
  getViewAdd,
  addProduct,
  hotProduct,
  getViewIndex,
  activeProduct,
  getViewEdit
}
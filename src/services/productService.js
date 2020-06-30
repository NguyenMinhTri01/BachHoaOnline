import product_M from './../models/product.model';
import category_M from './../models/category.model';
import brand_M from './../models/brand.model';
import albumProduct_M from './../models/albumProduct.model';
import adminHelper from './../helper/adminHelper';
import path_ from 'path';
import fs from 'fs-extra';
import slug from "url-slug";
import _ from 'lodash';
import formatNumber from 'format-number';
import { transSuccess, transErrors } from "../../lang/vi";


const getListProducts = () => {
  return new Promise(async (resolve, reject) => {
    let result = await product_M.findAll();
    if (result.length > 0) {
      let products = await Promise.all(result.map(async (product) => {
        try {
          
          let newObj = new Object(product._doc);
          let category = await category_M.findCategoryById(product.c_id)
          let brand = await brand_M.findBrandById(product.br_id)
          newObj = _.assign({ br_name: brand.br_name, c_name: category.c_name }, newObj);
          newObj.pr_price = formatNumber({prefix: '', suffix: ' VNĐ'})(newObj.pr_price)
          return newObj;
        } catch (error) {
          console.log(error);
        }
      }));
      return resolve(products);
    }
    resolve(false);
  });
};


const createNewProduct = (inputProduct, path, idAdmin) => {
  return new Promise(async (resolve, reject) => {
    inputProduct['pr_slug'] = slug(inputProduct.pr_name);
    let nameFolderProducts = slug(inputProduct.pr_name);
    let checkExists = await product_M.findProductBySlug(inputProduct.pr_slug);
    if (!checkExists && path) {
      // upload product avatar to cloudinary
      const response = await adminHelper.uploadImageToCloudinary(`product/${nameFolderProducts}`, path);
      if (response) {
        inputProduct['pr_avatar'] = response.public_id;
        let pr_capacity = {
          value: inputProduct.pr_value,
          unit: inputProduct.pr_unit
        }
        let pr_SEO = {
          title: inputProduct.pr_title,
          key: inputProduct.pr_key,
          description: inputProduct.pr_descriptionSeo
        }
        inputProduct['pr_capacity'] = pr_capacity;
        inputProduct['pr_SEO'] = pr_SEO;
        inputProduct['pr_priceNew'] = inputProduct.pr_price - inputProduct.pr_price*inputProduct.pr_discount/100;
        ['pr_value', 'pr_key', 'pr_title', 'pr_descriptionSeo', '_id'].forEach(key => {
          delete inputProduct[key];
        });
        let result = await product_M.createNew(inputProduct);
        if (result) {
          let pr_id = result._id;
          // upload album image
          const directoryPath = `${process.env.PATH_ALBUM_IMAGE}${idAdmin}`;
          fs.readdir(directoryPath, (err, files) => {
            if (err) {
              return console.log('Unable to scan directory: ' + err);
            }
            files.forEach(async (file) => {
              const pathImage = path_.join(directoryPath, file);
              //upload image to cloudinary
              const _response = await adminHelper.uploadImageToCloudinary(`product/${nameFolderProducts}`, pathImage)
              if (_response) {
                let itemAlbumImage = {
                  _id: file.split('.')[0],
                  pr_id: pr_id,
                  filesName: file,
                  public_id: _response.public_id
                };
                await albumProduct_M.createNew(itemAlbumImage);
              };
            });
          })
          return resolve({
            type: true,
            message: transSuccess.add_data_successful
          });
        }
      };
    };
    return resolve({
      type: false,
      message: transErrors.add_data_failed
    });
  });
};


const activeProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    let result = await product_M.updateActive(id);
    if (result) return resolve({ type: true });
    return resolve({ type: false });
  })
};

const hotProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    let result = await product_M.updateHot(id);
    if (result) return resolve({ type: true });
    return resolve({ type: false });
  })
};

const getProductsFollowMenuCategory = (menu) => {
  return new Promise(async (resolve, reject) => {
    const data = await Promise.all (menu.map(async parent => {
      let arrayIdCategoryChild = await category_M.findChildIdCategoryByIdParent(parent._id);
      let arrId = arrayIdCategoryChild.map(category =>{
        return category._id;
      })
      let products;
      if(arrId.length > 0){
        products = await product_M.getProductsFollowArrayIdCategory(arrId);
      }
      else {
        products = null;
      }
    }))
    resolve(true);
  })
};


module.exports = {
  hotProductById,
  createNewProduct,
  getListProducts,
  activeProductById,
  getProductsFollowMenuCategory
}
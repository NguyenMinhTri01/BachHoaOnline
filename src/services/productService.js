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
          newObj.pr_price = formatNumber({prefix: '', suffix: '₫'})(newObj.pr_price)
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
      let object = new Object({
        _id : parent._id,
        c_slug : parent.c_slug,
        c_name : parent.c_name,
      })
      //let arrayIdCategoryChild = await category_M.findChildIdCategoryByIdParent(parent._id);
      let arrId = parent.child.map(category =>{
        return category._id;
      })
      if(arrId.length > 0){
        let products = await product_M.getProductsFollowArrayIdCategory(arrId, 0);
        products = products.map(product =>{
          let pr_priceString = formatNumber({ suffix: '₫',integerSeparator :".", decimal:","})(product['pr_price']);
          let pr_priceNewString = formatNumber({ suffix: '₫',integerSeparator :".", decimal:","})(product['pr_priceNew'] || 0) ;
          let objectPr = _.assign(product._doc, {pr_priceString, pr_priceNewString})
          return objectPr
        })
        object = _.assign(object, {products : products});
        return object
      }
      else {
        let products = [];
        object = _.assign(object, {products : products});
        return object
      }
    }))
    resolve(data);
  })
};

const getProductsAddCart = (carts) => {
  return new Promise( async (resolve, reject) => {
    if (carts){
      
      let arrayCart = carts.split("@");
      let products = await Promise.all(arrayCart.map(async item => {
        let objectItem = JSON.parse(item);
        let product = await product_M.findProductByIdAddToCart(objectItem._id);
        let objectProduct = new Object(product._doc);
        objectProduct = _.assign(objectProduct, {
          pr_quantity : objectItem.quantity,
          pr_sumPrice : objectProduct['pr_priceNew'] * objectItem.quantity,
          pr_priceString : formatNumber({ suffix: '₫',integerSeparator :".", decimal:","})(objectProduct['pr_price']),
          pr_priceNewString : formatNumber({ suffix: '₫',integerSeparator :".", decimal:","})(objectProduct['pr_priceNew']),
          pr_sumPriceString : formatNumber({ suffix: '₫',integerSeparator :".", decimal:","})(objectProduct['pr_priceNew'] * objectItem.quantity),
        })
        return objectProduct
      }))
      let sumPrice = _.reduce(products, (sum, product) =>{
        return sum + (product.pr_priceNew * product.pr_quantity);
      }, 0);
      let sumPriceString = formatNumber({ suffix: '₫',integerSeparator :".", decimal:","})(sumPrice)
      resolve({
        type: true,
        sumPriceString,
        sumPrice,
        data : products,
        SECURE_DELIVERY_URL : process.env.SECURE_DELIVERY_URL,
      });
    }
  })
}


module.exports = {
  hotProductById,
  createNewProduct,
  getListProducts,
  activeProductById,
  getProductsAddCart,
  getProductsFollowMenuCategory
}
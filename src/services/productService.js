import product_M from './../models/product.model';
import category_M from './../models/category.model';
import brand_M from './../models/brand.model';
import slug from "url-slug";
import _ from 'lodash';
import { transSuccess, transErrors } from "../../lang/vi";


const getListProducts = () => {
  return new Promise(async (resolve, reject) => {
    let result = await product_M.findAll();
    if (result.length > 0) {
      let products = await Promise.all(result.map(async (product) => {
        let newObj = new Object(product._doc);
        let category = await category_M.findCategoryById(product.c_id)
        newObj = _.assign({ c_name: category.c_name }, newObj);
        let brand = await brand_M.findBrandById(product.br_id)
        newObj = _.assign({ br_name: brand.br_name }, newObj);
        return newObj;
      }));
      return resolve(products);
    }
    resolve(false);
  });
};


const createNewProduct = (inputProduct, path) => {
  return new Promise(async (resolve, reject) => {
    inputProduct['pr_slug'] = slug(inputProduct.pr_name);
    let checkExists = await product_M.findProductBySlug(inputProduct.pr_slug);
    if (!checkExists) {
      let arrayPath = path.split('\\').splice(2);
      inputProduct['pr_avatar'] = `/${arrayPath.join('/')}`;
      let pr_capacity = {
        value: inputProduct.pr_value,
        unit: inputProduct.pr_unit
      }
      let pr_SEO = {
        key: inputProduct.pr_key
      }
      inputProduct['pr_capacity'] = pr_capacity;
      inputProduct['pr_SEO'] = pr_SEO;
      delete inputProduct['pr_value'];
      delete inputProduct['c_level'];
      delete inputProduct['pr_key'];
      let result = await product_M.createNew(inputProduct);
      if (result) return resolve({
        type: true,
        message: transSuccess.add_data_successful
      });
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
  })};

const hotProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    let result = await product_M.updateHot(id);
    if (result) return resolve({ type: true });
    return resolve({ type: false });
  })};

module.exports = {
  hotProductById,
  createNewProduct,
  getListProducts,
  activeProductById,
  
}
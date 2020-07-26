import brand_M from '../models/brand.model';
import category_M from '../models/category.model';
import slug from "url-slug";
import { transSuccess, transErrors } from "../../lang/vi";
import fs from 'fs-extra';
import adminHelper from './../helper/adminHelper';
import _ from 'lodash';

//src\public\uploads\1591430857794_28571609573977852587-8403-49e2-b07a-5827b14930cd.jpg
const getListBrands = () => {
  return new Promise(async (resolve, reject) => {
    let result = await brand_M.findAll();
    let brands = await Promise.all(result.map(async brand =>{
      try {
        let category = await category_M.findCategoryById(brand.c_id);
        let object = _.assign({c_name: category.c_name}, brand._doc);
        return object;
      } catch (error) {
        let object = _.assign({c_name: null}, brand._doc);
        return object;
      }
    }));
    if (brands) {
      return resolve(brands);
    }
  })
}


const createNewBrand = (br_name, c_id, path) => {
  return new Promise(async (resolve, reject) => {
    let br_slug = slug(br_name);
    // check brand is exists in db
    let checkExists = await brand_M.findBrandBySlug(br_slug);
    if (!checkExists && path) {
      //upload image to cloudinary
      let response = await adminHelper.uploadImageToCloudinary('brand', path);
      if (response) {
        let newBrand = {
          br_name: br_name,
          br_slug: br_slug,
          br_image: response.public_id,
          c_id: c_id
        };
        //save new brand
        let result = await brand_M.createNew(newBrand);
        if (result) {
          return resolve({
            type: true,
            message: transSuccess.add_data_successful
          });
        };
      };
    }
    return resolve({
      type: false,
      message: transErrors.add_data_failed
    });
  })
};


const getBrandById = (id) => {
  return new Promise(async (resolve, reject) => {
    let brand = await brand_M.findBrandById(id);
    resolve(brand);
  })
};

const editBrand = (id, br_name, c_id, path) => {
  return new Promise(async (resolve, reject) => {
    try {
      let br_slug = slug(br_name);
      // check brand is exists in db
      let checkExists = await brand_M.findBrandBySlug(br_slug);
      let oldBrand = await brand_M.findBrandById(id);
      if (!checkExists || oldBrand.br_slug == br_slug) {
        let item = null;
        if (path == null) {
          item = {
            br_name: br_name,
            br_slug: br_slug,
            c_id: c_id
          };
        }
        else {
          let response = await adminHelper.uploadImageToCloudinary('brand', path);
          if(response) {
            item = {
              br_name: br_name,
              br_slug: br_slug,
              br_image: response.public_id,
              c_id: c_id
            }
          }
        }
        let result = item ? await brand_M.updateBrandById(id, item) : null;
        if (result) {
          return resolve({
            type: true,
            message: transSuccess.update_data_successful
          });
        }
        // upload image to cloudinary
        // adminHelper.uploadImageToCloudinary('brand', path, async (response) => {
        //   if (response) {
        //     let newBrand = {
        //       br_name : br_name,
        //       br_slug : br_slug,
        //       br_image : response.public_id,
        //       c_id : c_id
        //     };
        //     //save new brand
        //     let result = await brand_M.createNew(newBrand);
        //     if (result){
        //       return resolve({
        //         type : true,
        //         message : transSuccess.add_data_successful    
        //       });
        //     };
        //   };
        //   return resolve({
        //     type : false,
        //     message : transErrors.add_data_failed
        //   });
        // });
      }
      else {
        return resolve({
          type: false,
          message: transErrors.add_data_failed
        });
      }
    }
    catch (error) {
      console.log(error);
    }
  })
};


const activeBrand = (id) => {
  return new Promise(async (resolve, reject) => {
    let result = await brand_M.updateActive(id);
    if (result) {
      return resolve({
        type: true
      });
    }
    return resolve({
      type: false
    })
  })
};

const deleteBrand = (id) => {
  return new Promise(async (resolve, reject) => {
    let brand = await brand_M.findBrandById(id);
    let result = await brand_M.deleteBrand(id);
    if (result.deleteCount != 0) {
      try {
        await fs.remove(`src/public/${brand.br_image}`);
      } catch (error) { }
      return resolve({
        type: true,
        message: transSuccess.remove_data_successful
      })
    }
    return resolve({
      type: false,
      message: transErrors.remove_data_failed
    })
  })
};

const getBrandsByCategory = (c_id) => {
  return new Promise(async (resolve, reject) => {
    const brands = await brand_M.findBrandsByCategory(c_id);
    if(brands.length > 0) {
      return resolve(brands);
    }
    return resolve([]);
  })
};

const getBrandCount = () => {
  return new Promise( async (resolve, reject) => {
    const brands = await brand_M.findAll();
    const brandCount = brands.length;
    resolve(brandCount);
  })
}
module.exports = {
  editBrand,
  deleteBrand,
  activeBrand,
  getBrandById,
  getListBrands,
  getBrandCount,
  createNewBrand,
  getBrandsByCategory,
}
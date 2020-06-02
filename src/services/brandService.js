import brand_M from '../models/brand.model';
import category_M from '../models/category.model';
import slug from "url-slug";
import {transSuccess, transErrors} from "../../lang/vi";
import adminHelper from "../helper/adminHelper";
import {notification} from '../../lang/vi'


const getListBrands = () => {
  return new Promise ( async (resolve, reject) => {
    let result = await brand_M.findAll();
    if (result) {
      let brands = result.map( async (brand) => {
        let category = await category_M.findCategoryById(brand.c_id);
        return new Object ({
          c_name : category ? category.c_name : notification.category_disabled,
          br_name : brand.br_name,
          br_status : brand.br_status,
          _id : brand._id,
          br_image: brand.br_image,
          br_slug: brand.br_slug,
          c_id : brand.c_id,
          br_createdAt : brand.br_createdAt,
        });
      })
      Promise.all(brands).then( values => resolve(values));
      //console.log(brands);
      //console.log(result.toString())
     
    }
  })
}


const createNewBrand = (br_name, c_id, path) => {
  return new Promise( async (resolve, reject) => {
    try {
      let br_slug = slug(br_name);
      // check brand is exists in db
      let checkExists = await brand_M.findBrandBySlug(br_slug);
      if (!checkExists || (checkExists && checkExists.c_id !== c_id)) {
        let arrayPath = path.split('\\');
        let newBrand = {
          br_name : br_name,
          br_slug : br_slug,
          br_image : `/${arrayPath[2]}/${arrayPath[3]}`,
          c_id : c_id
        };
        let result = await brand_M.createNew(newBrand);
        if(result){
          return resolve({
            type : true,
            message : transSuccess.add_data_successful    
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
          type : false,
          message : transErrors.add_data_failed
        });
      }
    }
    catch (error) {
      console.log(error);
    }
  })
};


const getBrandById = (id) => {
  return new Promise ( async (resolve, reject) => {
    let brand = await brand_M.findBrandById(id);
    resolve(brand);
  })
};

const editBrand = (id, br_name, c_id, path) => {
  return new Promise( async (resolve, reject) => {
    try {
      let br_slug = slug(br_name);
      // check brand is exists in db
      let checkExists = await brand_M.findBrandBySlug(br_slug);
      if (!checkExists || (checkExists && (checkExists.c_id !== c_id || checkExists._id === id))) {
        let item = null;
        if (path == null) {
          item = {
            br_name : br_name,
            br_slug : br_slug,
            c_id : c_id
          };
        }
        else {
          let arrayPath = path.split('\\');
          item = {
            br_name : br_name,
            br_slug : br_slug,
            br_image : `/${arrayPath[2]}/${arrayPath[3]}`,
            c_id : c_id
          };
        }

        let result = await brand_M.updateBrandById(id , item);
        if(result){
          return resolve({
            type : true,
            message : transSuccess.update_data_successful    
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
          type : false,
          message : transErrors.add_data_failed
        });
      }
    }
    catch (error) {
      console.log(error);
    }
  })
};


const activeBrand = (id) => {
  return new Promise ( async (resolve, reject) => {
    let result = await brand_M.updateActive(id);
    if (result){
      return resolve({
        type: true
      });
    }
    return resolve({
      type: false
    })
  })
}
module.exports = {
  editBrand : editBrand,
  activeBrand : activeBrand,
  getBrandById : getBrandById,
  getListBrands : getListBrands,
  createNewBrand : createNewBrand,
}
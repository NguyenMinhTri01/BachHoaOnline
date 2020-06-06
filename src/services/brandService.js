import brand_M from '../models/brand.model';
import slug from "url-slug";
import {transSuccess, transErrors} from "../../lang/vi";
import fs from 'fs-extra';

//src\public\uploads\1591430857794_28571609573977852587-8403-49e2-b07a-5827b14930cd.jpg
const getListBrands = () => {
  return new Promise ( async (resolve, reject) => {
    let result = await brand_M.findAll();
    if (result) {
      return resolve(result);
    }
  })
}


const createNewBrand = (br_name, path) => {
  return new Promise( async (resolve, reject) => {
    try {
      let br_slug = slug(br_name);
      // check brand is exists in db
      let checkExists = await brand_M.findBrandBySlug(br_slug);
      if (!checkExists){
        let arrayPath = path.split('\\');
        let newBrand = {
          br_name : br_name,
          br_slug : br_slug,
          br_image : `/${arrayPath[2]}/${arrayPath[3]}`,
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
      let oldBrand = await brand_M.findBrandById(id);
      if (!checkExists || oldBrand.br_slug == br_slug) {
        let item = null;
        if (path == null) {
          item = {
            br_name : br_name,
            br_slug : br_slug,
          };
        }
        else {
          let arrayPath = path.split('\\');
          item = {
            br_name : br_name,
            br_slug : br_slug,
            br_image : `/${arrayPath[2]}/${arrayPath[3]}`,
          };
        }

        let result = await brand_M.updateBrandById(id , item);
        if(result){
          if (path != null){
            try {
              await fs.remove(`src/public/${result.br_image}`);
            } catch (error) {}
          }
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
};

const deleteBrand = (id) => {
  return new Promise( async (resolve, reject) => {
    let brand = await brand_M.findBrandById(id);
    let result = await brand_M.deleteBrand(id);
    if (result.deleteCount != 0){
      try {
        await fs.remove(`src/public/${brand.br_image}`);
      } catch (error) {}
      return resolve({
        type : true,
        message : transSuccess.remove_data_successful 
      })
    }
    return resolve({
      type : false,
      message : transErrors.remove_data_failed
    })
  })
}
module.exports = {
  editBrand : editBrand,
  deleteBrand : deleteBrand,
  activeBrand : activeBrand,
  getBrandById : getBrandById,
  getListBrands : getListBrands,
  createNewBrand : createNewBrand,
}
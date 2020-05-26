import brand_M from '../../models/brand.model';
import slug from "url-slug";
import {transSuccess, transErrors} from "../../../lang/vi";
import adminHelper from "../../helper/adminHelper";





const createNewBrand = (br_name, c_id, path) => {
  return new Promise( async (resolve, reject) => {
    try {
      let br_slug = slug(br_name);
      // check brand is exists in db
      let checkExists = await brand_M.findBrandBySlug(br_slug);
      if (!checkExists || (checkExists && checkExists.c_id !== c_id)) {
        // upload image to cloudinary
        adminHelper.uploadImageToCloudinary('brand', path, async (response) => {
          if (response) {
            let newBrand = {
              br_name : br_name,
              br_slug : br_slug,
              br_image : response.public_id,
              c_id : c_id
            };
            //save new brand
            let result = await brand_M.createNew(newBrand);
            if (result){
              return resolve({
                type : true,
                message : transSuccess.add_data_successful    
              });
            };
          };
          return resolve({
            type : false,
            message : transErrors.add_data_failed
          });
        });
      };
      return resolve({
        type : false,
        message : transErrors.add_data_failed
      });
    }
    catch (error) {
      console.log(error);
    }
  })
};

module.exports = {
  createNewBrand : createNewBrand
}
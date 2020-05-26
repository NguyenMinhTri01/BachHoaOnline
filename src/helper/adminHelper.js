import cloudinary_v2 from '../config/configCloudinary';
import fs from 'fs-extra'

/**
 * 
 * @param {*} folder url folder to save image in cloudinary, example : BachHoaOnline/example
 * @param {*} path path of image on local to upload 
 */

const uploadImageToCloudinary = (folder, path, callback) => {

  // upload image to cloudinary
  cloudinary_v2.uploader.upload(path,{
    folder: `BachHoaOnline/${folder}`,
    use_filename : true,
    unique_filename : false
  } ,async (error, result) => {
    // save info brand
    if (result) {
      // remove file from folder location
      await fs.remove(path);
      callback(result);
    }else{
      callback(false);
    }
  });
};


module.exports = {
  uploadImageToCloudinary : uploadImageToCloudinary
}

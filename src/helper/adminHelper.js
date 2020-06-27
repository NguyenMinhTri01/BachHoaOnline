import cloudinary_v2 from '../config/configCloudinary';
import fs from 'fs-extra'

/**
 * 
 * @param {*} folder url folder to save image in cloudinary, example : BachHoaOnline/example
 * @param {*} path path of image on local to upload 
 */

const uploadImageToCloudinary = (folder, path) => {
  return new Promise((resolve, reject) => {
    // upload image to cloudinary
    cloudinary_v2.uploader.upload(path, {
      folder: `BachHoaOnline/${folder}`,
      use_filename: true,
      unique_filename: false
    }, (error, result) => {
      // save info brand
      if (result) {
        // remove file from folder location
        fs.remove(path, (err) => {
          resolve(result);
        });
      } else {
        resolve(false);
      }
    });
  })
};



module.exports = {
  uploadImageToCloudinary: uploadImageToCloudinary
}

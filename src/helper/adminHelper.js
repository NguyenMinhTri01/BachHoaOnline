import cloudinary_v2 from '../config/configCloudinary';
import fs from 'fs-extra';
import { promisify } from 'util';


const cloudinaryUploadImage = promisify(cloudinary_v2.uploader.upload);
const cloudinaryDestroyImage = promisify(cloudinary_v2.uploader.destroy);
/**
 * 
 * @param {*} folder url folder to save image in cloudinary, example : BachHoaOnline/example
 * @param {*} path path of image on local to upload 
 */

const uploadImageToCloudinary = (folder, path) => {
  return new Promise((resolve, reject) => {
    // upload image to cloudinary
    cloudinaryUploadImage(path, {
      folder: `BachHoaOnline/${folder}`,
      use_filename: true,
      unique_filename: false
    })
      .then(result => {
        if (result) {
          // remove file from folder location
          fs.remove(path, (err) => {
            return resolve(result);
          });
        } else {
          resolve(false);
        }
      })
      .catch(err => resolve(false))
  })
};


const removeImageFromCDN = (public_id) => {
  return new Promise((resolve, reject) => {
    cloudinaryDestroyImage(public_id)
      .then(res => {
        if (res.result === 'ok') return resolve(true)
        resolve(false);
      })
  })
}



module.exports = {
  uploadImageToCloudinary,
  removeImageFromCDN
}

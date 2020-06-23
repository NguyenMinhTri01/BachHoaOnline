import multer from "multer";
import fs from 'fs-extra'

/**
 * 
 * @param {*} folder example /brandAvatar or product/productAvatar
 */

const configStorage = (folder) => {

  const storage = multer.diskStorage({
    destination : (req, file, callback) => {
      //callback(null, "../public/admin_template/images/brand");
      const dir = `src/public/uploads${folder}`;
      fs.mkdir(dir,err => callback(null, dir));
    },
    filename : (req, file, callback) => {
      const imageBrandName = `${Date.now()}_${file.originalname}`;
      callback(null, imageBrandName);
    }
  });
  return storage
}




module.exports = configStorage
import multer from "multer";
import fs from 'fs-extra';
import {Random} from 'random-js';



/**
 * 
 * @param {*} folder example /brandAvatar or product/productAvatar
 */

const configStorage = (folder) => {
  const storage = multer.diskStorage({
    destination : (req, file, callback) => {
      //callback(null, "../public/admin_template/images/brand");
      const dir = `src/public/uploads${folder}`;
      fs.ensureDir(dir,err => callback(null, dir));
    },
    filename : (req, file, callback) => {
      const random = new Random();
      const valueRandom = random.integer(0,1000);
      let extension = file.originalname.split('.').pop();
      const imageBrandName = `${Date.now()}-${valueRandom}.${extension}`;
      callback(null, imageBrandName);
    }
  });
  return storage
}




module.exports = configStorage
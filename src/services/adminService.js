import admin_M from '../models/admin.model';
import {transSuccess, transErrors} from "../../lang/vi";
import bcrypt from 'bcrypt'

const saltRounds = 10;

const getInfoAdmin = (adminId) => {
  return new Promise(async(resolve, reject) => {
      let info = await admin_M.findAdminById(adminId);
      if (info) return resolve(info);
      return resolve(false);
    });
};



const updateInfoAdmin = (infoAdmin, adminId, path) => {
  return new Promise( async (resolve, reject) => {
    try {
      let admin = await admin_M.findAdminById(adminId);
      let checkPassword = await admin.comparePassword(infoAdmin.ad_currentPW);
      let adminUserNameIsExists = await admin_M.findByUserName(infoAdmin.ad_userName);
      if (!checkPassword) return resolve({
        type: false,
        error: transErrors.checkPasswordFailed,
      });
      if(adminUserNameIsExists && (adminUserNameIsExists.ad_userName != infoAdmin.ad_userName)) return resolve({
        type : false,
        error : transErrors.adminUserNameIsExists
      });
      delete infoAdmin['ad_currentPW'];
      let arrayPath = path.split('\\');
      if(path != null) infoAdmin['ad_avatar'] = `/${arrayPath[2]}/${arrayPath[3]}`;
      if(infoAdmin.ad_password != ''){
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(infoAdmin.ad_password, salt);
        infoAdmin['ad_password'] = hash;
      }
      Object.keys(infoAdmin).forEach( key => {
        if(infoAdmin[key] == '') delete infoAdmin[key];
      });
      let result = await admin_M.updateInfo(adminId, infoAdmin);
      if (result) return resolve({
        type : true,
        notify : transSuccess.update_infoAdmin_successful
      });
    } catch (error) { 
      console.log(error);
    }
  })
}

module.exports = {
  getInfoAdmin,
  updateInfoAdmin,
}
import users_M from '../models/users.model';
import admin_M from '../models/admin.model';
import {transSuccess, transErrors} from "../../lang/vi"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const registerUser = (data) => {
  return new Promise( async (resolve, reject) => {
    let checkExist = await users_M.findUserByEmail(data.u_email);
    if (!checkExist) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(data.u_password, salt);
      const item = new Object({
        u_name : data.u_name.trim(),
        u_phoneNumber : data.u_phoneNumber,
        u_email : data.u_email,
        u_localPassword : hash,
        u_gender : (data.profileGender === '1') ? true : false
      });
      let result = await users_M.createNew(item);
      if (result) {
        return resolve({
          type: true,
          notify : transSuccess.register_successful
        })
      }
    }
    return resolve({
      type: false,
      error: transErrors.register_failed
    });
  })
};

const authenticateAdmin = (ad_userName, ad_password) => {
  return new Promise ( async (resolve, reject) => {
    let admin = await admin_M.findByUserName(ad_userName);
    if (admin){
      let checkPassword = await admin.comparePassword(ad_password);
      if (checkPassword){
        const token = jwt.sign({
          data : admin._id,
        },process.env.SECRET_AUTH_ADMIN,{expiresIn : 60*60*24});
        let result = await admin_M.updateTokenAdmin(admin._id, token);
        if (result.ad_token != null) {
          return resolve(token);
        }
      }
      return resolve(false);
    }
    return resolve(false);
  })
};

const checkAdminExists = (ad_Id) => {
  return new Promise ( async (resolve, reject) => {
    let result = await admin_M.findAdminById(ad_Id);
    if (result == null) {
      return resolve(false);
    }
    return resolve(true);
  })
};

const checkLoginAdmin = (token) => {
  return new Promise ((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_AUTH_ADMIN, (err, result) => {
      if (err){
        return resolve(false);
      }
      return resolve(result.data);
    });
  })
}

module.exports = {
  registerUser,
  checkAdminExists,
  authenticateAdmin,
  checkLoginAdmin
}
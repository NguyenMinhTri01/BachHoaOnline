import users_M from '../models/users.model';
import { transSuccess, transErrors, transMail } from "../../lang/vi";
import bcrypt from "bcrypt";
import sendMail from "../config/mailler";
import { use } from 'passport';
const saltRounds = 10;


const getProfileUser = (id) => {
  return new Promise( async (resolve, reject) => {
    const user = await users_M.findUserById(id);
    if (user) {
      return resolve(user)
    }
    return resolve(null)
  })
};

const getListUsers = () => {
  return new Promise( async (resolve, reject) => {
    const users = await users_M.findAll();
    return resolve(users);
  })
}

const updateProfileUser = (data, id) => {
  return new Promise(async (resolve, reject) => {
    let newProfile = new Object({
      u_name: data.u_name,
      u_phoneNumber: data.u_phoneNumber,
      u_gender: (data.ProfileGender == '1') ? true : false,
      u_address: {
        provincesOrCities: data.provincesOrCities,
        district: data.district,
        wards: data.wards,
        detail: data.detail
      }
    })
    if (data.o_password !== '' && data.n_password !== '') {
      const user = await users_M.findUserById(id);
      const checkPassword = await user.comparePassword(data.o_password);
      if (!checkPassword) {
        return resolve({
          type: false,
          message: transErrors.updateProfileUserFailed
        });
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(data.n_password, salt);
      newProfile.u_localPassword = hash;
    }
    const result = await users_M.updateProfile(id, newProfile);
    if(result){
      return resolve({
        type: true,
        message: transSuccess.updateProfileUserSuccess
      });
    }
  })
};

const deleteUser = (id) => {
  return new Promise( async (resolve, reject) => {
    let result = await users_M.deleteUser(id);
    if (result.deletedCount != 0) {
      return resolve({
        type: true,
        message: transSuccess.remove_data_successful
      });
    }
    return resolve({
      type: false,
      message: transErrors.remove_data_failed
    })
  })
};

const getUserByEmail = (email) =>{
  return new Promise( async (resolve, reject) => {
    const user = await users_M.findUserByEmail(email);
    if(user){
      const newPassword = Math.floor(100000 + Math.random() * 900000).toString();
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(newPassword, salt);
      let profile = new Object({
        u_localPassword : hash
      })
      const result = await users_M.updateProfile(user._id, profile);
      if (result){
       const resSendMail = await sendMail(email, transMail.subject, transMail.contentSetPassword(newPassword, process.env.BASE_URL));
       if(resSendMail) {
        return resolve({
          type : true,
          message : 'Mật khẩu đã được đăt lại thành công vui lòng kiểm tra email của bạn!'
        })
       }
      }
    }
    return resolve({
      type : false,
      message : 'email chưa đăng ký hoặc không tồn tại!'
    })
  })
}

module.exports = {
  updateProfileUser,
  getProfileUser,
  getListUsers,
  deleteUser,
  getUserByEmail
}
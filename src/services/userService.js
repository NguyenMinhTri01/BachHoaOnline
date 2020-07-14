import users_M from '../models/users.model';
import { transSuccess, transErrors } from "../../lang/vi";
import bcrypt from "bcrypt";
const saltRounds = 10;


const getProfileUser = (id) => {
  return new Promise( async (resolve, reject) => {
    const user = await users_M.findUserById(id);
    if (user) {
      return resolve(user)
    }
    return resolve(null)
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


}

module.exports = {
  updateProfileUser,
  getProfileUser
}
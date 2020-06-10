import users_M from '../models/users.model';
import {transSuccess, transErrors} from "../../lang/vi"
import bcrypt from "bcrypt";

const saltRounds = 10;
const registerUser = (data) => {
  return new Promise( async (resolve, reject) => {
    let checkExist = await users_M.findUserByEmail(data.u_email);
    if (!checkExist) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(data.u_password, salt);
      const item = new Object({
        u_name : data.lastName.trim() + ' ' + data.firstName.trim(),
        u_email : data.u_email,
        u_localPassword : hash,
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
}

module.exports = {
  registerUser,
}
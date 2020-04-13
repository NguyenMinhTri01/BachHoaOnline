import {check} from 'express-validator/check'
import {transValidation} from '../../../lang/vi'
// check các trường dữ liệu đúng với name cùa form
let login = [
  check("email", transValidation.email_incorrect) //fillName/string error
    .isEmail()//check email 
    .trim()
    .isIn("f","g")
    .isLength({min:8, max:32})
    //.matches(/* bieu thức regular expression */)
];

module.exports = {
  login : login
}
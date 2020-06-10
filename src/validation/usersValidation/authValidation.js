import {check} from "express-validator/check";
import {transValidation} from "./../../lang/vi";

let register = [
  check("u_email", transValidation.email_incorrect)
    .isEmail()
    .trim(),
  check("u_password", transValidation.password_incorrect)
    .isLength({min: 6}),
  check("password_confirmation", transValidation.password_confirmation_incorrect)
    .custom((value, {req}) => {
      return (value === req.body.u_password);
    })
];

module.exports = {
  register: register
};


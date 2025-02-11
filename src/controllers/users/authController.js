import { validationResult } from 'express-validator';
import { transErrors } from '../../../lang/vi'
import { auth_S } from '../../services/index'

const getLoginUser = (req, res) => {
  try {
    let errors = req.flash('errors');
    return res.render('users/login', { 
      title: "Bách Hóa Online | Mua Gì Cũng Có",
      errors ,
      BASE_URL : process.env.BASE_URL
    });
  } catch (error) {
    console.log(error);
    return res.render('admin/error_500');
  }
};

const getRegisterUser = (req, res) => {
  res.render("users/register",{
    infoUser: req.user,
    title: "Bách Hóa Online | Mua Gì Cũng Có",
    BASE_URL : process.env.BASE_URL
  });
};

const registerUser = async (req, res) => {
  let data = JSON.parse(JSON.stringify(req.body));
  let notification = await auth_S.registerUser(data);
  res.send(notification);
}

const getLogout = (req, res) => {
  req.logout();
  res.redirect(`${process.env.BASE_URL}`);
};

const checkLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
};

const checkLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("./");
  }
  next();
};

const functionExamples = (req, res) => {
  let errorArr = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) { // nếu có lôi {
    let errors = Object.values(validationErrors.mapped()); //lay cái mảng lôi ra 
    errors.forEach(err => { // tách từng cái mgs lôi bỏ vào màng mới
      errorArr.push(err.msg);
    });
  }
}

module.exports = {
  getLoginUser,
  getRegisterUser,
  functionExamples,
  getLogout,
  checkLogin,
  checkLoggedOut,
  registerUser
}


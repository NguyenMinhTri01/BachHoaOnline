import {validationResult} from 'express-validator';
import {auth_S} from '../../services/index';
import {transErrors, transSuccess} from './../../../lang/vi'

let getLogin = (req, res) => {
  try {
    
    let errors = req.flash("errors");
    return res.render('admin/login',{
      base_Url : process.env.BASE_URL, 
      errors : errors
    });
  } catch (error) {
    console.log(error);
    return res.render('admin/error_500');
  }
};

let getLogout = (req, res) => {
  delete req.session['adminToken'];
  res.redirect("./login");
};

let checkLogin = async(req, res, next) => {
  let adminId = await auth_S.checkLoginAdmin(req.session.adminToken);
  if (!adminId) return res.redirect("/admin/login");
  req.adminId = adminId;
  next();
};

let checkLoggedOut = async (req, res, next) => {
  let adminId = await auth_S.checkLoginAdmin(req.session.adminToken);
  if (adminId) return res.redirect("./");
  next(); 
};

let functionExamples = (req, res) => {
  let errorArr = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()){ // nếu có lôi {
    let errors = Object.values(validationErrors.mapped()); //lay cái mảng lôi ra 
    errors.forEach(err => { // tách từng cái mgs lôi bỏ vào màng mới
      errorArr.push(err.msg);
    });
  }
};

let authenticateAdminLocal = async (req, res) => {
  
  /**
   * @function authenticateAdmin
   * @return {false} if login failed
   * @return {token} if login succeeded
   */
  
  let result = await auth_S.authenticateAdmin(req.body.ad_userName, req.body.ad_password);
  if (!result){
    req.flash("errors", transErrors.login_failed);
    return res.redirect('/admin/login');
  }
  let sessData = req.session;
  sessData.adminToken = result;
  return res.redirect('/admin');
}

module.exports = {
  getLogin,
  functionExamples,
  getLogout,
  checkLogin,
  checkLoggedOut,
  authenticateAdminLocal

}


import {validationResult} from 'express-validator';

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
}

let getLogout = (req, res) => {
  //remove session passport admin
  req.logout();
  res.redirect("./login");
}
let checkLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/admin/login");
  }
 next();
}

let checkLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) {

    return res.redirect("./");
  }
  next(); 
}

let functionExamples = (req, res) => {
  let errorArr = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()){ // nếu có lôi {
    let errors = Object.values(validationErrors.mapped()); //lay cái mảng lôi ra 
    errors.forEach(err => { // tách từng cái mgs lôi bỏ vào màng mới
      errorArr.push(err.msg);
    });
  }
}

module.exports = {
  getLogin : getLogin,
  functionExamples: functionExamples,
  getLogout : getLogout,
  checkLogin : checkLogin,
  checkLoggedOut: checkLoggedOut

}


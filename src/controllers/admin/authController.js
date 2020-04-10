let getLogin = (req, res) => {
  try {
    return res.render('admin/login');
  } catch (error) {
    console.log(error);
    return res.render('admin/error_500');
  }
}
module.exports = {
getLogin : getLogin
}


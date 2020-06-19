let getHome = (req, res) => {
  try {
    return res.render('users/home');
  } catch (error) {
    console.log(error);
    return res.render('admin/error_500');
  }
}

module.exports = {
  getHome
}
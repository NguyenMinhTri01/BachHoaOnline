let getDashboard = (req, res) => {
  try {
    return res.render('admin/index',{
      base_Url : process.env.BASE_URL, 
      adminInfo: req.user,
      title : "Trang Quản Trị Web Bach Hóa Online"
    });
  } catch (error) {
    console.log(error);
    return res.render('admin/error_500');
  }
}

module.exports = {
  getDashboard : getDashboard
}
import {dashboard_S} from '../../services/index'


let getDashboard = async (req, res) => {
  try {
    let adminInfo = await dashboard_S.getInfoAdmin(req.adminId);
    if (!adminInfo) return res.redirect('/admin/login');
    return res.render('admin/index',{
      base_Url : process.env.BASE_URL, 
      adminInfo: adminInfo,
      title : "Trang Quản Trị Web Bach Hóa Online"
    });
  } catch (error) {
    return res.render('admin/error_500');
  }
}

let testGetInfo = async (req, res) => {
  try {
    await dashboard_S.getInfoAdmin();
  } catch (error) {

  }
  res.send("ok")
}

module.exports = {
  getDashboard,
  testGetInfo
}
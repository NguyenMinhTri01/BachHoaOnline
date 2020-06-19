import { dashboard_S, admin_S } from '../../services/index'


let getDashboard = async (req, res) => {
  try {
    return res.render('admin/index', {
      base_Url: process.env.BASE_URL,
      adminInfo: req.adminInfo,
      title: "Trang Quản Trị Web Bach Hóa Online"
    });
  } catch (error) {
    return res.render('admin/error_500');
  }
}

let testGetInfo = async (req, res) => {

}

module.exports = {
  getDashboard,
  testGetInfo
}
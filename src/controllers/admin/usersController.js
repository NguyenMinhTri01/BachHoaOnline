import {user_S} from '../../services/index'

const getViewIndex = async( req, res) => {
  let notification = req.flash('notification');
  const users = await user_S.getListUsers();
  res.render("admin/users/index", {
    base_Url: process.env.BASE_URL,
    users,
    SECURE_DELIVERY_URL : process.env.SECURE_DELIVERY_URL,
    adminInfo: req.adminInfo,
    notification: notification,
    title: "Bach Hóa Online | Quản Lý Sản Phẩm",
  })
};

const deleteUser = async (req, res) => {
  let id = req.params.id;
  let notification = await user_S.deleteUser(id);
  req.flash('notification', notification);
  res.redirect('/admin/users');
}


module.exports = {
  getViewIndex,
  deleteUser
}
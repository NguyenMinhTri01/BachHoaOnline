import { product_S, category_S, order_S, brand_S, user_S } from '../../services/index';


const getPay = async (req, res) => {
  try {
    const user = req.user ? await user_S.getProfileUser(req.user._id) : undefined
    return res.render('users/pay', {
      TRANSPORT_COST: process.env.TRANSPORT_COST,
      title: "Bách Hóa Online | Thanh Toán Đơn Hàng",
      infoUser: user || undefined,
      BASE_URL: process.env.BASE_URL
    })
  } catch (error) {
  }
};

const getPurchase = async (req, res) => {
  try {
    const user = await user_S.getProfileUser(req.user._id);
    return res.render('users/purchase', {
      infoUser: user || undefined,
      title: "Bách Hóa Online | Tài Khoản Của Tôi",
      BASE_URL: process.env.BASE_URL
    })
  } catch (error) {

  }
};

const getProfileUser = async (req, res) => {
  try {
    const user = await user_S.getProfileUser(req.user._id);
    return res.render('users/profileUser', {
      infoUser: user || undefined,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
      BASE_URL: process.env.BASE_URL
    })
  } catch (error) {

  }
};


const updateProfileUser = async (req, res) => {
  const { _id } = req.user;
  let object = JSON.parse(JSON.stringify(req.body));
  let notification = await user_S.updateProfileUser(object, _id);
  res.send(notification);
};

const getForgotPasswordUser = async (req, res) => {
  const user = req.user ? await user_S.getProfileUser(req.user._id) : undefined
  res.render ("users/forgotPassword", {
    infoUser: user || undefined,
    title: "Bách Hóa Online | Mua Gì Cũng Có",
    BASE_URL: process.env.BASE_URL
  })
}

module.exports = {
  getPay,
  getPurchase,
  getProfileUser,
  updateProfileUser,
  getForgotPasswordUser

}
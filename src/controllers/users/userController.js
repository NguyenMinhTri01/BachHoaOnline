import { product_S, category_S, order_S, brand_S, user_S } from '../../services/index';
import formatNumber from 'format-number';

const statusOrder = ['Đang chờ xử lý', 'Đã tiếp nhận', 'Đang giao hàng', 'Giao hành thành công', 'Đã Hủy']
const TRANSPORT_COST = process.env.TRANSPORT_COST;
const TRANSPORT_COST_STRING  = formatNumber({ suffix: '₫',integerSeparator :".", decimal:","})(TRANSPORT_COST);
const SECURE_DELIVERY_URL = process.env.SECURE_DELIVERY_URL;
const base_Url = process.env.BASE_URL;
const getPay = async (req, res) => {
  try {
    const user = req.user ? await user_S.getProfileUser(req.user._id) : undefined
    const page = user ? 'users/payForMember' : 'users/pay';
    return res.render(`${page}`, {
      TRANSPORT_COST,
      title: "Bách Hóa Online | Thanh Toán Đơn Hàng",
      infoUser: user || undefined,
      BASE_URL: process.env.BASE_URL
    })
  } catch (error) {
  }
};

const addNewOrder = async (req, res) => {
  let object = JSON.parse(JSON.stringify(req.body));
  let notification = await order_S.addNewOrder(object);
  res.send(notification);
};

const getPurchase = async (req, res) => {
  try {
    const user = await user_S.getProfileUser(req.user._id);
    const order = await order_S.getOrderByUserId(req.user._id);
    return res.render('users/purchase', {
      infoUser: user || undefined,
      order,
      statusOrder,
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
};

const getViewDetailPurchase = async (req, res) => {
  const {id} = req.params;
  const user = req.user ? await user_S.getProfileUser(req.user._id) : undefined
  const order = await order_S.getOrderById(id);
  res.render ("users/purchaseDetail", {
    order,
    statusOrder,
    SECURE_DELIVERY_URL,
    TRANSPORT_COST,
    TRANSPORT_COST_STRING,
    infoUser: user || undefined,
    title: "Chi Tiết Đơn Hàng",
    BASE_URL: process.env.BASE_URL
  })
}

module.exports = {
  getPay,
  getPurchase,
  addNewOrder,
  getProfileUser,
  updateProfileUser,
  getForgotPasswordUser,
  getViewDetailPurchase

}
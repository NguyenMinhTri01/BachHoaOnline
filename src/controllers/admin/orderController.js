import {order_S} from './../../services'
import {transSuccess, transErrors} from "../../../lang/vi";
import formatNumber from 'format-number';


const statusOrder = ['Đang chờ xử lý', 'Đã tiếp nhận', 'Đang giao hàng', 'Giao hành thành công']
const statusButton = ['btn-danger', 'btn-warning', 'btn-primary', ' btn-success']
const TRANSPORT_COST = process.env.TRANSPORT_COST;
const TRANSPORT_COST_STRING  = formatNumber({ suffix: '₫',integerSeparator :".", decimal:","})(TRANSPORT_COST);
const SECURE_DELIVERY_URL = process.env.SECURE_DELIVERY_URL;
const base_Url = process.env.BASE_URL;


const getViewIndex = async (req, res) => {
  let notification = req.flash('notification');
  let orders = await order_S.getListOrders();
  res.render('admin/order/index', {
    base_Url,
    adminInfo: req.adminInfo,
    title: "Trang Quản Trị Bach Hóa Online | Đơn Hàng",
    SECURE_DELIVERY_URL,
    TRANSPORT_COST,
    TRANSPORT_COST_STRING,
    orders,
    statusOrder,
    statusButton,
    notification
  });
};


const editStatus = async (req, res) => {
  const {or_status, id} = req.params;
  let notification = await order_S.editStatus(or_status, id);
  req.flash('notification',notification);
  res.redirect(`${req.headers.referer}`);
};


const getViewDetail = async (req,res) => {
  let notification = req.flash('notification');
  const {id} = req.params;
  const order = await order_S.getOrderById(id);
  if (order){
    return res.render('admin/order/orderDetail', {
      base_Url,
      adminInfo: req.adminInfo,
      title: "Trang Quản Trị Bach Hóa Online | Chi Tiết Đơn Hàng",
      SECURE_DELIVERY_URL,
      TRANSPORT_COST,
      TRANSPORT_COST_STRING,
      order,
      statusOrder,
      statusButton,
      notification
    });
  }
  return res.render('admin/error_500');
};



module.exports = {
  editStatus,
  getViewIndex,
  getViewDetail
}
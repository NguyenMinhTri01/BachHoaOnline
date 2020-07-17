import { dashboard_S, admin_S, order_S, user_S, product_S, brand_S, category_S } from '../../services/index'


let getDashboard = async (req, res) => {
  try {
    const userCount = await user_S.getUserCount();
    const productCount = await product_S.getProductCount();
    const orderCount = await order_S.getOrderCount();
    const brandCount = await brand_S.getBrandCount();
    const categoryCount = await category_S.getCategoryCount();
    const orderNotResolved = await order_S.getOrderNotResolved();
    return res.render('admin/index', {
      userCount,
      productCount,
      orderCount,
      brandCount,
      categoryCount,
      orderNotResolved,
      base_Url: process.env.BASE_URL,
      SECURE_DELIVERY_URL: process.env.SECURE_DELIVERY_URL,
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
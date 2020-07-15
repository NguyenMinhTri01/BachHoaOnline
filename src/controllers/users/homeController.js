import { product_S, category_S, order_S } from '../../services/index';



let getHome = async (req, res) => {
  try {
    const menu = await category_S.getMenuCategory();
    const data = await product_S.getProductsFollowMenuCategory(menu);
    const productsHot = await product_S.getProductsHot(0);
    return res.render('users/home', {
      menu,
      data,
      productsHot,
      infoUser: req.user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
      SECURE_DELIVERY_URL: process.env.SECURE_DELIVERY_URL,
    });
  } catch (error) {
    console.log(error);
    return res.render('admin/error_500');
  }
};

const getProductsAddCart = async (req, res) => {
  const carts = req.body.carts
  let products = await product_S.getProductsAddCart(carts);
  //console.log(products);
  res.send(products);
};

const addNewOrder = async (req, res) => {
  let object = JSON.parse(JSON.stringify(req.body));
  let notification = await order_S.addNewOrder(object);
  res.send(notification);
}

const addOnItem = async (req, res) => {
  const { id , count} = req.params;
  let listC_idChild = await category_S.getCategoryChildById(id);
  let category = await category_S.getOneCategory(id);
  listC_idChild = listC_idChild.map(child => child._id);
  const products = await product_S.getProductsFlowListC_id(listC_idChild, +count);
  res.send({
    category: {
      _id : category._id,
      c_slug : category.c_slug
    },
    products,
    SECURE_DELIVERY_URL : process.env.SECURE_DELIVERY_URL
  });
};

const addOnHotItem = async (req, res) => {
  const {count} = req.params;
  const products = await product_S.getProductsHot( +count );
  res.send({
    products,
    SECURE_DELIVERY_URL : process.env.SECURE_DELIVERY_URL
  });
};

const getProductsToSearch = async (req, res) => {
  const {keyword} = req.body;
  try {
    const menu = await category_S.getMenuCategory();
    const products = await product_S.getProductsFollowKeyword(keyword);
    return res.render('users/search', {
      menu,
      keyword,
      products,
      infoUser: req.user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
      SECURE_DELIVERY_URL: process.env.SECURE_DELIVERY_URL,
    });
  } catch (error) {
    console.log(error);
    return res.render('admin/error_500');
  }
}



const getCheckOut = (req, res) => {
  try {
    return res.render('users/checkout', {
      infoUser: req.user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
    });
  } catch (error) {

  }
}
const getContact = (req, res) => {
  try {
    return res.render('users/contact', {
      infoUser: req.user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
    });
  } catch (error) {

  }

}
const getAbout = (req, res) => {
  try {
    return res.render('users/about',{
      infoUser: req.user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",

    });
  } catch (error) {

  }

}
const getProducts = (req, res) => {
  try {
    return res.render('users/products',{
      infoUser: req.user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",

    })
  } catch (error) {

  }
}
const getBeverages = (req, res) => {
  try {
    return res.render('users/beverages',{
      infoUser: req.user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",

    })
  } catch (error) {

  }
}
const getSingle = (req, res) => {
  try {
    return res.render('users/single',{
      infoUser: req.user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",

    })
  } catch (error) {

  }
}
const getPay = (req, res) => {
  try {
    return res.render('users/pay', {
      TRANSPORT_COST: process.env.TRANSPORT_COST,
      title: "Bách Hóa Online | Thanh Toán Đơn Hàng",
      infoUser: req.user
    })
  } catch (error) {
  }
}
const getHistory=(req,res)=>{
  try{
    return res.render('users/history',{
      infoUser: req.user,
      title: "Bách Hóa Online | Tài Khoản Của Tôi",
    })
  } catch (error){

  }
}
const getUsername=(req,res)=>{
  try{
    return res.render('users/username',{
      infoUser: req.user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
    })
  } catch (error){

  }
}
const getOrderview=(req,res)=>{
  try{
    return res.render('users/orderview',{
      infoUser: req.user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
    })
  } catch(error){

  }
}
module.exports = {
  getHome,
  addOnItem,
  getCheckOut,
  getContact,
  getAbout,
  getProducts,
  getBeverages,
  getSingle,
  getPay,
  getHistory,
  getUsername,
  addNewOrder,
  addOnHotItem,
  getProductsAddCart,
  getProductsToSearch,
  getOrderview
}
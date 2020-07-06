import order_M from './../models/order.model';
import product_M from './../models/product.model';
import formatNumber from 'format-number';
import _ from 'lodash';
import { transSuccess, transErrors} from "../../lang/vi"

const addNewOrder = (object) => {
  return new Promise(async (resolve, reject) => {
    let u_address = {
      provincesOrCities: object.provincesOrCities,
      district: object.district,
      wards: object.wards,
      detail: object.detail,
    };
    let or_infoDailies = {
      _id: object._id,
      u_name: object.u_name,
      u_phoneNumber: object.u_phoneNumber,
      u_gender: object.u_gender,
      u_address
    };
    let arrayCart = object.carts.split("@");
    let or_products = await Promise.all(arrayCart.map(async item => {
      let objectItem = JSON.parse(item);
      let product = await product_M.findProductByIdAddToCart(objectItem._id);
      return new Object({
        _id : product._id,
        pr_avatar : product.pr_avatar,
        pr_name: product.pr_name,
        pr_price: product.pr_price,
        pr_priceNew : product.pr_priceNew,
        pr_priceString : formatNumber({ suffix: '₫',integerSeparator :".", decimal:","})(product.pr_price),
        pr_priceNewString : formatNumber({ suffix: '₫',integerSeparator :".", decimal:","})(product.pr_priceNew || product.pr_price),
        pr_quantity : objectItem.quantity,
        pr_total : product.pr_priceNew * objectItem.quantity,
        pr_totalString : formatNumber({ suffix: '₫',integerSeparator :".", decimal:","})((product.pr_priceNew * objectItem.quantity) || (product.pr_price * objectItem.quantity)),
      });
    }))
    const or_sumProduct = _.reduce(or_products, (sum, product) =>{
      return sum + product.pr_quantity;
    }, 0);
    const or_sumPriceProduct = _.reduce(or_products, (sum, product) =>{
      return sum + product.pr_total
    },0)
    const or_totalPay =  +process.env.TRANSPORT_COST + or_sumPriceProduct;
    const or_totalPayString = formatNumber({ suffix: '₫',integerSeparator :".", decimal:","})(or_totalPay);
    const or_sumPriceProductString = formatNumber({ suffix: '₫',integerSeparator :".", decimal:","})(or_sumPriceProduct);
    let itemOrder = {
      or_infoDailies,
      or_products,
      or_sumProduct,
      or_sumPriceProduct,
      or_sumPriceProductString,
      or_totalPay,
      or_totalPayString,
      or_note : object.or_note,
      or_deliveryDate : object.or_deliveryDate,
      or_deliveryTime : object.or_deliveryTime
    }
    let result = await order_M.createNew(itemOrder);
    if(result){
      return resolve({
        type : true
      })
    }
    return resolve({
      type : false
    })
  })
};

const getListOrders = () => {
  return new Promise( async (resolve, reject) => {
    let orders = await order_M.findAll();
    if (orders.length > 0) return resolve(orders);
    return resolve([]);
  })
};

const editStatus = (or_status, id) => {
  return new Promise( async (resolve, reject) => {
    let order = await order_M.updateStatusByUserId(id, or_status);
    if (order){
      return resolve({
        type: true,
        message: transSuccess.update_status_successful
      });
    }
    return resolve({
      type: false,
      message: transErrors.update_status_failed
    })
  })
};

const getOrderById = (id) => {
  return new Promise(async (resolve, reject) => {
    const order = await order_M.findOrderById(id);
    if (order) {
      return resolve(order);
    }
    return resolve(false);
  })
}


module.exports = {
  editStatus,
  addNewOrder,
  getOrderById,
  getListOrders
}
import {product_S, category_S} from '../../services/index';



let getHome = async (req, res) => {
  try {
    const menu = await category_S.getMenuCategory();
    const data = await  product_S.getProductsFollowMenuCategory(menu);
    return res.render('users/home',{
      menu,
      // data,
      infoUser : req.user,
      title: "Bách Hóa Online | Mua Tất Cả Trên Dị Động",
      SECURE_DELIVERY_URL: process.env.SECURE_DELIVERY_URL,
    });
  } catch (error) {
    console.log(error);
    return res.render('admin/error_500');
  }
}

const getCheckOut = (req, res) =>{
  try {
    return res.render('users/checkout');
  } catch (error) {
    
  }
}
const getContact=(req, res) =>{
  try {
    return res.render('users/contact');
  } catch(error){

  }
  
}
const getAbout=(req,res)=>{
  try{
    return res.render('users/about');
  } catch(error){

  }
  
}
const getProducts=(req, res)=>{
  try{
    return res.render('users/products')
  }catch(error){

  }
}
const getBeverages=(req,res)=>{
  try{
    return res.render('users/beverages')
  }catch(error){

  }
}
const getSingle=(req,res)=>{
  try{
    return res.render('users/single')
  } catch(error){

  }
}
const getPay=(req,res)=>{
  try{
    return res.render('users/pay')
  }catch(error){

  }
}
const getHistory=(req,res)=>{
  try{
    return res.render('users/history')
  } catch (error){

  }
}
const getUsername=(req,res)=>{
  try{
    return res.render('users/username')
  } catch (error){

  }
}
module.exports = {
  getHome,
  getCheckOut,
  getContact,
  getAbout,
  getProducts,
  getBeverages,
  getSingle,
  getPay,
  getHistory,
  getUsername
  
 
}
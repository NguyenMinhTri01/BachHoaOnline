import {product_S, category_S} from '../../services/index';



let getHome = async (req, res) => {
  try {
    // let categories  = await category_S.getListCategoriesByLevel(1);
    // let products = await product_S.getProductsFollowCategories(categories);
    return res.render('users/home',{
      infoUser : req.user
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
module.exports = {
  getHome,
  getCheckOut,
  getContact,
  getAbout,
  getProducts,
  getBeverages,
  getSingle,
  getPay
  
 
}
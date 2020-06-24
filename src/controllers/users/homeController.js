let getHome = (req, res) => {
  try {
    return res.render('users/home');
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
module.exports = {
  getHome,
  getCheckOut,
  getContact,
  getAbout,
  getProducts,
  getBeverages,
  getSingle
 
}
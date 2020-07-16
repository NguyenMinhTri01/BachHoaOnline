import { product_C } from '../../controllers/users/index'


const initAllRoute_Product = (router) => {
  router.post('/getProductsAddCart', product_C.getProductsAddCart);
  router.get('/products/sort/:sort', product_C.getProductsBySort);
  router.get('/products/viewMore/sort/:sort/skip/:skip', product_C.getProductsViewMore);
  router.get('/products/brand/:br_id', product_C.getProductByBrand);
  router.get('/product(/:c_slug)?/:pr_slug',product_C.getProductDetail);
  router.get('/:c_slug', product_C.getProductToCategory);
}
module.exports = initAllRoute_Product


import { product_S, category_S, order_S, brand_S, user_S } from '../../services/index';

const getProductsAddCart = async (req, res) => {
  const carts = req.body.carts
  let products = await product_S.getProductsAddCart(carts);
  //console.log(products);
  res.send(products);
};


const getProductsBySort = async (req, res) => {
  const { sort } = req.params;
  const currentUrl = req.headers.referer;
  const c_slug = currentUrl.split('/')[3];
  try {
    const result = await product_S.getProductsByCategorySl(c_slug, 0 , sort);
    return res.send({
      products : result.products,
      category : result.category,
      SECURE_DELIVERY_URL: process.env.SECURE_DELIVERY_URL,
      BASE_URL: process.env.BASE_URL
    });
  } catch (error) {
    console.log(error);
  }
};


const getProductsViewMore = async (req, res) => {
  const { sort, skip } = req.params;
  const currentUrl = req.headers.referer;
  const c_slug = currentUrl.split('/')[3];
  try {
    const result = await product_S.getProductsByCategorySl(c_slug, skip , sort);
    return res.send({
      products : result.products,
      category : result.category,
      SECURE_DELIVERY_URL: process.env.SECURE_DELIVERY_URL,
      BASE_URL: process.env.BASE_URL
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductDetail = async (req, res) => {
  try {
    const user = req.user ? await user_S.getProfileUser(req.user._id) : undefined
    const { pr_slug } = req.params;
    const product = await product_S.getProductBySlug(pr_slug);
    const menu = await category_S.getMenuCategory();
    if (product) {
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      const album = await product_S.getAlbumImageByPrId(product._id);
      const brand = await brand_S.getBrandById(product.br_id);
      const productFamily = await product_S.getProductsFlowCategory(product.c_id, 0, product._id);
      const infoLikeShareFacebook = {
        url : fullUrl,
        title: product.pr_SEO.title,
        description: product.pr_SEO.description,
        image: product.pr_avatar
      }
      return res.render('users/single', {
        infoUser: user,
        title: product.pr_SEO.title,
        keywords: product.pr_SEO.key,
        description: product.pr_SEO.description,
        BASE_URL: process.env.BASE_URL,
        product,
        brand,
        menu,
        infoLikeShareFacebook,
        album : album || [],
        productFamily : productFamily || [],
        SECURE_DELIVERY_URL: process.env.SECURE_DELIVERY_URL,
      })
    };
    return res.render('admin/error_500');

  } catch (error) {
    console.log(error);
    return res.render('admin/error_500');
  }
};


const getProductToCategory = async (req, res) => {
  const {c_slug} = req.params;
  try {
    const user = req.user ? await user_S.getProfileUser(req.user._id) : undefined
    const menu = await category_S.getMenuCategory();
    const result = await product_S.getProductsByCategorySl(c_slug, 0);
    const brands = await brand_S.getBrandsByCategory(result.category._id);
    return res.render('users/products', {
      menu,
      brands,
      products : result.products,
      c_name : result.category.c_name,
      c_slug : result.category.c_slug,
      infoUser: user,
      title: result.category.c_name,
      SECURE_DELIVERY_URL: process.env.SECURE_DELIVERY_URL,
      BASE_URL: process.env.BASE_URL
    });
  } catch (error) {
    console.log(error);
    return res.render('admin/error_500');
  }
};

const getProductByBrand = async (req, res) => {
  const {br_id} = req.params;
  const currentUrl = req.headers.referer;
  const c_slug = currentUrl.split('/')[3];
  try {
    const result = await product_S.getProductsByBrand(c_slug, br_id);
    return res.send({
      products : result.products,
      category : result.category,
      SECURE_DELIVERY_URL: process.env.SECURE_DELIVERY_URL,
      BASE_URL: process.env.BASE_URL
    });
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  getProductsAddCart,
  getProductsBySort,
  getProductsViewMore,
  getProductDetail,
  getProductToCategory,
  getProductByBrand
}
import { product_S, category_S, order_S, brand_S, user_S } from '../../services/index';



let getHome = async (req, res) => {
  try {
    const user = req.user ? await user_S.getProfileUser(req.user._id) : undefined
    const menu = await category_S.getMenuCategory();
    const data = await product_S.getProductsFollowMenuCategory(menu);
    const productsHot = await product_S.getProductsHot(0);
    return res.render('users/home', {
      menu,
      data,
      productsHot,
      infoUser: user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
      SECURE_DELIVERY_URL: process.env.SECURE_DELIVERY_URL,
      BASE_URL: process.env.BASE_URL
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
  const { id, count } = req.params;
  let listC_idChild = await category_S.getCategoryChildById(id);
  let category = await category_S.getOneCategory(id);
  listC_idChild = listC_idChild.map(child => child._id);
  const products = await product_S.getProductsFlowListC_id(listC_idChild, +count);
  res.send({
    category: {
      _id: category._id,
      c_slug: category.c_slug
    },
    products,
    SECURE_DELIVERY_URL: process.env.SECURE_DELIVERY_URL,

  });
};

const addOnHotItem = async (req, res) => {
  const { count } = req.params;
  const products = await product_S.getProductsHot(+count);
  res.send({
    products,
    SECURE_DELIVERY_URL: process.env.SECURE_DELIVERY_URL
  });
};

const getProductsToSearch = async (req, res) => {
  const { keyword } = req.body;
  try {
    const user = req.user ? await user_S.getProfileUser(req.user._id) : undefined
    const menu = await category_S.getMenuCategory();
    const products = await product_S.getProductsFollowKeyword(keyword);
    return res.render('users/search', {
      menu,
      keyword,
      products,
      infoUser: user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
      SECURE_DELIVERY_URL: process.env.SECURE_DELIVERY_URL,
      BASE_URL: process.env.BASE_URL
    });
  } catch (error) {
    console.log(error);
    return res.render('admin/error_500');
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
      const productFamily = await product_S.getProductsFlowCategory(product.c_id, 0);
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
}



const getCheckOut = async (req, res) => {
  try {
    const user = req.user ? await user_S.getProfileUser(req.user._id) : undefined
    return res.render('users/checkout', {
      infoUser: user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
      BASE_URL: process.env.BASE_URL
    });
  } catch (error) {

  }
}
const getContact = async (req, res) => {
  try {
    const user = req.user ? await user_S.getProfileUser(req.user._id) : undefined
    return res.render('users/contact', {
      infoUser: user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
      BASE_URL: process.env.BASE_URL
    });
  } catch (error) {

  }

}
const getAbout = async (req, res) => {
  try {
    const user = req.user ? await user_S.getProfileUser(req.user._id) : undefined
    return res.render('users/about', {
      infoUser: user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
      BASE_URL: process.env.BASE_URL

    });
  } catch (error) {

  }

}
const getProducts = async (req, res) => {
  try {
    const user = req.user ? await user_S.getProfileUser(req.user._id) : undefined
    return res.render('users/products', {
      infoUser: user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
      BASE_URL: process.env.BASE_URL

    })
  } catch (error) {

  }
}
const getBeverages = (req, res) => {
  try {
    return res.render('users/beverages', {
      infoUser: req.user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
      BASE_URL: process.env.BASE_URL

    })
  } catch (error) {

  }
}
const getSingle = (req, res) => {
  try {
    return res.render('users/single', {
      infoUser: req.user,
      title: "Bách Hóa Online | Mua Gì Cũng Có",
      BASE_URL: process.env.BASE_URL

    })
  } catch (error) {

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
  addNewOrder,
  addOnHotItem,
  getProductDetail,
  getProductsAddCart,
  getProductsToSearch
}
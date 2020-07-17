import { mongoose, shortId } from '../config/configDB'

let Schema = mongoose.Schema;

let productSchema = new Schema({
  _id: { type: String, default: shortId.generate },
  pr_name: String,
  pr_slug: String,
  pr_avatar: String,
  pr_status: { type: Boolean, default: true },
  pr_origin: String,
  c_id: String,
  br_id: String,
  pr_capacity: {
    value: Number,
    unit: String
  },
  pr_SEO: {
    title: String,
    key: String,
    description: String
  },
  pr_description: String,
  pr_hot: { type: Boolean, default: false },
  pr_price: Number,
  pr_discount: Number,
  pr_priceNew: Number,
  pr_viewCounts: { type: Number, default: 0 },
  pr_amount: { type: Number, default: 10 },
  pr_boughtCounts: { type: Number, default: 0 },
  pr_createdAt: { type: Number, default: Date.now },
  pr_updatedAt: { type: Number, default: null },
});

productSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  findProductById(id) {
    return this.findById(id);
  },
  findProductBySlug(pr_slug) {
    return this.findOne({ "pr_slug": pr_slug });
  },
  findAll() {
    return this.find();
  },
  updateProductById(id, item) {
    return this.updateOne({ "_id": id }, item, { multipleCastError: true })
      .then(res => {
        if (res.n != 0) {
          return this.findById(id);
        }
        return false
      })
      .then(product => { return product });
  },
  updateActive(id) {
    return this.findById(id)
      .then(product => {
        product.pr_status = product.pr_status ? false : true;
        return product.save();
      })
      .then(product => { return product });
  },
  updateHot(id) {
    return this.findById(id)
      .then(product => {
        product.pr_hot = product.pr_hot ? false : true;
        return product.save()
      })
      .then(product => { return product });
  },

  getProductsFollowArrayIdCategory(arrId, skip) {
    return this
      .find(
        {
          c_id: { $in: arrId },
          pr_status: true,
          pr_hot: false
        },
        '_id pr_name c_id pr_slug pr_avatar pr_price pr_priceNew pr_discount'
      )
      .sort({ pr_priceNew: 1 })
      .limit(8)
      .skip(skip)
  },

  getProductsFollowIdCategory(c_id, skip, _id) {
    return this
      .find(
        {
          _id: { $nin: _id },
          c_id,
          pr_status: true
        },
        '_id pr_name pr_hot c_id pr_slug pr_avatar pr_price pr_priceNew pr_discount'
      )
      .sort({ pr_hot: -1 })
      .limit(16)
      .skip(skip)
  },

  getProductHot(skip) {
    return this
      .find(
        {
          pr_status: true,
          pr_hot: true,
        },
        '_id pr_name c_id pr_slug pr_avatar pr_price pr_priceNew pr_discount'
      )
      .sort({ pr_priceNew: 1 })
      .limit(8)
      .skip(skip)
  },

  findProductByIdAddToCart(id) {
    return this
      .findById(
        id,
        '_id pr_name c_id pr_slug pr_avatar pr_price pr_priceNew pr_discount'
      )
  },
  getProductsByC_Id(c_id, skip) {
    return this.find(
      { c_id: c_id, pr_status: true },
      '_id pr_name c_id pr_hot pr_slug pr_avatar pr_price pr_priceNew pr_discount'
    )
      .limit(8)
      .skip(skip)
  },

  getProductsByC_IdAndSort(c_id, skip, sort) {
    return this.find(
      { c_id: c_id, pr_status: true },
      '_id pr_name c_id pr_hot pr_slug pr_avatar pr_price pr_priceNew pr_discount'
    )
      .sort({ pr_priceNew: sort })
      .limit(8)
      .skip(skip)
  },

  findProductByKeyword(keyword) {
    return this
      .find(
        {
          pr_slug: { "$regex": new RegExp(keyword, "i") },
          pr_status: true
        },
        '_id pr_name pr_hot c_id pr_slug pr_avatar pr_price pr_priceNew pr_discount'
      )
      .sort({ pr_priceNew: 1 })
      .limit(32)
  },

  updateAmountAndViewCount(id, quantity) {
    return this.findById(id)
      .then(product => {
        product.pr_boughtCounts = quantity;
        product.pr_amount = product.pr_amount - quantity;
        return product.save()
      })
      .then(product => product);
  },

  findProductByBr_id(br_id) {
    return this.find({ 
      br_id: br_id, 
      pr_status : true
    })
  },
  // updateAmountProduct () {
  //   return this.updateMany({}, {pr_amount : 1000});
  // }
}
module.exports = mongoose.model("product", productSchema);
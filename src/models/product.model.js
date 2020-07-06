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
  pr_priceNew: { type: Number },
  pr_viewCounts: { type: Number, default: 0 },
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
    return this.findByIdAndUpdate(id, item);
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
          c_id: { $in: arrId }
        },
        '_id pr_name c_id pr_slug pr_avatar pr_price pr_priceNew pr_discount'
      )
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
  getProductsByC_Id(c_id) {
    return this.find({ c_id });
  }
}
module.exports = mongoose.model("product", productSchema);
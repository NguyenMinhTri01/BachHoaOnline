import { mongoose, shortId } from '../config/configDB'

let Schema = mongoose.Schema;

let categorySchema = new Schema({
  _id: { type: String, default: shortId.generate },
  c_name: { type: String },
  c_slug: { type: String },
  c_parentId: { type: String, default: '0' },
  c_level: { type: Number },
  c_status: { type: Boolean, default: true },
  c_createdAt: { type: Number, default: Date.now },
  c_updatedAt: { type: Number, default: null },
});

categorySchema.statics = {
  createNew(item) {
    return this.create(item);
  },

  findCategoryById(id) {
    return this.findById(id);
  },

  findBySlug(c_slug) {
    return this.findOne({ "c_slug": c_slug });
  },

  findAll() {
    return this.find();
  },

  findMaxLevel() {
    return this.find({}, { c_level: 1 }).sort({ "c_level": -1 }).limit(1);
  },

  // finCategoriesByC_level(c_level){
  //   return this.find({c_level}, null, {sort: {c_slug: 1}});
  // },

  findChildCategoryById(id) {
    return this.find({ c_parentId: id },
      '_id c_name c_slug c_parentId',
      { sort: { c_slug: 1 } }
    );
  },

  findChildIdCategoryByIdParent(id) {
    return this.find({ c_parentId: id },
      '_id'
    );
  },

  deleteCategory(id) {
    return this.deleteOne({ _id: id });
  },

  updateCategoryById(id, item) {
    return this.findByIdAndUpdate(id, item);
  },

  findAllByLevel(c_level) {
    return this.find(
      { c_level },
      '_id c_name c_slug c_parentId',
      { sort: { c_slug: 1 } }
    );
  },

  updateActive(id) {
    return this.findById(id)
      .then(category => {
        category.c_status = category.c_status ? false : true;
        return category.save();
      })
  },

}

module.exports = mongoose.model("category", categorySchema);
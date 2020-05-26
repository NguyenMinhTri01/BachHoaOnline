import {mongoose, shortId} from '../config/configDB'

let Schema = mongoose.Schema;

let brandSchema = new Schema ({
  _id: {type: String, default : shortId.generate},
  br_name : {type: String},
  br_slug : {type: String},
  br_image : {type: String, default: process.env.DEFAULT_BRAND_IMAGE},
  c_id : {type: String},
  br_createdAt: {type: Number, default: Date.now},
  br_updatedAt: {type: Number, default: null},
});

brandSchema.statics = {
  createNew(item){
    return this.create(item);
  },

  findBrandById(id){
    return this.findById(id).exec();
  },

  findBrandBySlug(br_slug){
    return this.findOne({ "br_slug": br_slug}).exec();
  },

  // findAll(){
  //   return this.find().exec();
  // },

  // deleteCategory(id){
  //   return this.deleteOne({_id:id}).exec();
  // },

  // deleteCategoryOfGroup(groupId){
  //   return this.deleteMany({"c_parent.id" : groupId});
  // },

  // updateCategoryById(id, item){
  //   return this.findByIdAndUpdate(id, item).exec();
  // },

  // findCategoriesOfGroup(groupId){
  //   return this.find({"c_parent.id" : groupId}).exec();
  // },

  // updateActive(id){
  //   return this.findById(id)
  //   .then(category => {
  //     category.c_status = category.c_status ? false : true;
  //     return category.save();
  //   })    
  // },

  // updateCategoriesOfGroup(groupId, gc_name){
  //   return this.updateMany({"c_parent.id": groupId}, {"c_parent.gc_name": gc_name}).exec();
  // },

}

module.exports = mongoose.model("brand", brandSchema);
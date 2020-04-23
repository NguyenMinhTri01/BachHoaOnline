import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let categorySchema = new Schema ({
  c_name : {type: String},
  c_slug : {type: String},
  c_parent : {
    id : {type: String},
    gc_name: {type: String}
  },
  c_status : {type: Boolean, default: true},
  c_createdAt: {type: Number, default: Date.now},
  c_updatedAt: {type: Number, default: null},
});

categorySchema.statics = {
  createNew(item){
    return this.create(item);
  },

  findCategoryById(id){
    return this.findById(id).exec();
  },

  findBySlug(c_slug){
    return this.findOne({ "c_slug": c_slug}).exec();
  },

  findAll(){
    return this.find().exec();
  },

  deleteCategory(id){
    return this.deleteOne({_id:id}).exec();
  },

  deleteCategoryOfGroup(groupId){
    return this.deleteMany({"c_parent.id" : groupId});
  },

  updateCategoryById(id, item){
    return this.findByIdAndUpdate(id, item).exec();
  },

  findCategoriesOfGroup(groupId){
    return this.find({"c_parent.id" : groupId}).exec();
  },

  updateActive(id){
    return this.findById(id)
    .then(category => {
      category.c_status = category.c_status ? false : true;
      return category.save();
    })    
  },

  updateCategoriesOfGroup(groupId, gc_name){
    return this.updateMany({"c_parent.id": groupId}, {"c_parent.gc_name": gc_name}).exec();
  },

}

module.exports = mongoose.model("category", categorySchema);
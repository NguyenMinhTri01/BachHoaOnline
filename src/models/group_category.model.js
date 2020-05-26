import {mongoose, shortId} from '../config/configDB'

let Schema = mongoose.Schema;

let group_categorySchema = new Schema ({
  _id: {type: String, default : shortId.generate},
  gc_name : {type: String},
  gc_slug : {type: String},
  gc_child : {type:[
    {
      id : {type: String},
      c_name : {type: String}
    }
  ], default: []},
  gc_status : {type: Boolean, default: true},
  gc_createdAt: {type: Number, default: Date.now},
  gc_updatedAt: {type: Number, default: null},
});

group_categorySchema.statics = {
  createNew(item){
    return this.create(item);
  },

  findGroupById (id) {
    return this.findById(id).exec()
  },

  findBySlug(gc_slug){
    return this.findOne({ "gc_slug": gc_slug}).exec();
  },

  findAll(){
    return this.find().exec();
  },

  addCategoryIntoGroup(id, category){
   return this.findById(id) 
    .then(group => {
      group.gc_child.push(category);
      return group.save();
    });
  },

  deleteCategoryInGroup (id, childrenId){
    return this.findById(id)
      .then(group => {
        if (group) {
          let index = group.gc_child.findIndex(element => element.id === childrenId);
          group.gc_child.splice(index, 1);
          return group.save();
        }      
      });
  },

  deleteGroupById(id){
    return this.deleteOne({_id: id});
  },

  updateActive(id){
   return this.findById(id)
      .then(group => {
        group.gc_status = group.gc_status ? false : true;
        return group.save();
      })
  },

  updateGroupById(id, item){
    return this.updateOne({_id : id}, item).exec();
  }
} 

module.exports = mongoose.model("group_category", group_categorySchema);

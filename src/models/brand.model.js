import {mongoose, shortId} from '../config/configDB'

let Schema = mongoose.Schema;

let brandSchema = new Schema ({
  _id: {type: String, default : shortId.generate},
  br_name : {type: String},
  br_slug : {type: String},
  br_status : {type: Boolean, default: true},
  c_id: {type: String},
  br_image : {type: String, default: process.env.DEFAULT_BRAND_IMAGE},
  br_createdAt: {type: Number, default: Date.now},
  br_updatedAt: {type: Number, default: null},
});

brandSchema.statics = {
  createNew(item){
    return this.create(item);
  },

  findBrandById(id){
    return this.findById(id);
  },

  findBrandBySlug(br_slug){
    return this.findOne({ "br_slug": br_slug});
  },

  findAll(){
    return this.find().sort({br_slug: 1});
  },

  deleteBrand(id){
    return this.deleteOne({_id:id});
  },
  updateBrandById(id, item){
    return this.findByIdAndUpdate(id, item);
  },

  updateActive(id){
    return this.findById(id)
    .then(brand => {
      brand.br_status = brand.br_status ? false : true;
      return brand.save();
    })    
  },

  findBrandsByCategory(c_id){
    return this.find({ 
      c_id : c_id
    })
  }

}

module.exports = mongoose.model("brand", brandSchema);
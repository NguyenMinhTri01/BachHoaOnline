import {mongoose} from '../config/configDB'
let Schema = mongoose.Schema;


let albumProductSchema = new Schema ({
  _id : {type: String, required: true},
  pr_id : {type: String, required: true},
  filesName : {type: String, required: true},
  public_id : {type: String}
});

albumProductSchema.statics = {
  createNew(item){
    return this.create(item);
  },
  findImagesById(id){
    return this.findById(id);
  },
  findImagesByPrId(pr_id){
    return this.findOne({pr_id});
  },
  updateListImagesById(_id, item){
    return this.updateOne(_id, item);
  },
  updateListImagesByPr_Id(pr_id, item){
    return this.updateOne(pr_id, item);
  }
}


module.exports = mongoose.model("albumProduct" , albumProductSchema);
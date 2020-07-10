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
    return this.find({pr_id});
  },
  updateListImagesById(_id, item){
    return this.updateOne(_id, item);
  },
  updateListImagesByPr_Id(pr_id, item){
    return this.updateOne(pr_id, item);
  },

  deleteImageById(_id){
      let _image;
      return this.findById(_id)
        .then(image =>{
          _image = image;
          return this.deleteOne({_id : _id})
        })
        .then(res => {
          if(res.n > 0){
            return _image
          }
        })
  },

}


module.exports = mongoose.model("albumProduct" , albumProductSchema);
import {mongoose} from '../config/configDB'
import bcrypt from 'bcrypt'

let Schema = mongoose.Schema;

let adminSchema = new Schema ({
  ad_name: {type: String},
  ad_userName: {type: String},
  ad_password: {type: String},
  ad_email: {type: String},
  ad_token : {type: String},
  ad_phoneNumber: {type: String},
  ad_avatar: {type: String, default: "https://res.cloudinary.com/nguyenminhtri/image/upload/v1589712366/BachHoaOnline/image_default/avatar-default_hdtvrv.jpg"},
  ad_createdAt: {type: String, default: Date.now},
  ad_updatedAt: {type: String, default: null},
});

adminSchema.statics = {
  createNew(item) {
    return this.create(item);
  },

  findByUserName(ad_userName) {
    let admin = this.findOne({"ad_userName": ad_userName});
    return admin;
  },

  findAdminById(_id) {
    return this.findById(_id);
  },
  updateTokenAdmin(_id, token){
    return this.findOneAndUpdate(
      {'_id' : _id}, 
      {'ad_token' : token},
      {new : true}
      );
  },
  updateInfo(id, item){
    return this.findOneAndUpdate(id, item);
  }
};

adminSchema.methods = {
  comparePassword(ad_password) {
    return new Promise((resolve, reject) => {
      let result = bcrypt.compareSync(ad_password, this.ad_password);
      resolve(result);
    })
  },
};
module.exports = mongoose.model("admin", adminSchema);

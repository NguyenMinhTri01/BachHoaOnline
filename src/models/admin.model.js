import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let adminSchema = new Schema ({
  ad_name: {type: String},
  ad_userName: {type: String},
  ad_password: {type: String},
  ad_email: {type: String},
  ad_phoneNumber: {type: String},
  ad_avatar: {type: String, default: "avatar-default.jpg"},
  ad_createdAt: {type: String, default: Date.now},
  ad_updatedAt: {type: String, default: null},
});

adminSchema.statics = {
  createNew(item) {
    return this.create(item);
  },

  findByUserName(ad_userName) {
    let admin = this.findOne({"ad_userName": ad_userName}).exec();
    return admin;
  }
};

adminSchema.methods = {
  comparePassword(ad_password) {
    return new Promise((resolve, reject) => {
      if (ad_password === this.ad_password){
        
        return resolve(true);
      }
      return resolve(false);
    })
  },
};
module.exports = mongoose.model("admin", adminSchema);

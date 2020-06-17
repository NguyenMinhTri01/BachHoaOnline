import {mongoose, shortId} from '../config/configDB'
import bcrypt from 'bcrypt'

let Schema = mongoose.Schema;

let userSchema = new Schema({
  _id: {type: String, default : shortId.generate},
  u_name: {type: String, default: null},
  u_email: {type: String, trim: true, default : null},
  u_gender: {type: String, default: null},
  u_address: {
    provincesOrCities: {type: String, default: null},
    District : {type: String, default: null},
    detail : {type: String, default: null}
  },
  u_phoneNumber: {type: String, default: null},
  u_localPassword: {type: String, trim: true, default: null},
  u_facebookID : {type: String, trim: true, default: null},
  u_googleID : {type: String, trim: true, default : null},
  u_createdAt : {type: Number, default: Date.now},
  u_updatedAt : {type: Number}
});

userSchema.statics = {
  createNew(item){
    return this.create(item);
  },

  findAll(){
    return this.find().exec();
  },

  findUserById(id){
    return this.findById(id).exec();
  },

  findUserByFacebookID(id){
    return this.findOne({u_facebookID : id}).exec();
  },
  findUserByGoogleID(id){
    return this.findOne({u_googleID : id}).exec();
  },
  findAndUpdateNewInfoFacebook (newInfo){
    return this.findOneAndUpdate(
      {'u_email' : newInfo.email}, 
      {'u_name' : newInfo.name,'u_facebookID' : newInfo.id},
      {new : true}
      ).exec();
  },
  findAndUpdateNewInfoGoogle (newInfo) {
    return this.findOneAndUpdate(
      {'u_email' : newInfo.email}, 
      {'u_name' : `${newInfo.family_name} ${newInfo.given_name}`,'u_googleID' : newInfo.sub},
      {new : true}
      ).exec();
  },

  findUserByEmail(email){
    return this.findOne({u_email : email}).exec();
  },
};

userSchema.methods = {
  comparePassword(u_localPassword){
    return new Promise((resolve, reject)=>{
      let result = bcrypt.compareSync(u_localPassword, this.u_localPassword);
      resolve(result);
    })
  },
}



module.exports = mongoose.model("user", userSchema);
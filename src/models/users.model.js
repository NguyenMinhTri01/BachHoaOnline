import {mongoose, shortId} from '../config/configDB'
import bcrypt from 'bcrypt'

let Schema = mongoose.Schema;

let userSchema = new Schema({
  _id: {type: String, default : shortId.generate},
  u_name: {type: String, default: null},//tên 
  u_email: {type: String, trim: true, default : null},//email và là tên đăng nhập
  u_gender: {type: String, default: null},// giới tính
  u_address: { // phần này là địa chỉ
    provincesOrCities: {type: String, default: null},// tỉnh /tp
    district : {type: String, default: null},//quan /huyện
    wards : {type: String, default: null},//tên phường /xa
    detail : {type: String, default: null}//tên đường này kia mấy cái còn lại
  },
  u_phoneNumber: {type: String, default: null},//sdt
  u_localPassword: {type: String, trim: true, default: null},//mk thì khi nào đổi thì cho nhập củ và mới
  u_facebookID : {type: String, trim: true, default: null},//ko show
  u_googleID : {type: String, trim: true, default : null},//ko show
  u_createdAt : {type: Number, default: Date.now},//ko show
  u_updatedAt : {type: Number}//ko show
});
// đặt tên may cái input form như cái này nha
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
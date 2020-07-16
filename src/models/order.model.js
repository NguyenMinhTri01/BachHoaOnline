import { mongoose, shortId } from '../config/configDB'



let Schema = mongoose.Schema;

let orderSchema = new Schema({
  _id: { type: String, default: shortId.generate },
  or_status: { type: Number, default: 1 },
  or_infoDailies: {
    _id: { type: String, default: '0' },
    u_name: String,
    u_phoneNumber: String,
    u_gender: String,
    u_address: {
      provincesOrCities: String,
      district: String,
      wards: String,
      detail: String,
    },
  },
  or_products: [{
    _id: String,
    pr_name: String,
    pr_price: Number,
    pr_priceString: String,
    pr_priceNew: Number,
    pr_priceNewString: String,
    pr_avatar: String,
    pr_quantity: Number,
    pr_total: Number,
    pr_discount: Number,
    pr_totalString : String,
  }],
  or_note : String,
  or_sumPriceProduct : Number,
  or_sumPriceProductString: String,
  or_sumProduct : Number,
  or_totalPay : Number,
  or_totalPayString : String,
  or_deliveryDate : Number,
  or_deliveryTime : Number,
  or_createdAt : {type: Number, default: Date.now},
  or_updatedAt : {type: Number}
})
orderSchema.statics = {
  createNew(item){
    return this.create(item);
  },

  findAll(){
    return this.find().exec();
  },

  findOrderById(id){
    return this.findById(id).exec();
  },

  findOrderByUserId(userId){
    return this.find({'or_infoDailies._id' : userId})
  },

  updateStatusByUserId(_id, or_status){
    return this.findById(_id)
    .then(order => {
      order.or_status = or_status
      return order.save()
    })
  }
}

module.exports = mongoose.model("order", orderSchema);
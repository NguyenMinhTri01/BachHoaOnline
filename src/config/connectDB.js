import mongoose from 'mongoose';
import bluebird from 'bluebird';

/**
 * 
 * connect mongoDB
 */

 let connectDB = () => {
  mongoose.Promise = bluebird;
  //mongodb://localhost:27017/BachHoaOnline
  let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: true});
  const db = mongoose.connection;
  return db;
 }

 module.exports = connectDB;
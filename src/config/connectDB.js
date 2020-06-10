import {mongoose, bluebird} from './configDB';

/**
 * 
 * connect mongoDB
 */

 let connectDB = () => {
  mongoose.Promise = bluebird;
  //mongodb://localhost:27017/BachHoaOnline
  //let URI = `mongodb://triminh0701:07011999@cluster0-shard-00-00-xdfpl.mongodb.net:27017,cluster0-shard-00-01-xdfpl.mongodb.net:27017,cluster0-shard-00-02-xdfpl.mongodb.net:27017/BachHoaOnline?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

  //let URI = `${process.env.DB_CONNECTION_SRV}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CONNECTION_CLOUD}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false});
  const db = mongoose.connection;
  return db;
 }

 module.exports = connectDB;
import dotenv from 'dotenv' ;
import cloudinary from 'cloudinary';
dotenv.config();
let cloudinary_v2 = cloudinary.v2;



cloudinary_v2.config({ 
  cloud_name: `${process.env.CLOUD_NAME}`, 
  api_key: `${process.env.API_KEY}`, 
  api_secret : `${process.env.API_SECRET}`
});

module.exports = cloudinary_v2;


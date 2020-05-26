import multer from "multer";


const storage = multer.diskStorage({
  destination : (req, file, callback) => {
    //callback(null, "../public/admin_template/images/brand");
    callback(null, 'src/public/uploads');
  },
  filename : (req, file, callback) => {
    const imageBrandName = `${Date.now()}_${file.originalname}`;
    callback(null, imageBrandName);
  }
});


module.exports = storage
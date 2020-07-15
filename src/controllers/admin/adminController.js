import { admin_S } from '../../services/index';
import configStorage from '../../config/uploadFIleLocal';
import multer from 'multer';

const storage = configStorage("/avatar_admin");
let uploadImageLocal = multer({
  storage: storage
}).single('ad_avatar');

let getInfoAdmin = async (req, res) => {
  res.render("admin/form_InfoAndEditAdmin", {
    base_Url: process.env.BASE_URL,
    adminInfo: req.adminInfo,
    title: "Bach Hóa Online Admin | Thông tin Admin"
  });
};

let updateInfoAdmin = async (req, res) => {
  // upload image location

  uploadImageLocal(req, res, async (err) => {
    let infoAdmin = JSON.parse(JSON.stringify(req.body));
    let adminId = req.adminInfo._id;
    if (err) {
      console.log(err);
      res.send({
        type: true
      })
    }
    else {
      let path = null;
      if (typeof req.file != 'undefined') {
        path = req.file.path;
      }
      let notification = await admin_S.updateInfoAdmin(infoAdmin, adminId, path);
      res.send(notification);
    }
  });
}

module.exports = {
  getInfoAdmin,
  updateInfoAdmin,
}
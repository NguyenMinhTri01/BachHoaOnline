import express from 'express';
import fs from 'fs-extra';
let router = express.Router();

let initRouteTest = (app) => {
  router.get('/test', (req, res) => {
    // console.log(__dirname);
    // let directoryPath = directoryPath = path.join(__dirname, 'Documents');
    let directoryPath = "./src/public/uploads/product/productListImage/5ee1f2fcfa879c25c4af42af";
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
    })
    res.send({
      message: directoryPath
    })
  });
  return app.use("/", router);
}

module.exports = initRouteTest;
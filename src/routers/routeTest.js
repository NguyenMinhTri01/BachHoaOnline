import express from 'express';
import fs from 'fs-extra';
import {removeImageFromCDN} from './../helper/adminHelper'
let router = express.Router();

let initRouteTest = (app) => {
  router.get('/test', async (req, res) => {
    await removeImageFromCDN('BachHoaOnline/product/undefined/1594214922452-236');
    res.send("ok")
  });
  return app.use("/", router);
}

module.exports = initRouteTest;
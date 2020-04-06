import express from 'express';

let router = express.Router();

let initRouteAdmin = (app) => {
  router.get('/admin', (req, res) => {
    res.send("hello world");
  });

  return app.use("/", router);
}

module.exports = initRouteAdmin;
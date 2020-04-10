import express from 'express';
import expressEjsExtend from 'express-extend';
import path from "path";


/**
 * config view engine 
 */


 let configViewEngine = (app) => {
  app.use(express.static(path.join(__dirname, '../public')));

  
  //app.engine('ejs', expressEjsExtend);
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));
 }

 module.exports = configViewEngine;
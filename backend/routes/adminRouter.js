const express = require('express');
const { adminController } = require('../controllers/admiRouter');

const adminRouter = express.Router();

adminRouter.get('/',adminController );


module.exports = adminRouter;
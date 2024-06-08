const express = require('express');
const { adminBookingsController } = require('../controllers/adminBookingsRouter');

const adminBookingsRouter = express.Router();

adminBookingsRouter.get('/',adminBookingsController );


module.exports = adminBookingsRouter;
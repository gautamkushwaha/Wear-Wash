const express = require('express');
const validateToken = require('../middleware/validateTokenHandler.js');
const { GetTimeSlotsController } = require('../controllers/GetTimeSlotsController.js');





   
const GetTimeSlotsRouter = express.Router(); 

// GetTimeSlotsRouter.use(validateToken);
// router.use(validateToken);

GetTimeSlotsRouter.post("/",GetTimeSlotsController);


module.exports = GetTimeSlotsRouter;
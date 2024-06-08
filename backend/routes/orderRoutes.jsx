const express = require('express');
const { orderController,orderValidationController } = require('../controllers/orderController');
const validateToken = require('../middleware/validateTokenHandler.js');



   
const router = express.Router();

// router.use(validateToken);

router.post("/",orderController);
router.post("/validate", orderValidationController);

module.exports = router;

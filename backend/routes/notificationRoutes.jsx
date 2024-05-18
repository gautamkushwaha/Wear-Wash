const express = require('express');
const { sendNotification } = require('../controllers/notificationController.jsx');
const router = express.Router();

router.post('/send', sendNotification);

module.exports = router;

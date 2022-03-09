const { Router } = require('express');
const sendEmail = require("../controllers/email.controller");

const router = Router();

router.post('/', sendEmail);

module.exports = router;
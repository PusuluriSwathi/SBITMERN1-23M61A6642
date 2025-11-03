const express = require('express'); 
const router = express.Router();
const { register, login, testToken } = require('../controllers/authController');

router.post("/register", register);
router.post("/login", login);
router.get("/test", testToken);



module.exports = router;
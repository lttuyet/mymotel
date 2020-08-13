var express = require('express');
var router = express.Router();
const motelController = require("../controllers/motel.js");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', motelController.register);
router.post('/login', motelController.login);

module.exports = router;
var express = require('express');
var router = express.Router();
const memberController = require("../controllers/member.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add-member', memberController.add);

module.exports = router;

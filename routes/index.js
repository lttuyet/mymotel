var express = require('express');
var router = express.Router();
const memberController = require("../controllers/member.js");
const motelController = require("../controllers/motel.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add-member', memberController.add);
router.post('/edit-member', memberController.edit);
router.post('/delete-member', memberController.delete);
router.get('/list-member', memberController.list);

router.post('/edit-motel', motelController.edit);
router.post('/change-password', motelController.changePassword);

module.exports = router;

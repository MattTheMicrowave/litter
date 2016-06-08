var express = require('express');
var router = express.Router();
var TweetController = require('../controllers/TweetController.js');

/*
* GET
*/
router.get('/', function (req, res) {
  TweetController.list(req, res);
});

/*
* GET
*/
router.get('/:id', function (req, res) {
  TweetController.show(req, res);
});

/*
* POST
*/
router.post('/', function (req, res) {
  TweetController.create(req, res);
});

/*
* PUT
*/
router.put('/:id', function (req, res) {
  TweetController.update(req, res);
});

/*
* DELETE
*/
router.delete('/:id', function (req, res) {
  TweetController.remove(req, res);
});

module.exports = router;

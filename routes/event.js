var express = require('express');
var moment = require('moment');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'g9nik0gsfr2xcvl0',
  password : 'fw5levjz4ldksb6c',
  database : 'zp4vot7umqtxfib1'
});

connection.connect();

router.get('/', function(req, res, next) {
  connection.query('SELECT * from events ORDER BY DATE DESC', function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    // 쿼리 결과를 EJS로 넘겨준다.
    res.render('event', { title: 'HY-CoRA', userData: results, moment: moment })
  });
});

router.post('/addComment',function (req,res,next){
  var content = req.body.insertform;
  connection.query('insert into events(CONTENT) VALUE(?)',[content],function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    res.redirect('/event');
  })
})

module.exports = router;

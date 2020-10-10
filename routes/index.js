var express = require('express');
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
  connection.query('SELECT * from comment ORDER BY DATE DESC', function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    // 쿼리 결과를 EJS로 넘겨준다.
    res.render('index', { title: 'HY-CoRA', userData: results })
  });
});

router.post('/addComment',function (req,res,next){
  var content = req.body.insertform;
  connection.query('insert into comment(CONTENT) VALUE(?)',[content],function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    res.redirect('/');
  })
})

module.exports = router;

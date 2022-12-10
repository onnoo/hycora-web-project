const { response } = require("express");
var express = require("express");
const fetch = require("node-fetch");
var router = express.Router();

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "g9nik0gsfr2xcvl0",
  password: "fw5levjz4ldksb6c",
  database: "zp4vot7umqtxfib1",
});

connection.connect();

router.get("/", function (req, res, next) {
  // fetch("http://hycora-temp.herokuapp.com/ranking")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     res.render("event", { title: "HY-CoRA 기말고사 야식 이벤트", rank: data['rank'] });
  //   });
  res.render("event", { title: "HY-CoRA 기말고사 야식 이벤트", rank: [] });
});

router.post("/addComment", function (req, res, next) {
  var content = req.body.insertform;
  connection.query(
    "insert into events(CONTENT) VALUE(?)",
    [content],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      res.redirect("/event");
    }
  );
});

module.exports = router;

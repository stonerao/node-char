var express = require('express');

const superagent = require('superagent');
//nodejs里一个非常方便的客户端请求代理模块
const cheerio = require('cheerio');
var router = express.Router();
require('chromedriver')
var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();


const fs = require('fs');
const url = require('url');
// const request = require('request');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });

});


var Canvas = require('canvas');
var node_echarts = require('node-echarts');

router.get('/canvas', function (req, res, next) {
  /* node_echarts({
    width: 500, // Image width, type is number.
    height: 500, // Image height, type is number.
    option: {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [{
        animation: false,
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        animationDelay: function (idx) {
          return 0;
        }
      }]
    }, // Echarts configuration, type is Object.
    //If the path  is not set, return the Buffer of image.
    path:__dirname + '/demo.png', // Path is filepath of the image which will be created.
  }) */
  var Image = Canvas.Image,
    canvas = new Canvas(200, 200),
    ctx = canvas.getContext('2d');

  ctx.font = '30px Impact';
  ctx.rotate(.1);
  ctx.fillText("Awesome!", 50, 100);

  var te = ctx.measureText('Awesome!');
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.lineTo(50, 102);
  ctx.lineTo(50 + te.width, 102);
  ctx.stroke();
  res.send('<img src="' + canvas.toDataURL() + '" />')

});

router.get('/chart', function (req, res, next) {
  driver.get("http://localhost:3000/")
  driver.sleep(1 * 1000).then(function (rr) {
    // res.send(JSON.stringify(driver.findElement(By.id('cc'))).toString())
    // res.send(driver.findElement(By.id('cc')))
    // var body = driver.findElement()
    /*   By.id("canvas").getAttribute("style").then(b => {


      }) */
    /*  driver.findElement(By.id('cc')).getPageSource().then(b => {
      
     }); */
    driver.getPageSource().then(function (souce) {
      let $ = cheerio.load(souce);
      // console.log($("cc"))
      res.send($("#cc").html())
    })


    // driver.quit(); //关闭浏览器
  })



});
module.exports = router;
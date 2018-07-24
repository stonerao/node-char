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

router.get('/canvas', function (req, res, next) {
 

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
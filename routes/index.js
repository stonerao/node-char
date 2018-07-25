var express = require('express');

const superagent = require('superagent');
//nodejs里一个非常方便的客户端请求代理模块
const cheerio = require('cheerio');
var webPage = require('webpage');
//  
var router = express.Router();


/* 

require('chromedriver')
var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build(); */


const fs = require('fs');
const url = require('url');
// const request = require('request');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });

});


var d3 = require('d3');
var jsdom = require('jsdom');
const {
  JSDOM
} = jsdom;
var phantom = require('phantom');
var num = 1;
//生成PDF报表
router.get('/canvas', function (req, res, next) {
  phantom.create().then(function (ph) {
    ph.createPage().then(function (page) {
      page.open("http://localhost:3000/chart").then(function (status) {
        page.property('viewportSize', {
          width: 595,
          height: 500
        });
        page.property('paperSize', {
          format: 'A4',
        });
        var url = __dirname + '/' + (+new Date) + 'pdf.pdf'
        page.render(url).then(function () {
          num++;
          console.log('Page rendered');
          ph.exit();
          res.send(` 
            <script>
             
            </script>
          `)
        });
      });
    });
  });






});
//抓取该页面
router.get('/chart', function (req, res, next) {
  const dom = new JSDOM(`<!DOCTYPE html>
  <body>
  <h1>我是PDF1</h1>
  <svg id="svg"></svg>
  <br> 
  <h1>我是PDF2</h1>
  <svg class="svg1"></svg>
  
  <br>
  <h1>我是PDF3</h1>
  <svg class="svg2"></svg>
  
  <br>
  <h1>我是PDF4</h1>
  <svg class="svg3"></svg>
  
  <br>
  <h1>我是PDF4</h1>
  <svg class="svg4"></svg>
  <h1 style="position:absolute;bottom:0">我是中文，我不会乱码</h1>
  </body>


`);
  // console.log(dom.window.document.querySelector("p").textContent);
  var rectHeight = 25;
  var svg = d3.select(dom.window.document.querySelector("#svg")).attr('width', 595)
    .attr('height', 600);
  var svg1 = d3.select(dom.window.document.querySelector(".svg1")).attr('width', 595).attr('height', 600);
  var svg2 = d3.select(dom.window.document.querySelector(".svg2")).attr('width', 595).attr('height', 600);
  var svg3 = d3.select(dom.window.document.querySelector(".svg3")).attr('width', 595).attr('height', 600);
  var svg4 = d3.select(dom.window.document.querySelector(".svg4")).attr('width', 595).attr('height', 600);
  var dataset = [250, 210, 170, 130, 90];
  var dataset1 = [1, 500, 170, 230, 90, 333, 521];
  svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", 20)
    .attr("y", function (d, i) {
      return i * rectHeight;
    })
    .attr("width", function (d) {
      return d;
    })
    .attr("height", rectHeight - 2)
    .attr("fill", "steelblue");
    function svgs(SVG){
      SVG.selectAll("rect")
      .data(dataset1)
      .enter()
      .append("rect")
      .attr("x", 20)
      .attr("y", function (d, i) {
        return i * rectHeight;
      })
      .attr("width", function (d) {
        return d;
      })
      .attr("height", rectHeight - 2)
      .attr("fill", "steelblue");
    } 
    svgs(svg1)
    svgs(svg2)
    svgs(svg3)
    svgs(svg4)
  res.send(dom.window.document.body.innerHTML)
  /* driver.get("http://localhost:3000/")
  driver.sleep(1 * 1000).then(function (rr) {
     
    driver.getPageSource().then(function (souce) {
      let $ = cheerio.load(souce); 
      res.send($("#cc").html())
    })


    // driver.quit(); //关闭浏览器
  })
 */


});
module.exports = router;
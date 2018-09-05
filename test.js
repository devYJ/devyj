const request = require('request');
const cheerio = require('cheerio');
const express = require('express');

var app = express();
//const nodemailer = require('nodemailer');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

let timer = setInterval(
  function(){ request('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD', function(error, response, body) {
    if(error) {
      throw error;
    };

    let price = JSON.parse(body).RAW.BTC.USD.PRICE;
    //$ = cheerio.load(body); // request모듈을 이용해서 가져온정보를 넣어줌
    console.log(price);
    if(parseInt(price) >= 7300){
      //clearTimeout(timer);
      app.get('/', function (req, res) {
        res.send('Recent Price: ' + price);
      });
      console.log('over 7300.');
    }
    else if(parseInt(price) <= 7130){
      //clearTimeout(timer);
      console.log('less 7130.');
    }
  })
}, 10000);

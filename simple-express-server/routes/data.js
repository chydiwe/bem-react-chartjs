var express = require('express');
var router = express.Router();
const data = require('../data');

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


router.get('/day/:year/:month/:day', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let dataFromDay = {};
  dataFromDay[Object.keys(data[req.params.year][req.params.month])[0]] = Object.values(data[req.params.year][req.params.month])[0].slice(req.params.day * 24, req.params.day * 24 + 25)
  res.send(JSON.stringify(dataFromDay));
});

router.get('/month/:year/:month', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let dataMonth = Object.values(data[req.params.year][req.params.month])[0],
    nameMonth = Object.keys(data[req.params.year][req.params.month])[0], tempSum = 0,
    resObj = {};
  dataMonth = dataMonth.reduce((acc, item, index) => {
    if (index % 24 === 0 && index !== 0) {
      acc.push(tempSum / 24);
      tempSum = 0;
    }
    tempSum += item;
    return acc
  }, []);
  resObj[nameMonth] = dataMonth;
  res.send(JSON.stringify(resObj));
});

router.get('/days/:year/:month', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let countDaysOnMonth = Math.round(Object.values(data[req.params.year][req.params.month])[0].length / 24);
  res.send(JSON.stringify(countDaysOnMonth));
});

router.get('/year/:year', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let dataFromYear = data[req.params.year].reduce((acc, item) => {
    acc.push(Object.values(item)[0].reduce((acc, item) =>
      acc += item) / (Object.values(item)[0].length * 24))
    return acc
  }, []);
  dataFromYear = JSON.stringify({year: dataFromYear});
  res.send(dataFromYear)
});
module.exports = router;

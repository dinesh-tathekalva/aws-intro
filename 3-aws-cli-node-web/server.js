const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '*****************';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {domains: null, error: null});
})

app.post('/', function (req, res) {
  let domain = req.body.domain;
  let url = `https://api.domainsdb.info/v1/domains/search?domain=${domain}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {domains: null, error: 'Error, please try again'});
    } else {
      let resp = JSON.parse(body)
      if(resp.domains == undefined){
        res.render('index', {domains: null, error: 'Error, please try again'});
      } else {
        //et weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        const domains = resp.domains.map(d => ({domain: d.domain, createdOn: d.create_date, country: d.country, isActive: !d.isDead}));
        res.render('index', {domains: domains, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Domain app listening on port 3000!')
})

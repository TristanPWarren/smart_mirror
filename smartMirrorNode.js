const express = require('express');
const uglifyEs = require('uglify-es');
const minify = require('express-minify');
const fs = require('fs');

let weather = require('./node/weather.js');
let news = require('./node/news.js');

const app = express();
app.use(minify({
    uglifyJsModule: uglifyEs,
    errorHandler: (errorInfo, callback) => { console.error(errorInfo) }
}));

//Mirror non-authorised section
app.use('/html', express.static('html'))
app.use('/assets', express.static('assets'))
app.use('/js', express.static('js'))
app.use('/style', express.static('style'))

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

app.get('/weather.js', (req, res) => {
    weather.getWeather(req, res);
});

app.get('/news.js', (req, res) => {
    news.getNews(req,res);
})

app.get('/options', (req, res) => {
    let rawOptions = fs.readFileSync('options.json');
    let options = JSON.parse(rawOptions).client;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(options));
})

app.get('*', (req, res) => {
    res.sendFile('not_found.html', {root: __dirname});
});

app.listen(8080, () => {console.log("Listening on port 8080")});




const fs = require('fs');
const https = require('https');

let rawCredentials = fs.readFileSync('credentials.json');
const newsAPIkey = JSON.parse(rawCredentials).newsAPIkey;

exports.getNews = function (req, res) {
    const options = {
        hostname: "newsapi.org",
        path: encodeURI(`/v2/top-headlines?sources=bbc-news&apiKey=${newsAPIkey}`),
        method: "GET"
    };

    const reqS = https.request(options, (resS) => {
        let data = "";
        resS.on('data', (d) => {
            data += d;
        });

        resS.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
        });

    });

    reqS.on('error', (err) => {
        console.error(err);
    });

    reqS.end();
};
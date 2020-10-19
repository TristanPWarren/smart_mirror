const fs = require('fs');
const https = require('https');

let rawOptions = fs.readFileSync('options.json');
const cityID = JSON.parse(rawOptions).server.cityID;

let rawCredentials = fs.readFileSync('credentials.json');
const weatherAPIkey = JSON.parse(rawCredentials).weatherAPIkey;

exports.getWeather = function(req, res) {
    const options = {
        hostname: "api.openweathermap.org",
        port: 443,
        path: encodeURI(`/data/2.5/weather?id=${cityID}&appid=${weatherAPIkey}`),
        method: "POST"
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

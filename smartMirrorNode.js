const express = require('express');

const app = express();

//Mirror non-authorised section
app.use('/html', express.static('html'))
app.use('/assets', express.static('assets'))
app.use('/js', express.static('js'))
app.use('/style', express.static('style'))

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
})

app.get('*', (req, res) => {
    res.sendFile('not_found.html', {root: __dirname});
})

app.listen(8080, () => {console.log("Listening on port 8080")});



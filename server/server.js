
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');


const PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} : ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Failed to appendFile::', err);
    });
    next();

});


app.get('/', (req, res) => {
    res.render('index.html');
})

app.listen(PORT, () => console.log(`server is up on port: ${PORT}`));
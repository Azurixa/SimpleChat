//Use Express
const express = require('express');
const bodyParser = require('body-parser');

const api = express();

const messages = [];
api.use(express.static(__dirname + '/public'));
api.use(bodyParser.json());

api.listen(3000, () => {
    console.log('SimpleChat up and running!\nListening port: 3000');
});

api.get('/getchat', (req, res) => {
    res.send(messages);
});

api.post('/send', (req, res) => {
    messages.push(req.body);
});

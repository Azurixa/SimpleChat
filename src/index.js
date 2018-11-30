//SimpleChat 1.0.0 by Mateusz Ożóg

//Useing Express
const express = require('express');
//Using bodyParser
const bodyParser = require('body-parser');

const api = express();

//Array to store messages
const messages = [];
//Default / mapped to /public/
api.use(express.static(__dirname + '/public'));
//Using JSON
api.use(bodyParser.json());

//Server on :3000
api.listen(3000, function(){
    //Clean all console lines
    var lines = process.stdout.getWindowSize()[1];
    for(var i = 0; i < lines; i++) {
        console.log('\r\n');
    }
    //Init message
    console.log('SimpleChat v0.2 ヽ( ・∀・)ノ\nby Mateusz Ożóg\n\nServer is now up and running!\nListening on port 3000!');
});

//GET for getting messages array
api.get('/getchat', function(req, res){
    res.contentType('application/json');
    res.send(JSON.stringify(messages));
});

//Post for adding new message to array
api.post('/send', function(req, res){
    messages.push(req.body);
});

var chatArray = new Array();
var nickname = '';
var chat = '';

function getChat(){

    var req = new XMLHttpRequest();
    req.open('GET', '/getchat');
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if(req.responseText != null){
            window.chatArray = req;
            drawChat();
        }
    });
    req.send();
}

function sendChat(){

    if(window.nickname != ''){

        //Get message input value
        var val = $('#message').val();

        //Create a new xml request
        var req = new XMLHttpRequest();

        //Posting to /send witch JSON array of nickname and message
        req.open('POST', '/send');
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify({ "nickname": nickname, "message": val }));

        //success -> write in console 'send!'
        req.addEventListener('load', () => {
            console.log('Send!');
        });

        //error -> write in console 'Error!'
        req.addEventListener('error', () => {
            console.log('Oh no! Error!');
            console.log(e);
        });
    }
}

function drawChat(){

    var temp_chat = '';
    var messages = JSON.parse(window.chatArray.response);

    for(var i = messages.length - 1; i >= 0; i--){
        var message = messages[i];
        temp_chat += '<p><span class="nickname">'+message.nickname+'</span> - <span class="message">'+message.message+'</span></p>';
    }

    if(temp_chat != window.chat){
        window.chat = temp_chat;
        $('#chat-box').html(window.chat);
        console.log('Chat refreshed!');
    }
}

function setNickname(){

    var val = $('#nickname').val();
    $('#setNickname').addClass('d-none');
    $('#nickname').addClass('d-none');
    $('#nickname-p').html('chatting as <span class="nick">'+val+'</span>');
    $('#nickname-p').fadeIn();
    $('.logged-only').fadeIn();
    window.nickname = val;
}

getChat();
setInterval('getChat()', 1000);

var chat = [];
var nickname = "Anonymus";

function getChat(){

    var req = new XMLHttpRequest();
    req.open('GET', '/getchat');
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        window.chat = req.responseText;
    });
    req.send();

    drawChat();

}

function sendChat(){

    var val = $('#input').val();
    console.log(val);

    var req = new XMLHttpRequest();

    req.open('POST', '/send');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify({ nickname: nickname, message: val }));

    req.addEventListener('load', () => {
        console.log('Send!');
    });

    req.addEventListener('error', () => {
        console.log('Oh no! Error!');
        console.log(e);
    });
}

function drawChat(){
    $('#chat').html(window.chat);
}

getChat();
setInterval('getChat()', 100);

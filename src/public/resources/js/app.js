var chat = [];

function getChat(){

    var req = new XMLHttpRequest();
    req.open('GET', '/getchat');
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        window.chat = req.responseText;
    });
    req.send();

    $('#chat').html(window.chat);

}

function sendChat(){

    var val = $('#input').val();
    console.log(val);

    var req = new XMLHttpRequest();

    req.open('POST', '/send');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify({ item: val }));

    req.addEventListener('load', () => {
        console.log('Send!');
    });

    req.addEventListener('error', () => {
        console.log('Oh no! Error!');
        console.log(e);
    });
}

getChat();
setInterval('getChat()', 500);

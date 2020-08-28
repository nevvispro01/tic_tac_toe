function EmptyPage(){
    document.getElementById('game').innerHTML = '';
    document.getElementById('game').innerHTML += 
    '<div id="loading"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>&nbsp; Идет поиск соперника. Пожалуйста подождите...</div>';
}

function Button(player){
    document.getElementById('game').innerHTML = '';
    document.getElementById('game').innerHTML += '<h1 id="button">Игрок: ' + player + '</h1>';
    document.getElementById('game').innerHTML += '<div id="play">';
    document.getElementById('game').innerHTML += '<form action="/play" method="post">';
    document.getElementById('game').innerHTML += '<button onclick="playerPlay()" type="button" class="btn btn-primary">Играть</button>';
    document.getElementById('game').innerHTML += '</form>';
    document.getElementById('game').innerHTML += '</div>';
}

function parseBoxId(idName) {
    return parseInt(idName.replace("block_", ""));
}

function GameMap(myname, opponent, bool) {
        document.getElementById('game').innerHTML = '';
        document.getElementById('myName').innerHTML = '';
        document.getElementById('opponentName').innerHTML = '';
        if (bool === true){
            document.getElementById('myName').innerHTML += "<div id='gameProcess'><font color='blue'>" + myname + "</font></div>";;
            document.getElementById('opponentName').innerHTML += "<div id='gameProcess'><font color='red'>" + opponent + "</font></div>";
            // document.getElementById('game').innerHTML += '<div></div>';
            // document.getElementById('game').innerHTML += '<div></div>';
            // for (var i=0; i<9; i++) {
            //     document.getElementById('game').innerHTML+='<div id="block_' + i + '" class="block"></div>';
            // }
            document.getElementById('game').innerHTML+='<div>X</div><div>0</div><div>X</div><div>X</div><div>0</div><div>X</div><div>X</div><div>0</div><div>X</div>';
        }else{
            document.getElementById('myName').innerHTML += "<div id='gameProcess'><font color='blue'>" + myname + "</font></div>";;
            document.getElementById('opponentName').innerHTML += "<div id='gameProcess'><font color='red'>" + opponent + "</font></div>";
            // document.getElementById('game').innerHTML += '<div></div>';
            // document.getElementById('game').innerHTML += '<div></div>';
            // for (var i=0; i<9; i++) {
            //     document.getElementById('game').innerHTML+='<div id="block_' + i + '" class="block"></div>';
            // }
            document.getElementById('game').innerHTML+='<div>X</div><div>0</div><div>X</div><div>X</div><div>0</div><div>X</div><div>X</div><div>0</div><div>X</div>';
        }
}


function playerPlay(){
    socket.emit("checkbox", {})
}

function exit(){
    document.getElementById('game').innerHTML = '';
    socket.emit("exit", {});
}

function Winner(name){
    // document.getElementById('game').innerHTML = ''; 
    document.getElementById('game').innerHTML += '<div class="modal" tabindex="-1" role="dialog">';
    document.getElementById('game').innerHTML += '<div class="modal-dialog">';
    document.getElementById('game').innerHTML += '<div class="modal-content">';
    document.getElementById('game').innerHTML += '<div class="modal-header">';
    document.getElementById('game').innerHTML += '</div>';
    document.getElementById('game').innerHTML += '<div class="modal-body">';
    document.getElementById('game').innerHTML += '<p id="winner"> Игрок ' + name + ' Победил!!! </p>';
    document.getElementById('game').innerHTML += '</div>';
    document.getElementById('game').innerHTML += '<div class="modal-footer">';
    document.getElementById('game').innerHTML += '<button onclick="exit()" type="button" class="btn btn-primary">Выход</button>';
    document.getElementById('game').innerHTML += '</div>';
    document.getElementById('game').innerHTML += '</div>';
    document.getElementById('game').innerHTML += '</div>';
    document.getElementById('game').innerHTML += '</div>';

    // document.getElementById('game').innerHTML += "<h1 id='winner'> Игрок " + name + " Победил!!! </h1>";
    // document.getElementById('game').innerHTML += '<button onclick="exit()">Выход</button>';
}

function Draw() {
    document.getElementById('game').innerHTML += "<h1 id='winner'> Ничья!!! </h1>";
    document.getElementById('game').innerHTML += '<button onclick="exit()">Выход</button>';
}

EmptyPage();

var socket = io.connect("/");



document.getElementById('game').onclick = function(event) {
    if (event.target.className == 'block') {
            boxId = parseBoxId(event.target.id);
            socket.emit("block", {blockNum : boxId});
        }
}


socket.on("map", (data) => {
    for (var i=0; i<9; i++) {
        if (data.map[i] === 1) {
            let str = "block_" + i;
            document.getElementById(str).innerHTML = 'X';
        }else {
            if (data.map[i] === 2) {
                let str = "block_" + i;
                document.getElementById(str).innerHTML = '0';
            }
        }
    }
});

socket.on("Name", (data) => {
    Button(data.userName);
});

socket.on("gameLaunch", (data) => {
    GameMap(data.myname, data.opponent, data.hod);
});

socket.on("EmptyPage", () => {
    EmptyPage();
});

socket.on("winner", (data) => {
    Winner(data.Name);
});

socket.on("draw", () => {
    Draw();
});

socket.on('news', function (data) {
    console.log(data.hello);
    });
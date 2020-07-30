var socket = io.connect("127.0.0.1:7000");
var hod;

function parseBoxId(idName) {
    return parseInt(idName.replace("box_", ""));
}

for (var i=0; i<9; i++) {
    document.getElementById('game').innerHTML+='<div id="block_' + i + '" class="block"></div>';
}


var allblock = document.getElementsByClassName('block');
    hod = 0;
    allblock[0].innerHTML = '';
    allblock[1].innerHTML = '';
    allblock[2].innerHTML = '';
    allblock[3].innerHTML = '';
    allblock[4].innerHTML = '';
    allblock[5].innerHTML = '';
    allblock[6].innerHTML = '';
    allblock[7].innerHTML = '';
    allblock[8].innerHTML = '';
    document.getElementById('game').onclick = function(event) {
        if (event.target.className == 'block') {
            if (hod % 2 === 0){
                boxId = parseBoxId(event.target.id);
                console.log("Click on box ", boxId);
                socket.emit("block", {blockNum : boxId});
                socket.emit("move", {move : hod});
                event.target.innerHTML = 'X';
                
            }
            else {
                event.target.innerHTML = '0';
            }
            hod++;
            checkWinner()
            if (hod === 9) alert('Ничья!!!');
        }

        function checkWinner() {
            //Победа крестиков
            if (allblock[0].innerHTML=='X' && allblock[1].innerHTML=='X' && allblock[2].innerHTML=='X') alert('Победили крестики!!!');
            if (allblock[3].innerHTML=='X' && allblock[4].innerHTML=='X' && allblock[5].innerHTML=='X') alert('Победили крестики!!!');
            if (allblock[6].innerHTML=='X' && allblock[7].innerHTML=='X' && allblock[8].innerHTML=='X') alert('Победили крестики!!!');
            if (allblock[0].innerHTML=='X' && allblock[3].innerHTML=='X' && allblock[6].innerHTML=='X') alert('Победили крестики!!!');
            if (allblock[1].innerHTML=='X' && allblock[4].innerHTML=='X' && allblock[7].innerHTML=='X') alert('Победили крестики!!!');
            if (allblock[2].innerHTML=='X' && allblock[5].innerHTML=='X' && allblock[8].innerHTML=='X') alert('Победили крестики!!!');
            if (allblock[0].innerHTML=='X' && allblock[4].innerHTML=='X' && allblock[8].innerHTML=='X') alert('Победили крестики!!!');
            if (allblock[6].innerHTML=='X' && allblock[4].innerHTML=='X' && allblock[2].innerHTML=='X') alert('Победили крестики!!!');

            //Победа ноликов
            if (allblock[0].innerHTML=='0' && allblock[1].innerHTML=='0' && allblock[2].innerHTML=='0') alert('Победили нолики!!!');
            if (allblock[3].innerHTML=='0' && allblock[4].innerHTML=='0' && allblock[5].innerHTML=='0') alert('Победили нолики!!!');
            if (allblock[6].innerHTML=='0' && allblock[7].innerHTML=='0' && allblock[8].innerHTML=='0') alert('Победили нолики!!!');
            if (allblock[0].innerHTML=='0' && allblock[3].innerHTML=='0' && allblock[6].innerHTML=='0') alert('Победили нолики!!!');
            if (allblock[1].innerHTML=='0' && allblock[4].innerHTML=='0' && allblock[7].innerHTML=='0') alert('Победили нолики!!!');
            if (allblock[2].innerHTML=='0' && allblock[5].innerHTML=='0' && allblock[8].innerHTML=='0') alert('Победили нолики!!!');
            if (allblock[0].innerHTML=='0' && allblock[4].innerHTML=='0' && allblock[8].innerHTML=='0') alert('Победили нолики!!!');
            if (allblock[6].innerHTML=='0' && allblock[4].innerHTML=='0' && allblock[2].innerHTML=='0') alert('Победили нолики!!!');

        }

    }

socket.on('news', function (data) {
    console.log(data.hello);
    });
    
socket.emit("test", { data: "test"});
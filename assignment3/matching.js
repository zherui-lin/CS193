var cards = ["1clubs.png", "1hearts.png", "2clubs.png", "2hearts.png", "3clubs.png", "3hearts.png"];
var indexes = [0, 1, 2, 3, 4, 5];

var count = 0;
var faceupId = -1;
var unclickableIds = new Set();

function shuffle() {
    for (let i = 0; i < indexes.length; i++) {
        let index = Math.floor(Math.random() * indexes.length);
        let temp = indexes[index];
        indexes[index] = indexes[i];
        indexes[i] = temp;
    }
}

function restart() {
    console.log("gethere");
    shuffle();
    count = 0;
    faceupId = -1;
    unclickableIds.clear();
    for (var img of document.getElementsByTagName("img")) {
        img.src = "back.png";
    }
}

function flipCard(event) {
    if (count === 2) {
        return;
    }
    var card = event.target;
    if (card.tagName !== "IMG") { // tagName is capitalized
        return;
    }
    var id = parseInt(card.id);
    if (unclickableIds.has(id)) {
        return;
    }
    card.src = cards[indexes[id]];
    count++;
    unclickableIds.add(id);
    if (count === 1) {
        faceupId = id; 
    }
    if (count === 2) {
        setTimeout(() => {
            var flippedImg = "back.png";
            if (Math.floor(indexes[id] / 2) === Math.floor(indexes[faceupId] / 2)) { // JS int division can return float
                flippedImg = "clear.png";
            } else {
                unclickableIds.delete(id);
                unclickableIds.delete(faceupId);
            }
            document.getElementById(id).src = flippedImg;
            document.getElementById(faceupId).src = flippedImg;
            count = 0;
        }, 1500);
    }   
}

window.addEventListener("load", restart); // adding to window instead of body will be easily
document.getElementById("restart").addEventListener("click", restart);
document.getElementById("deck").addEventListener("click", flipCard);

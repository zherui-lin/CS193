"use strict";

const photoSectionRect = document.getElementById("photoSection").getBoundingClientRect();
const photoSectionWidth = photoSectionRect.right - photoSectionRect.left;
const photoSectionHeight = photoSectionRect.bottom - photoSectionRect.top;

function centerPhoto() {
    var photoSection = document.getElementById("photoSection");
    photoSection.style.left = (window.innerWidth - photoSectionWidth) / 2 + "px";
    photoSection.style.top = (window.innerHeight - photoSectionHeight) / 2 + "px";
}

window.addEventListener("load", centerPhoto);
window.addEventListener("resize", centerPhoto);

function showArrow(event) {
    if (event.target.id === "forwardOverlay") {
        event.target.innerText = ">";
    } else if (event.target.id === "backwardOverlay") {
        event.target.innerText = "<";
    }
    event.target.style.cursor = "pointer";
}

function hideArrow(event) {
    if (event.target.id === "forwardOverlay" || event.target.id === "backwardOverlay") {
        event.target.innerText = "";
    }
}

document.getElementById("photoSection").addEventListener("mouseover", showArrow);
document.getElementById("photoSection").addEventListener("mouseout", hideArrow)

var curr = 0;

function changePhoto(event) {
    var change = 0;
    if (event.target.id === "forwardOverlay") {
        change = 1;
    } else if (event.target.id === "backwardOverlay") {
        change = -1;
    }
    curr = (curr + change + photoArray.length) % photoArray.length;
    document.getElementById("photo").src = photoArray[curr].filename;;
    document.getElementById("caption").innerHTML = photoArray[curr].caption;
}

document.getElementById("photoSection").addEventListener("click", changePhoto);

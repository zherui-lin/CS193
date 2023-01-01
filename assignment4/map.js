"use strict";

function extractNumber(string) {
    return string.substring(0, string.length - 2);
}

var frameStyle = document.defaultView.getComputedStyle(document.getElementById("frame"));
var panelStyle = document.defaultView.getComputedStyle(document.getElementById("panel"));
const frameX = parseFloat(extractNumber(frameStyle.marginLeft)) + parseFloat(extractNumber(frameStyle.borderLeft));
const frameY = parseFloat(extractNumber(frameStyle.marginTop)) + parseFloat(extractNumber(frameStyle.borderTop));
const sideWidth = parseFloat(extractNumber(panelStyle.width)) + 2 * parseFloat(extractNumber(panelStyle.marginLeft));

function getImageXY() {
    var map = document.getElementById("map");
    var imageX = map.getBoundingClientRect().left;
    var imageY = map.getBoundingClientRect().top;
    return {imageX, imageY};
}

function getFrameSize() {
    var frameWidth = parseFloat(extractNumber(frameStyle.width));
    var frameHeight = parseFloat(extractNumber(frameStyle.height));
    return {frameWidth, frameHeight};
}

function getCenterXY() {
    var {frameWidth, frameHeight} = getFrameSize();
    var centerX = frameWidth / 2 + frameX;
    var centerY = frameHeight / 2 + frameY;
    return {centerX, centerY};
}

function moveImage(imageXY, fromXY, toXY) {
    var map = document.getElementById("map");
    map.style.left = (imageXY[0] + toXY[0] - fromXY[0] - frameX) + "px";
    map.style.top = (imageXY[1] + toXY[1] - fromXY[1] - frameY) + "px";
}

function resizeFrame() {
    var frame = document.getElementById("frame");
    frame.style.height = (window.innerHeight - 2 * frameY) + "px";
    frame.style.width = (window.innerWidth - 2 * frameX - sideWidth) + "px";
}

window.addEventListener("load", resizeFrame);
window.addEventListener("resize", resizeFrame);

var startX = 0;
var startY = 0;
var mouseDownImageX = 0;
var mouseDownImageY = 0;
var dragging = false;

function handleMouseDown(event) {
    if (event.target.id !== "map") {
        return;
    }
    event.preventDefault();
    startX = event.clientX;
    startY = event.clientY;
    ({imageX: mouseDownImageX, imageY: mouseDownImageY} = getImageXY());
    dragging = true;
    document.getElementById("frame").style.cursor = "move";
}

function handleMouseUp() {
    dragging = false;
    document.getElementById("frame").style.cursor = "default";
}

function handleMouseMove(event) {
    if (!dragging) {
        return;
    }
    var map = document.getElementById("map");
    moveImage([mouseDownImageX, mouseDownImageY], [startX, startY], [event.clientX, event.clientY]);
    event.preventDefault();

}

document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("mousemove", handleMouseMove);

function handleDblClick(event) {
    var {centerX, centerY} = getCenterXY();
    var {imageX, imageY} = getImageXY();
    moveImage([imageX, imageY], [event.clientX, event.clientY], [centerX, centerY]);
}

document.getElementById("map").addEventListener("dblclick", handleDblClick);

var maps = new Array("map-xl.gif", "map-l.gif", "map-m.gif", "map-s.gif");
var images = new Array();
for (let i = 0; i < maps.length; i++) {
    images[i] = new Image();
    images[i].src = maps[i];
}
var curr = 0;

function switchMap(event) {
    var change = 0;
    if (event.target.id === "zoomIn") {
        if (curr === 0) {
            return;
        }
        change = -1;
    } else if (event.target.id === "zoomOut") {
        if (curr === maps.length - 1) {
            return;
        }
        change = 1;
    }
    var map = document.getElementById("map");
    var prevWidth = map.width;
    var prevHeight = map.height;
    curr = (curr + change) % maps.length;
    map.src = maps[curr];
    var currWidth = map.width;
    var currHeight = map.height;
    var {imageX, imageY} = getImageXY();
    var {centerX, centerY} = getCenterXY();
    var prevCenterX = (centerX - imageX) / prevWidth * currWidth + imageX;
    var prevCenterY = (centerY - imageY) / prevHeight * currHeight + imageY;
    moveImage([imageX, imageY], [prevCenterX, prevCenterY], [centerX, centerY]);
}

document.getElementById("zoomIn").addEventListener("click", switchMap);
document.getElementById("zoomOut").addEventListener("click", switchMap);

function scrollMap(horizontal, vertical) {
    return function() {
        var {imageX, imageY} = getImageXY();
        var {frameWidth, frameHeight} = getFrameSize();
        var {centerX, centerY} = getCenterXY();
        var targetX = centerX + horizontal * frameWidth / 2;
        var targetY = centerY + vertical * frameHeight / 2;
        moveImage([imageX, imageY], [targetX, targetY], [centerX, centerY]);
    };
}

document.getElementById("up").addEventListener("click", scrollMap(0, -1));
document.getElementById("left").addEventListener("click", scrollMap(-1, 0));
document.getElementById("right").addEventListener("click", scrollMap(1, 0));
document.getElementById("down").addEventListener("click", scrollMap(0, 1));

function searchLocation() {
    var {imageX, imageY} = getImageXY();
    var location = document.getElementById("location").value;
    for (let loc of locationArray) {
        if (loc.names.includes(location)) {
            var originalX = loc.x + imageX;
            var originalY = loc.y + imageY;
        }
    }
    var imageXLWidth = images[0].width;
    var imageXLHeight = images[0].height;
    var map = document.getElementById("map");
    var currWidth = map.width;
    var currHeight = map.height;
    var {centerX, centerY} = getCenterXY();
    var currX = (originalX - imageX) / imageXLWidth * currWidth + imageX;
    var currY = (originalY - imageY) / imageXLHeight * currHeight + imageY;
    moveImage([imageX, imageY], [currX, currY], [centerX, centerY]);
}

document.getElementById("search").addEventListener("click", searchLocation);

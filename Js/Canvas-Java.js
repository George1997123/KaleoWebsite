// JavaScript Document
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.Width = canvas.width;
canvas.Height = canvas.height;
var mouse = false;
ctx.lineJoin = "round";
ctx.lineCap = "round";
var positionX, positionY;


var brush = document.getElementById("draw");
var eraser = document.getElementById("erase");
var color = document.getElementById("paint");
var size = document.getElementById("size");
var saveLink = document.getElementById("save");


var myColor = color.value;
ctx.strokeStyle = myColor;

var mySize = size.value;
ctx.lineWidth = mySize;

brush.style.border = "2px solid red";
canvas.style.cursor = "pointer";



//Mouse

canvas.addEventListener("mousedown", brushDown, false);
canvas.addEventListener("mousemove", brushMove, false);
canvas.addEventListener("mouseup", brushUp, false);
//////////////////////////////
function colorChange() {
	"use strict";
	myColor = color.value;
	ctx.strokeStyle = myColor;
}

//5. Size change conditions
function sizeChange() {
	"use strict";
	mySize = size.value;
	ctx.lineWidth = mySize;
}



function getCoordinates(canvas, e) {
	"use strict";
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

function brushDraw(canvas, positionX, positionY) {
	"use strict";
	if(mouse) {
		ctx.lineTo(positionX, positionY);
		ctx.stroke();
		canvas.style.cursor = "pointer";
	}
}

function brushDown(e) {
	"use strict";
	mouse = true;
	var coordinates = getCoordinates(canvas, e);
	canvas.style.cursor = "pointer";
	positionX = coordinates.x;
	positionY = coordinates.y;
	ctx.beginPath();
	ctx.moveTo(positionX, positionY);
	ctx.lineTo(positionX, positionY);
	ctx.stroke();
}

function brushMove(e) {
	"use strict";
	var coordinates = getCoordinates(canvas, e);
	positionX = coordinates.x;
	positionY = coordinates.y;
	brushDraw(canvas, positionX, positionY);
}

function brushUp() {
	"use strict";
	mouse = false;
	canvas.style.cursor = "default";
}

function brushClick() {
	"use strict";
	var brushColor = document.getElementById("myColor");
	ctx.strokeStyle = brushColor.value; 
	brush.style.border = "2px solid red";
	eraser.style.border = "none";
	
	canvas.addEventListener("mousedown", brushDown, false);
	canvas.addEventListener("mousemove", brushMove, false);
	canvas.addEventListener("mouseup", brushUp, false);
}

//3. Making the eraser work 
function eraserClick() {
	"use strict";
	ctx.strokeStyle = "white";
	eraser.style.border = "2px solid red";
	brush.style.border = "none";
	
	canvas.addEventListener("mousedown", brushDown, false);
	canvas.addEventListener("mousemove", brushMove, false);
	canvas.addEventListener("mouseup", brushUp, false);
}

//7. Making the save button work
function saveClick() {
	"use strict";
	var data = canvas.toDataURL(); //encodes image information into a base 64 format
	console.log(data);
	saveLink.href = data;
	saveLink.download = "myImage.png";
}

//Event Listeners for tools 
brush.addEventListener("click", brushClick); //Brush click event 
eraser.addEventListener("click", eraserClick); //Eraser click event
color.addEventListener("change", colorChange); //Color change event 
size.addEventListener("change", sizeChange); //Size change event 
saveLink.addEventListener("click", saveClick); //Save click event 

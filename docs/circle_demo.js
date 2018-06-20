/* 
 * Smallest enclosing circle - Demo (JavaScript)
 * 
 * Copyright (c) 2015 Project Nayuki
 * https://www.nayuki.io/page/smallest-enclosing-circle
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program (see COPYING.txt).
 * If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";


/* Configuration */

var POINT_RADIUS = 4;
var POINT_RADIUS_2 = 4;
var CIRCLE_COLOR = "#FFFFFF";
var POINT_COLOR  = "#000000";
var POINT_COLOR_2 = "#FF0000";   
var CIRCLE_COLOR_2 = "#E0E0E0";


/* Global state */

var canvasElem = document.getElementById("canvas");
var canvasPoints = [];
var canvasPoints_2 = [];
var canvasCircle = null;
var canvasCircle_2 = null;
var suppressContextMenu = false;
var dragPointIndex = -1;


/* Event handlers and UI functions */

// canvasElem.onmousedown = function(ev) {
// 	var x = ev.offsetX;
// 	var y = ev.offsetY;
// 	var nearest = findNearestPoint(x, y);
	
// 	// Left mouse button: Add or move point
// 	if (ev.button == 0) {
// 		if (nearest.dist <= POINT_RADIUS + 2) {
// 			// Start moving existing point
// 			dragPointIndex = nearest.index;
// 		} else {
// 			// Add point and start moving it
// 			dragPointIndex = canvasPoints.length;
// 			canvasPoints.push({x: x, y: y});
// 			refreshCanvasCircle();
// 		}
// 	}
// 	// Right mouse button: Delete point
// 	else if (ev.button == 2) {
// 		if (nearest.dist <= POINT_RADIUS + 2) {
// 			canvasPoints.splice(nearest.index, 1);
// 			refreshCanvasCircle();
// 		}
// 		suppressContextMenu = nearest.dist <= POINT_RADIUS + 10;
// 	}
// };


// canvasElem.onmousemove = function(ev) {
// 	if (dragPointIndex != -1) {
// 		canvasPoints[dragPointIndex] = {x: ev.offsetX, y: ev.offsetY};
// 		refreshCanvasCircle();
// 	}
// };


// canvasElem.onmouseup = function(ev) {
// 	if (ev.button == 0) {
// 		canvasPoints[dragPointIndex] = {x: ev.offsetX, y: ev.offsetY};
// 		dragPointIndex = -1;
// 		refreshCanvasCircle();
// 	}
// };


// // Assumed to be invoked after onmousedown.
// canvasElem.oncontextmenu = function() {
// 	var result = !suppressContextMenu;
// 	suppressContextMenu = false;
// 	return result;
// };


canvasElem.onselectstart = function() {  // For Google Chrome
	return false;
};


function doClear() {
	canvasPoints = [];
	canvasPoints_2 = [];
	refreshCanvasCircle();
}

// // rectangle canvas and points on it
// function doRandom_rectangle(){
// 	var canvas = document.createElement("canvas");
// 	canvas.setAttribute("width", window.innerWidth);
// 	canvas.setAttribute("height", window.innerHeight);
// 	canvas.setAttribute("style", "position: absolute; x:0; y:0;");
// 	document.body.appendChild(canvas);
// 	var ctx = canvas.getContext("2d");
// 	ctx.fillStyle = POINT_COLOR_2;
// 	ctx.fillRect(100,100,1,1);
// 	// canvasPoints.forEach(function(point) {
// 	// 	ctx.beginPath();
// 	// 	ctx.arc(point.x, point.y, POINT_RADIUS, 0, Math.PI * 2, false);
// 	// 	ctx.fill();
// 	// });
// }


function doRandom() {
//	doRandom_rectangle();
	var scale = Math.min(canvasElem.width, canvasElem.height);
	canvasPoints = [];
	canvasPoints_2 = [];
	var len = Math.floor((1 - Math.sqrt(Math.random())) * 50) + 2;  // 2 to 20, preferring smaller numbers
	for (var i = 0; i < len; i++) {
		var k = Math.floor((1 - Math.sqrt(Math.random())) * 3) + 2;
		var r = randomGaussianPair();
		canvasPoints.push({
			x: r[0] * scale * 0.50 + canvasElem.width  / k,
			y: r[1] * scale * 0.50 + canvasElem.height / k});
		r = randomGaussianPair();
		canvasPoints.push({
			x: r[0] * scale * 0.50 + canvasElem.width  / k,
			y: r[1] * scale * 0.50 + canvasElem.height / k});
		var r_2 = randomGaussianPair();
		canvasPoints_2.push({
			x: r_2[0] * scale * 0.075 + canvasElem.width / k,
			y: r_2[1] * scale * 0.075 + canvasElem.height / k});
	}
	refreshCanvasCircle();
}


function refreshCanvasCircle() {

	// 1 sec delay
	setTimeout(function() { 
		// Recompute circle
		canvasCircle = makeCircle(canvasPoints);
		canvasCircle_2 = makeCircle(canvasPoints_2);
		
		// Clear
		var ctx = canvasElem.getContext("2d");
		ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
		
		// Draw circle first
		if (canvasCircle != null) {
			ctx.fillStyle = CIRCLE_COLOR;
			ctx.beginPath();
			ctx.arc(canvasCircle.x, canvasCircle.y, canvasCircle.r + POINT_RADIUS, 0, Math.PI * 2, false);
			ctx.fill();
		}
		
		// Draw points on top
		canvasPoints.forEach(function(point) {
			ctx.beginPath();
			ctx.arc(point.x, point.y, POINT_RADIUS, 0, Math.PI * 2, false);
			if(Math.random() >= 0.5){
				ctx.fillStyle = POINT_COLOR_2;
				ctx.fill();
			}
			else if(Math.random() < 0.5){
				ctx.fillStyle = POINT_COLOR;
				ctx.fill();
			}
		});

		// Draw circle first
		if (canvasCircle_2 != null) {
			ctx.fillStyle = CIRCLE_COLOR_2;
			ctx.beginPath();
			ctx.arc(canvasCircle_2.x, canvasCircle_2.y, canvasCircle_2.r + POINT_RADIUS_2, 0, Math.PI * 2, false);
			ctx.fill();
		}
		
		// Draw points on top
		ctx.fillStyle = POINT_COLOR;
		canvasPoints_2.forEach(function(point) {
			ctx.beginPath();
			ctx.arc(point.x, point.y, POINT_RADIUS_2, 0, Math.PI * 2, false);
			ctx.fill();
		});

	}, Math.floor((1 - Math.sqrt(Math.random())) * 500) + 100 );

}


function findNearestPoint(x, y) {
	var nearestIndex = -1;
	var nearestDist = Infinity;
	canvasPoints.forEach(function(point, i) {
		var d = distance(point.x, point.y, x, y);
		if (d < nearestDist) {
			nearestIndex = i;
			nearestDist = d;
		}
	});
	return {dist: nearestDist, index: nearestIndex};
}


function randomGaussianPair() {
	// Use rejection sampling to pick a point uniformly distributed in the unit circle
	var x, y, magsqr;
	do {
		x = Math.random() * 2 - 1;
		y = Math.random() * 2 - 1;
		magsqr = x * x + y * y;
	} while (magsqr >= 1 || magsqr == 0);
	// Box-Muller transform
	var temp = Math.sqrt(-2 * Math.log(magsqr) / magsqr);
	return [x * temp, y * temp];
}


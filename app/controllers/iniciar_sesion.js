var args = arguments[0] || {};
var icomoonlib = require('icomoonlib');

var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;

function back_down (e) {
  e.source.opacity = 0.5;
}
function back_up (e) {
	e.source.opacity = 1;
  Alloy.Globals.navigator.goBack();
}
function acceder (e) {
  Alloy.Globals.navigator.openWindow('menu',true);
}
var backIcon = icomoonlib.getIconAsLabel("Aware-Icons","backIcon",screenHeight * 0.031,{color:"white",left:'20%'});
$.btn_back.add(backIcon);

this.close = function(){
	$.destroy();
};
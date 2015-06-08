var args = arguments[0] || {};
var osname = Ti.Platform.osname;
var icomoonlib = require('icomoonlib');
var Animator = require("Animator");
var fb = require('facebook');
yt = require('youtube');
var activeMovie;

var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;

function cerrarVentana(){
	//if (osname !== 'android') {activeMovie.stop();};
	Alloy.Globals.navigator.goBack();
}
                             
function listItemHandler (e) {
  var item = $.listSection.getItemAt(e.itemIndex);
  var bindId = e.bindId;
  Ti.API.info('BindID:' + bindId);
  
}


this.close = function(){
	$.destroy();
};                     

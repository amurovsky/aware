var args = arguments[0] || {};
var social = require('com.alcoapps.socialshare');
var Animator = require("Animator");
var icomoonlib = require('icomoonlib');
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;

$.img_close.image = icomoonlib.getIconAsBlob("Aware-Icons","closeIcon",screenHeight * 0.05,{color:"white"});

$.lbl_texto1.font = {fontFamily: 'OpenSans-ExtraBold',fontSize:screenHeight * 0.022};
$.lbl_texto2.font = {fontFamily: 'OpenSans-Bold',fontSize:screenHeight * 0.020};
$.lbl_ok.font = {fontFamily:'OpenSans-ExtraBold',fontSize:screenHeight * 0.04};


function secuencia_animacion () {
	new Animator().fade({ view: $.div_background, value: 0.7, duration: 500,onComplete:function(){
		new Animator().fade({ view: $.div_wrapper, value: 1, duration: 500,onComplete:loopedAnimation }); 
		new Animator().fade({ view: $.img_close, value: 1, duration: 500,onComplete:function(){
			new Animator().fade({ view: $.img_regalo, value: 1, duration: 500 }); 
			new Animator().fade({ view: $.img_sombra, value: 1, duration: 500,onComplete:function(){
				new Animator().fade({ view: $.div_pinkWrapper, value: 1, duration: 500,});
			}});	
		}});
	}});
}

function loopedAnimation() {
    new Animator().sequence([
    { 
        type: "moveTo", 
        view: $.img_regalo, 
        value: {x: 0, y:-5 },  
        duration: 500 }, 
    { 
        type: "moveTo", 
        view: $.img_regalo, 
        value: {x: 0, y:5 }, 
        duration: 500, onComplete: loopedAnimation }, 
    ]);
}

function destroyView() {
  	$.regala.hide();
	$.destroy();
}

function cerrarVentana(){
	new Animator().fade({ view: $.regala, value: 0, duration: 500,onComplete:destroyView});
	
}

function compartirApp(){
	new Animator().fade({ view: $.regala, value: 0, duration: 500,onComplete:destroyView});
	social.share({
	    status                  : ' - Aware App',
	    url	                    : 'https://itunes.apple.com/app/id959317044',
	    //image                   : '/images/secondPreview.png',
	    androidDialogTitle      : 'Compartir!'
	});
}

secuencia_animacion();
this.close = function(){
	$.destroy();
};
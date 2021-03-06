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
		new Animator().fade({ view: $.div_wrapper, value: 1, duration: 250,onComplete:loopedAnimation }); 
		new Animator().fade({ view: $.img_close, value: 1, duration: 250,onComplete:function(){
			new Animator().fade({ view: $.img_regalo, value: 1, duration: 250 }); 
			new Animator().fade({ view: $.img_sombra, value: 1, duration: 250,onComplete:function(){
				new Animator().fade({ view: $.div_pinkWrapper, value: 1, duration: 250,});
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
	Alloy.Globals.loading.show('Cargando...');
	social.share({
	    status                  : 'Conoce Aware App \nGoogle Play: http://bit.ly/1LYe2Mn  \n App Store: http://apple.co/1gmrOvh',
	    //status                  : 'Conoce Aware App \nGoogle Play: https://play.google.com/store/apps/details?id=com.tejuinomx.aware  \n App Store: https://itunes.apple.com/app/id1019304805',
	    //url	                    : 'https://itunes.apple.com/app/id1019304805',
	    //image                   : '/appicon.png',
	    androidDialogTitle      : 'Compartir!'
	});
	Alloy.Globals.loading.hide();
}

secuencia_animacion();
this.close = function(){
	$.destroy();
};
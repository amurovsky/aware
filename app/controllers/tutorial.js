var args = arguments[0] || {};

var Animator = require("Animator");
var icomoonlib = require('icomoonlib');
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;
var scrollView = $.scrollableView;
$.switch_recuerdame.value = Ti.App.Properties.getBool('verTour');

$.img_compraTour.image = icomoonlib.getIconAsBlob("Aware-Icons","compraTourIcon",screenHeight * 0.28,{color:"white"});
$.img_cicloTour.image = icomoonlib.getIconAsBlob("Aware-Icons","cicloTourIcon",screenHeight * 0.28,{color:"white"});
$.img_likeTour.image = icomoonlib.getIconAsBlob("Aware-Icons","likeTourIcon",screenHeight * 0.28,{color:"white"});
if (OS_IOS){
	new Animator().scale({view:$.img_compraTour,value:0, duration:0,});	
}else{
	$.scrollableView.showPagingControl = false;
	$.img_compraTour.opacity = 1;
	$.img_cicloTour.opacity = 1;
	$.img_likeTour.opacity = 1;
	$.lbl_recuerda.opacity = 1;
	$.lbl_renueva.opacity = 1;
	$.lbl_participa.opacity = 1;
	$.lbl_recuerdaExp.opacity = 1;
	$.lbl_renuevaExp.opacity = 1;
	$.lbl_participaExp.opacity = 1;
}

function saltarEvent (e) {
	
	if (Alloy.Globals.comeFromMenu) {
		Alloy.Globals.navigator.openWindow('menu',true,[],'forward');
		Alloy.Globals.comeFromMenu = false;
		return;
	}
	if (Ti.App.Properties.getString('userName')) {
		Alloy.Globals.navigator.openWindow('menu',true,[],'forward');
	}else{
		Alloy.Globals.navigator.openLogin();
		
	}
}
function onScrollEvent (e) {

		var green = Math.ceil( (e.currentPageAsFloat * 100) / 4 );
		var blue = Math.ceil( (e.currentPageAsFloat * 100) / 6 );
		var moveRight = Math.ceil( (e.currentPageAsFloat * 100));
		//Ti.API.info('rgb(250,'+ (135 - green) +','+ (197 - blue) +')');
		$.container.backgroundColor = 'rgb(250,'+ (135 - green) +','+ (197 - blue) +')';
  	
}

function onPostlayoutEvent (e) {
		Ti.API.info('PostLayout');
		if (OS_IOS){
			new Animator().scale({view:$.img_compraTour,value:1, duration:250,});
			new Animator().fade({view:$.img_compraTour,value:1, duration:500, onComplete:function(){
				new Animator().fade({view:$.lbl_recuerda,value:1, duration:250});
				new Animator().fade({view:$.lbl_recuerdaExp,value:1, duration:250});
			}});
			new Animator().scale({view:$.img_cicloTour,value:0, duration:0,});
			new Animator().scale({view:$.img_likeTour,value:0, duration:0,});
		}
		
}

function onScrollendEvent (e) {
	if(OS_IOS){
		Ti.API.info('Estamos en Scrollend en la vista: ' + e.view + ' currentPage: ' + e.currentPage);
	  	if((e.currentPage == 0))	{
	  		new Animator().scale({view:$.img_compraTour,value:1, duration:250,});
			new Animator().fade({view:$.img_compraTour,value:1, duration:500, onComplete:function(){
				new Animator().fade({view:$.lbl_recuerda,value:1, duration:250});
				new Animator().fade({view:$.lbl_recuerdaExp,value:1, duration:250});
			}});
			new Animator().scale({view:$.img_cicloTour,value:0, duration:0,});
			new Animator().scale({view:$.img_likeTour,value:0, duration:0,});
			$.lbl_renueva.opacity = 0;
			$.lbl_renuevaExp.opacity = 0;
			$.lbl_participa.opacity = 0;
			$.lbl_participaExp.opacity = 0;
	  	}else if (e.currentPage == 1){
			Ti.API.info('Estamos en currentPage: ' + e.view);
			new Animator().scale({view:$.img_cicloTour,value:1, duration:250,});
			new Animator().fade({view:$.img_cicloTour,value:1, duration:500, onComplete:function(){
				new Animator().fade({view:$.lbl_renueva,value:1, duration:250});
				new Animator().fade({view:$.lbl_renuevaExp,value:1, duration:250});
			}});
			new Animator().scale({view:$.img_compraTour,value:0, duration:0,});
			new Animator().scale({view:$.img_likeTour,value:0, duration:0,});
			$.lbl_recuerda.opacity = 0;
			$.lbl_recuerdaExp.opacity = 0;
			$.lbl_participa.opacity = 0;
			$.lbl_participaExp.opacity = 0;
			
		}else if (e.currentPage == 2){
			//new Animator().moveTo({view:$.img_likeTour,value:{x:(Ti.Platform.displayCaps.platformWidth + (screenHeight * 0.28)) / 2,y:0}, duration:500,});
			new Animator().scale({view:$.img_likeTour,value:1, duration:250,});
			new Animator().fade({view:$.img_likeTour,value:1, duration:500, onComplete:function(){
				new Animator().fade({view:$.lbl_participa,value:1, duration:250, delay:2});
				new Animator().fade({view:$.lbl_participaExp,value:1, duration:250, delay:2});
			}});
			new Animator().scale({view:$.img_cicloTour,value:0, duration:0,});
			new Animator().scale({view:$.img_compraTour,value:0, duration:0,});
			$.lbl_recuerda.opacity = 0;
			$.lbl_recuerdaExp.opacity = 0;
			$.lbl_renueva.opacity = 0;
			$.lbl_renuevaExp.opacity = 0;
		}
	}
}

function onChangeEvent (e) {
  Ti.App.Properties.setBool('verTour',e.value);
  Ti.API.info('Value: ' + e.value);
}

// ------ Close Event ------//
this.close = function(){
	$.destroy();
}; 
var args = arguments[0] || {};

function cerrarVentana(){
	Alloy.Globals.navigator.goBack();
}

function btnComenzar_click(){
	Alloy.Globals.navigator.openWindow('calendario',false,[],'forward');
}

this.close = function(){
	$.destroy();
};
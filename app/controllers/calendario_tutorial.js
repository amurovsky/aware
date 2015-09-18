var args = arguments[0] || {};

function cerrarVentana(){
	Alloy.Globals.navigator.goBack();
}

function btnComenzar_click(){
	Alloy.Globals.navigator.goBack();
}

this.close = function(){
	$.destroy();
};
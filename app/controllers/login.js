var args = arguments[0] || {};

function abrirRegistro (e) {
  Alloy.Globals.navigator.openWindow('registro');
}

function abrirSesion (e) {
  Alloy.Globals.navigator.openWindow('iniciar_sesion');
}

function saltar (e){
	Alloy.Globals.navigator.openWindow('menu',true);
}

this.close = function(){
	$.destroy();
};

    
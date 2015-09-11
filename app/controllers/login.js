var args = arguments[0] || {};

function abrirRegistro (e) {
  Alloy.Globals.navigator.openWindow('registro',false,[],'forward');
}

function abrirSesion (e) {
  Alloy.Globals.navigator.openWindow('iniciar_sesion',false,[],'forward');
}

function saltar (e){
	Alloy.Globals.navigator.openWindow('menu',true,[],'forward');
	Alloy.Globals.PushClient.register();
}

if (!OS_IOS) {
	$.vid_background.addEventListener('complete',function(e){
		$.vid_background.play();
	});
}

this.close = function(){
	$.destroy();
};

    
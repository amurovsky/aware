var args = arguments[0] || {};

function abrirRegistro (e) {
  Alloy.Globals.navigator.openWindow('registro',false,[],'forward');
  //navigation.open('registro');
}

function abrirSesion (e) {
  Alloy.Globals.navigator.openWindow('iniciar_sesion',false,[],'forward');
  //navigation.open('iniciar_sesion');
}

function saltar (e){
	//Alloy.Globals.loading.show('Cargando...');
	Alloy.Globals.navigator.openWindow('menu',true,[],'forward');

		Alloy.Globals.PushClient.register();
		
	// navigation.open('menu');
	// navigation.clearHistory();
	// Alloy.Globals.loading.hide();
}

if (!OS_IOS) {
	$.vid_background.addEventListener('complete',function(e){
		$.vid_background.play();
	});
}

// var images = [];
	// for (var i=0;i<394;i++)
	// {
		// images.push('/jpgs/Comp1__' + i + '.jpg');
	// }
// 	
// $.vid_background.images = images;
// $.vid_background.addEventListener('load', function(e)
	// {
		// // hide indicator from app.js
		// Titanium.App.fireEvent('hide_indicator');
// 	
		// // start animation
		// $.vid_background.start();
	// });
	
	
this.close = function(){
	$.destroy();
};

    
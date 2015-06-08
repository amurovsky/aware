var args = arguments[0] || {};
var osname = Ti.Platform.osname;

var data = [{nombre:'CONSULTORIO PROVIDENCIA GINECOLOGÍA',imagen:'/images/profilePic.png',direccion:'Avenida Guadalupe No.350 Colonia San Ignacio, entre San Francisco y Villa Romana. Zapopan, Jalisco.'},
			{nombre:'GINE. ARTURO GALVÁN ROMERO',imagen:'/images/profilePic.png',direccion:'Bernardo de Balbuena No.91 Colonia Ladron de Guevara Guadalajara, Jal. Colonia San Ignacio, entre San Francisco y Villa Romana. Zapopan, Jalisco.'},
			{nombre:'Nacer Humano',imagen:'/images/profilePic.png',direccion:'Av. de los Maestros No.1838 Colonia de los Doctores Guadalajara, Jal. Colonia San Ignacio, entre San Francisco y Villa Romana. Zapopan, Jalisco.'}];
function cerrarVentana(){
	Alloy.Globals.navigator.goBack();
}

function listItemHandler (e) {
  var item = $.listSection.getItemAt(e.itemIndex);
  var bindId = e.bindId;
  Ti.API.info('BindID:' + bindId);
  
  if (bindId === 'llamar') {
	  	var dialog = Ti.UI.createAlertDialog({
	    cancel: 1,
	    buttonNames: ['Llamar', 'Cancelar'],
	    message: 'Desea llamar a: '+item.lbl_nombre.text,
	    title: 'Llamar'
	  });
	  dialog.addEventListener('click', function(e){
	    if (e.index === e.source.cancel){
	      Ti.API.info('The cancel button was clicked');
	    }else{
	    	Ti.API.info('Llamando... a: ' + item.lbl_nombre.text);
	    	Ti.Platform.openURL('tel://3310417804');
	    }

	  });
	  dialog.show();
  		
  		
  }else if (bindId === 'mapa'){
  	var url = 'http://maps.google.com/maps?q=20.6315862,-103.4336804&z=13';
  	if (osname == 'android') {
  		
  		var intent = Ti.Android.createIntent({
	        action: Ti.Android.ACTION_VIEW,
	        data:url
    	});
    	Ti.Android.currentActivity.startActivity(intent);
    	
  	}else{
  		
  		if (Titanium.Platform.canOpenURL('GoogleMaps://')) {
    		Ti.Platform.openURL('GoogleMaps:'+url);
    	}else{
    		Ti.Platform.openURL('maps://'+url);
    	};
  		
  	}

  }
  
}

this.close = function(){
	$.destroy();
};
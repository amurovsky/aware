var args = arguments[0] || {};
var navigation = Alloy.Globals.navigation;
var icomoonlib = require('icomoonlib');
var Map = require('ti.map');
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;


var coordenadas = [];

function cerrarVentana(e){
	Alloy.Globals.navigator.goBack();
}

if(!OS_IOS){
	if(!Ti.Geolocation.locationServicesEnabled){
		var dialog = Ti.UI.createAlertDialog({
			cancel: 1,
			message:'Para encontrar los mas cercanos, activa tu GPS',
			buttonNames:['Activar GPS', 'Cancelar'],
			title:''
		});
		dialog.addEventListener('click', function(e){
		    if (e.index === e.source.cancel){
		      Ti.API.info('The cancel button was clicked');
		    }else{
				var settingsIntent = Titanium.Android.createIntent({
					action : 'android.settings.LOCATION_SOURCE_SETTINGS'
				});
				Ti.Android.currentActivity.startActivity(settingsIntent);
			}
		});
		
		dialog.show();
		
	}
}
var mapview = Map.createView({
    mapType: Map.NORMAL_TYPE,
    animate:true,
    regionFit:true,
    userLocation:true

});

Ti.Geolocation.getCurrentPosition(function(e) {
    if (e.error) {
    	Ti.API.info('No se pudo obtener tu localización');
        return; 
    }
    
    mapview.setRegion({
        latitude : e.coords.latitude,
        longitude : e.coords.longitude,
        latitudeDelta : 0.25,
        longitudeDelta : 0.25
    });
});

Alloy.Globals.ws.points(function(status,obj){
	Ti.API.info('Respuesta de Puntos de Venta');
	if (status) {
		for (var i=0; i < obj.puntos.length; i++) {
			if (obj.puntos[i].coordenates != '') {
				coordenadas.push(obj.puntos[i].coordenates);
				var coordenates = obj.puntos[i].coordenates.split(',');
				var annotation = Map.createAnnotation({
				    latitude:	coordenates[0],
				    longitude:	coordenates[1],
				    title:		obj.puntos[i].name,
				    subtitle:	obj.puntos[i].address,
				    rightButton: (OS_IOS) ? '/images/carIcon.png' : icomoonlib.getIcon("Aware-Icons","carIcon",screenHeight * 0.08,{color:"#fb8ac7"}),
				    image:(OS_IOS) ? '/images/pinIcon.png' : icomoonlib.getIcon("Aware-Icons","pinIcon",screenHeight * 0.07,{color:"#fb8ac7"}),
				    myid:i // Custom property to uniquely identify this annotation.
				});
				mapview.addAnnotation(annotation);
			}
		}
	}else{
			var dialog = Ti.UI.createAlertDialog({
				message:obj,
				buttonNames:['Aceptar'],
				title:''
			});
			dialog.show();
		}
});

$.div_main.add(mapview);

mapview.addEventListener('click', function(evt) {
	evt.cancelBubble = true;
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid + ' ClickSource: ' + evt.clicksource + ' Source: ' + evt.source.name);
    var url = 'http://maps.google.com/maps?q='+ coordenadas[evt.annotation.myid] +'&z=13';
    if (evt.clicksource == 'rightButton' || evt.clicksource == 'rightPane') {
    	if (!OS_IOS) {
	  		var intent = Ti.Android.createIntent({
		        action: Ti.Android.ACTION_VIEW,
		        data:url
	    	});
	    	Ti.Android.currentActivity.startActivity(intent);
	    	
	  	}else{
	    	if (Titanium.Platform.canOpenURL('GoogleMaps://')) {
	    		Ti.Platform.openURL('GoogleMaps://'+ url);
	    	}else{
	    		Ti.Platform.openURL('maps://'+ url);
	    	}
		}
    }
    
});


this.close = function(){
	$.destroy();
};
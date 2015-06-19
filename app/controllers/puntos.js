var args = arguments[0] || {};
var navigation = Alloy.Globals.navigation;
var Map = require('ti.map');

var coordenadas = [];

function cerrarVentana(){
	//Alloy.Globals.navigator.goBack();
	navigation.back();
}


var mapview = Map.createView({
    mapType: Map.NORMAL_TYPE,
    // region: {latitude:latitude, longitude:longitud,
            // latitudeDelta:0.01, longitudeDelta:0.01},
    animate:true,
    regionFit:true,
    userLocation:true

});

Ti.Geolocation.getCurrentPosition(function(e) {
    if (e.error) {
    	Ti.API.info('No se pudo obtener tu localización');
        return; 
    }
    
    mapview.setLocation({
        latitude : e.coords.latitude,
        longitude : e.coords.longitude,
        latitudeDelta : 0.01,
        longitudeDelta : 0.01
    });
});

Alloy.Globals.ws.points(function(status,obj){
	Ti.API.info('Respuesta de Puntos de Venta');
	if (status) {
		for (var i=0; i < obj.puntos.length; i++) {
			coordenadas.push(obj.puntos[i].coordenates);
			var coordenates = obj.puntos[i].coordenates.split(',');
			var annotation = Map.createAnnotation({
			    latitude:	coordenates[0],
			    longitude:	coordenates[1],
			    title:		obj.puntos[i].name,
			    subtitle:	obj.puntos[i].address,
			    rightButton:'/images/expandIcon.png',
			    //image:'/images/shareIcon.png',
			    myid:i // Custom property to uniquely identify this annotation.
			});
			mapview.addAnnotation(annotation);
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

// Handle click events on any annotations on this map.
mapview.addEventListener('click', function(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
    if (evt.clicksource == 'rightButton') {
    	if (Titanium.Platform.canOpenURL('GoogleMaps://')) {
    		Ti.Platform.openURL('GoogleMaps://http://maps.google.com/maps?q='+ [evt.annotation.myid] +'&z=13');
    	}else{
    		//Ti.Platform.openURL('maps://http://maps.google.com/maps?q='+evt.annotation.latitude+','+evt.annotation.longitude+'&z=13');
    		Ti.Platform.openURL('maps://http://maps.google.com/maps?q='+ coordenadas[evt.annotation.myid] +'&z=13');
    	};
    	
    	
    };
    
});


// this.close = function(){
	// $.destroy();
// };
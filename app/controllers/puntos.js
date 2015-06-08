var args = arguments[0] || {};

function cerrarVentana(){
	Alloy.Globals.navigator.goBack();
}


var Map = require('ti.map');

var annotations = [{title:'Farmacias Guadalara',subtitle:'Av Mariano Otero 5668 Las Arboledas 45079 Zapopan, Jal.',latitude:'20.6315862',longitude:'-103.4336804'},
				   {title:'Consultorio Medico Best',subtitle:'Calle López Portillo 78 El Briseño 45236 Zapopan, Jal.',latitude:'20.6319477',longitude:'-103.4330796'},
				   {title:'Consultorio Farma Free',subtitle:'Puerto Tehuantepec, Esquina con Calle Puert Guaymas 897-C Miramar 45060 Zapopan, Jal.',latitude:'20.6378716',longitude:'-103.4410189'}];

var mapview = Map.createView({
    mapType: Map.NORMAL_TYPE,
    region: {latitude:20.6737918, longitude:-103.3354131,
            latitudeDelta:0.5, longitudeDelta:5.0},
    animate:true,
    regionFit:true,
    userLocation:true,
   // annotations:[mountainView]
});

for (var i=0; i < annotations.length; i++) {
		var mountainView = Map.createAnnotation({
	    latitude:annotations[i].latitude,
	    longitude:annotations[i].longitude,
	    title:annotations[i].title,
	    subtitle:annotations[i].subtitle,
	    rightButton:'/images/calendarIcon.png',
	    pincolor:Map.ANNOTATION_ROSE,
	    //image:'/images/shareIcon.png',
	    myid:i+1 // Custom property to uniquely identify this annotation.
	});
	mapview.addAnnotation(mountainView);
};




$.div_main.add(mapview);

// Handle click events on any annotations on this map.
mapview.addEventListener('click', function(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
    if (evt.clicksource == 'rightButton') {
    	if (Titanium.Platform.canOpenURL('GoogleMaps://')) {
    		Ti.Platform.openURL('GoogleMaps://http://maps.google.com/maps?q='+evt.annotation.latitude+','+evt.annotation.longitude+'&z=13');
    	}else{
    		Ti.Platform.openURL('maps://http://maps.google.com/maps?q='+evt.annotation.latitude+','+evt.annotation.longitude+'&z=13');
    	};
    	
    	
    };
    
});


this.close = function(){
	$.destroy();
};
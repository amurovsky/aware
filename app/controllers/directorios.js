var args = arguments[0] || {};
var osname = Ti.Platform.osname;
var icomoonlib = require('icomoonlib');
var navigation = Alloy.Globals.navigation;
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;
//var doctores = Alloy.Collections.doctores;
var data = [];

var searchIcon = icomoonlib.getIconAsLabel("Aware-Icons","searchIcon",screenHeight * 0.04,{color:"white"});
	$.btn_buscar.add(searchIcon);
	
// var listView = $.list_dir;
// listView.searchView = $.searchBar;

// $.searchBar.addEventListener('change',function(e){
	// $.list_dir.searchText = e.value;
// });

function txtChange (e) {
	$.list_dir.searchText = e.value;
}

function buscar_down (e) {
	e.source.opacity = 0.5;
}

var abierto = false;
function buscar_up (e) {
	e.source.opacity = 1;
	
	if (!abierto) {
		Ti.API.info('Abriendo...');
		$.div_search.setHeight(50);
		//$.div_wrapper.setVisible(true);
		abierto = true;
	}else {
		Ti.API.info('Cerrando...');
		//$.div_wrapper.setVisible(false);
		$.div_search.setHeight(0);
		$.searchBar.blur();
		$.searchBar.setValue('');
		abierto = false;
 	}
}

Alloy.Globals.ws.doctors(function(status,obj){
	if (status) {
		for(var i=0; i<obj.doctores.length; i++){
			data.push({
				template: "dir_template",
				properties:{searchableText:obj.doctores[i].name + ' ' +obj.doctores[i].address},
				img_logo:{image:'http://digital.testingweb.mx:8101/uploads/'+obj.doctores[i].thumbnail, bindId:'img_logo'}, 
				lbl_nombre:{text:obj.doctores[i].name}, 
				lbl_direccion:{text:obj.doctores[i].address},
				telefono:obj.doctores[i].telephone,
				coordenadas:obj.doctores[i].coordenates });
		}
		$.listSection.setItems(data);	
	}else{
		var dialog = Ti.UI.createAlertDialog({
			message:obj,
			buttonNames:['Aceptar'],
			title:''
		});
		dialog.show();
	}
	
});

//Alloy.Collections.doctores.fetch();


// var abierto = false;
// function buscar (e) {
// 	
	// if (!abierto) {
		// $.div_search.setHeight(50);
		// abierto = true;
	// }else {
		// $.div_search.setHeight(0);
		// abierto = false;
 	// }
// }

function cerrarVentana(){
	Alloy.Globals.navigator.goBack();
	//navigation.back();
}

function llamarButton (e) {
   //Ti.API.info('Llamar Button: '+ JSON.stringify(e));
  var bindId = e.bindId;
  var item = e.section.items[e.itemIndex];
        var bindObject = item[e.bindId];
        //dataInfo = bindObject.bindId;
        Ti.API.info('Button Item: ' + item.telefono + ' BindId: ' + bindId);
  if (bindId === 'llamar') {
	  		var index = e.itemIndex;
		  	var dialog = Ti.UI.createAlertDialog({
		    cancel: 1,
		    buttonNames: ['Llamar', 'Cancelar'],
		    message: 'Desea llamar a: ' + item.lbl_nombre.text,
		    title: 'Llamar'
		  });
		  dialog.addEventListener('click', function(e){
		    if (e.index === e.source.cancel){
		      Ti.API.info('The cancel button was clicked');
		    }else{
		    	Ti.API.info('Llamando... a: ' + item.lbl_nombre.text + ' Tel: ' + item.telefono);
		    	Ti.Platform.openURL('tel://' + item.telefono);
		    }
	
		  });
		  dialog.show();
	  		
	  		
	  }
}

function mapaButton (e) {
   //Ti.API.info('Llamar Button: '+ JSON.stringify(e));
  var bindId = e.bindId;
  var item = e.section.items[e.itemIndex];
        var bindObject = item[e.bindId];
        //dataInfo = bindObject.bindId;
      Ti.API.info('Button Item: ' + item.coordenadas + ' BindId: ' + bindId);
  if (bindId === 'mapa'){
	  	Ti.API.info('index: ' + e.itemIndex + ' Coordenadas: ' + item.coordenadas);
	  	var url = 'http://maps.google.com/maps?q='+item.coordenadas+'&z=13';
	  	if (!OS_IOS) {
	  		
	  		var intent = Ti.Android.createIntent({
		        action: Ti.Android.ACTION_VIEW,
		        data:url
	    	});
	    	Ti.Android.currentActivity.startActivity(intent);
	    	
	  	}else{
	  		if (Titanium.Platform.canOpenURL('GoogleMaps://')) {
	    		Ti.Platform.openURL('GoogleMaps://'+url);
	    	}else{
	    		Ti.Platform.openURL('maps://'+url);
	    	}
	  	}
	}
}
function listItemHandler (e) {
	

	  // var item = $.listSection.getItemAt(e.itemIndex);
	  // var bindId = e.bindId;
	  
	  //Ti.API.info('Objeto:' + JSON.stringify(e));
	  //Ti.API.info('BindID:' + bindId);
	  //Ti.API.info('Item: ' + JSON.stringify(e.source.id));

	  // if (bindId === 'llamar') {
	  		// var index = e.itemIndex;
		  	// var dialog = Ti.UI.createAlertDialog({
		    // cancel: 1,
		    // buttonNames: ['Llamar', 'Cancelar'],
		    // message: 'Desea llamar a: '+item.lbl_nombre.text,
		    // title: 'Llamar'
		  // });
		  // dialog.addEventListener('click', function(e){
		    // if (e.index === e.source.cancel){
		      // Ti.API.info('The cancel button was clicked');
		    // }else{
		    	// Ti.API.info('Llamando... a: ' + item.lbl_nombre.text + ' Tel: ' + data[index].telefono);
		    	// Ti.Platform.openURL('tel://' + data[index].telefono);
		    // }
// 	
		  // });
		  // dialog.show();
// 	  		
// 	  		
	  // }else if (bindId === 'mapa'){
	  	// Ti.API.info('index: ' + e.itemIndex + ' Coordenadas: ' + data[e.itemIndex].coordenadas);
	  	// var url = 'http://maps.google.com/maps?q='+data[e.itemIndex].coordenadas+'&z=13';
	  	// if (osname == 'android') {
// 	  		
	  		// var intent = Ti.Android.createIntent({
		        // action: Ti.Android.ACTION_VIEW,
		        // data:url
	    	// });
	    	// Ti.Android.currentActivity.startActivity(intent);
// 	    	
	  	// }else{
// 	  		
	  		// if (Titanium.Platform.canOpenURL('GoogleMaps://')) {
	    		// Ti.Platform.openURL('GoogleMaps:'+url);
	    	// }else{
	    		// Ti.Platform.openURL('maps://'+url);
	    	// };
// 	  		
	  	// }
// 	
	  // }
  
}

this.close = function(){
	$.destroy();
};

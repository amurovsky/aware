var args = arguments[0] || {};
var osname = Ti.Platform.osname;
var navigation = Alloy.Globals.navigation;
var data = [];

// var listView = $.list_dir;
// listView.searchView = $.searchBar;

// $.searchBar.addEventListener('change',function(e){
	// $.list_dir.searchText = e.value;
// });


Alloy.Globals.ws.doctors(function(status,obj){
	if (status) {
		for(var i=0; i<obj.doctores.length; i++){
			data.push({
				data: obj.doctores,
				template: "dir_template", 
				properties:{searchableText:obj.doctores[i].name + ' ' +obj.doctores[i].address},
				img_logo:{image:'http://digital.testingweb.mx:8101/uploads/'+obj.doctores[i].thumbnail, itemId:'img_logo'}, 
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

var abierto = false;
function buscar (e) {
	
	if (!abierto) {
		$.div_search.setHeight(50);
		var abierto = true;
	}else {
		$.div_search.setHeight(0);
		var abierto = false;
 	}
}

function cerrarVentana(){
	//Alloy.Globals.navigator.goBack();
	navigation.back();
}

function llamarButton (e) {
  // Ti.API.info('Llamar Button: '+ JSON.stringify(e));
  // var bindId = e.bindId;
  // if (bindId === 'llamar') {
	  		// var index = e.itemIndex;
		  	// var dialog = Ti.UI.createAlertDialog({
		    // cancel: 1,
		    // buttonNames: ['Llamar', 'Cancelar'],
		    // message: 'Desea llamar a: ',
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
	  // }
}
function listItemHandler (e) {
	
	//$.searchBar.blur();	
	  var item = $.listSection.getItemAt(e.itemIndex);
	  var bindId = e.bindId;
	  Ti.API.info('BindID:' + bindId);
	  Ti.API.info('Item: ' + JSON.stringify(e.source.id));

	  if (bindId === 'llamar') {
	  		var index = e.itemIndex;
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
		    	Ti.API.info('Llamando... a: ' + item.lbl_nombre.text + ' Tel: ' + data[index].telefono);
		    	Ti.Platform.openURL('tel://' + data[index].telefono);
		    }
	
		  });
		  dialog.show();
	  		
	  		
	  }else if (bindId === 'mapa'){
	  	Ti.API.info('index: ' + e.itemIndex + ' Coordenadas: ' + data[e.itemIndex].coordenadas);
	  	var url = 'http://maps.google.com/maps?q='+data[e.itemIndex].coordenadas+'&z=13';
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

// this.close = function(){
	// $.destroy();
// };
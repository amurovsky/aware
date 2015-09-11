var args = arguments[0] || {};
var moment = require('alloy/moment');
var icomoonlib = require('icomoonlib');
var navigation = Alloy.Globals.navigation;
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;

var searchIcon = icomoonlib.getIconAsLabel("Aware-Icons","searchIcon",screenHeight * 0.04,{color:"white"});
	$.btn_buscar.add(searchIcon);

function cerrarVentana(){
	Alloy.Globals.navigator.goBack();
	//navigation.back();
}

var items = [];

//CUSTOM FUNCTION TO DEFINE WHAT HAPPENS WHEN AN ITEM IN THE GRID IS CLICKED
var showGridItemInfo = function(e){
	//alert('Title is: ' + e.source.data.title + '. Image is: ' + e.source.data.image);
	var data = e.source.data;
	//navigation.open('articulo_detalle2',{titulo:data.title, imagen:data.image, fecha:data.subtitle, contenido:data.content, liked:data.liked, likes:data.likes, articleId:data.articleId});
	Alloy.Globals.navigator.openWindow('articulo_detalle2',false, {titulo:data.title, imagen:data.image, fecha:data.subtitle, contenido:data.content, liked:data.liked, likes:data.likes, articleId:data.articleId, link:data.link},'forward');
};



var delay = (OS_ANDROID) ? 1000:500;

$.tdg.init({
    columns:2,
    space:0,
    delayTime:delay,
    gridBackgroundColor:'#fecce7',
    itemBackgroundColor:'#fff',
    itemBorderColor:'transparent',
    itemBorderWidth:0,
    itemBorderRadius:5,
    onItemClick: showGridItemInfo
});
var userID;
if (Ti.App.Properties.getString('userId')) {
	userID = Ti.App.Properties.getString('userId');
}else userID = null;

var deviceId = Ti.Platform.id;
Alloy.Globals.ws.articles(userID, deviceId, function(status,obj){
	Ti.API.info('Ya entro');
	if (status) {
		
		var dataSearch = [];
	   for (var x=0; x < obj.articulos.length; x++){
			//CREATES A VIEW WITH OUR CUSTOM LAYOUT
			var view = Alloy.createController('item_layout',{
					image:		obj.articulos[x].thumbnail, 
					title:		obj.articulos[x].title,
					subtitle:	moment(obj.articulos[x].created_at).lang("es").format('DD MMM YYYY'),
					likes:		obj.articulos[x].likes,
					liked:		(obj.articulos[x].user_liked != 'undefined') ? obj.articulos[x].user_liked : null
				}).getView();
				
		    //THIS IS THE DATA THAT WE WANT AVAILABLE FOR THIS ITEM WHEN onItemClick OCCURS
		    var values = {
		        title: 		obj.articulos[x].title,
		        image: 		obj.articulos[x].thumbnail,
		        subtitle:	obj.articulos[x].created_at,
		        content:	obj.articulos[x].content,
		        likes:		obj.articulos[x].likes,
		        liked:		(obj.articulos[x].user_liked != 'undefined') ? obj.articulos[x].user_liked : null,
		        articleId:	obj.articulos[x].id,
		        link:		obj.articulos[x].link
		    };
		
		    //NOW WE PUSH TO THE ARRAY THE VIEW AND THE DATA
		    items.push({
		        view: view,
		        data: values
		    });

		    // FILL DATASEARCH
		    dataSearch.push({
		    	template: 	'res_template',
		    	properties:		{ searchableText:obj.articulos[x].title },
		    	img_image:		{ image:obj.articulos[x].thumbnail },
		    	lbl_title:		{ text:obj.articulos[x].title},
		    	lbl_subtitle:	{ text:moment(obj.articulos[x].created_at).lang("es").format('LL')},	
		    });
		    
		    
		};
Ti.API.info('DataSearch: ' + JSON.stringify(dataSearch));
$.listSection.setItems(dataSearch);
//ADD ALL THE ITEMS TO THE GRID
$.tdg.addGridItems(items);    
        
	}else{
		var dialog = Ti.UI.createAlertDialog({
			message:obj,
			buttonNames:['Aceptar'],
			title:''
		});
		Alloy.Globals.loading.hide();
		dialog.show();
	}
});
	
function listItemHandler (e) {
	var data = items[e.itemIndex].data;
  	var item = $.listSection.getItemAt(e.itemIndex);
	var bindId = e.bindId;
	$.searchBar.blur();
	Ti.API.info('BindID:' + bindId);
	Ti.API.info('Item: ' + JSON.stringify(e.source.id));
	Alloy.Globals.navigator.openWindow('articulo_detalle2',false, {titulo:data.title, imagen:data.image, fecha:data.subtitle, contenido:data.content, liked:data.liked, likes:data.likes, articleId:data.articleId},'forward');
}

function txtChange (e) {
	$.list_results.searchText = e.value;
}

function buscar_down (e) {
	e.source.opacity = 0.5;
}
var abierto = false;
function buscar_up (e) {
	e.source.opacity = 1;
	
	if (!abierto) {
		Ti.API.info('Abriendo...');
		$.div_wrapper.setVisible(true);
		abierto = true;
	}else {
		Ti.API.info('Cerrando...');
		$.div_wrapper.setVisible(false);
		$.searchBar.blur();
		$.searchBar.setValue('');
		abierto = false;
 	}
}


// ------ Close Event ------//
this.close = function(){
	$.destroy();
}; 
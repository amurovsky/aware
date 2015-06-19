var args = arguments[0] || {};
var moment = require('alloy/moment');
var navigation = Alloy.Globals.navigation;

function cerrarVentana(){
	//Alloy.Globals.navigator.goBack();
	navigation.back();
}

//CUSTOM FUNCTION TO DEFINE WHAT HAPPENS WHEN AN ITEM IN THE GRID IS CLICKED
var showGridItemInfo = function(e){
	//alert('Title is: ' + e.source.data.title + '. Image is: ' + e.source.data.image);
	var data = e.source.data;
	navigation.open('articulo_detalle2',{titulo:data.title, imagen:data.image, fecha:data.subtitle, contenido:data.content, liked:data.liked, likes:data.likes, articleId:data.articleId});
};



var delay = (OS_ANDROID) ? 1000:2000;

$.tdg.init({
    columns:2,
    space:5,
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


Alloy.Globals.ws.articles(userID,function(status,obj){
	Ti.API.info('Ya entro');
	if (status) {
		var items = [];
	   for (var x=0; x < obj.articulos.length; x++){
			//CREATES A VIEW WITH OUR CUSTOM LAYOUT
			var view = Alloy.createController('item_layout',{
					image:		obj.articulos[x].thumbnail, 
					title:		obj.articulos[x].title,
					subtitle:	moment(obj.articulos[x].created_at).lang("es").format('LL'),
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
		        articleId:	obj.articulos[x].id
		    };
		
		    //NOW WE PUSH TO THE ARRAY THE VIEW AND THE DATA
		    items.push({
		        view: view,
		        data: values
		    });
		};

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
	



// // ------ Close Event ------//
// this.close = function(){
	// $.destroy();
// }; 
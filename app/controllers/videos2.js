var args = arguments[0] || {};
var social = require('com.alcoapps.socialshare');
var icomoonlib = require('icomoonlib');
var Animator = require("Animator");
var fb = require('facebook');
yt = require('youtube');
var data = [];
var ytLink = [];
var blob;

function cerrarVentana(){
	Alloy.Globals.navigator.goBack();
}

function playVideo (e) {
	Alloy.Globals.loading.show('Cargando...');
	var url = ytLink[e.itemIndex].split('=');
	yt.play(url[1]);
}

function shareVideo (e) {
	Ti.API.info('ShareVideo');
  	Alloy.Globals.loading.show('Cargando...');
	social.share({
	    status                  : '',
	    url						: ytLink[e.itemIndex],
	    //image                   : '/images/secondPreview.png',
	    androidDialogTitle      : 'Compartir!'
	});	
	Alloy.Globals.loading.hide();
}


                           
function listItemHandler (e) {
	
}

var deviceId = Ti.Platform.id;
Alloy.Globals.ws.videos(deviceId, function(status,obj){
	if (status) {
		 if(OS_IOS){blob = Ti.UI.createImageView({ image: obj.videos[0].thumbnail }).toImage();}
		data=[
			{template: "video_pri_template", 
			img_back:{ image : obj.videos[0].thumbnail},
			img_prev: { image:obj.videos[0].thumbnail },
			lbl_titulo1: { text:obj.videos[0].title_top },
			lbl_duracion: {text:obj.videos[0].duration},
			lbl_tituloDesc: { text:obj.videos[0].title_bottom},
			lbl_descripcion:{ text:obj.videos[0].description},}
		];
			ytLink.push(obj.videos[0].youtube_link);
		for(var i=1; i<obj.videos.length; i++){
			ytLink.push(obj.videos[i].youtube_link);
			data.push({
			    template: "video_list_template", 
			    img_thumbnail: 		{image:obj.videos[i].thumbnail },
			    lbl_duracion2: 		{ text:obj.videos[i].duration }, 
			    lbl_tituloVid: 		{ text:obj.videos[i].title_top },  
			    lbl_subtituloVid:	{ text:obj.videos[i].title_bottom },
	   		});
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
if (OS_IOS){
	yt.addEventListener('complete',function(){
		Ti.API.info('Se completo el video Ajuaaa.!');
		var item = $.listSection.getItemAt(0);
		item.img_back.visible = true;
		$.listSection.updateItemAt(0,item);
	});
}


this.close = function(){
	$.destroy();
};                     

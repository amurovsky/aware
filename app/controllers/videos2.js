var args = arguments[0] || {};
var social = require('com.alcoapps.socialshare');
var icomoonlib = require('icomoonlib');
var Animator = require("Animator");
var fb = require('facebook');
yt = require('youtube');
var data = [];
var ytLink = [];

var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;
var navigation = Alloy.Globals.navigation;
var blob;
function cerrarVentana(){
	//if (osname !== 'android') {activeMovie.stop();};
	Alloy.Globals.navigator.goBack();
	//navigation.back();
}
                             
function listItemHandler (e) {
  var item = $.listSection.getItemAt(e.itemIndex);
  var bindId = e.bindId;
  Ti.API.info('BindID:' + bindId);
  var url = ytLink[e.itemIndex].split('=');
  if (bindId === 'img_shareIcon' || bindId === 'div_shareIcon' || bindId === 'img_share' || bindId === 'div_share') {
  	Alloy.Globals.loading.show('Cargando...');
  	social.share({
		    status                  : '',
		    url						: ytLink[e.itemIndex],
		    //image                   : '/images/secondPreview.png',
		    androidDialogTitle      : 'Compartir!'
		});
	Alloy.Globals.loading.hide();
  }else if(bindId === 'div_expandIcon' || bindId === 'img_expandIcon' || bindId === 'img_thumbnail' || bindId == 'lbl_titulo1'){
  	Alloy.Globals.loading.show('Cargando...');
  	yt.play(url[1]);
  	Alloy.Globals.loading.hide();
  }
  
}

var deviceId = Ti.Platform.id;
Alloy.Globals.ws.videos(deviceId, function(status,obj){
	if (status) {
		 if(OS_IOS){blob = Ti.UI.createImageView({ image: obj.videos[0].thumbnail }).toImage();}
		data=[
			{template: "video_pri_template", 
			img_back:{},
			img_prev: { image:obj.videos[0].thumbnail },
			lbl_titulo1: { text:obj.videos[0].title_top },
			//lbl_titulo2: { text:obj.videos[0].title_bottom}, 
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
		item.img_back.backgroundImage = blob;
		$.listSection.updateItemAt(0,item);
		//$.vid_prev.play();
	});
}


//$.listSection.setItems(videoPriData);

this.close = function(){
	$.destroy();
};                     

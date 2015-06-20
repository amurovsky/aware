var args = arguments[0] || {};
var social = require('com.alcoapps.socialshare');
var moment = require('alloy/moment');
var navigation = Alloy.Globals.navigation;
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;
var articleId = args.articleId;
var data = [];
var rect;
var medidas;
var liked = false;

$.img_back.image = args.imagen;
$.lbl_artTitulo.text = args.titulo;
$.lbl_descripcion.text = args.contenido;
$.lbl_fecha.text = moment(args.fecha).lang("es").format('LL');
$.lbl_likes.text = args.likes;
if (args.liked != null) {
	if (args.liked == '1') {
		$.img_likeIcon.image = '/images/likeIcon_fill.png';	
		liked = true;
	}else $.img_likeIcon.image = '/images/likeIcon.png';	
}


$.img_back.addEventListener('load', function(e){
	    rect = $.img_back.getRect();
	    medidas = $.div_descripcion.getRect();
        Ti.API.info(rect.width +' Desc'+ medidas.width); //actual width of imageView
        Ti.API.info(rect.height + medidas.height); //actual height of imageView  
        $.div_details.height = rect.height;
        $.div_gradient.height = rect.height + 1;
        medidas = rect.height + medidas.height;
});

Alloy.Globals.ws.getComments(articleId,function(status,obj){
	if (status) {
		$.lbl_numComentarios.text = obj.comentarios.length;
		for(var i=0; i<obj.comentarios.length; i++){
			data.push({
				template: 'comment_template',
				img_profile: 		{image:obj.comentarios[i].user.image || '/images/emptyProfile.png'},
			    lbl_nombre: 		{ text:obj.comentarios[i].user.name + ' ' + obj.comentarios[i].user.lastname }, 
			    lbl_comentario: 	{ text:obj.comentarios[i].message },  
			    lbl_tiempo:			{ text:moment(obj.comentarios[i].created_at).lang("es").startOf('hour').fromNow() },
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

// if(!OS_IOS){
	// $.div_addComment.height = screenHeight * 0.18 ;
	// $.list_comments.height = screenHeight * 0.686 ;
// 
	// $.list_comments.addEventListener('touchstart', function(){
    	// $.scroll_details.canCancelEvents = false;
	// });
	// $.list_comments.addEventListener('touchend', function(){
	    // $.scroll_details.canCancelEvents = true;
	// });
	// $.list_comments.addEventListener('touchcancel', function(){
	    // $.scroll_details.canCancelEvents = true;
	// });
// }



var likes = args.likes;

function cerrarVentana(){
	//Alloy.Globals.navigator.goBack();
	navigation.back();
}

function enviar_down (e) {
	e.source.opacity = 0.5;
}
function enviar_up (e) {
	e.source.opacity = 1;
	var message = $.txt_comentario.getValue();
	Ti.API.info('MENSAJE: ' + message);
	if (message != ''){
		Alloy.Globals.ws.addComment(Ti.App.Properties.getString('sessid'), args.articleId, message, function(status,obj){
			if (status) {
				// $.lbl_numComentarios.text = obj.comentarios.length;
				// for(var i=0; i<obj.comentarios.length; i++){
					// data.push({
						// template: 'comment_template',
						// img_profile: 		{image:obj.comentarios[i].user.image || '/images/emptyProfile.png'},
					    // lbl_nombre: 		{ text:obj.comentarios[i].user.name + ' ' + obj.comentarios[i].user.lastname }, 
					    // lbl_comentario: 	{ text:obj.comentarios[i].message },  
					    // lbl_tiempo:			{ text:moment(obj.comentarios[i].created_at).lang("es").startOf('hour').fromNow() },
					// });
				// }
				// $.listSection.setItems(data);
				$.txt_commentario.value = '';
			}else{
				var dialog = Ti.UI.createAlertDialog({
					message:obj,
					buttonNames:['Aceptar'],
					title:''
				});
				dialog.show();
			}
			
		});
	}else{
		var dialog = Ti.UI.createAlertDialog({
				message:'No puede enviar comentarios en blanco',
				buttonNames:['Aceptar'],
				title:''
			});
			dialog.show();
	}
	
  
}
function enviar_cancelar (e) {
  	e.source.opacity = 1;
}
function like_down (e) {
  e.source.opacity = 0.5;
}
function like_up (e) {
	e.source.opacity = 1;
	if (!liked) {
		Alloy.Globals.ws.addLike(Ti.App.Properties.getString('sessid'), args.articleId, function(status,obj){
			Ti.API.info('Ya entro add');
			if (status) {  
		        
			}else{
				var dialog = Ti.UI.createAlertDialog({
					message:obj,
					buttonNames:['Aceptar'],
					title:''
				});
				dialog.show();
			}
		});
		$.img_likeIcon.image = '/images/likeIcon_fill.png';
		liked = true;
		likes = likes + 1;
		$.lbl_likes.text = likes;
	}else{
		Alloy.Globals.ws.removeLike(Ti.App.Properties.getString('sessid'), args.articleId, function(status,obj){
			Ti.API.info('Ya entro remove');
			if (status) {  
		        
			}else{
				var dialog = Ti.UI.createAlertDialog({
					message:obj,
					buttonNames:['Aceptar'],
					title:''
				});
				dialog.show();
			}
		});
		$.img_likeIcon.image = '/images/likeIcon.png';
		liked = false;
		likes = likes - 1;
		$.lbl_likes.text = likes;
	};
	
}

function share_down (e) {
  e.source.opacity = 0.5;
}
function share_up (e) {
	e.source.opacity = 1;
	social.share({
	    status                  : 'Texto de Ejemplo!',
	    url	                    : 'http://cancerdemamalabatallademivida.blogspot.mx/2015/03/en-las-nubes.html',
	    //image                   : '/images/secondPreview.png',
	    androidDialogTitle      : 'Compartir!'
	});
}

$.scroll_details.addEventListener('scroll', function(e) {
	
	var opacity = 1.0;
	var offset = e.y;
	//Ti.API.info(offset);
	if (offset <= 0) {
		if (OS_IOS) {
			backdropImageHeight = Math.ceil((rect.height * 9) / 16);
			var height = backdropImageHeight - offset;
			var scale = height / backdropImageHeight;
			
			var transform = Ti.UI.create2DMatrix({scale: scale});
			transform = transform.translate(0, -offset/(2*scale));
			
			$.img_back.transform = $.div_gradient.transform = transform;
			$.img_back.opacity = 1;
		}	
	} else if (offset > 0) {
		
		opacity = Math.max(1 - (offset / 400), 0.5);
		$.img_back.opacity = opacity; 
		$.img_back.top = Math.round(- offset/5);
	}
	
	// if(offset > 1060){
		// $.scroll_details.setCanCancelEvents(false);
	// }
	// else{
		// $.scroll_details.canCancelEvents = true;
	// }

});

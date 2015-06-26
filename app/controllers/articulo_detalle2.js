
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
var medida;
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

$.div_addComment.addEventListener('postlayout', function(e) {
    // Calculate the center using the RO rect property
    medida = $.div_addComment.getRect();
    Ti.API.info(' X: '+ medida.x +' Y: '+ medida.y + ' Width: ' +medida.width +' Height'+ medida.height);

});
function getComments () {
	Alloy.Globals.ws.getComments(articleId,function(status,obj){
		if (status) {
			$.lbl_numComentarios.text = obj.comentarios.length;
			// var model = Alloy.Collections.comments[0].get('comentario');
			// Ti.API.info(model);
			var view;
			for(var i = obj.comentarios.length-1; i >= 0; i--){
				view = Alloy.createController('comentarios',{
					img_profile: 		obj.comentarios[i].user.image || '/images/emptyProfile.png',
				    lbl_nombre: 		obj.comentarios[i].user.name + ' ' + obj.comentarios[i].user.lastname, 
				    lbl_comentario: 	obj.comentarios[i].message,  
				    lbl_tiempo:			moment(obj.comentarios[i].created_at).lang("es").startOf('minute').fromNow(),
					}).getView();
				
				$.scroll_details.add(view);
			}
			// if(view){
				// view.addEventListener('postlayout', function(e) {
				    // // Calculate the center using the RO rect property
				    // medida = view.getRect();
				    // Ti.API.info(' Comment X: '+ medida.x +' Y: '+ medida.y + ' Width: ' +medida.width +' Height'+ medida.height);
				// });
			// }
			
		}else{
			var dialog = Ti.UI.createAlertDialog({
				message:obj,
				buttonNames:['Aceptar'],
				title:''
			});
			dialog.show();
		}
		
	}); 
}

getComments();

function removeAllChildren(viewObject){
    //copy array of child object references because view's "children" property is live collection of child object references
    var children = viewObject.children.slice(0);
 
    for (var i = 3; i < children.length; ++i) {
        viewObject.remove(children[i]);
    }
}

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
$.txt_comentario.addEventListener('focus', function(e){
	var dialog = Ti.UI.createAlertDialog({
		cancel: 1,
		message:'Es necesario estar registrado para dejar un comentario',
		buttonNames:['Registrar', 'Cancelar'],
		title:''
	});
	

	dialog.addEventListener('click', function(e){
	    if (e.index === e.source.cancel){
	      Ti.API.info('The cancel button was clicked');
	    }else{
	    	Alloy.Globals.loading.show('Cargando...');
	    	Alloy.Globals.navigation.open('login');
	    	navigation.clearHistory();
	    	Alloy.Globals.loading.hide();
	    }
	});
	if (Ti.App.Properties.getString('sessid') == null){
			dialog.show();
		} else {
			$.div_enviar.touchEnabled = true;
			$.div_enviar.opacity = 1;
		}
	
});

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
	if (message != ''){
		$.txt_comentario.blur();
		//$.scroll_details.scrollTo(0,medida.y + medida.height+100);
		Alloy.Globals.ws.addComment(Ti.App.Properties.getString('sessid'), args.articleId, message, function(status,obj){
			if (status) {
				$.txt_comentario.value = '';
				Alloy.Globals.loading.show('Cargando');
					removeAllChildren($.scroll_details);
					getComments();
				//$.scroll_details.scrollTo(0,medida.y);
				setTimeout(function(){
					var scroll = medida.y + medida.height*3;
				    Ti.API.info('Called using setTimeout' + scroll);
				    (OS_IOS) ? '' : $.scroll_details.scrollTo(0, scroll) ;
					//(OS_IOS) ? $.scroll_details.scrollTo(0, medida.y) : $.scroll_details.scrollTo(0, scroll) ;
					Alloy.Globals.loading.hide();
				}, 1000);
				$.div_enviar.touchEnabled = false;
				$.div_enviar.opacity = 0.5;
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
			$.div_enviar.touchEnabled = false;
			$.div_enviar.opacity = 0.5;
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
	var dialog = Ti.UI.createAlertDialog({
		cancel: 1,
		message:'Es necesario estar registrado para darle me gusta',
		buttonNames:['Registrar', 'Cancelar'],
		title:''
	});
	

	dialog.addEventListener('click', function(e){
	    if (e.index === e.source.cancel){
	      Ti.API.info('The cancel button was clicked');
	    }else{
	    	Alloy.Globals.loading.show('Cargando...');
	    	Alloy.Globals.navigation.open('login');
	    	navigation.clearHistory();
	    	Alloy.Globals.loading.hide();
	    }
	});
	if (Ti.App.Properties.getString('sessid') == null){
			dialog.show();
		} else {
			if (!liked) {
				Alloy.Globals.ws.addLike(Ti.App.Properties.getString('sessid'), args.articleId, function(status,obj){
					Ti.API.info('Ya entro add');
					if (status) { 
						$.img_likeIcon.image = '/images/likeIcon_fill.png';
						liked = true;
						likes = likes + 1;
						$.lbl_likes.text = likes; 
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
				Alloy.Globals.ws.removeLike(Ti.App.Properties.getString('sessid'), args.articleId, function(status,obj){
					Ti.API.info('Ya entro remove');
					if (status) {  
				        $.img_likeIcon.image = '/images/likeIcon.png';
						liked = false;
						likes = likes - 1;
						$.lbl_likes.text = likes;
					}else{
						var dialog = Ti.UI.createAlertDialog({
							message:obj,
							buttonNames:['Aceptar'],
							title:''
						});
						dialog.show();
					}
				});
				
			}
		}
	
	
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
	(!OS_IOS) ? $.txt_comentario.blur() : '' ;
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

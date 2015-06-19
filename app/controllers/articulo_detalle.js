var args = arguments[0] || {};
var moment = require('alloy/moment');
var navigation = Alloy.Globals.navigation;
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;
var rect;
function cerrarVentana(){
	//Alloy.Globals.navigator.goBack();
	navigation.back();
}

if (args.liked != null) {
	if (args.liked == '1') {
		$.img_likeIcon.image = '/images/likeIcon_fill.png';	
	}else $.img_likeIcon.image = '/images/likeIcon.png';	
}
$.img_back.image = args.imagen;
$.lbl_artTitulo.text = args.titulo;
$.lbl_descripcion.text = args.contenido;
$.lbl_fecha.text = moment(args.fecha).lang("es").format('LL');

$.img_back.addEventListener('load', function(e){
	    rect = $.img_back.getRect();
        Ti.API.info(rect.width); //actual width of imageView
        Ti.API.info(rect.height); //actual height of imageView  
        $.div_details.height = rect.height;
        $.div_gradient.height = rect.height + 1;
});
if(!OS_IOS){
	$.div_addComment.height = screenHeight * 0.18 ;
	$.tbv_comentarios.height = screenHeight * 0.686 ;

	$.tbv_comentarios.addEventListener('touchstart', function(){
    	$.scroll_details.canCancelEvents = false;
	});
	$.tbv_comentarios.addEventListener('touchend', function(){
	    $.scroll_details.canCancelEvents = true;
	});
	$.tbv_comentarios.addEventListener('touchcancel', function(){
	    $.scroll_details.canCancelEvents = true;
	});
}



var liked = false;
var likes = 361;
function like_down (e) {
  e.source.opacity = 0.5;
}
function like_up (e) {
	e.source.opacity = 1;
	if (!liked) {
		$.img_likeIcon.image = '/images/likeIcon_fill.png';
		liked = true;
		likes = likes + 1;
		$.lbl_likes.text = likes;
	}else{
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
}

$.scroll_details.addEventListener('scroll', function(e) {
	
	var opacity = 1.0;
	var offset = e.y;
	//Ti.API.info(offset);
	if (offset <= 0) {
		
		backdropImageHeight = Math.ceil((rect.height * 9) / 16);
		var height = backdropImageHeight - offset;
		var scale = height / backdropImageHeight;
		
		var transform = Ti.UI.create2DMatrix({scale: scale});
		transform = transform.translate(0, -offset/(2*scale));
		
		$.img_back.transform = $.div_gradient.transform = transform;
		$.img_back.opacity = 1;
		
		
	} else if (offset > 0) {
		
		opacity = Math.max(1 - (offset / 400), 0.5);
		$.img_back.opacity = opacity; 
		$.img_back.top = Math.round(- offset/5);
	}

});


// this.close = function(){
	// $.destroy();
// };
var args = arguments[0] || {};

function cerrarVentana(){
	Alloy.Globals.navigator.goBack();
}

// imageSize = $.img_back.toImage();
// Ti.API.info(imageSize.height);
// $.div_details.height = imageSize.height;

$.img_back.addEventListener('load', function(e){
	 var rect = $.img_back.getRect();
        Ti.API.info(rect.width); //actual width of imageView
        Ti.API.info(rect.height); //actual height of imageView  
        $.div_details.height = rect.height;
        $.div_gradient.height = rect.height;
});

var liked = false;
var likes = 361;
function like_down (e) {
  e.source.opacity = 0.5;
}
function like_up (e) {
	e.source.opacity = 1;
	if (!liked) {
		$.imv_likeIcon.image = '/all/likeIcon_fill.png';
		liked = true;
		likes = likes + 1;
		$.lbl_likes.text = likes;
	}else{
		$.imv_likeIcon.image = '/all/likeIcon.png';
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
		
		var height = 492 - offset;
		backdropImageHeight = Math.ceil((850 * 9) / 16);
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


this.close = function(){
	$.destroy();
};
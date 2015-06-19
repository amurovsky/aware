var args = arguments[0] || {};

var the_image = args.image || '';
var the_title = args.title || '';
var the_subtitle = args.subtitle || '';
var the_likes = args.likes || '0';

$.thumb.image = the_image;
$.title.text = the_title;
$.fecha.text = the_subtitle;
$.likes.text = the_likes;

if (args.liked != null) {
	if (args.liked == '1') {
		$.img_like.image = '/images/likeIcon_fill.png';	
	}else $.img_like.image = '/images/likeIcon.png';	
}



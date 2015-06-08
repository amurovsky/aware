var args = arguments[0] || {};

var the_image = args.image || '';
var the_title = args.title || '';
var the_subtitle = args.subtitle || '';

$.thumb.image = the_image;
$.lbl_titulo.text = the_title;
$.lbl_fecha.text = the_subtitle;

imageSize = $.thumb.toImage();

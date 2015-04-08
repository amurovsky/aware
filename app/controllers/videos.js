var args = arguments[0] || {};
var osname = Ti.Platform.osname;
function cerrarVentana(){
	$.videos.close();
}

var view =$.tablaConteiner;

var datosTabla = [{title:'Primer Video'},{title:'Segundo Video'},{title:'Tercer Video'},{title:'Cuarto Video'},{title:'Quinto Video'},{title:'Sexto Video'},{title:'Septimo Video'}];

var tabla = $.tablaVideos;
var tableArray = [];
for (var i=0; i < datosTabla.length; i++) {
  var rows = Ti.UI.createTableViewRow({
  	selectionStyle: 'none'
  });
  var titulo = Titanium.UI.createLabel({
        text :datosTabla[i].title,
        width : 'auto',
        top : '30%',
        left : '50%',
        height : 'auto',
        color : 'white',
    });
    var subtitulo = Titanium.UI.createLabel({
        text :'Subtitulo',
        width : 'auto',
        top : '50%',
        left : '50%',
        height : 'auto',
        color : 'white',
    });
 var photo = Ti.UI.createImageView({
 		//image:'/iphone/appicon-60.png',
 		backgroundColor: 'black',
		left:10,
		width:150,
		height:'80%'
 }); 
 	rows.add(photo);
    rows.add(titulo);
    rows.add(subtitulo);
    rows.height = 100;
  tableArray.push(rows);
};
tabla.data = tableArray;
view.add(tabla);
var player = (osname === 'android') ? require('titutorial.youtubeplayer') : require('it.scsoft.tiyoutube');

tabla.addEventListener('click',function(e){
	Ti.API.info('Index: '+ e.index);
	if (e.index == 0) {
		if (osname === 'android') {
			player.playVideo('n1JxsgqTQ9g');
		}else{
			player.openVideo({url:'https://www.youtube.com/watch?v=n1JxsgqTQ9g'});
		}
		
	};
	
});


$.lastVideo.addEventListener('singletap',function(e){
	if (osname === 'android') {
		player.playVideo('ZE7TzIGrRb8');
	}else{
		player.openVideo({url:'https://www.youtube.com/watch?v=ZE7TzIGrRb8'});	
	}
	
});
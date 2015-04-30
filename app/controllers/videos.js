var args = arguments[0] || {};
var osname = Ti.Platform.osname;
var icomoonlib = require('icomoonlib');
var Animator = require("Animator");
var activeMovie;

// Obtenemos las dimensiones del dispositivo
// var width = Ti.Platform.displayCaps.platformWidth;
// var height = Ti.Platform.displayCaps.platformHeight;
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;

function cerrarVentana(){
	if (osname !== 'android') {activeMovie.stop();};
	 //new Animator().moveTo({view:$.videosView, value:{x:-(Ti.Platform.displayCaps.platformWidth),y:0},duration:500,onComplete:$.videosView.hide()});
	 
	// var t = Ti.UI.create2DMatrix();
		// t = t.translate(-(Ti.Platform.displayCaps.platformWidth), 0); 
// 	
// 	
    // var animation = Ti.UI.createAnimation({transform: t, duration: 500});
    // $.videosView.animate(animation);
    
    // animation.addEventListener('complete',function(){
    	// //$.videosView.hide();
    	// Alloy.Globals.navigator.goBack();
    // });
    
	Alloy.Globals.navigator.goBack();
	//$.videosView.hide();
}

if (osname !== 'android') {
	$.menuButton.top = '40%';
	$.titulo.top = '50%';
};
var datosTabla = [{title:'',subtitle:'',duration:''},
				  {title:'',subtitle:'',duration:''},
				  {title:'Como hacer una correcta autoexploración',subtitle:'Tutorial No.02 de Aware®',duration:'4:33'},
				  {title:'Como hacer una correcta autoexploración',subtitle:'Tutorial No.03 de Aware®',duration:'9:18'}];
				  
var tabla = $.tablaVideos;
var tableArray = [];
var tableImg;
if (osname === 'android') {
	tableImg =['secondPreview@3x.png','thirdPreview@3x.png'];
}else{
	tableImg =['secondPreview.png','thirdPreview.png'];
};

for (var i=0; i < datosTabla.length; i++) {

  if (i == 0) {
  	var rows = Ti.UI.createTableViewRow({
		  	selectionStyle: 'none',
		  	backgroundColor:'transparent', 
		  	height:screenHeight * 0.318,
		  	//height:(osname == 'android') ? (height * 0.15) : (height * 0.318),
 	 });
 	 if (osname !== 'android') {
 	 	activeMovie = Titanium.Media.createVideoPlayer({
	    	backgroundColor:'#111',
	    	mediaControlStyle:Titanium.Media.VIDEO_CONTROL_NONE,
	    	scalingMode:Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
	    	url:'/video/test.mp4',
	    	repeatMode: Titanium.Media.VIDEO_REPEAT_MODE_ONE,
		});
		var gradientView = Ti.UI.createView({
				backgroundGradient: {
			        type: 'linear',
			        startPoint: { x: '100%', y: '100%' },
			        endPoint: { x: '100%', y: '60%' },
			        colors: [{ color: 'black', offset:0.0}, { color: 'transparent', offset: 1.0}],
		        }
		});
		
		rows.add(activeMovie);
 	 	rows.add(gradientView);
	}else{
		var gradientView = Ti.UI.createView({
				backgroundGradient: {
			        type: 'linear',
			        startPoint: { x: '100%', y: '100%' },
			        endPoint: { x: '100%', y: '60%' },
			        colors: [{ color: 'black', offset:0.0}, { color: 'transparent', offset: 1.0}],
		        }
		});
		imagen = Ti.UI.createImageView({
			image: '/all/primerVideo.jpg',
			height:'150%',
			width:'118%' 
		});
		rows.add(imagen);
		rows.add(gradientView);
	};
	var expandIcon = icomoonlib.getIconAsLabel("Aware-Icons","expandIcon",screenHeight * 0.037,{color:"#fb8ac7",bottom:"6%",right:"5%"});
	
 	 var nombreVideo1 = Ti.UI.createLabel({
 	 	color: 'white',
		//top:'52%',
		bottom: '27%',
		left:'6%',
		font:{fontFamily:'Raleway-Light',fontSize:screenHeight * 0.023},
		text:'Cinco sencillos pasos'
 	 });
 	 var nombreVideo2 = Ti.UI.createLabel({
 	 	color: '#eeeeee',
		//top: '59%',
		bottom: '14%',
		left:'6%',
		font:{fontFamily:'Raleway-Bold',fontSize:screenHeight * 0.035},
		text:'Para la autoexploración'
 	 });
 	 var duracionVideo = Ti.UI.createLabel({
 	 	color: '#fa89c6',
		//top: '72%',
		bottom: '5%',
		left:'6%',
		font:{fontFamily:'HelveticaNeue-Medium',fontSize:screenHeight * 0.026},
		text:'7:50 min',
 	 });
 	  	 
 	 rows.add(nombreVideo1);
 	 rows.add(nombreVideo2);
 	 rows.add(duracionVideo);
 	 rows.add(expandIcon);
  };
  if (i == 1) {
  	 var rows = Ti.UI.createTableViewRow({
		 selectionStyle: 'none',
		 backgroundColor:'white',
		 height: 'auto',
		 layout: 'vertical' ,
		 //height:height * 0.413
		 //height: (osname == 'android') ? (height * 0.2) : (height * 0.413)
 	 });
	var conteinerTitle = Ti.UI.createView({
			top:0,
			height:screenHeight * 0.07	
	});
	var conteinerDescription = Ti.UI.createView({
			height:screenHeight * 0.30,
			top:0		
	});
	var conteinerSeparator = Ti.UI.createView({
			height:screenHeight * 0.06,
			top:0	
	});
 	 var mainTitle = Ti.UI.createLabel({
 	 	color: '#4f4f4f',
		font:{fontFamily: 'Montserrat-Regular', fontSize:screenHeight * 0.025},
		width: 'auto',
		//top: '6%',
		left: '6%',
		text: 'Tutorial No.1'
 	 });
 	 var mainDescription = Ti.UI.createLabel({
 	 	color: '#606060',
		font:{fontFamily: 'HelveticaNeue-Light', fontSize:screenHeight * 0.023},
		left:'6%',
		right:'6%',
		top: 0,
		width:'auto',
		text:'Explórate 7 días después de la menstruación, si ya no reglas hazlo en un día fijo del mes. Si olvidaste hacerlo en la fecha programada hazlo cuando te acuerdes; lo más importante es hacerlo periódicamente, conocer lo que es normal y cómo se sienten las mamas dependiendo del periodo del mes, la edad o de ciertas circunstancias como el embarazo. \n \nEn caso de notar una anomalía, es de mucha importancia acudir al médico de inmediato.'
 	 });
 	 var separator = Ti.UI.createView({
 	 		backgroundColor:'#fecce7',
 	 		height:'30%',
 	 		width:'100%',
 	 		bottom:0
 	 });
 	 conteinerTitle.add(mainTitle);
 	 conteinerDescription.add(mainDescription);
 	 conteinerSeparator.add(separator);
 	 rows.add(conteinerTitle);
 	 rows.add(conteinerDescription);
 	 rows.add(conteinerSeparator);
  };
  if (i>1) {
	  var rows = Ti.UI.createTableViewRow({
		  	selectionStyle: 'none',
		  	backgroundColor:'#fecce7', 
		  	height:100
		  	//height:(i == datosTabla.length -1) ? 110 : 100,
	 });
	 var rowBackground = Ti.UI.createView({
	  		backgroundColor: 'white',
	  		bottom: '10%',
	  		//bottom:(i == datosTabla.length -1) ? '10%' : '',
	  		width: '94.6%',
	  		layout:'horizontal'
	  });
	  var conteinerThumbnail = Ti.UI.createView({
	  		width:'42%',
	  		//left:0,
	  });
	  var conteinerTitles = Ti.UI.createView({
	  		width:'45%',
	  		layout:'vertical',
	  		//left:'42%',
	  });
	  var conteinerShareIcon = Ti.UI.createView({
	  		width:'13%',
	  		//left:'87%'
	  });
	  var titulo = Titanium.UI.createLabel({
	        text :datosTabla[i].title,
	        color:'#505050',
	        width : 'auto',
	        top : '7%',
	        //left : '43%',
	        height : 'auto',
	        font:{
	        	fontFamily:'Helvetica-Light', fontSize: screenHeight * 0.021
	        }
	    });
	    var subtitulo = Titanium.UI.createLabel({
	        text :datosTabla[i].subtitle,
	        width : 'auto',
	        //top : '46%',
	        top:'7%',
	        //left : '43%',
	        left:0,
	        height : 'auto',
	        color : '#fb8ac7',
	        font:{
	        	fontFamily:'Helvetica-Bold', fontSize:screenHeight * 0.016
	        }
	    });
	  var thumbnail = Ti.UI.createView({
	  		//image:'/all/' + tableImg[i-2],
	  		backgroundImage:'/all/' + tableImg[i-2],
	  		//backgroundColor:'gray',
	  		height:'76%',
	  		width:'85%'
	  });
	  var durationView = Ti.UI.createView({
		 	opacity:0.8,
		 	backgroundColor: 'black',
		 	height:'30%',
		 	width:'35%',
		 	bottom:0,
		 	right:0
	 });
	 var durationLabel = Ti.UI.createLabel({
		 	color:'white',
		 	text: datosTabla[i].duration,
		 	font:{fontFamily:'HelveticaNeue', fontSize:screenHeight * 0.020}
	 }); 
	  var shareIcon = icomoonlib.getIconAsLabel("Aware-Icons",
                                 "shareIcon",
                                 screenHeight * 0.025,
                                 {color:"#fcaed8",top:"10%",});
                                 
    conteinerTitles.add(titulo);
    conteinerTitles.add(subtitulo);
    durationView.add(durationLabel);                                   
	thumbnail.add(durationView);
	conteinerThumbnail.add(thumbnail); 
	conteinerShareIcon.add(shareIcon);
    rowBackground.add(conteinerThumbnail);  
    rowBackground.add(conteinerTitles);  
    rowBackground.add(conteinerShareIcon);                          
    rows.add(rowBackground);
    rows.height = '100';
  };
  
                                 
   
  tableArray.push(rows);
};
tabla.data = tableArray;
$.tablaConteiner.add(tabla);
var player = (osname === 'android') ? require('titutorial.youtubeplayer') : require('it.scsoft.tiyoutube');

var get_yt_clip = require('/get_yt_clip');

tabla.addEventListener('click',function(e){
	Ti.API.info('Index: '+ e.index);
	if (e.index == 2) {
		if (osname === 'android') {
			player.playVideo('n1JxsgqTQ9g');
		}else{
			//player.openVideo({url:'https://www.youtube.com/watch?v=n1JxsgqTQ9g'});
			get_yt_clip('n1JxsgqTQ9g', function(err, clip_url) {
        if (!err && clip_url) {
            videoPlayer.url = clip_url;
            videoPlayer.play();
        }
        else {
            console.error(err);
        }
    });
		}
		
	};
	
});
     
expandIcon.addEventListener('click',function(e){
	if (osname === 'android') {
		player.playVideo('ZE7TzIGrRb8');
	}else{
		player.openVideo({url:'https://www.youtube.com/watch?v=ZE7TzIGrRb8'});	
	}
	
});         
Ti.API.info(player);
player.addEventListener('finish',function(e){
	alert('Termino el Video');
});


this.close = function(){
	$.destroy();
};                     

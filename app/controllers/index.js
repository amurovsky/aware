Ti.API.info('Width: '+ Ti.Platform.displayCaps.platformWidth + 'Height' + Ti.Platform.displayCaps.platformHeight);
var osname = Ti.Platform.osname;
Ti.API.info('Platform: ' + osname);
function menu(e){
	var boton = e.source;
	Ti.API.info('boton Id:' + boton.id);
	switch(boton.id){
		case 'videos':
			var videos = Alloy.createController('videos').getView();
				//videos.open({transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
				videos.open({modal:true});
		break;
		case 'articulos':
			var articulos = Alloy.createController('articulos').getView();
				//articulos.show();
				$.index.add(articulos);
		break;
		case 'puntos':
			var puntos = Alloy.createController('puntos').getView();
				puntos.open({modal:true});
		break;
		case 'regala':
			var regala = Alloy.createController('regala').getView();
				regala.open({modal:true});
		break;
		case 'directorios':
			var directorios = Alloy.createController('directorios').getView();
				directorios.open({modal:true});
		break;
	}
	
}

var moment = require('alloy/moment');
var fechadeCompra;
var fechaLabel = $.fechaLabel;
Ti.API.info(Ti.App.Properties.getString('fechadeCompra'));
if (Ti.App.Properties.getString('fechadeCompra') != null) {

	fechaLabel.text = Ti.App.Properties.getString('fechadeCompra');
}else{
	fechaLabel.text = moment().lang("es").format("DD / MMM / YY");
};

function showPicker(e){
	// var openButton = $.cambiarFechaButton;
	// openButton.touchEnabled = false;
// 	
	// var t = Titanium.UI.create2DMatrix();
		// t = t.scale(0);
// 	
		// var w = Titanium.UI.createWindow({
			// backgroundColor:'white',
			// top: 0,
			// height: '80%',
			// opacity:0.92,
			// fullscreen: (osname != "android") ? true : false,
			// transform:t,
		// });
		// // create first transform to go beyond normal size
		// var t1 = Titanium.UI.create2DMatrix();
		// t1 = t1.scale(1.1);
		// var a = Titanium.UI.createAnimation();
		// a.transform = t1;
		// a.duration = 200;
// 	
		// // when this animation completes, scale to normal size
		// a.addEventListener('complete', function()
		// {
			// Titanium.API.info('here in complete');
			// var t2 = Titanium.UI.create2DMatrix();
			// t2 = t2.scale(1.0);
			// w.animate({transform:t2, duration:200});
// 	
		// });
// 	
		// var picker = Ti.UI.createPicker({
			// type: Titanium.UI.PICKER_TYPE_DATE,
			// locale: 'es',
		// });
// 		
		// var toolbar = Titanium.UI.createView({
			// backgroundColor: '#ff89c7',
			// height:'10%',
			// bottom: 0,
		// });
		// picker.addEventListener('change', function (e){
			// $.fechaLabel.text = moment(e.value).lang("es").format("DD / MMM / YY");
			// fechadeCompra = moment(e.value).lang("es").format("DD / MMM / YY");	
			// Ti.API.info(fechadeCompra);	
		// });
// 		
		// // create a button to close window
		// var b = Titanium.UI.createButton({
			// title:'Cerrar',
			// height:30,
			// width:150,
			// color: 'white'
		// });
		// b.addEventListener('click', function()
		// {
			// var t3 = Titanium.UI.create2DMatrix();
			// t3 = t3.scale(0);
			// w.close({transform:t3,duration:300});
			// if (fechadeCompra != null) {
				// Ti.App.Properties.setString('fechadeCompra',fechadeCompra);
				// Ti.API.info('La fecha de compra es: ' + Ti.App.Properties.getString('fechadeCompra'));
			// };
			// openButton.touchEnabled = true;
// 			
		// });
// 		
		// toolbar.add(b);
		// w.add(picker);
		// w.add(toolbar);
		// w.open(a);
		
		
		//---------------- ANDROID --------------------------//
		Ti.API.info('ya te entro');
		var w = Titanium.UI.createWindow({
			backgroundColor:'white',
			top: 0,
			height: '80%',
			width: '80%'
			//opacity:0.92,
			//fullscreen: (osname != "android") ? true : false,
			//transform:t,
		});
		
		var picker = Ti.UI.createPicker({
			type: Titanium.UI.PICKER_TYPE_DATE,
			locale: 'es',
		});
		
		var toolbar = Titanium.UI.createView({
			backgroundColor: '#ff89c7',
			height:'10%',
			bottom: 0,
		});
		picker.addEventListener('change', function (e){
			//$.fechaLabel.text = moment(e.value).lang("es").format("DD / MMM / YY");
			//fechadeCompra = moment(e.value).lang("es").format("DD / MMM / YY");	
			//Ti.API.info(fechadeCompra);
			Ti.API.info('Cambio');	
		});
		
		// create a button to close window
		var b = Titanium.UI.createButton({
			title:'Cerrar',
			height:30,
			width:150,
			color: 'white'
		});
		b.addEventListener('click', function()
		{
			//var t3 = Titanium.UI.create2DMatrix();
			//t3 = t3.scale(0);
			//w.close({transform:t3,duration:300});
			w.close();
			// if (fechadeCompra != null) {
				// Ti.App.Properties.setString('fechadeCompra',fechadeCompra);
				// Ti.API.info('La fecha de compra es: ' + Ti.App.Properties.getString('fechadeCompra'));
			// };
			// openButton.touchEnabled = true;
			
		});
		
		toolbar.add(b);
		w.add(picker);
		w.add(toolbar);
}



$.index.open();

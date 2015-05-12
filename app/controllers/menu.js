var args = arguments[0] || {};

//-------- Globales y Require´s -------------//
var Animator = require("Animator");
var moment = require('alloy/moment');
var icomoonlib = require('icomoonlib');
var fb = require('facebook');
var osname = Ti.Platform.osname;
var footer = $.footer;
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;

//-------- ProfileImage && Username && Email ----------------//
$.profileImg.image = Ti.App.Properties.getString('profileImg');
$.profileName.text = Ti.App.Properties.getString('userName');
$.profileMail.text = Ti.App.Properties.getString('email');
//-------- Logout -------------------//
function logout_down (e) {
  e.source.opacity=0.5;
}
function logout_up (e) {
	e.source.opacity=1;	
	Ti.API.info('ADIOS');
	Ti.App.Properties.setString('userName',null);	
	fb.logout();
	Alloy.Globals.navigator.openLogin();
}

// ------------------  Funcion para abrir las diferentes vistas del menu ------------------------------------- //
function menu(e){
	var boton = e.source;
	Ti.API.info('boton Id:' + boton.id);
	switch(boton.id){
		case 'videos':
			//var videos = Alloy.createController('videos').getView();
				//videos.open({transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
				//videos.show({theme: (osname == 'android') ? 'Theme.AppCompat.Light.NoActionBar' : ''});
				//$.index.add(videos);
				
				Alloy.Globals.navigator.openWindow('videos');
				//new Animator().flip({view:videos,value:{x:-1,y:1},duration:500});
				//new Animator().moveTo({view:videos, value:{x:Ti.Platform.displayCaps.platformWidth,y:0},duration:500});
				
		break;
		 case 'articulos':
			// var articulos = Alloy.createController('articulos').getView();
				// articulos.open({modal:true});
				Alloy.Globals.navigator.openWindow('articulos');
		 break;
		// case 'puntos':
			// var puntos = Alloy.createController('puntos').getView();
				// puntos.open({modal:true});
		// break;
		// case 'regala':
			// var regala = Alloy.createController('regala').getView();
				// regala.open({modal:true});
		// break;
		// case 'directorios':
			// var directorios = Alloy.createController('directorios').getView();
				// directorios.open({modal:true});
		// break;
	}
	
}

//--------- Animaciones de la parte inferior del Menu ------------------------ //

$.tituloCiclo.font = {fontFamily:'OpenSans-SemiBold',fontSize:screenHeight * 0.022};
$.tituloCompra.font = {fontFamily:'OpenSans-SemiBold',fontSize:screenHeight * 0.022};

$.diaFechaCiclo.font = {fontFamily:'OpenSans-Light',fontSize:screenHeight * 0.14};
$.diaFechaCompra.font = {fontFamily:'OpenSans-Light',fontSize:screenHeight * 0.14};

$.restoFechaCiclo.font = {fontFamily:'OpenSans-SemiBold',fontSize:screenHeight * 0.027};
$.restoFechaCompra.font = {fontFamily:'OpenSans-SemiBold',fontSize:screenHeight * 0.027};

var cicloButton = $.cicloButton;
var compraButton = $.compraButton;
var logoutButton = $.logoutButton;
var cicloIcon  = icomoonlib.getIconAsBlob("Aware-Icons","cicloIcon",screenHeight * 0.12,{color:"#ff82c8"});
var compraIcon = icomoonlib.getIconAsBlob("Aware-Icons","compraIcon",screenHeight * 0.12,{color:"#ff82c8"});
var logoutIcon = icomoonlib.getIconAsBlob("Aware-Icons","logoutIcon",screenHeight * 0.035,{color:"white"});

cicloButton.image = cicloIcon;
compraButton.image = compraIcon;
logoutButton.image = logoutIcon;
var flag = 0;
compraButton.addEventListener('click',function(){
	if (flag == 0) {
		new Animator().moveTo({view:footer,value:{x:-(Ti.Platform.displayCaps.platformWidth * 0.5),y:0}, duration:500});
		flag=1;
	}else{
		new Animator().moveTo({view:footer,value:{x:0,y:0}, duration:500});
		flag=0;
	};
	
});

cicloButton.addEventListener('click',function(){
	if (flag == 0) {
		new Animator().moveTo({view:footer,value:{x:(Ti.Platform.displayCaps.platformWidth * 0.5),y:0}, duration:500});
		flag=1;
	}else{
		new Animator().moveTo({view:footer,value:{x:0,y:0}, duration:500});
		flag=0;
	};
	
});

//----------------   Mostrar PickerView en sus diferentes Versiones (Android & IOS) ----------------//
var fechadeCompra;
var fechadeCiclo;
var diaFechaCompra = $.diaFechaCompra;
var restoFechaCompra = $.restoFechaCompra;
var diaFechaCiclo = $.diaFechaCiclo;
var restoFechaCiclo = $.restoFechaCiclo;

Ti.API.info('Fecha de Compra: ' + Ti.App.Properties.getString('fechadeCompra'));
Ti.API.info('Fecha de Ciclo: ' + Ti.App.Properties.getString('fechadeCiclo'));
//evaluamos si hay fecha de Compra almacenada se pone la fecha actual
if (Ti.App.Properties.getString('fechadeCompra') != null) {
	var fechaCompra = Ti.App.Properties.getString('fechadeCompra');
    var fechaCompraSplited = fechaCompra.split(" ");
    diaFechaCompra.text = fechaCompraSplited[0];
    restoFechaCompra.text = fechaCompraSplited[1] +' '+ fechaCompraSplited[2] +' ' + fechaCompraSplited[3];

}else{
	//ponemos fecha actual si no hay fecha almacenada
	var fecha = moment().lang("es").format("DD MMM / YYYY");
    var fechaSplited = fecha.split(" ");
    diaFechaCompra.text = fechaSplited[0];
    restoFechaCompra.text = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3];    
};

//evaluamos si hay fecha de Ciclo almacenada se pone la fecha actual
if (Ti.App.Properties.getString('fechadeCiclo') != null) {
    var fechaCiclo = Ti.App.Properties.getString('fechadeCiclo');
    var fechaCicloSplited = fechaCiclo.split(" ");
    diaFechaCiclo.text = fechaCicloSplited[0];
    restoFechaCiclo.text = fechaCicloSplited[1] +' '+ fechaCicloSplited[2] +' ' + fechaCicloSplited[3];
}else{
	//ponemos fecha actual si no hay fecha almacenada
	var fecha = moment().lang("es").format("DD MMM / YYYY");
    var fechaSplited = fecha.split(" ");
    diaFechaCiclo.text = fechaSplited[0];
    restoFechaCiclo.text = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3];
};

function showPicker(e){
	var boton = e.source;
	Ti.API.info('boton Id: ' + boton.id);
	if (osname != 'android') {

		footer.touchEnabled = false;
		
		var t = Titanium.UI.create2DMatrix();
			t = t.scale(0);
		
		var w = Titanium.UI.createWindow({
				backgroundColor:'white',
				top: 0,
				height: '75%',
				opacity:0.92,
				fullscreen: (osname != "android") ? true : false,
				transform:t,
			});
			// create first transform to go beyond normal size
		var t1 = Titanium.UI.create2DMatrix();
			t1 = t1.scale(1.1);
		var a = Titanium.UI.createAnimation();
			a.transform = t1;
			a.duration = 200;
		
			// when this animation completes, scale to normal size
			a.addEventListener('complete', function()
			{
				Titanium.API.info('here in complete');
				var t2 = Titanium.UI.create2DMatrix();
				t2 = t2.scale(1.0);
				w.animate({transform:t2, duration:200});
		
			});
		
		var picker = Ti.UI.createPicker({
				type: Titanium.UI.PICKER_TYPE_DATE,
				locale: 'es',
				minDate : new Date(2010,00,01), //1990 Jan 1
	     		maxDate : new Date(), // Current Date
			});
			
		var toolbar = Titanium.UI.createView({
				backgroundColor: '#ff89c7',
				height:'10%',
				bottom: 0,
			});
			picker.addEventListener('change', function (e){
				//$.fechaLabel.text = moment(e.value).lang("es").format("DD / MMM / YY");
				var fecha = moment(e.value).lang("es").format("DD MMM / YYYY");
    			var fechaSplited = fecha.split(" ");
    			if (boton.id == 'diaFechaCompra') {
    				diaFechaCompra.text = fechaSplited[0];
    				restoFechaCompra.text = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3];
    			}else{
    				diaFechaCiclo.text = fechaSplited[0];
    				restoFechaCiclo.text = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3];
    			};
				fechadeCompra = fecha;	
				Ti.API.info(fechadeCompra);	
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
				var t3 = Titanium.UI.create2DMatrix();
				t3 = t3.scale(0);
				w.close({transform:t3,duration:300});
				if (fechadeCompra != null) {
					if (boton.id == 'diaFechaCompra') {
						Ti.App.Properties.setString('fechadeCompra',fechadeCompra);
						Ti.API.info('La fecha de compra es: ' + Ti.App.Properties.getString('fechadeCompra'));
					}else{
						Ti.App.Properties.setString('fechadeCiclo',fechadeCompra);
						Ti.API.info('La fecha de ciclo es: ' + Ti.App.Properties.getString('fechadeCiclo'));
					};
				};
				footer.touchEnabled = true;
				
			});
			
			toolbar.add(b);
			w.add(picker);
			w.add(toolbar);
			w.open(a);

	} else{
		
		//-------------------------- ANDROID -------------------------------//
			
			diaFechaCiclo.touchEnabled = false;
			diaFechaCompra.touchEnabled = false;
			compraButton.touchEnabled = false;
			cicloButton.touchEnabled = false;
			var t = Titanium.UI.create2DMatrix();
				t = t.scale(0);
			var w = Titanium.UI.createView({
					backgroundColor:'white',
					top: 0,
					height: '75%',
					opacity:0.92,
					//theme: 'Theme.AppCompat.Light.NoActionBar'
					//fullscreen: (osname != "android") ? true : false,
				});
				// create first transform to go beyond normal size
				var t1 = Titanium.UI.create2DMatrix();
				t1 = t1.scale(1.1);
				var a = Titanium.UI.createAnimation();
				a.transform = t1;
				a.duration = 200;
				// when this animation completes, scale to normal size
				w.animate(a);
				a.addEventListener('complete', function()
				{
					Titanium.API.info('here in complete');
					var t2 = Titanium.UI.create2DMatrix();
					t2 = t2.scale(1.0);
					w.animate({transform:t2, duration:200});
			
				});
			
				var picker = Ti.UI.createPicker({
					type: Titanium.UI.PICKER_TYPE_DATE,
					locale: 'es',
					backgroundColor: 'white',
					minDate : new Date(2010,00,01),
		     		maxDate : new Date(), 
				});
				
				var toolbar = Titanium.UI.createView({
					backgroundColor: '#ff89c7',
					height:'10%',
					bottom: 0,
				});
				picker.addEventListener('change', function (e){
					//$.fechaLabel.text = moment(e.value).lang("es").format("DD / MMM / YY");
					var fecha = moment(e.value).lang("es").format("DD MMM / YYYY");
	    			var fechaSplited = fecha.split(" ");
	    			if (boton.id == 'diaFechaCompra') {
	    				diaFechaCompra.text = fechaSplited[0];
	    				restoFechaCompra.text = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3];
	    			}else{
	    				diaFechaCiclo.text = fechaSplited[0];
	    				restoFechaCiclo.text = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3];
	    			};
					fechadeCompra = fecha;	
					Ti.API.info(fechadeCompra);	
				});
				// create a button to close window
				var b = Titanium.UI.createButton({
					title:'Cerrar',
					height:30,
					width:150,
					color: 'white',
					backgroundImage: 'NONE'
				});
				b.addEventListener('click', function()
				{
					var t3 = Titanium.UI.create2DMatrix();
					t3 = t3.scale(0);
					w.animate({transform:t3,duration:300});
					w.remove(w);
					if (fechadeCompra != null) {
						if (boton.id == 'diaFechaCompra') {
							Ti.App.Properties.setString('fechadeCompra',fechadeCompra);
							Ti.API.info('La fecha de compra es: ' + Ti.App.Properties.getString('fechadeCompra'));
						}else{
							Ti.App.Properties.setString('fechadeCiclo',fechadeCompra);
							Ti.API.info('La fecha de ciclo es: ' + Ti.App.Properties.getString('fechadeCiclo'));
						};
					};
					diaFechaCiclo.touchEnabled = true;
					diaFechaCompra.touchEnabled = true;
					compraButton.touchEnabled = true;
					cicloButton.touchEnabled = true;
					
				});
				
				toolbar.add(b);
				w.add(picker);
				w.add(toolbar);
				$.menu.add(w);
		
	};
}

this.close = function(){
	$.destroy();
};

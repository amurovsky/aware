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
var navigation = Alloy.Globals.navigation;
Ti.API.info('*--- SESSION ID ---*',Ti.App.Properties.getString('sessid'));

//-------- ProfileImage && Username && Email ----------------//
if (Ti.App.Properties.getString('userName') != null) {
	$.profileName.text = Ti.App.Properties.getString('userName');
	$.profileMail.text = Ti.App.Properties.getString('email');
	$.profileImg.image = Ti.App.Properties.getString('profileImg');
	if (Ti.App.Properties.getString('profileImg')) {
		$.profileImg.image = Ti.App.Properties.getString('profileImg');
	}else{
		$.profileImg.image = '/images/emptyProfile.png';
	}
}else{
	$.profileImg.image = '/images/emptyProfile.png';
	$.profileName.text = 'Usuario Anonimo';
}

// ----------- Change Profile -------------------------- //
function changeProfile (e) {
  	var ImageUploadPanel = require("ImageUploadPanel");
	var imgUploadPanel = new ImageUploadPanel($.menu, "Selecciona una foto de perfil");
		imgUploadPanel.open({
			success: function(imageResource){
				Ti.API.info('Succes.!');
				if (imageResource.height > imageResource.width) {
					$.profileImg.setHeight('150%');
				}else{
					$.profileImg.setWidth('150%');
				}
				$.profileImg.setImage(imageResource);
			},
			cancel: function(){
				// Alloy.Globals.panelLoading.hide();
			},
			error: function(error){
				// Alloy.Globals.panelLoading.hide();
				
				// called when there's an error
				var a = Titanium.UI.createAlertDialog({title:'Error'});
				
				if (error.code == Titanium.Media.NO_CAMERA) {
					a.setMessage('Su dispositivo no tiene camara integrada');
				} else {
					a.setMessage('Ocurrio un error inesperado: ' + error.code);
				}
				a.show();
			}
		});
}


//-------- Logout -------------------//
function logout_down (e) {
  e.source.opacity=0.5;
}
function logout_up (e) {
	Alloy.Globals.loading.show('Cerrando Sesión...');
	e.source.opacity=1;	
	Ti.API.info('ADIOS');
	Ti.App.Properties.setString('userName',null);	
	Ti.App.Properties.setString('profileImg',null);
	Ti.App.Properties.setString('email',null);
	Ti.App.Properties.setString('userId',null);
	Ti.App.Properties.setString('sessid',null);
	fb.logout();
	//Alloy.Globals.navigator.openLogin();
	navigation.open('login',{transition: 'crossFade', duration: 500, transitionColor: '#fff'});
	navigation.clearHistory();
	Alloy.Globals.loading.hide();
}

// ---------------- REGALA SALUD -------------------- //

function regalaSalud (e) {
	var regala = Alloy.createController('regala').getView();
	$.menu.add(regala);
}

// ------------------  Funcion para abrir las diferentes vistas del menu ------------------------------------- //
function menu(e){
	var boton = e.source;
	Ti.API.info('boton Id:' + boton.id);
	switch(boton.id){
		case 'videos':
			// var videos = Alloy.createController('videos').getView();
				//videos.open({transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
				//videos.show({theme: (osname == 'android') ? 'Theme.AppCompat.Light.NoActionBar' : ''});
				//$.index.add(videos);
				
				// var targetedValue = Ti.UI.create2DMatrix();
    				// targetedValue = targetedValue.scale(-1, 1);
    				// var animation = Ti.UI.createAnimation({transform: targetedValue, duration: 1000});
    				// $.menu.animate(animation);
					// animation.addEventListener('complete',function(){
						// Alloy.Globals.navigator.openWindow('videos2');
					// });
					
				//Alloy.Globals.navigator.openWindow('videos2');
				navigation.open('videos2');
				//new Animator().flip({view:videos,duration:500});
				//new Animator().moveTo({view:videos, value:{x:Ti.Platform.displayCaps.platformWidth,y:0},duration:500});
				
		break;
		 case 'articulos':
			// var articulos = Alloy.createController('articulos').getView();
				// articulos.open({modal:true});
				//Alloy.Globals.navigator.openWindow('articulos');
				navigation.open('articulos');
		 break;
		case 'puntos':
			// var puntos = Alloy.createController('puntos').getView();
				// puntos.open({modal:true});
				//Alloy.Globals.navigator.openWindow('puntos');
				navigation.open('puntos');
		break;
		case 'regala':
			// var regala = Alloy.createController('regala').getView();
				// regala.open({modal:true});
				regalaSalud();
		break;
		case 'directorios':
			// var directorios = Alloy.createController('directorios').getView();
				// directorios.open({modal:true});
				//Alloy.Globals.navigator.openWindow('directorios');
				navigation.open('directorios');
		break;
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
	cicloButton.height = screenHeight * 0.12;
	compraButton.height = screenHeight * 0.12;
var cicloIcon  = icomoonlib.getIconAsBlob("Aware-Icons","cicloIcon",screenHeight * 0.12,{color:"#ff82c8"});
var compraIcon = icomoonlib.getIconAsBlob("Aware-Icons","compraIcon",screenHeight * 0.12,{color:"#ff82c8"});
var logoutIcon = icomoonlib.getIconAsBlob("Aware-Icons","logoutIcon",screenHeight * 0.035,{color:"white"});

cicloButton.image = cicloIcon;
compraButton.image = compraIcon;
logoutButton.image = logoutIcon;
var flag = 0;
$.compra.addEventListener('click',function(){
	if (flag == 0) {	
		new Animator().moveTo({view:footer,value:{x:-(Ti.Platform.displayCaps.platformWidth * 0.5),y:0}, duration:500,onComplete:function(){
			new Animator().fade({view:compraButton,value:0, duration:50,delay:20,onComplete:function(){
				compraButton.image = icomoonlib.getIconAsBlob("Aware-Icons","closeIcon",screenHeight * 0.12,{color:"#ff82c8"});
				new Animator().fade({view:compraButton,value:1, duration:50,delay:20});
			}});
		}});
		flag=1;
	}else{
		new Animator().moveTo({view:footer,value:{x:0,y:0}, duration:500,onComplete:function(){
			new Animator().fade({view:compraButton,value:0, duration:50,delay:20,onComplete:function(){
				compraButton.image = icomoonlib.getIconAsBlob("Aware-Icons","compraIcon",screenHeight * 0.12,{color:"#ff82c8"});
				new Animator().fade({view:compraButton,value:1, duration:50,delay:20});
			}});
		}});
		flag=0;
	}
});

$.ciclo.addEventListener('click',function(){
	if (flag == 0) {		
		new Animator().moveTo({view:footer,value:{x:(Ti.Platform.displayCaps.platformWidth * 0.5),y:0}, duration:500,onComplete:function(){
			new Animator().fade({view:cicloButton,value:0, duration:50,delay:20,onComplete:function(){
				cicloButton.image = icomoonlib.getIconAsBlob("Aware-Icons","closeIcon",screenHeight * 0.12,{color:"#ff82c8"});
				new Animator().fade({view:cicloButton,value:1, duration:50,delay:20});
			}});
		}});
		flag=1;
	}else{
		new Animator().moveTo({view:footer,value:{x:0,y:0}, duration:500,onComplete:function(){
			new Animator().fade({view:cicloButton,value:0, duration:50,delay:20,onComplete:function(){
				cicloButton.image = icomoonlib.getIconAsBlob("Aware-Icons","cicloIcon",screenHeight * 0.12,{color:"#ff82c8"});
				new Animator().fade({view:cicloButton,value:1, duration:50,delay:20});
			}});
		}});
		flag=0;
	}
});

var fechaWS;
var fechadeCompra;
var fechadeCiclo;
var diaFechaCompra = $.diaFechaCompra;
var restoFechaCompra = $.restoFechaCompra;
var diaFechaCiclo = $.diaFechaCiclo;
var restoFechaCiclo = $.restoFechaCiclo;

Ti.API.info('Fecha de Compra: ' + Ti.App.Properties.getString('fechadeCompra'));
Ti.API.info('Fecha de Ciclo: ' + Ti.App.Properties.getString('fechadeCiclo'));
//evaluamos si hay fecha de Compra almacenada se pone la fecha actual
// if (Ti.App.Properties.getString('fechadeCompra') != null) {
	// var fechaCompra = Ti.App.Properties.getString('fechadeCompra');
    // var fechaCompraSplited = fechaCompra.split(" ");
    // diaFechaCompra.text = fechaCompraSplited[0];
    // restoFechaCompra.text = fechaCompraSplited[1] +' '+ fechaCompraSplited[2] +' ' + fechaCompraSplited[3];
// 
// }else{
	// //ponemos fecha actual si no hay fecha almacenada
	// var fecha = moment().lang("es").format("DD MMM / YYYY");
    // var fechaSplited = fecha.split(" ");
    // diaFechaCompra.text = fechaSplited[0];
    // restoFechaCompra.text = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3]; 
    // //restoFechaCompra.text = 'Ingresa la fecha de Compra :)';    
// };
// 
// //evaluamos si hay fecha de Ciclo almacenada se pone la fecha actual
// if (Ti.App.Properties.getString('fechadeCiclo') != null) {
    // var fechaCiclo = Ti.App.Properties.getString('fechadeCiclo');
    // var fechaCicloSplited = fechaCiclo.split(" ");
    // diaFechaCiclo.text = fechaCicloSplited[0];
    // restoFechaCiclo.text = fechaCicloSplited[1] +' '+ fechaCicloSplited[2] +' ' + fechaCicloSplited[3];
// }else{
	// //ponemos fecha actual si no hay fecha almacenada
	// var fecha = moment().lang("es").format("DD MMM / YYYY");
    // var fechaSplited = fecha.split(" ");
    // diaFechaCiclo.text = fechaSplited[0];
    // restoFechaCiclo.text = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3];
    // //restoFechaCiclo.text = 'Ingresa la fecha de ciclo :)'; 
// };

//--------- FUNCIONES WS ------------------------ //

var deviceId = Ti.Platform.id ;

Ti.API.info('DEVICE ID: ' + deviceId);

Alloy.Globals.ws.getUserDate(deviceId,function(status,obj){
	if (status) {
		Ti.API.info('Ya te Entro - GET');
		for (var i=0; i < obj.fechas.length; i++) {
			if (obj.fechas[i].type == 'purchase') {
				var fecha = moment(obj.fechas[i].date).lang("es").format("DD MMM / YYYY");
				var fechaSplited = fecha.split(" ");
			    diaFechaCompra.text = fechaSplited[0];
			    var toUpperCase = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3];
			    restoFechaCompra.text = toUpperCase.toUpperCase();	
			}else{
				var fecha = moment(obj.fechas[i].date).lang("es").format("DD MMM / YYYY");
				var fechaSplited = fecha.split(" ");
			    diaFechaCiclo.text = fechaSplited[0];
			    var toUpperCase = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3];
			    restoFechaCiclo.text = toUpperCase.toUpperCase();
			}
		}
	}else{
		var dialog = Ti.UI.createAlertDialog({
			message:obj,
			buttonNames:['Aceptar'],
			title:''
		});
		dialog.show();
	}
	
});

function addUserDate (deviceId,type,date) {
	Alloy.Globals.ws.addUserDate(deviceId,type,date,function(status,obj){
		if (status) {
			Ti.API.info('Ya te Entro - ADD');
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

//----------------   Mostrar PickerView en sus diferentes Versiones (Android & IOS) ----------------//

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
				//opacity:0.95,
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
				fechaWS = e.value;
				var fecha = moment(e.value).lang("es").format("DD MMM / YYYY");
    			var fechaSplited = fecha.split(" ");
    			if (boton.id == 'fechaCompra' || boton.id == 'diaFechaCompra' || boton.id == 'restoFechaCompra') {
    				diaFechaCompra.text = fechaSplited[0];
    				var toUpperCase = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3];
    				restoFechaCompra.text = toUpperCase.toUpperCase();
    			}else{
    				diaFechaCiclo.text = fechaSplited[0];
    				var toUpperCase = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3];
    				restoFechaCiclo.text = toUpperCase.toUpperCase();
    			}
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
					if (boton.id == 'fechaCompra' || boton.id == 'diaFechaCompra' || boton.id == 'restoFechaCompra') {
						addUserDate(deviceId,'purchase',fechaWS);
						Ti.App.Properties.setString('fechadeCompra',fechadeCompra);
						Ti.API.info('La fecha de compra es: ' + Ti.App.Properties.getString('fechadeCompra'));
					}else{
						addUserDate(deviceId,'ciclo',fechaWS);
						Ti.App.Properties.setString('fechadeCiclo',fechadeCompra);
						Ti.API.info('La fecha de ciclo es: ' + Ti.App.Properties.getString('fechadeCiclo'));
					}
				}
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
					fechaWS = moment(e.value).format();
					var fecha = moment(e.value).lang("es").format("DD MMM / YYYY");
	    			var fechaSplited = fecha.split(" ");
	    			if (boton.id == 'fechaCompra' || boton.id == 'diaFechaCompra' || boton.id == 'restoFechaCompra') {
	    				Ti.API.info('SE TOCO COMPRA');
	    				diaFechaCompra.text = fechaSplited[0];
	    				var toUpperCase = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3];
	    				restoFechaCompra.text = toUpperCase.toUpperCase();
	    			}else{
	    				Ti.API.info('SE TOCO CICLO');
	    				diaFechaCiclo.text = fechaSplited[0];
	    				var toUpperCase = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3];
	    				restoFechaCiclo.text = toUpperCase.toUpperCase();
	    			}
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
						if (boton.id == 'fechaCompra' || boton.id == 'diaFechaCompra' || boton.id == 'restoFechaCompra') {
							addUserDate(deviceId,'purchase',fechaWS);
							Ti.App.Properties.setString('fechadeCompra',fechadeCompra);
							Ti.API.info('La fecha de compra es: ' + Ti.App.Properties.getString('fechadeCompra'));
						}else{
							addUserDate(deviceId,'ciclo',fechaWS);
							Ti.App.Properties.setString('fechadeCiclo',fechadeCompra);
							Ti.API.info('La fecha de ciclo es: ' + Ti.App.Properties.getString('fechadeCiclo'));
						}
					}
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

// this.close = function(){
	// $.destroy();
// };

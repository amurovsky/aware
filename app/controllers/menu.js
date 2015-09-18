var args = arguments[0] || {};

//-------- Globales y Require´s -------------//
var Animator = require("Animator");
var moment = require('alloy/moment');
var icomoonlib = require('icomoonlib');
var osname = Ti.Platform.osname;
var footer = $.footer;
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;
Ti.API.info('*--- SESSION ID ---*',Ti.App.Properties.getString('sessid'));
if (Ti.App.Properties.getString('sessid')) {
	Alloy.Globals.isLogged = true;
}

//-------- CHECK NETWORK ----------------//
if(Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
     var alertDialog = Titanium.UI.createAlertDialog({
              title: 'Precaucion!',
              message: 'Esta aplicacion necesita una conexion a Internet Constante.',
              buttonNames: ['Aceptar']
            });
            alertDialog.show();
}
//-------- ProfileImage && Username && Email ----------------//
if (Ti.App.Properties.getString('name') != null) {
	var lastname = '';
	if(Ti.App.Properties.getString('lastname')){lastname = Ti.App.Properties.getString('lastname');}
	$.profileName.text = Ti.App.Properties.getString('name') + ' ' + lastname;
	$.profileMail.text = Ti.App.Properties.getString('email');
	$.profileImg.image = Ti.App.Properties.getString('profileImg');
	if (Ti.App.Properties.getString('profileImg')) {
		Ti.API.info('Si tiene imagen: ' + Ti.App.Properties.getString('profileImg'));
		$.profileImg.image = Ti.App.Properties.getString('profileImg');
	}else{
		Ti.API.info('No tiene imagen');
		$.profileImg.image = '/images/emptyProfile.jpg';
		Ti.App.Properties.setString('profileImg','/images/emptyProfile.jpg');
	}
}else{
	Ti.API.info('No hay user ');
	$.profileImg.image = '/images/emptyProfile.jpg';
	$.profileName.text = 'Usuario Anonimo';
	Ti.App.Properties.setString('profileImg','/images/emptyProfile.jpg');
}

// ----------- Change Profile -------------------------- //
function changeProfile (e) {
	if (Alloy.Globals.isLogged) {
		Alloy.Globals.navigator.openWindow('edit_profile',false,[],'forward');
	}else{
		var dialog = Ti.UI.createAlertDialog({
			cancel: 1,
			message:'Es necesario estar registrado para cambiar tu foto de perfil',
			buttonNames:['Registrar', 'Cancelar'],
			title:''
		});

		dialog.addEventListener('click', function(e){
		    if (e.index === e.source.cancel){
		      Ti.API.info('The cancel button was clicked');
		    }else{
		    	Alloy.Globals.navigator.openLogin();
		    }
		});
		dialog.show();
	}
}


//-------- Logout -------------------//
function logout_down (e) {
  e.source.opacity=0.5;
}
function logout_up (e) {
	e.source.opacity=1;	
	Ti.API.info('ADIOS');
	Ti.App.Properties.setString('name',null);	
	Ti.App.Properties.setString('lastname',null);
	Ti.App.Properties.setString('profileImg',null);
	Ti.App.Properties.setString('email',null);
	Ti.App.Properties.setString('userId',null);
	Ti.App.Properties.setString('sessid',null);
	Alloy.Globals.isLogged = false;
	Alloy.Globals.fb.logout();
	
	Alloy.Globals.navigator.openLogin();
}

//-------- INFO -------------------//
function info_down (e) {
  e.source.opacity=0.5;
}
function info_up (e) {
	e.source.opacity=1;	
	Alloy.Globals.navigator.openWindow('tutorial',false,[],'forward');
	Alloy.Globals.comeFromMenu = true;
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
			Alloy.Globals.navigator.openWindow('videos2',false,[],'forward');
		break;
		 case 'articulos':
			Alloy.Globals.navigator.openWindow('articulos',false,[],'forward');
		 break;
		case 'puntos':
			Alloy.Globals.navigator.openWindow('puntos',false,[],'forward');
		break;
		case 'regala':
			regalaSalud();
		break;
		case 'directorios':
			Alloy.Globals.navigator.openWindow('directorios',false,[],'forward');
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
var cicloIcon  = icomoonlib.getIconAsBlob("Aware-Icons","hearthIcon",screenHeight * 0.12,{color:"#ff82c8"});
var compraIcon = icomoonlib.getIconAsBlob("Aware-Icons","compraIcon",screenHeight * 0.12,{color:"#ff82c8"});
var logoutIcon = icomoonlib.getIconAsBlob("Aware-Icons","logoutIcon",screenHeight * 0.035,{color:"white"});
$.img_info.image = icomoonlib.getIconAsBlob("Aware-Icons","infoIcon",screenHeight * 0.04,{color:"white"});

cicloButton.image = cicloIcon;
compraButton.image = compraIcon;
logoutButton.image = logoutIcon;
var flag = 0;
function compra_click(){
	if (flag == 0) {
		$.div_main.visible = true;	
		new Animator().moveTo({view:footer,value:{x:-(Ti.Platform.displayCaps.platformWidth * 0.5),y:0}, duration:500,onComplete:function(){
			new Animator().fade({view:compraButton,value:0, duration:50,delay:20,onComplete:function(){
				compraButton.image = icomoonlib.getIconAsBlob("Aware-Icons","closeIcon",screenHeight * 0.12,{color:"#ff82c8"});
				new Animator().fade({view:compraButton,value:1, duration:50,delay:20});
			}});
		}});
		flag=1;
	}else{
		$.div_main.visible = false;
		new Animator().moveTo({view:footer,value:{x:0,y:0}, duration:500,onComplete:function(){
			new Animator().fade({view:compraButton,value:0, duration:50,delay:20,onComplete:function(){
				compraButton.image = icomoonlib.getIconAsBlob("Aware-Icons","compraIcon",screenHeight * 0.12,{color:"#ff82c8"});
				new Animator().fade({view:compraButton,value:1, duration:50,delay:20});
			}});
		}});
		flag=0;
	}
}

function ciclo_click () {
	Alloy.Globals.navigator.openWindow('calendario_tutorial',false,[],'forward');
}

$.ciclo.addEventListener('click',function(){
	
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


//--------- FUNCIONES WS ------------------------ //

var deviceId = Ti.Platform.id ;

Ti.API.info('DEVICE ID: ' + deviceId);

Alloy.Globals.ws.getUserDate(deviceId,function(status,obj){
	var fecha = moment().lang("es").format("DD MMM / YYYY");
    var fechaSplited = fecha.split(" ");
    var diaFecha = fechaSplited[0];
    var RestoFecha = fechaSplited[1] +' '+ fechaSplited[2] +' ' + fechaSplited[3];
 
	if (status) {
		diaFechaCompra.text = diaFecha;
		diaFechaCiclo.text = diaFecha;
		restoFechaCompra.text = RestoFecha.toUpperCase();
		restoFechaCiclo.text = RestoFecha.toUpperCase();

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

//-------- NOTIFICATION CONTENT ----------------//
if(screenHeight == 568 && OS_IOS){
	$.div_notiVid.right = '15%';
	$.div_notiArt.right = '15%';
}
var notiIcon = icomoonlib.getIconAsBlob("Aware-Icons","notiIcon",(OS_IOS) ? screenHeight * 0.058 : screenHeight * 0.058,{color:"#f34eaa"});
$.noti_art.image = notiIcon;
$.noti_vid.image = notiIcon;

Alloy.Globals.ws.newContentCount(Ti.Platform.id,function(status, obj){
	
	if (status){
		if(obj.videos > 0){
			$.div_notiVid.visible = true;
			$.lbl_notiVid.text = obj.videos;
		}
		if(obj.articulos > 0){
			$.div_notiArt.visible = true;
	    	$.lbl_notiArt.text = obj.articulos;
	    	
		}
	}else{
		Ti.API.info('No pudimos traer NEW CONTENT');
	}
});

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
					color: 'white',
					backgroundImage: 'NONE'
				});
				b.addEventListener('click', function()
				{
					var t3 = Titanium.UI.create2DMatrix();
					t3 = t3.scale(0);
					w.animate({transform:t3,duration:300});
					w.hide();
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

this.close = function(){
	$.destroy();
};

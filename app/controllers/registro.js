var args = arguments[0] || {};
var icomoonlib = require('icomoonlib');
var osname = Ti.Platform.osname;
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;
var fb = Alloy.Globals.fb;
fb.appid = Ti.App.Properties.getString('ti.facebook.appid');
fb.forceDialogAuth = false;

var backIcon = icomoonlib.getIconAsLabel("Aware-Icons","backIcon",screenHeight * 0.031,{color:"white",left:'20%'});
	$.btn_back.add(backIcon);
	
	
function back_down (e) {
  e.source.opacity = 0.5;
}
function back_up (e) {
	e.source.opacity = 1;
  	Alloy.Globals.navigator.goBack();
  	//navigation.back();
}
function siguiente (e) {
  //Alloy.Globals.navigator.openWindow('iniciar_sesion');
  var dialog = Ti.UI.createAlertDialog({title:'',buttonNames:['Aceptar']});
  var name = $.txt_nombre.getValue();
  var lastname = $.txt_apellido.getValue();
  var email = $.txt_email.getValue();
  var password = $.txt_contrasena.getValue();
  var image = '/images/emptyProfile.jpg';
  //var image = '';
  
  if (name == '' || lastname == '' || email == '' || password == '') {
  	dialog.message = "Debes completar todos los campos";
	dialog.show();
  }else{
  	Alloy.Globals.loading.show('Registrando...');
  	Alloy.Globals.ws.register(name, lastname, email, password, image, function(status, obj){
  		Alloy.Globals.loading.hide();
  		if (status) {
  			//navigation.open('iniciar_sesion',{email:email});
  			Alloy.Globals.navigator.openWindow('iniciar_sesion',true,{email:email},'forward');
  		}else{
  			dialog.message = obj;
			dialog.show();
  		}
  		
  	});
  }
  
  //navigation.open('iniciar_sesion');
}

var LO = Alloy.createWidget('com.caffeinalab.titanium.loader', {
    cancelable: false,
    useImages: false
});
function registro_facebook (e) {
	Alloy.Globals.PushClient.register();
	if ( fb.loggedIn == true){
		fb.logout();
	}else{
		fb.addEventListener('login',facebookLoginEvent);
		LO.show('Conectando con Facebook');
  		fb.authorize();
	}
	
  
}


function facebookLogin (token) {
	Alloy.Globals.ws.loginFb(token,function(status, obj){
		if (status){
			var lastname;
			if (obj.user.lastname) {
				Ti.API.info('si hay apellido.!');
				//lastname = obj.user.lastname;
				Ti.App.Properties.setString('lastname',obj.user.lastname);
			}
			else{
				Ti.App.Properties.setString('lastname','');
			}
			//var username = obj.user.name + ' ' + lastname;
			Ti.App.Properties.setString('name',obj.user.name);
		    Ti.App.Properties.setString('profileImg',obj.user.image);
			Ti.App.Properties.setString('email',obj.user.username);
			//Ti.App.Properties.setString('userName',username);
			Ti.App.Properties.setString('sessid',obj.sessid);
			LO.hide();
			Alloy.Globals.navigator.openWindow('menu',true,[],'forward');
			//navigation.open('menu');
		}else{
			var dialog = Ti.UI.createAlertDialog({title:'',buttonNames:['Aceptar']});
			LO.hide();
			dialog.message = obj;
			dialog.show();
		}
	});
}
	

function facebookLoginEvent (e) {
	fb.removeEventListener('login',facebookLoginEvent);
  // You *will* get this event if loggedIn == false below
    // Make sure to handle all possible cases of this event
    var dialog = Ti.UI.createAlertDialog({title:'',buttonNames:['Aceptar']});
    if (e.success) {
    	var token = fb.getAccessToken();
    	Ti.API.info('Token: ' + token);
    	facebookLogin(token);
    }
    else if (e.cancelled) {
        // user cancelled 
        Ti.API.info('cancelled');
        LO.hide();
    }
    else {
        Ti.API.info('cancelado por usuario: '+e.error);
        LO.hide();         
    }
}

function condiciones_click (e) {
  Titanium.Platform.openURL('http://corporinter.com/assets/aviso_de_privacidad-27-01-2015.pdf');
}
fb.addEventListener('logout', function(e) {
    Ti.API.info('logged out');
    Ti.API.info('Logged In: ' + fb.loggedIn);
    //Alloy.Globals.navigator.openLogin();
});

$.txt_nombre.addEventListener('return',function(){
	Ti.API.info('Entro Return en Nombre');
	$.txt_apellido.focus();
});
$.txt_apellido.addEventListener('return',function(){
	Ti.API.info('Entro Return en Apellido');
	$.txt_email.focus();
});
$.txt_email.addEventListener('return',function(){
	Ti.API.info('Entro Return en Mail ');
	$.txt_contrasena.focus();
});
$.txt_contrasena.addEventListener('return',function(){
	Ti.API.info('Entro Return en Contraseña');
	siguiente();
});



this.close = function(){
	$.destroy();
};
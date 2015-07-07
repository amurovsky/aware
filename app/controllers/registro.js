var args = arguments[0] || {};
var navigation = Alloy.Globals.navigation;
var icomoonlib = require('icomoonlib');
var osname = Ti.Platform.osname;
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;
var fb = require('facebook');
fb.appid = Ti.App.Properties.getString('ti.facebook.appid');
//fb.permissions=['email'];
fb.forceDialogAuth=false;

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
  var image = '';
  
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
	LO.show('Conectando con Facebook');
  	fb.authorize();
  
}





    // fb.initialize();
// 
	
fb.addEventListener('login',function(e) {
    // You *will* get this event if loggedIn == false below
    // Make sure to handle all possible cases of this event
    
    if (e.success) {
    
    	var results =  (OS_IOS) ? e.data : JSON.parse(e.data);
    	var token = fb.getAccessToken();
    	
    	Alloy.Globals.ws.loginFb(token,function(status, obj){
    		if (status){
		        Ti.App.Properties.setString('profileImg',obj.user.image);
				Ti.App.Properties.setString('email',obj.user.username);
				Ti.App.Properties.setString('userName',obj.user.name);
				Ti.App.Properties.setString('sessid',obj.sessid);
				LO.hide();
				Alloy.Globals.navigator.openWindow('menu',true,[],'forward');
				//navigation.open('menu');
    		}else{
				dialog.message = obj;
				dialog.show();
			}
    	});
    	
    }
    else if (e.cancelled) {
        // user cancelled 
        Ti.API.info('cancelled');
    }
    else {
        Ti.API.info('cancelado por usuario: '+e.error);         
    }
    
});

fb.addEventListener('logout', function(e) {
    Ti.API.info('logged out');
    Ti.API.info('Logged In: ' + fb.loggedIn);
    //Alloy.Globals.navigator.openLogin();
});
// 	
// 
// 
    // var loginButton = fb.createLoginButton({
        // readPermissions: ['email'],
        // width:'90%',
        // top:'10%'
    // });   
    
    
    
//$.div_main.add(loginButton);

this.close = function(){
	$.destroy();
};
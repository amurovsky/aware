var args = arguments[0] || {};
var navigation = Alloy.Globals.navigation;
var icomoonlib = require('icomoonlib');
var osname = Ti.Platform.osname;
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;
var fb = require('facebook');
fb.appid = 100119266991535;
//fb.permissions=['email'];
fb.forceDialogAuth=false;

function back_down (e) {
  e.source.opacity = 0.5;
}
function back_up (e) {
	e.source.opacity = 1;
  //Alloy.Globals.navigator.goBack();
  navigation.back();
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
  			navigation.open('iniciar_sesion',{email:email});
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

	var backIcon = icomoonlib.getIconAsLabel("Aware-Icons","backIcon",screenHeight * 0.031,{color:"white",left:'20%'});
	$.btn_back.add(backIcon);



    // fb.initialize();
// 
	
fb.addEventListener('login',function(e) {
    // You *will* get this event if loggedIn == false below
    // Make sure to handle all possible cases of this event
    
    if (e.success) {
    
    	var results =  (OS_IOS) ? e.data : JSON.parse(e.data);
    	Ti.API.info('Results: '+ results);
    	Ti.API.info('Mail: '+e.email);
        Ti.API.info('login from uid: '+e.uid+', name: '+results.name + ', mail: ' + results.email);
        Ti.API.info('Logged In: ' + fb.loggedIn);
        Ti.API.info('UID: ' + e.uid);
        Ti.App.Properties.setString('profileImg','http://graph.facebook.com/'+e.uid+'/picture?type=large');
		Ti.App.Properties.setString('email',results.email);
		Ti.App.Properties.setString('userName',results.name);
		//Alloy.Globals.navigator.openWindow('menu',true);
		navigation.open('menu');
    }
    else if (e.cancelled) {
        // user cancelled 
        Ti.API.info('cancelled');
    }
    else {
        Ti.API.info('cancelado por usuario: '+e.error);         
    }
    LO.hide();
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

// this.close = function(){
	// $.destroy();
// };
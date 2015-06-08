var args = arguments[0] || {};

var icomoonlib = require('icomoonlib');
var osname = Ti.Platform.osname;
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;
var fb = require('facebook');
fb.appid = 100119266991535;
fb.permissions=['email'];
fb.forceDialogAuth=false;

function back_down (e) {
  e.source.opacity = 0.5;
}
function back_up (e) {
	e.source.opacity = 1;
  Alloy.Globals.navigator.goBack();
}
function siguiente (e) {
  Alloy.Globals.navigator.openWindow('iniciar_sesion');
}

function registro_facebook (e) {
  Alloy.Globals.panelLoading.show();
  //Alloy.Globals.panelLoading.setMessage('Cargando...');
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
        
        	var results = e.data;
        	Ti.API.info('Results: '+results);
        	Ti.API.info('Mail: '+e.email);
            Ti.API.info('login from uid: '+e.uid+', name: '+results.name + ', mail: ' + results.email);
            Ti.API.info('Logged In: ' + fb.loggedIn);
            Ti.API.info('UID: ' + e.uid);
            Ti.App.Properties.setString('profileImg','http://graph.facebook.com/'+e.uid+'/picture?type=large');
			Ti.App.Properties.setString('email',results.email);
			Ti.App.Properties.setString('userName',results.name);
			Alloy.Globals.navigator.openWindow('menu',true);
        }
        else if (e.cancelled) {
            // user cancelled 
            alert('cancelled');
        }
        else {
            Ti.API.info('cancelado por usuario: '+e.error);         
        }
    });
    fb.addEventListener('logout', function(e) {
        Ti.API.info('logged out');
        Ti.API.info('Logged In: ' + fb.loggedIn);
        Alloy.Globals.navigator.openLogin();
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
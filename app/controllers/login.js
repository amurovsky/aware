var args = arguments[0] || {};

var facebook = Alloy.Globals.Facebook;

// The module we have added to our project via tiapp.xml before
var facebook = require('facebook');
// We can read the facebook app id from tiapp.xml
var FACEBOOK_APP_ID = Ti.App.Properties.getString('ti.facebook.appid');
// Set the app id
facebook.appid = FACEBOOK_APP_ID;
// Do not force a facebook html popover but use the native dialog if possible
facebook.forceDialogAuth = false;
// Add an event listener to the facebook login event
facebook.addEventListener('login', facebookLoginHandler);

// The event of our login button
function login (e) {
  facebook.authorize();
}


// The facebook login event handler
function facebookLoginHandler(e) {
    if (e.success) {
        // Success!
        //alert('Logged In');
		facebook.requestWithGraphPath('me',{},'GET',function(e){
		if(e.success){
			//alert(e.result);
			var results = JSON.parse(e.result);
			Ti.API.info(results);
			var fbID = results.id;
			Ti.App.Properties.setString('profileImg','http://graph.facebook.com/'+fbID+'/picture?type=large');
			Ti.App.Properties.setString('email',results.email);
			Ti.App.Properties.setString('userName',results.name);
			Alloy.Globals.navigator.openWindow('menu',true);
		}else if (e.error){
			alert(e.error);
		}else {
			alert('Unknown response');
		}
	});
    } else if (e.error) {
        // Error!
    } else if (e.cancelled) {
        // cancelled by user
    }
}

// The facebook logout handler
function facebookLogoutHandler(e) {
    if (e.success) {
        // Success, clear the facebook browser cookies so someone else
        // can login later, if the browser fallback is used
        var client = Titanium.Network.createHTTPClient();
        client.clearCookies('https://login.facebook.com');
    } else if (e.error) {
        // Error!
    } 
}
	
    // fb.appid = 1578769952395626;
    // fb.permissions = ['publish_stream', "email"]; // Permissions your app needs
    // fb.forceDialogAuth = false;
    // var btnLogin = Titanium.UI.createButton({
       // title: 'Login',
       // width: 100,
       // height: 50
    // });
   // $.login.add(btnLogin);
    // btnLogin.addEventListener('click',function(e){ 
	    // fb.addEventListener('login', function(e) {
	        // if (e.success) {
	            // //alert('Logged In');
				// fb.requestWithGraphPath('me',{},'GET',function(e){
				// if(e.success){
					// //alert(e.result);
					// var results = JSON.parse(e.result);
					// Ti.API.info(results);
					// var fbID = results.id;
					// Ti.App.Properties.setString('profileImg','http://graph.facebook.com/'+fbID+'/picture?type=large');
					// Ti.App.Properties.setString('email',results.email);
					// Ti.App.Properties.setString('userName',results.name);
					// Alloy.Globals.navigator.openWindow('menu',true);
				// }else if (e.error){
					// alert(e.error);
				// }else {
					// alert('Unknown response');
				// }
			// });
	        // } else if (e.error) {
	            // alert(e.error);
	        // } else if (e.cancelled) {
	            // alert("Canceled");
	        // }
    // });
    // fb.authorize();
    // });
    
    this.close = function(){
	$.destroy();
};

    
var WS = {
	//url : 'http://192.168.15.101:8101/ws',
	url : 'http://digital.testingweb.mx:8101/ws',
	
	login : function(email, password, fnCallback) {
		Ti.API.info('--- WS > LOGIN ---');
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				Ti.API.info('Respuesta:' + this.responseText);
				var response = JSON.parse(this.responseText);
				// CODE GOES HERE
				if(!response.error){
					fnCallback(true,{sessid:response.sessid, user:response.user});
				}else if (response.error === 'login_incorrect'){
						fnCallback(false,'Usuario y/o contraseña incorrectos');
				}
			},
			onerror: function(e){ WS.defaultErrorHandler(e, fnCallback); }
		});
		
		xhr.open('POST', WS.url + '/login');
		
		xhr.send({
			username: email,
			password: password,
		});
	},
	
	register : function(name, lastname, email, password, image, fnCallback) {
		Ti.API.info('--- WS > REGISTER USER ---');
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				Ti.API.info('Respuesta:' + this.responseText);
				var response = JSON.parse(this.responseText);
				//CODE GOES HERE
				if(response.status == 'ok'){
					fnCallback(true,{userId:response.id_user});
				}else if (response.status === 'invalid_username'){
					fnCallback(false,'Este correo ya ha sido registrado anteriormente');
				}
			},
			onerror: function(e){ WS.defaultErrorHandler(e, fnCallback); }
		});
		
		xhr.open('POST', WS.url + '/register-user');
		
		xhr.send({
			name:		name,
			lastname:	lastname,
			username: 	email,
			password: 	password,
			image:		image
		});
	},
	
	videos : function(fnCallback) {
		Ti.API.info('--- WS > VIDEOS ---');
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				Ti.API.info('Respuesta:' + this.responseText);
				var response = JSON.parse(this.responseText);
				// CODE GOES HERE
				if(!response.error){
					fnCallback(true,{videos:response.videos});
				}
			},
			onerror: function(e){ WS.defaultErrorHandler(e, fnCallback); }
		});
		
		xhr.open('POST', WS.url + '/videos');
		
		xhr.send();
	},

	articles : function(userID,fnCallback) {
		Ti.API.info('--- WS > ARTICLES ---');
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				Ti.API.info('Respuesta:' + this.responseText);
				var response = JSON.parse(this.responseText);
				// CODE GOES HERE
				if(!response.error){
					fnCallback(true,{articulos:response.articles});
				}
			},
			onerror: function(e){ WS.defaultErrorHandler(e, fnCallback); }
		});
		
		xhr.open('POST', WS.url + '/articles');
		
		xhr.send({
			id_user:userID
		});
	},
	
	addLike : function(sessid, artId, fnCallback) {
		Ti.API.info('--- WS > ADD ARTICLE LIKE ---');
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				Ti.API.info('Respuesta:' + this.responseText);
				var response = JSON.parse(this.responseText);
				// CODE GOES HERE
				if(!response.error){
					fnCallback(true);
				}
			},
			onerror: function(e){ WS.defaultErrorHandler(e, fnCallback); }
		});
		
		xhr.open('POST', WS.url + '/article-add-like');
		
		xhr.send({
			sessid: sessid,
			id_article: artId,
		});
	},
	
	removeLike : function(sessid, artId, fnCallback) {
		Ti.API.info('--- WS > REMOVE ARTICLE LIKE ---');
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				Ti.API.info('Respuesta:' + this.responseText);
				var response = JSON.parse(this.responseText);
				// CODE GOES HERE
				if(!response.error){
					fnCallback(true);
				}
			},
			onerror: function(e){ WS.defaultErrorHandler(e, fnCallback); }
		});
		
		xhr.open('POST', WS.url + '/article-rm-like');
		
		xhr.send({
			sessid: sessid,
			id_article: artId,
		});
	},
	
	getComments : function(articleId,fnCallback) {
		Ti.API.info('--- WS > GET COMMENTS ---');
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				Ti.API.info('Respuesta:' + this.responseText);
				var response = JSON.parse(this.responseText);
				// CODE GOES HERE
				if(!response.error){
					fnCallback(true,{comentarios:response.comments});
				}
			},
			onerror: function(e){ WS.defaultErrorHandler(e, fnCallback); }
		});
		
		xhr.open('POST', WS.url + '/article-comments');
		
		xhr.send({
			id_article:articleId
		});
	},
	
	addComment : function(sessid,artId,message,fnCallback) {
		Ti.API.info('--- WS > ADD COMMENTS ---');
		Ti.API.info('sessID: ' + sessid + ' Artid: ' + artId + ' message: ' + message);
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				Ti.API.info('Respuesta:' + this.responseText);
				var response = JSON.parse(this.responseText);
				// CODE GOES HERE
				if(!response.error){
					fnCallback(true);
				}
			},
			onerror: function(e){ WS.defaultErrorHandler(e, fnCallback); }
		});
		
		xhr.open('POST', WS.url + '/add-article-comment');
		
		xhr.send({
			sessid: sessid,
			id_article: artId,
			message: message
		});
	},
	
	points : function(fnCallback) {
		Ti.API.info('--- WS > POINTS OF SALE ---');
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				Ti.API.info('Respuesta:' + this.responseText);
				var response = JSON.parse(this.responseText);
				// CODE GOES HERE
				if(!response.error){
					fnCallback(true,{puntos:response['points-of-sale']});
				}
				
			},
			onerror: function(e){ WS.defaultErrorHandler(e, fnCallback); }
		});
		
		xhr.open('POST', WS.url + '/points-of-sale');
		
		xhr.send();
	},

	doctors : function(fnCallback) {
		Ti.API.info('--- WS > DOCTORS ---');
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				Ti.API.info('Respuesta:' + this.responseText);
				var response = JSON.parse(this.responseText);
				// CODE GOES HERE
				if(!response.error){
					fnCallback(true,{doctores:response.doctors});
				}
			},
			onerror: function(e){ WS.defaultErrorHandler(e, fnCallback); }
		});
		
		xhr.open('POST', WS.url + '/doctors');
		
		xhr.send();
	},
	
	getUserDate : function(deviceId, fnCallback) {
		Ti.API.info('--- WS > GET USER DATE ---');
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				Ti.API.info('Respuesta:' + this.responseText);
				var response = JSON.parse(this.responseText);
				// CODE GOES HERE
				if(!response.error){
					fnCallback(true,{fechas:response.dates});
				}
			},
			onerror: function(e){ WS.defaultErrorHandler(e, fnCallback); }
		});
		
		xhr.open('POST', WS.url + '/get-user-dates');
		
		xhr.send({
			deviceid: deviceId
		});
	},

	addUserDate : function(deviceId, type, date, fnCallback) {
		Ti.API.info('--- WS > ADD USER DATE ---');
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				Ti.API.info('Respuesta:' + this.responseText);
				var response = JSON.parse(this.responseText);
				// CODE GOES HERE
				if(!response.error){
					fnCallback(true
						//,{sessid:response.sessid, user:response.user}
						);
				}
			},
			onerror: function(e){ WS.defaultErrorHandler(e, fnCallback); }
		});
		
		xhr.open('POST', WS.url + '/register-user-date');
		
		xhr.send({
			deviceid: deviceId,
			type: type,
			date: date,
		});
	},
	defaultErrorHandler: function(e, fnCallback){
		if(e.code == 401 || e.error == 'Unauthorized'){
			Ti.API.info(" --- Error 401 --- ");
			Ti.API.info("--- COMPLETAR LLEVANDO A LOGIN");
			//Alloy.Globals.navigator.openLogin();
		}else{
			Ti.API.info(" --- WS ERROR HANDLER --- ");
			Ti.API.info("error: " + e.error);
			Ti.API.info(this.responseText);
			if(typeof(fnCallback) != 'undefined'){
				fnCallback(false,'Ocurrio un error inesperado');
			}
		}
	}

};
module.exports = WS;
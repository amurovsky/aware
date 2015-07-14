var args = arguments[0] || {};
var icomoonlib = require('icomoonlib');
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;

var backIcon = icomoonlib.getIconAsLabel("Aware-Icons","backIcon",screenHeight * 0.031,{color:"white",left:'20%'});
$.btn_back.add(backIcon);
$.img_nombre.image = icomoonlib.getIconAsBlob("Aware-Icons","nameIcon",screenHeight * 0.031,{color:"#848182"});
$.img_mail.image = icomoonlib.getIconAsBlob("Aware-Icons","mailIcon",screenHeight * 0.15,{color:"#848182",left:'4.5%'});
$.img_contrasena.image = icomoonlib.getIconAsBlob("Aware-Icons","contraIcon",screenHeight * 0.031,{color:"#848182"});
$.img_repContrasena.image = icomoonlib.getIconAsBlob("Aware-Icons","contraIcon",screenHeight * 0.031,{color:"#848182"});


$.profileImg.image = Ti.App.Properties.getString('profileImg');
if (Ti.App.Properties.getString('userName') != null) {
	var nombreCompleto = Ti.App.Properties.getString('userName');
	var nombreSplit = nombreCompleto.split(' ');
	$.txt_nombre.value = nombreSplit[0];
	$.txt_apellido.value = nombreSplit[1];
	$.txt_mail.value = Ti.App.Properties.getString('email');
}

function imageMaskComplete (e) {
  var medida = $.imageMask.getRect();
  Ti.API.info('Width: ' + medida.width + ' Height: ' + medida.height  + ' radius/2: ' + (medida.width/2) );
  $.imageMask.setWidth(medida.height);
  $.imageMask.setBorderRadius(medida.height / 2);
}
function back_down (e) {
  e.source.opacity = 0.5;
}
function back_up (e) {
	e.source.opacity = 1;
  	Alloy.Globals.navigator.goBack();
}
var imageFromGallery;
function changeProfile (e) {
	var ImageUploadPanel = require("ImageUploadPanel");
	var imgUploadPanel = new ImageUploadPanel($.edit_profile, "Selecciona una foto de perfil");
		imgUploadPanel.open({
			success: function(imageResource){
				Ti.API.info('Succes.!');
				if (imageResource.height > imageResource.width) {
					$.profileImg.setHeight('150%');
				}else{
					$.profileImg.setWidth('150%');
				}
				$.profileImg.setImage(imageResource);
				imageFromGallery = imageResource;
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

function guardar (e) {
	var sessid = Ti.App.Properties.getString('sessid');
	var password = null;
	var image = imageFromGallery;
	if ($.txt_contrasena.value != '') {
			if ($.txt_contrasena.value === $.txt_repContrasena.value){
				Ti.API.info('La contra si es mayor a 0');
			password = $.txt_contrasena.value;
			Ti.API.info('Si hay Contraseña y conincide... esta es: ' + password);
		}else{
			
			var dialog = Ti.UI.createAlertDialog({
				message:'las Contraseñas no coinciden',
				buttonNames:['Aceptar'],
				title:''
			});
			dialog.show();
			return;
		}
	}
	
	Ti.API.info('seesid: ' + sessid + ' Nombre: ' + $.txt_nombre.value + ' Apellido: ' + $.txt_apellido.value + ' Mail: ' + $.txt_mail.value + ' Password: ' + password + ' Image: ' + image);
	Alloy.Globals.loading.show('Cargando...');
	Alloy.Globals.ws.editUser(sessid, $.txt_nombre.value, $.txt_apellido.value, $.txt_mail.value, password, image ,function(status,obj){
		Alloy.Globals.loading.hide();
		if (status) {
			Ti.API.info('Te entreo Edit User.!!');
			var username = obj.user.name + ' ' + obj.user.lastname;
			Ti.App.Properties.setString('userName',username);
			Ti.App.Properties.setString('email',obj.user.username);
			Ti.App.Properties.setString('profileImg', obj.user.image);
			Alloy.Globals.navigator.goBack();
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




this.close = function(){
	$.destroy();
};
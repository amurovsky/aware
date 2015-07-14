var icomoonlib = require('icomoonlib');
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;

var ImageUploadPanel = function(viewParent, title){
	var oRef = this;
	
	var panel;
	var panelContent;
	var lblH1;
	
	var onComplete;
	var onCancel;
	
	var init = function(){
		panel = Ti.UI.createView({
			zIndex: 10,
			backgroundColor: "#cc000000",
			zIndex: 20,
			visible: false,
		});
		
		lblH1 = Ti.UI.createLabel({
			top: "25%",
			textAlign: "center",
			color: "#FFF",
			text: title,
			font: {
				fontSize: "20dp",
				fontFamily: "Aileron-Regular",
			}
		});
		
		var btnClose = Ti.UI.createImageView({
			top: "17%",
			image: "/images/close.png",
			tintColor: "#fff",
		});
		
		var btnGalleryCont = Ti.UI.createView({
			left: "5%",
			width: '44%',
			height: Ti.UI.SIZE,
			layout:'vertical',
		});
		
		var btnCameraCont = Ti.UI.createView({
			right: "5%",
			width: '44%',
			height: Ti.UI.SIZE,
			layout:'vertical',
		});
		
		var btnGallery = Ti.UI.createImageView({
			image: icomoonlib.getIconAsBlob("Aware-Icons","galeriaIcon",screenHeight * 0.15,{color:"white"}),
		});
		
		var btnCamera = Ti.UI.createImageView({
			image: icomoonlib.getIconAsBlob("Aware-Icons","camaraIcon",screenHeight * 0.15,{color:"white"}),
		});
		
		var lblGallery = Ti.UI.createLabel({
			top:'4%',
			textAlign: "center",
			color: "#fff",
			textAlign: "center",
			text: "Abrir Galería",
			font: {
				fontFamily: "Aileron-Regular",
			},
		});
		
		var lblCamera = Ti.UI.createLabel({
			top:'4%',
			textAlign: "center",
			color: "#fff",
			textAlign: "center",
			text: "Tomar Foto",
			font: {
				fontFamily: "Aileron-Regular",
			},
		});
		
		btnGalleryCont.addEventListener("click", oRef.openGallery);
		btnCameraCont.addEventListener("click", oRef.openCamera);
		
		btnGalleryCont.add(btnGallery);
		btnGalleryCont.add(lblGallery);
		btnCameraCont.add(btnCamera);
		btnCameraCont.add(lblCamera);

		panel.add(btnGalleryCont);
		panel.add(btnCameraCont);
		panel.add(lblH1);
		panel.add(btnClose);
		viewParent.add(panel);
		
		panel.addEventListener("click", oRef.close);
		btnClose.addEventListener("click", oRef.close);
	};
	
	this.openCamera = function(){
		Titanium.Media.showCamera({
			success:function(event) {
				// called when media returned from the camera
				Ti.API.debug('Our type was: ' + event.mediaType);
				if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
					onComplete(event.media, event);
					
				} else {
					alert("Tipo de archivo invalido");
					onCancel();
				}
			},
			cancel:function() {
				if(onCancel != null){
					onCancel();
				}
				// called when user cancels taking a picture
			},
			error:function(error) {
				if(onError != null){
					onError(error);
				}
			},
			saveToPhotoGallery: false,
		    // allowEditing and mediaTypes are iOS-only settings
			allowEditing: true,
			mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
		});
	};
	
	this.openGallery = function(){
		Titanium.Media.openPhotoGallery({
			success:function(event) {
				onComplete(event.media, event);
			},
			cancel:function() {
				if(onCancel != null){
					onCancel();
				}
				// called when user cancels taking a picture
			},
			error:function(error) {
				if(onError != null){
					onError(error);
				}
			},
		});
	};
	
	this.open = function(callback){
		if (Ti.Platform.osname == "android") {
		  Titanium.UI.Android.hideSoftKeyboard();
		}
		
		onComplete = callback.success;
		onCancel = callback.cancel;
		onError = callback.error;
		
		panel.show();
	};
	
	this.close = function(){
		panel.hide();
		
		if(onCancel != null){
			onCancel();
		}
	};
	
	init();
};

module.exports = ImageUploadPanel;

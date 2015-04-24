
var PanelLoading = (function(){
	
	var instance = {};
	instance.preloader;
	instance.panelModal;
	instance.progress;
	instance.message;
	var preloader;
	
	instance.init = function(){
		
		if(typeof(Alloy.Globals.currentWindow.panelLoadingModuleInitialized) != "undefined"){
			return;
		}
		
		instance.panelModal = Ti.UI.createView({
			width: "100%",
			height: "100%",
			top: 0,
			left: 0,
			backgroundColor: "#99000000",
			zIndex: 20,
		});
		
		var panelCont = Ti.UI.createView({
			height: "120dp",
			width: "100%",
			layout: 'vertical',
			zIndex: 20,
		});
		
		
		var preloaderImgs = [];
		for(var i=1; i<=12; i++){
			preloaderImgs.push("/images/est/preloader/" + i + ".png");
		}
		
		instance.preloader = Ti.UI.createImageView({
			images: preloaderImgs,
			width: "64dp",
			height: "65dp",
			//top: "80dp",
			duration: 100,
		});
		
		var style;
		if (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad'){
		  style = Titanium.UI.iPhone.ActivityIndicatorStyle.BIG;
		}else {
		  style = Titanium.UI.ActivityIndicatorStyle.BIG;
		}
		
		preloader = Ti.UI.createActivityIndicator({
		  style:style,
		  width: Ti.UI.SIZE,
		  height: Ti.UI.SIZE,
  			zIndex: 100,
		});
		
		
		instance.message = Ti.UI.createLabel({
			text: "",
			top: "12dp",
			color: "#FFF",
			font: {
				fontFamily: "Aileron-Regular",
			}
		});
		
		instance.progress = Ti.UI.createLabel({
			text: "",
			top: "20dp",
			color: "#FFF",
			font: {
				fontFamily: "Aileron-Regular",
			}
		});
		
		panelCont.add(preloader);
		//panelCont.add(instance.preloader);
		panelCont.add(instance.message);
		panelCont.add(instance.progress);
		instance.panelModal.add(panelCont);
		
		Alloy.Globals.currentWindow.add(instance.panelModal);
		
		Alloy.Globals.currentWindow.panelLoadingModuleInitialized = true;
	};
	
	instance.show = function(){
		if(Alloy.Globals.currentWindow == null){
			return;
		}
		
		instance.init();
		
		instance.progress.setVisible(false);
		instance.message.setVisible(false);
		preloader.show();
		instance.panelModal.setVisible(true);
	};
	
	instance.hide = function(){
		if(Alloy.Globals.currentWindow == null){
			return;
		}
		
		if(Alloy.Globals.currentWindow.panelLoadingModuleInitialized){
			preloader.hide();
			instance.panelModal.setVisible(false);
		}
	};
	
	instance.setProgress = function(percent){
		instance.progress.setVisible(true);
		instance.progress.setText(" " + percent + "%");
	};
	
	instance.setMessage = function(message){
		instance.message.setVisible(true);
		instance.message.setText(message);
	};
	
	return instance;
})();

module.exports = PanelLoading;

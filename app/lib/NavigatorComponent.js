var Animator = require("Animator");
var NavigatorComponent = function(){
	
	var oRef = this;
	
	var controllerStack = [];
	
	var confirmedExit = false;
	
	this.homeController = null;
	
	this.openHome = function(){
		
		oRef.openWindow('menu', true);
	};
	
	this.openWindow = function(controllerName, removeStack, args,transType){
		
		if(removeStack === true){
			oRef.clearStack();
		}
		//--- Determinando posicion dependiendo del tipo de animacion ---//
		var positionOfView;
		var animationPosition;
		var opacity;
		if (transType == 'forward') {
			positionOfView = '100%';
			animationPosition = -Ti.Platform.displayCaps.platformWidth;
		}else{
			Ti.API.info('Opacity 0');
			positionOfView = '0';
			opacity = 0;
		}
		
		//Alloy.Globals.panelLoading.show();
		Alloy.Globals.loading.show('Cargando...');
		
		var controller = Alloy.createController(controllerName, args);
		var view = controller.getView();
			view.left = positionOfView;
			view.opacity = opacity ;
		var lastController = Alloy.Globals.currentController;
		Alloy.Globals.currentController = controller;
		Alloy.Globals.currentController.name = controllerName;
		
		var onViewOpen = function(){
			//Alloy.Globals.panelLoading.hide();
			Alloy.Globals.loading.hide();
			controller.getView().removeEventListener('postlayout', onViewOpen);
			
			if(lastController != null){
				lastController.close();
				Alloy.Globals.currentWindow.remove(lastController.getView());
			}
		};
		controller.getView().addEventListener('postlayout', onViewOpen);
		controllerStack.push([controllerName, args]);
		
		Alloy.Globals.currentWindow.add(controller.getView());
		if(transType == 'fade'){
			new Animator().fade({view:controller.getView(), value:1,duration:1000});
		}else{
			new Animator().moveTo({view:controller.getView(), value:{x:animationPosition,y:0},duration:300});
		}
		
	};
	
	this.goBack = function(){
		
		if(Alloy.Globals.currentController.name == 'menu' || Alloy.Globals.currentController.name == 'login'){
			if (!confirmedExit && OS_ANDROID){
				confirmedExit = true;
				Ti.API.info("At end of historyStack, showing exit confirmation message");
				
				var toast = Ti.UI.createNotification({
					message: "Presiona nuevamente atras para salir",
					duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
				}).show();
				
				// reset confirmation
				setTimeout(function() {
					confirmedExit = false;
				}, 2500);
				
				return;
			}else{
				Alloy.Globals.currentWindow.close();
				return;
			}

		}
		
		var newControllerStack = [];
		for(var i=0; i<controllerStack.length - 1; i++){
			newControllerStack[i] = controllerStack[i];
		}
		controllerStack = newControllerStack;
		
		
		if(controllerStack.length == 0){
			oRef.openHome();
			return;
		}
		
		// --- open controller ---
		var controllerName = controllerStack[controllerStack.length - 1][0];
		var controllerArgs = controllerStack[controllerStack.length - 1][1];
		var controller = Alloy.createController(controllerName, controllerArgs);
		var view = controller.getView();
			view.left = '-100%';
			
		//Alloy.Globals.panelLoading.show();
		Alloy.Globals.loading.show('Cargando...');
		
		var lastController = Alloy.Globals.currentController;
		Alloy.Globals.currentController = controller;
		Alloy.Globals.currentController.name = controllerName;
		
		var onViewOpen = function(){
			//Alloy.Globals.panelLoading.hide();
			Alloy.Globals.loading.hide();
			controller.getView().removeEventListener('postlayout', onViewOpen);
			
			if(lastController != null){
				lastController.close();
				Alloy.Globals.currentWindow.remove(lastController.getView());
			}
		};
		controller.getView().addEventListener('postlayout', onViewOpen);
		
		Alloy.Globals.currentWindow.add(controller.getView());
		new Animator().moveTo({view:controller.getView(), value:{x:Ti.Platform.displayCaps.platformWidth,y:0},duration:300});
		
		Ti.API.info("---- NavigatorComponent -> goBack ----");
		Ti.API.info(controllerStack);
	};
	
	this.openLogin = function(){
		if(Alloy.Globals.currentController == null || Alloy.Globals.currentController.name != 'login'){
			//Alloy.Globals.session.logout();
			oRef.openWindow('calendario_tutorial',true,[],'fade');
		}
	};
	
	this.clearStack = function(){
		controllerStack = [];
		
		Ti.API.info("---- NavigatorComponent -> clearStack ----");
		Ti.API.info(controllerStack);
	};
	
	
};

module.exports = NavigatorComponent;

var NavigatorComponent = function(){
	
	var oRef = this;
	
	var controllerStack = [];
	
	this.homeController = null;
	
	this.openHome = function(){
		
		oRef.openWindow('home', true);
	};
	
	this.openWindow = function(controllerName, removeStack, args){
		
		if(removeStack === true){
			oRef.clearStack();
		}
		
		Alloy.Globals.panelLoading.show();
		
		var controller = Alloy.createController(controllerName, args);
		var lastController = Alloy.Globals.currentController;
		Alloy.Globals.currentController = controller;
		Alloy.Globals.currentController.name = controllerName;
		
		var onViewOpen = function(){
			Alloy.Globals.panelLoading.hide();
			controller.getView().removeEventListener('postlayout', onViewOpen);
			
			if(lastController != null){
				lastController.close();
				Alloy.Globals.currentWindow.remove(lastController.getView());
			}
		};
		controller.getView().addEventListener('postlayout', onViewOpen);
		
		controllerStack.push([controllerName, args]);
		
		Alloy.Globals.currentWindow.add(controller.getView());
	};
	
	this.goBack = function(){
		
		if(Alloy.Globals.currentController.name == 'home' || Alloy.Globals.currentController.name == 'login'){
			Alloy.Globals.currentWindow.close();
			return;
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
		
		Alloy.Globals.panelLoading.show();
		
		var lastController = Alloy.Globals.currentController;
		Alloy.Globals.currentController = controller;
		Alloy.Globals.currentController.name = controllerName;
		
		var onViewOpen = function(){
			Alloy.Globals.panelLoading.hide();
			controller.getView().removeEventListener('postlayout', onViewOpen);
			
			if(lastController != null){
				lastController.close();
				Alloy.Globals.currentWindow.remove(lastController.getView());
			}
		};
		controller.getView().addEventListener('postlayout', onViewOpen);
		
		Alloy.Globals.currentWindow.add(controller.getView());
		
		Ti.API.info("---- NavigatorComponent -> goBack ----");
		Ti.API.info(controllerStack);
	};
	
	this.openLogin = function(){
		if(Alloy.Globals.currentController == null || Alloy.Globals.currentController.name != 'login'){
			Alloy.Globals.session.logout();
			oRef.openWindow('login', true);
		}
	};
	
	this.clearStack = function(){
		controllerStack = [];
		
		Ti.API.info("---- NavigatorComponent -> clearStack ----");
		Ti.API.info(controllerStack);
	};
	
	
};

module.exports = NavigatorComponent;

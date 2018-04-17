"use strict"
import { EventDispatcher } from "xassist"
function UIBaseController(model,view){
	EventDispatcher.call(this);
	this.initialized=false;
	this.model=model;
	
	this.view=view
	
	//this.onEvent=new Event(this);
	//this.init();
}
UIBaseController.prototype = Object.create(EventDispatcher.prototype); // Here's where the inheritance occurs
UIBaseController.prototype.constructor = UIBaseController;


UIBaseController.prototype.init=function(config,state,content){
	//this.model.init(config,state,content);
	//this.addChildren(options,data);
	//this.attachChildEvents();
	
	//this.setViewContent();
	if(!this.model.initialized){
		this.model.init(config,state,content);
	}
	if(!this.view.initialized){
		this.view.init(this.model.getConfiguration(),this.model.getContent());
	}
	this.addListeners();
	this.registerEvents();
	this.initialized=true;
}
UIBaseController.prototype.registerEvents=function(){
	this.registerEvent("change");
}
UIBaseController.prototype.render=function(){
	this.view.render(this.model.getState());
}
UIBaseController.prototype.addListeners=function(){
	/*this.model.on("stateChanged",function(state){
		this.fire("event",state);
		console.log('stateChanged');
		console.log(arguments)
	});
	this.model.on("contentChanged",function(){
		console.log("contentChanged");
		console.log(arguments)
	});*/
}

export default UIBaseController;
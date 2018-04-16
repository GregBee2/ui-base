/**
* @preserve
* https://github.com/GregBee2/ui-base.git Version 0.0.3.
*  Copyright 2018 Gregory Beirens.
*  Created on Mon, 16 Apr 2018 13:33:07 GMT.
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('xassist')) :
	typeof define === 'function' && define.amd ? define(['exports', 'xassist'], factory) :
	(factory((global.xv = global.xv || {}),global.xv));
}(this, (function (exports,xassist) { 'use strict';

function UIBaseModel(defaultConfig,defaultState,defaultContent,idPrefix){
	xassist.EventDispatcher.call(this);
	this.config=defaultConfig||{};
	if(this.config){
		this.config.id=(typeof idPrefix==="string"?xassist.id(idPrefix):xassist.id());
	}

	this.state=defaultState||false;

	this.content=defaultContent||false;
	this.initialized=false;
}
UIBaseModel.prototype = Object.create(xassist.EventDispatcher.prototype); // Here's where the inheritance occurs
UIBaseModel.prototype.constructor = UIBaseModel;
UIBaseModel.prototype.init=function(config,state,content){
	this.setConfiguration(config);
	this.setState(state);
	this.setContent(content);
	this.registerEvents();
	this.initialized=true;
	return this;
};
UIBaseModel.prototype.registerEvents=function(){
	if(this.state){
		this.registerEvent("stateChanged");
	}
	if(this.content){
		this.registerEvent("contentChanged");
	}
};
UIBaseModel.prototype.setConfiguration=function(config){
	xassist.object(this.config).mergeUnique(config);
};

var _setStateContent=function(type){
	return function(key,value){
		var oldValue;
		if(!~['state','content'].indexOf(type)||!this[type]){
			//default returnvalue is fals indicating nothing changed
			return false;
		}
		else if(typeof key==="object"){
			//key is an object
			//no events are fired
			//is used during init
			xassist.object(this[type]).mergeUnique(key);
			return true;
		}
		else if(this[type].hasOwnProperty(key)){
			oldValue=this.content[key];
			this[type][key]=value;
			return this._checkStateContentChanged(type,oldValue,value,key,{})
		}
		//default returnvalue is fals indicating nothing changed
		return false;
	}
};

UIBaseModel.prototype.setContent=_setStateContent('content');
UIBaseModel.prototype.setState=_setStateContent('state');
UIBaseModel.prototype.getConfiguration=function(){
	return this.config;
};
UIBaseModel.prototype.getState=function(){
	return this.state;
};
UIBaseModel.prototype.getContent=function(){
	return this.content;
};
UIBaseModel.prototype._checkStateContentChanged=function(type,oldValue,newValue,key,details){
	if(this.initialized&&oldValue!==newValue){
		this.fire(type+"Changed",{
			type:key,
			oldValue:oldValue,
			newValue:newValue,
			details:details
		});
		return true;
	}
	return false
};

function UIBaseView(baseClass,containerElm){
	this.initialized=false;
	this.containerElm=containerElm;
	this.baseClass=baseClass||false;
	//this.init(config);
}

UIBaseView.prototype.init=function(config,content){
	//overrides parentClass init-method
	this.element=this.createElement(config,content);
	this.initialized=true;
};

UIBaseView.prototype.createElement=function(config,content){
	var elm=document.createElement("div");
	elm.id=config.id;
	elm.className=this.getClassName(config);
	elm.innerHTML=this.getContent(content,config);
	return elm;
};

UIBaseView.prototype.getContent=function(/*content,config*/){
	return "";
};
UIBaseView.prototype.getClassName=function(/*config*/){
	return this.className||"";
};

UIBaseView.prototype.render=function(state){
	if(state){
		this.setState(state);
	}
	if(this.initialized){
		this.containerElm.appendChild(this.element);
		return true;
	}
	return false;
};
UIBaseView.prototype.setState=function(/*state*/){
	/*this.disable(state.disabled);
	this.select(state.selected);
	this.show(state.visible);*/
		
};

function UIBaseController(model,view){
	xassist.EventDispatcher.call(this);
	this.initialized=false;
	this.model=model;
	
	this.view=view;
	
	//this.onEvent=new Event(this);
	this.init();
}
UIBaseController.prototype = Object.create(xassist.EventDispatcher.prototype); // Here's where the inheritance occurs
UIBaseController.prototype.constructor = UIBaseController;


UIBaseController.prototype.init=function(){
	//this.model.init(config,state,content);
	//this.addChildren(options,data);
	//this.attachChildEvents();
	
	//this.setViewContent();
	if(!this.model.initialized){
		this.model.init();
	}
	if(!this.view.initialized){
		this.view.init(this.model.getConfiguration(),this.model.getContent);
	}
	this.addListeners();
	this.registerEvents();
	this.initialized=true;
};
UIBaseController.prototype.registerEvents=function(){
	this.registerEvent("change");
};
UIBaseController.prototype.render=function(){
	this.view.render(this.model.getState());
};
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
};

exports.BaseModel = UIBaseModel;
exports.BaseView = UIBaseView;
exports.BaseController = UIBaseController;

Object.defineProperty(exports, '__esModule', { value: true });

})));

"use strict"

import { id, EventDispatcher, object } from "xassist"

function UIBaseModel(defaultConfig,defaultState,defaultContent,idPrefix){
	EventDispatcher.call(this);
	this.config=defaultConfig||{};
	if(this.config){
		this.config.id=(typeof idPrefix==="string"?id(idPrefix):id())
	}

	this.state=defaultState||false;

	this.content=defaultContent||false
	this.initialized=false
}
UIBaseModel.prototype = Object.create(EventDispatcher.prototype); // Here's where the inheritance occurs
UIBaseModel.prototype.constructor = UIBaseModel;
UIBaseModel.prototype.init=function(config,state,content){
	this.setConfiguration(config);
	this.setState(state);
	this.setContent(content);
	this.registerEvents();
	this.initialized=true;
	return this;
}
UIBaseModel.prototype.registerEvents=function(){
	if(this.state){
		this.registerEvent("stateChanged");
	}
	if(this.content){
		this.registerEvent("contentChanged");
	}
}
UIBaseModel.prototype.setConfiguration=function(config){
	object(this.config).mergeUnique(config);
}

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
			object(this[type]).mergeUnique(key);
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
}

UIBaseModel.prototype.setContent=_setStateContent('content')
UIBaseModel.prototype.setState=_setStateContent('state')
UIBaseModel.prototype.getConfiguration=function(){
	return this.config;
}
UIBaseModel.prototype.getState=function(){
	return this.state;
}
UIBaseModel.prototype.getContent=function(){
	return this.content;
}
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
}

export default UIBaseModel
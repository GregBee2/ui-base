"use strict"

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
}

UIBaseView.prototype.createElement=function(config,content){
	var elm=document.createElement("div"),className="";
	elm.id=config.id;
	elm.className=this.getClassName(config);
	elm.innerHTML=this.getContent(content,config);
	return elm;
}

UIBaseView.prototype.getContent=function(content,config){
	return "";
}
UIBaseView.prototype.getClassName=function(config){
	return this.className||"";
}

UIBaseView.prototype.render=function(state){
	if(state){
		this.setState(state);
	}
	if(this.initialized){
		this.containerElm.appendChild(this.element);
		return true;
	}
	return false;
}
UIBaseView.prototype.setState=function(/*state*/){
	/*this.disable(state.disabled);
	this.select(state.selected);
	this.show(state.visible);*/
		
}
export default UIBaseView;
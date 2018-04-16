var definition = require("../package.json");
var xv =require("../"+definition.main);
var tape=require("tape");

var jsdom = require("jsdom");
var doc=new jsdom.JSDOM("<!DOCTYPE html><div id='container'></h1>")
global.window=doc.window;
global.document =global.window.document;

var _defaultConfig={
		testConf:1
	},
	_defaultState={
		testState:2
	},
	_defaultContent={
		testCont:3
	},
	idPrefix="test",
	baseClass="testClass",
	container=document.getElementById("container")

tape("BaseController: creates new instance", function(test){
	var m=new xv.BaseModel(_defaultConfig,_defaultState,_defaultContent,idPrefix);
	m.init();
	var v=new xv.BaseView(baseClass,container);
	var c=new xv.BaseController(m,v)
	test.ok(c.constructor.name=== "UIBaseController",
		"BaseController sets correct class name for instance (UIBaseController)")
	test.ok(c.view.initialized,
		"BaseController initializes view and model if needed")
	test.end()
})
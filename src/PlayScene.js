/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 游戏窗口场景

 Author: roc from android team.

 Date: 2015-07-22

 ****************************************************************************/
var PlayLayer = cc.Layer.extend({
    ctor:function (){
        this._super();

        this.addBackgroundLayer();
        this.addProLayer();

        return true;
    },

    addBackgroundLayer:function () {
        var backgroundLayer = new BackLayer();
        this.addChild(backgroundLayer);
    },

    addProLayer:function () {
        var foreLayer = new ForeLayer();
        this.addChild(foreLayer);
    }
});

var PlayScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new PlayLayer();
		this.addChild(layer);
	}
});
/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 游戏窗口场景

 Author: roc from android team.

 Date: 2015-07-22

 ****************************************************************************/
var OverLayer = cc.Layer.extend({

});

var OverScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new PlayLayer();
		this.addChild(layer);
	}
});
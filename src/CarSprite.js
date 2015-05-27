/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 汽车精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var CarSprite = cc.Sprite.extend({
    onEnter:function () {
        cc.log("CarSprite onEnter");
        this._super();
    },

    onExit:function () {
        cc.log("CarSprite onExit");
        this._super();
    }
});
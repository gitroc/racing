/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 障碍物精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var BarrierSprite = cc.Sprite.extend({
    onEnter:function () {
        cc.log("BarrierSprite onEnter");
        this._super();
    },

    onExit:function () {
        cc.log("BarrierSprite onExit");
        this._super();
    }，

    //障碍物精灵刷新
    onUpdate:function () {

    }
});
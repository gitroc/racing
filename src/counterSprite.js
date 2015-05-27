/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 倒计时精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var CounterSprite = cc.Sprite.extend({
    onEnter:function () {
        cc.log("CounterSprite onEnter");
        this._super();
    },

    onExit:function () {
        cc.log("CounterSprite onExit");
        this._super();
    },

    onInit:function () {

    }
});
/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 障碍物精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var BarrierSprite = cc.Sprite.extend({
    active:true,
    speedListener:null,
    verticalMoveTime:0,
    onEnter:function () {
        this._super();
    },

    onExit:function () {
        this._super();
    }
});
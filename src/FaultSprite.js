/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 违规精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var FaultSprite = cc.Sprite.extend({
    onEnter:function () {
        cc.log("FaultSprite onEnter");
        this._super();
    },

    onExit:function () {
        cc.log("FaultSprite onExit");
        this._super();
    }
});
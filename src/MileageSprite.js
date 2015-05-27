/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 里程精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var MileageSprite = cc.Sprite.extend({
    onEnter:function () {
        cc.log("MileageSprite onEnter");
        this._super();
    },

    onExit:function () {
        cc.log("MileageSprite onExit");
        this._super();
    }
});
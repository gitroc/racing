/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 倒计时精灵

 Author: roc from android team.

 Date: 2015-06-23

 ****************************************************************************/
var ReadyGoSprite = cc.Sprite.extend({
    counter:0,
    onEnter:function () {
        this._super();
        this.startTimer();
    },

    onExit:function () {
        this._super();
    },

    readyGo:function () {
        if (this.counter < 4) {
            this.counter += 1;
        } else {
            this.getParent().startGame();
        }
    },

    startTimer:function () {
        this.schedule(this.readyGo, 1, 4, 1);
    }
});
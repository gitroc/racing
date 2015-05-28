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

        this.onUpdate();
    },

    onExit:function () {
        cc.log("CounterSprite onExit");
        this._super();
    },

    //倒计时精灵刷新
    onUpdate:function () {
        if (this.getParent().timeout == 0) {
            this.onTimeOut();
            return;
        } else if (this.getParent().timeout == 300) {
            this.getParent().timeoutLabel.setString(this.getParent().timeout);
        }

        this.getParent().timeout -= 1;
        this.getParent().timeoutLabel.setString(this.getParent().timeout);
    },

    //倒计时精灵结束
    onTimeOut:function () {
        //调用游戏失败Sence.
    }
});
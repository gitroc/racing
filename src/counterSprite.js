/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 倒计时精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var CounterSprite = cc.Sprite.extend({
    time:null,
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

    initCounter:function () {
        this.time = 0;

        var label2 = new cc.LabelAtlas("0123456789", s_resprefix + "fonts/tuffy_bold_italic-charmap.plist");
        this.addChild(label2, 0, TAG_LABEL_SPRITE12);
        label2.x = 10;
        label2.y = 200;
        label2.opacity = 32;

        this.schedule(this.step);
    },

    step:function (dt) {
        //----start0----step
        this.time += dt;

        var label2 = this.getChildByTag(TAG_LABEL_SPRITE12);
        var string2 = parseInt(this.time, 10).toString();
        label2.setString(string2);
        //----end0----
    },

    //倒计时精灵结束
    onTimeOut:function () {
        //调用游戏失败Sence.
    }
});
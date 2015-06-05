/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 背景精灵

 Author: roc from android team.

 Date: 2015-06-05

 ****************************************************************************/
 var Bg_Png_Max = 4;
 var BgSprite = cc.Sprite.extend({
    bgAnimation:null,
    onEnter:function () {
        this._super();
        cc.log("BgSprite onEnter");
        this.bgAnimation = this.initBgAnimation();

        this.schedule(this.update, 0.2, 16*1024, 0.2);
    },

    onExit:function () {
        cc.log("BgSprite onExit");
        this._super();
    },

    update: function (dt) {
        this.bgAnimation.retain();
        this.runAction(this.bgAnimation);
    },

    //创建背景动画
    initBgAnimation:function () {
        var frames = [];
        for (var i = 0; i < Bg_Png_Max; i++) {
            var str = "bg0" + (i + 1) + ".png";
            cc.log(str);
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            cc.log(frame);
            frames.push(frame);
        }

        var animation = new cc.Animation(frames, 0.5);
        cc.log(animation);
        var action = new cc.Animate(animation);
        cc.log(action);

        return action;
    }
 });
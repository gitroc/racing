/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 道路精灵

 Author: roc from android team.

 Date: 2015-06-05

 ****************************************************************************/
 var RoadSprite = cc.Sprite.extend({
    roadAnimation:null,
    onEnter:function () {
        this._super();
        this.roadAnimation = this.initAnimation();
        this.roadAnimation.retain();
        this.schedule(this.update, 0.2, 16*1024, 0.2);
    },

    onExit:function () {
        this.unschedule(this.update);
        this._super();
    },

    update: function (dt) {
        this.runAction(this.roadAnimation);
    },

    //创建背景动画
    initAnimation:function () {
        var frames = [];
        for (var i = 0; i < GC.Road_Png_Max; i++) {
            var str = "main_road_mid" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }

        var animation = new cc.Animation(frames, 0.5);
        var action = new cc.Animate(animation);

        return action;
    }
 });
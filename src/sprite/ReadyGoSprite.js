/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 倒计时精灵

 Author: roc from android team.

 Date: 2015-06-23

 ****************************************************************************/
var ReadyGoSprite = cc.Sprite.extend({
    counter:0,
    frames:null,
    onEnter:function () {
        this._super();
        this.initSprites();
    },

    onExit:function () {
        this._super();
    },

    //初始化精灵图片
    initSprites:function () {
        this.frames = [];

        for (var i = 0; i < GC.Loading_Guide_Max; i++) {
            var str = "loading_guide" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.frames.push(frame);
        }

        this.startTimer();
    },

    //缩放动画
    readyGo:function () {
        if (GC.Game_Current == GC.Game_Loading) {
            if (this.counter < GC.Loading_Guide_Max) {
                var sprite = new cc.Sprite(this.frames[this.counter]);
                sprite.attr({
                    x: GC.w_2,
                    y: GC.h_2,
                    anchorX: 0.5,
                    anchorY: 0.5,
                });

                if (this.counter % 2 == 0) {
                    sprite.scale = 0.1;
                } else {
                    sprite.scale = 0.8;
                }

                this.getParent().addChild(sprite, GC.Loading_Timer);

                if (this.counter % 2 == 0) {
                    var action = cc.scaleTo(0.5, 0.8);

                    var seq = cc.sequence(
                        action,
                        cc.fadeOut(0.5),
                        cc.callFunc(function () {
                            sprite.removeFromParent();
                        })
                    );
                } else {
                    var seq = cc.sequence(
                        cc.fadeOut(0.5),
                        cc.callFunc(function () {
                            sprite.removeFromParent();
                        })
                    );
                }

                sprite.runAction(seq);

                this.counter ++;
            } else {
                this.unschedule(this.readyGo);
                this.getParent().LoadingBg.removeFromParent();
                GC.Game_Current = GC.Game_Start;
            }
        }
    },

    startTimer:function () {
        this.schedule(this.readyGo, 0.45, cc.REPEAT_FOREVER, 0);
    }
});
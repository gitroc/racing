/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 背景精灵

 Author: roc from android team.

 Date: 2015-06-10

 ****************************************************************************/
var LeftBg = -1;
var MidBg = 0;
var RightBg = 1;

var BgSprite = cc.Sprite.extend({
    touchListener:null,
    onEnter:function () {
        this._super();

        this.addListener();
    },

    onExit:function () {
        this.removeListener();
        this._super();
    },

    addListener:function() {
        if('touches' in cc.sys.capabilities) { //支持触摸事件
            this.touchListener = cc.eventManager.addListener(
                cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                    onTouchesEnded:function (touches, event) {
                        if (touches.length <= 0) {
                            return;
                        }
                        var target = event.getCurrentTarget();
                        target.moveBg(target, touches[0].getLocation());
                    }
                }),
                this
            );
        } else if ('mouse' in cc.sys.capabilities) { //支持鼠标事件
            this.touchListener = cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    var target = event.getCurrentTarget();
                    target.moveBg(target, event.getLocation());
                }
            }, this);
        }
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.touchListener);
    },

    moveBg:function (target, position) {
        var bgX = 0;
        var bgY = 0;
        target.stopAllActions();
        var targetX = Math.round(target.x);

        if (position.x < targetX) { //向左移动
            if (this.getParent().currentBg == RightBg) { //在最右边
                //背景替换为中间
                bgX = GC.Bg_Center_X;
                bgY = GC.Bg_Center_Y;

                this.getParent().currentBg = MidBg;
            } else if (this.getParent().currentBg == MidBg){ //在中间
                //背景替换为左半边
                bgX = GC.Bg_Left_X;
                bgY = GC.Bg_Left_Y;

                this.getParent().currentBg = LeftBg;
            } else {
                //背景替换为左半边
                bgX = GC.Bg_Left_X;
                bgY = GC.Bg_Left_Y;

                this.getParent().currentBg = LeftBg;
            }
        } else if (position.x > targetX) { //向右移动
            if (this.getParent().currentBg == LeftBg) { //在最左边
                //背景替换为中间
                bgX = GC.Bg_Center_X;
                bgY = GC.Bg_Center_Y;

                this.getParent().currentBg = MidBg;
            } else if (this.getParent().currentBg == MidBg){ //在中间
                //背景替换为右半边
                bgX = GC.Bg_Right_X;
                bgY = GC.Bg_Right_Y;
                this.getParent().currentBg = RightBg;
            } else {
                //背景替换为右半边
                bgX = GC.Bg_Right_X;
                bgY = GC.Bg_Right_Y;
                this.getParent().currentBg = RightBg;
            }
        }

        var bg = new BgSprite(res.BackGround_png, cc.rect(bgX, bgY, GC.w, GC.h));

        bg.attr({
            x: GC.w_2,
            y: GC.h_2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this.getParent().addChild(bg, GC.BackGround_Sprite);

        target.removeFromParent();
    }
});
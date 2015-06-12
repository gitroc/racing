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
var centerX = 320;

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
        var positionX = Math.round(position.x);
        var targetX = Math.round(target.x);

//        cc.log("targetX:"+targetX+"|positionX:"+positionX);

        //targetX =320/190/540
        if(positionX>centerX - 120&&positionX<centerX+120){//避开车的范围
            return;
        }
        if(centerX == 450){//车在最右边
            if(positionX<centerX){//向左移动
                bgX = GC.Bg_Center_X;
                bgY = GC.Bg_Center_Y;
                centerX =320;
            }
        }else if(centerX == 320){//车在中间
            if(positionX<320){//向左移动
                bgX = GC.Bg_Left_X;
                bgY = GC.Bg_Left_Y;
                centerX = 190;
            }else{//向右移动
                centerX = 450;
                bgX = GC.Bg_Right_X;
                bgY = GC.Bg_Right_Y;
            }
        }else if(centerX ==190){//车在最左边
            if(positionX>190){//向右移动
                bgX = GC.Bg_Center_X;
                bgY = GC.Bg_Center_Y;
                centerX = 320;
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
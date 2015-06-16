/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 石头精灵

 Author: roc from android team.

 Date: 2015-06-08

****************************************************************************/
var StoneSprite = cc.Sprite.extend({
    stoneFrames:null,
    touchListener:null,
    onEnter:function () {
        this._super();
        this.initSprites();
        this.addListener();
        this.schedule(this.buriedStone, 1, cc.REPEAT_FOREVER, 0);
    },

    onExit:function () {
        this.removeListener();
        this.unschedule(this.buriedStone);
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
                        target.updateOffset(target, touches[0].getLocation());
                    }
                }),
                this
            );
        } else if ('mouse' in cc.sys.capabilities) { //支持鼠标事件
            this.touchListener = cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    var target = event.getCurrentTarget();
                    target.updateOffset(target, event.getLocation());
                }
            }, this);
        }
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.touchListener);
    },

    //初始化精灵图片
    initSprites:function () {
        this.stoneFrames = [];

        for (var i = 0; i < GC.Stone_Png_Max; i++) {
            var str = "main_bg_object_stone" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.stoneFrames.push(frame);
        }
    },

    //获取石头图片
    getStoneFrame:function () {
        var value = 10 * cc.random0To1().toFixed(1);
        if (value >= 5 && value < GC.Tree_Png_Max + 5) {
            return this.stoneFrames[value - 5];
        } else {
            return this.stoneFrames[0];
        }
    },

    getStoneOrg:function () {
        var value = cc.random0To1();

        var x = 0;
        var y = 0;

        if (value > 0.5) {
            x = GC.Stone_Show_Right_X + this.getParent().currentStoneOffset;
            y = GC.Stone_Show_Right_Y;
        } else {
            x = GC.Stone_Show_Left_X + this.getParent().currentStoneOffset;
            y = GC.Stone_Show_Left_Y;
        }

        return cc.p(x, y);
    },

    getStoneScale:function () {
        var value = cc.random0To1();
        var scale = 0;
        if (value < 0.5) {
            scale = GC.Stone_Show_Left_scale;
        } else {
            scale = GC.Stone_Show_Right_scale;
        }

        return scale;
    },

    //埋石头
    buriedStone:function () {
        var sprite = new cc.Sprite(this.getStoneFrame());
        var x = this.getStoneOrg().x;
        var y = this.getStoneOrg().y;
        sprite.attr({
            x:x,
            y:y,
            anchorX: 0.5,
            anchorY: 0.5,
            scale:this.getStoneScale()
        });

        this.getParent().addChild(sprite, GC.Stone_Sprite);

        var track = [
            cc.p(x, y),
            this.getParent().getSpriteGoal(cc.p(x, y), this.getParent().currentStoneOffset),
        ];

        this.getParent().moveSprite(sprite, 2, track, 2);
    },

    updateOffset:function (target, position) {
        target.stopAllActions();
        target.unschedule(target.buriedStone);

        var positionX = Math.round(position.x);

        if (this.getParent().currentStoneOffset == 0) { //在中间
            if (positionX < GC.Car_Center_X) {
                this.getParent().currentStoneOffset = 100;// 向左移动
            } else {
                this.getParent().currentStoneOffset = -100;// 向右移动
            }
        } else if (this.getParent().currentStoneOffset == 100) {
            if (positionX > GC.Car_Left_X) {
                this.getParent().currentStoneOffset = 0
            }
        } else if (this.getParent().currentStoneOffset == -100) {
            if (positionX < GC.Car_Right_X) {
                this.getParent().currentStoneOffset = 0
            }
        }

        var actionMove = cc.moveTo(0.5,cc.p(this.getParent().currentTreeOffset,0));//moveTo or moveBy
        this.runAction(actionMove);
//        var stone = new StoneSprite();
//        this.getParent().addChild(stone, GC.Stone_Sprite);
//
//        target.removeFromParent();
    }
});
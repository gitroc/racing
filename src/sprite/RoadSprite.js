/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 道路斑马线精灵

 Author: roc from android team.

 Date: 2015-06-05

 ****************************************************************************/
 var currentRoad = GC.Car_Center_X;
 var RoadSprite = cc.Sprite.extend({
    touchListener:null,
    roadAnimation:null,
    onEnter:function () {
        this._super();
        this.roadAnimation = this.initAnimation();
        this.schedule(this.update, 0.2, cc.REPEAT_FOREVER, 0.2);
        this.addListener();
    },

    onExit:function () {
        this.unschedule(this.update);
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
                        target.moveRoad(target, touches[0].getLocation());
                    }
                }),
                this
            );
        } else if ('mouse' in cc.sys.capabilities) { //支持鼠标事件
            this.touchListener = cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    var target = event.getCurrentTarget();
                    target.moveRoad(target, event.getLocation());
                }
            }, this);
        }
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.touchListener);
    },

    update: function (dt) {
        this.runAction(this.roadAnimation);
    },

    getRoadStr:function (index) {
        var str = "main_road_mid";
        if (currentRoad == GC.Car_Center_X) { // 中间
            str = "main_road_mid";
        } else if (currentRoad == GC.Car_Left_X){ // 左边
            str = "main_road_left";
        } else if (currentRoad == GC.Car_Right_X) { //右边
            str = "main_road_right";
        }

        return (str + (index + 1) + ".png");
    },

    //创建斑马线动画
    initAnimation:function () {
        var frames = [];
        for (var i = 0; i < GC.Road_Png_Max; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame(this.getRoadStr(i));
            frames.push(frame);
        }

        var animation = new cc.Animation(frames, 0.5);
        var action = new cc.Animate(animation);

        return action;
    },

    moveRoad:function (target, position) {
        target.stopAllActions();

        var positionX = Math.round(position.x);
        var targetX = Math.round(target.x);

        if (positionX > currentRoad - GC.Car_Range && positionX < currentRoad + GC.Car_Range) { //避开汽车范围
            return;
        }

        if (currentRoad == GC.Car_Right_X) { //车在最右边
            if (positionX < currentRoad) {
                currentRoad = GC.Car_Center_X; //路向左移动
            } else {
                return; //路不动
            }
        } else if (currentRoad == GC.Car_Center_X) { //车在中间
            if (positionX < currentRoad) {
                currentRoad = GC.Car_Left_X; //路向左移动
            } else {
                currentRoad = GC.Car_Right_X;  //路向右移动
            }
        } else if (currentRoad == GC.Car_Left_X) { //车在最左边
            if (positionX > currentRoad) {
                currentRoad = GC.Car_Center_X; //路向右移动
            } else {
                return;   //路不动
            }
        }

        var road = new RoadSprite();

        road.attr({
            x: GC.w_2,
            y: GC.h_2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.getParent().addChild(road, GC.Road_Sprite);

        target.removeFromParent();
    }
 });
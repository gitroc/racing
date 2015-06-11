/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 汽车精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/
var CarSprite = cc.Sprite.extend({
    carLeft:null,
    carBack:null,
    carRight:null,
    touchListener:null,
    onEnter:function () {
        this._super();

        this.initCar();
        this.addListener();
    },

    onExit:function () {
        this.removeListener();

        this._super();
    },

    //添加移动事件监听
    /*************************************************
        you can printf the on you device.  for (var key in cc.sys.capabilities){cc.log("key:"+key);}
        those are
        key:canvas
        key:opengl
        key:touches
        key:mouse
        key:keyboard
        key:accelerometer
    *************************************************/
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
                        target.moveCar(target, touches[0].getLocation());
//                        target.carCrash();
                    }
                }),
                this
            );
        } else if ('mouse' in cc.sys.capabilities) { //支持鼠标事件
            this.touchListener = cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    var target = event.getCurrentTarget();
                    target.moveCar(target, event.getLocation());
//                    target.carCrash(target);
                }
            }, this);
        }
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.touchListener);
    },

    initCar:function () {
        if (this.carLeft == null) {
            this.carLeft = cc.spriteFrameCache.getSpriteFrame("main_car_left.png");
        }

        if (this.carBack == null) {
            this.carBack = cc.spriteFrameCache.getSpriteFrame("main_car_back.png");
        }

        if (this.carRight == null) {
            this.carRight = cc.spriteFrameCache.getSpriteFrame("main_car_right.png");
        }
    },

    //触屏移动汽车精灵
    moveCar:function (target, position) {
        var carGoalX = 0;
        var carGoalY = target.y;

        target.stopAllActions();

        var carPng = null;

        var targetX = Math.round(target.x);
        if (position.x < targetX) {// 向左
            if (targetX > GC.Car_Center_X) {
                carGoalX = GC.Car_Center_X;
                carPng = this.carBack;
            } else if (targetX > GC.Car_Left_X){
                carGoalX = GC.Car_Left_X;
                carPng = this.carLeft;
            } else {
                carGoalX = GC.Car_Left_X;
                carPng = this.carLeft;
            }
        } else if (position.x > targetX) {//向右
            if (targetX < GC.Car_Center_X) {
                carGoalX = GC.Car_Center_X;
                carPng = this.carBack;
            } else if (targetX < GC.Car_Right_X){
                carGoalX = GC.Car_Right_X;
                carPng = this.carRight;
            } else {
                carGoalX = GC.Car_Right_X;
                carPng = this.carRight;
            }
        } else {
            carGoalX = targetX;
            carPng = this.carBack;
        }

        var carSprite = new CarSprite(carPng);

        carSprite.attr({
            x: carGoalX,
            y: carGoalY,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this.getParent().addChild(carSprite, GC.Car_Sprite);

        target.removeFromParent();
    },

    carCrash:function(target) {
        for (var i = 0; i < this.getParent().barrierSprites.length; i++) {
            var carRect = target.getBoundingBox();
            var barrierRect = this.getParent().barrierSprites[i].getBoundingBox();
            if(cc.rectIntersectsRect(carRect, barrierRect)){
                  //发生碰撞事件
                  cc.log("carCrash");
                  this.getParent().barrierSprites[i].runAction(cc.sequence(
                      cc.rotateBy(0.5, 360),
                      cc.fadeOut(0.5))
                  );
                  this.getParent().removeBarrierSpriteByCrush(i);
            }
        }
    }
});
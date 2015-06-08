/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 汽车精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/
var CarSprite = cc.Sprite.extend({
    touchListener:null,
    AccelerometerListener:null,
    onEnter:function () {
//        cc.log("CarSprite onEnter");
        this._super();

        this.addListener();
    },

    onExit:function () {
//        cc.log("CarSprite onExit");
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
                        target.carCrash();
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
                    target.carCrash(target);
                }
            }, this);
        }
//        else if ('accelerometer' in cc.sys.capabilities) {
//            cc.inputManager.setAccelerometerEnabled(true);
//            cc.inputManager.setAccelerometerInterval(1/60);
//            this.AccelerometerListener = cc.eventManager.addListener({
//                event: cc.EventListener.ACCELERATION,
//                callback: function(acc, event){
//                    var target = event.getCurrentTarget();
//                    target.slideCar(target, acc);
//                    target.carCrash(target);
//                }
//            }, this);
//        }
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.touchListener);

//        if (this.AccelerometerListener != null) {
//            cc.inputManager.setAccelerometerEnabled(false);
//            cc.eventManager.removeListener(this.AccelerometerListener);
//        }
    },

    //触屏移动汽车精灵
    moveCar:function (target, position) {
        var currentX = 0;

        target.stopAllActions();

        cc.log("target.x = ", target.x);
        if (position.x < target.x) {// 向左
            if (target.x == GC.Car_RIGHT) {
                cc.log("left Car_CENTER = ", GC.Car_CENTER);
                currentX = GC.Car_CENTER;
            } else if (target.x == GC.Car_CENTER){
                cc.log("left Car_LEFT = ", GC.Car_LEFT);
                currentX = GC.Car_LEFT;
            } else {
                currentX = GC.Car_LEFT;
            }
        } else if (position.x > target.x) {//向右
            if (target.x == GC.Car_LEFT) {
                cc.log("right Car_CENTER = ", GC.Car_CENTER);
                currentX = GC.Car_CENTER;
            } else if (target.x == GC.Car_CENTER){
                cc.log("right Car_RIGHT = ", GC.Car_RIGHT);
                currentX = GC.Car_RIGHT;
            } else {
                currentX = GC.Car_RIGHT;
            }
        } else {
            cc.log("dot not move");
            currentX = target.x;
        }

        cc.log("currentX = ", currentX);
        var pos = new cc.p(currentX, target.y);

        target.runAction(cc.moveTo(1, pos));
    },

    //重力滑动汽车精灵
//    slideCar:function (target, acc) {
//        var size = cc.winSize;
//
//        var center =  size.width / 2;
//        var left = center / 3;
//        var right = size.width - left;
//
//        var currentX = 0;
//
//        target.stopAllActions();
//
//        if (acc.x > 0) { //向左
//            cc.log("left acc.x", acc.x);
//            if (target.x == right) {
//                currentX = center;
//            } else if (target.x == center){
//                currentX = left;
//            } else {
//                currentX = left;
//            }
//        } else { //向右
//            cc.log("right acc.x", acc.x);
//            if (target.x == left) {
//                currentX = center;
//            } else if (target.x == center){
//                currentX = right;
//            } else {
//                currentX = right;
//            }
//        }
//
//        var pos = new cc.p(currentX, target.y);
//
//        target.runAction(cc.moveTo(1, pos));
//    },

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
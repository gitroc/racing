/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 汽车精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/
var CarSprite = cc.Sprite.extend({
    touchListener:null,
    onEnter:function () {
        this._super();

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
                }
            }, this);
        }
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.touchListener);
    },

    //触屏移动汽车精灵
    moveCar:function (target, position) {
        if (this.getParent().gameStatus == GC.Game_Running) {
            var carX = 0;
            var carY = target.y;

            var BgX = 0;

            target.stopAllActions();

            var positionX = Math.round(position.x);
            var targetX = Math.round(target.x);

            if (positionX >= (targetX - GC.Car_Range) && positionX < targetX + GC.Car_Range) { //避开汽车范围
                return;
            }

            if (positionX < targetX) {// 向左
                if (targetX > GC.Car_Center_X) {
                //测试碰到加速道具道路的变化
//                    cc.log("test--到左道");
//                    this.getParent().newBgSprite.updateAction(0.05,0.2);
                    BgX = GC.Bg_Center_Offset_X;
                    carX = GC.Car_Center_X;
                } else {
                //测试碰到加速道具道路的变化
//                    cc.log("test--道中道");
//                    this.getParent().newBgSprite.updateAction(0.25,1);
                    BgX = GC.Bg_Left_Offset_X;
                    carX = GC.Car_Left_X;
                }
            } else if (positionX > targetX) {//向右
                if (targetX < GC.Car_Center_X) {
                    BgX = GC.Bg_Center_Offset_X;
                    carX = GC.Car_Center_X;
                } else {
                    BgX = GC.Bg_Right_Offset_X;
                    carX = GC.Car_Right_X;
                }
            }

            target.setSpriteFrame(this.getParent().getCarSprite(carX));

            var actionCar = cc.moveTo(GC.Horizontal_Move_Time, cc.p(carX, carY));
            target.runAction(actionCar);

            var actionBg = cc.moveTo(GC.Horizontal_Move_Time, cc.p(BgX, 0));
            this.getParent().runAction(actionBg);

        }

    }
});
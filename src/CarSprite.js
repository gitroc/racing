/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 汽车精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var CarSprite = cc.PhysicsSprite.extend({
    touchListener:null,
    onEnter:function () {
        cc.log("CarSprite onEnter");
        this._super();

        this.addListener();
    },

    onExit:function () {
        cc.log("CarSprite onExit");
        this._super();
        this.removeListener();
    },

    //添加移动事件监听
    addListener:function() {
        if( 'touches' in cc.sys.capabilities ) {
            this.touchListener = cc.eventManager.addListener(cc.EventListener.create({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesEnded:function (touches, event) {
                    if (touches.length <= 0) {
                        return;
                    }
                    var target = event.getCurrentTarget();
                    target.moveCar(target, touches[0].getLocation());
                }
            }), this);
        }
        else if ('mouse' in cc.sys.capabilities ) {
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

    moveCar:function(target, position) {
        var size = cc.winSize;
        target.stopAllActions();
        cc.log("position.x = ", position.x);
        cc.log("position.y = ", position.y);
        cc.log("target.x", target.x);
        cc.log("target.y", target.y);
//        target.runAction(cc.moveTo(1, cc.p(position.x, target.y)));
        target.runAction(cc.scaleTo(2, 2));
//        target.runAction(cc.rotateBy(1.5, 360));
//        var o = position.x - target.x;
//        var a = position.y - target.y;
//        var at = Math.atan(o / a) * 57.29577951;  // radians to degrees
//
//        if (a < 0) {
//            if (o < 0)
//                at = 180 + Math.abs(at);
//            else
//                at = 180 - Math.abs(at);
//        }
//
//        target.runAction(cc.rotateTo(1, at));
    }
});
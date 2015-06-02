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
        cc.log("CarSprite onEnter");
        this._super();

        this.initCar();

        this.addListener();
    },

    onExit:function () {
        cc.log("CarSprite onExit");
        this._super();
        this.removeListener();
    },

    initCar:function() {
        cc.log("Car CarSprite init");
        var size = cc.winSize;
    },

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

        var xLeft   = position.x + target.x;
        var yBottom = position.y + target.y;
        var xRight  = position.x - target.x;
        var yTop    = position.y - target.y;
        cc.log("xLeft = ", xLeft);
        cc.log("yBottom = ", yBottom);
        cc.log("xRight = ", xRight);
        cc.log("yTop = ", yTop);

        if (xLeft > 0 && xRight < size.width) {
            if (yBottom > 0 && yTop < size.height / 2) {
                cc.log("car move!");
                target.runAction(cc.moveTo(1, position));
            }
        }
    }

});
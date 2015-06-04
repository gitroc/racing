/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 障碍物精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var BarrierSprite = cc.Sprite.extend({
    crushListener:null,
    onEnter:function () {
//        cc.log("BarrierSprite onEnter");
        this._super();

        this.addListener();
    },

    onExit:function () {
//        cc.log("BarrierSprite onExit");
        this._super();
    },

    //障碍物精灵刷新
    onUpdate:function () {
    },

    //添加碰撞事件监听
    addListener:function() {
        this.crushListener = cc.eventManager.addListener(
             cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: "barrier_crush",
                callback: function(event){
//                    cc.log("barrier_crush");
                    var target = event.getCurrentTarget();
                    target.carCrash(target);
                }
            }),
            this
        );
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.crushListener);
    },

    //障碍物碰撞检测
    carCrash:function(target) {
        var carRect = this.getParent().carSprite.getBoundingBox();
        var barrierRect = target.getBoundingBox();

        if(cc.rectIntersectsRect(carRect, barrierRect)){
              //发生碰撞事件
              cc.log("carCrash");
              target.runAction(cc.sequence(
                  cc.rotateBy(0.5, 360),
                  cc.fadeOut(0.5))
              );
              this.getParent().removeBarrierSpriteByCrush(target.index - 1);
        }
    }
});
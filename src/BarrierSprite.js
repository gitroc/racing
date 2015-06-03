/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 障碍物精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var BarrierSprite = cc.PhysicsSprite.extend({
    onEnter:function () {
        cc.log("BarrierSprite onEnter");
        this._super();

        this.addListener();
    },

    onExit:function () {
        cc.log("BarrierSprite onExit");
        this._super();
    },

    //障碍物精灵刷新
    onUpdate:function () {
    },

    //添加碰撞事件监听
    addListener:function() {

    },
    //障碍物碰撞检测
    carCrash:function() {

    }
});
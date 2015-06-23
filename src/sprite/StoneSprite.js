/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 石头精灵

 Author: roc from android team.

 Date: 2015-06-08

****************************************************************************/
var StoneSprite = cc.Sprite.extend({
    stoneFrames:null,
    speedListener:null,
    time:0,
    onEnter:function () {
        this._super();
        this.initSprites();
        this.addListener();
    },

    onExit:function () {
        this.unschedule(this.buriedStone);
        this.removeListener();
        this._super();
    },

    addListener:function() {
        this.speedListener = cc.eventManager.addListener(
             cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: "speed_change",
                callback: function(event){
                    cc.log("stone speed_change", event.getUserData());
                    var target = event.getCurrentTarget();
                    target.resetSpeed(event.getUserData());
                }
            }),
            this
        );
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.speedListener);
    },

    //初始化精灵图片
    initSprites:function () {
        this.stoneFrames = [];

        for (var i = 0; i < GC.Stone_Png_Max; i++) {
            var str = "main_bg_object_stone" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.stoneFrames.push(frame);
        }

        this.startTimer();
    },

    //启动定时器
    startTimer:function () {
        if (this.getParent().gameStatus == GC.Game_Running) {
            this.setSpeed();
            this.schedule(this.buriedStone, 1, cc.REPEAT_FOREVER, 0);
        } else {
            this.stopAllActions();
            this.unschedule(this.buriedStone);
        }
    },

    setSpeed:function () {
        this.time = GC.Vertical_Move_Time;
    },

    resetSpeed:function (gameSpeed) {
        if (GC.Car_Speed_Slow == gameSpeed) {
            this.time = GC.Vertical_Move_Time + 1;
        } else if (GC.Car_Speed_Fast == gameSpeed) {
            this.time = GC.Vertical_Move_Time - 1;
        } else {
            this.setSpeed();
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

    //获取石头初始坐标
    getStoneOrg:function () {
        var value = cc.random0To1();

        var x = 0;
        var y = 0;

        if (value > 0.5) {
            x = GC.Stone_Show_Right_X;
            y = GC.Stone_Show_Right_Y;
        } else {
            x = GC.Stone_Show_Left_X;
            y = GC.Stone_Show_Left_Y;
        }

        return cc.p(x, y);
    },

    //获取石头初始大小
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
            this.getParent().getSpriteGoal(cc.p(x, y)),
        ];

        this.getParent().moveSprite(sprite, this.time, track, GC.Stone_Goal_scale);
    }
});
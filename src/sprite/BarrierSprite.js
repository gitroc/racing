/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 障碍物精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var BarrierSprite = cc.Sprite.extend({
    oneMapTime:0,
    barrierSprites:null,
    spriteArrays:null,
    trackArrays:null,
    goalScaleArrays:null,
    timeLineArrays:null,
    crashType:null,
    speedListener:null,
    verticalMoveTime:0,
    timeAdjustSpeed:0,
    onEnter:function () {
        this._super();
        this.initSprites();
        this.addListener();
    },

    onExit:function () {
        this.removeListener();
        this._super();
    },

    addListener:function() {
        this.speedListener = cc.eventManager.addListener(
             cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: "speed_change",
                callback: function(event){
                    cc.log("barrier speed_change", event.getUserData());
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
        this.barrierSprites = [];
        this.spriteArrays = [];
        this.trackArrays = [];
        this.goalScaleArrays = [];
        this.timeLineArrays = [];
        this.crashType = [];

        for (var i = 0; i < GC.Barrier_png_Max; i++) {
            var str = "main_road_barrier" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.barrierSprites.push(frame);
        }

        this.autoAdjustMap(this.timeAdjustSpeed);

        this.startTimer();
    },

    //根据游戏难度加载相关难度地图
    LoadingMaps:function (level) {
        var value = 10 * cc.random0To1().toFixed(1);
        var barrierMap = [];
        var timeLine = [];

        if (value + 20 >= GC.Barrier_Map_Max) {
            return;
        }

        switch (level) {
            case GC.Game_Level_Easy:
                barrierMap = GC.Barrier_Map[value][0];
                timeLine = GC.Barrier_Map[value][1];
            break;
            case GC.Game_Level_Normal:
                barrierMap = GC.Barrier_Map[value + 10][0];
                timeLine = GC.Barrier_Map[value + 10][1];
            break;
            case GC.Game_Level_Hard:
                barrierMap = GC.Barrier_Map[value + 20][0];
                timeLine = GC.Barrier_Map[value + 20][1];
            break;
        }

        this.clearBarrier();
        this.LoadOneMap(barrierMap, timeLine, GC.Barrier_Org_Position, GC.Barrier_Org_Scale, GC.Barrier_Goal_Position, GC.Barrier_Goal_Scale);
    },

    //生成障碍物
    LoadOneMap:function (Barrier_Map, Time_Line, Barrier_Org_Position, Barrier_Org_Scale, Barrier_Goal_Position, Barrier_Goal_Scale) {
        for (var i = 0; i < Barrier_Map.length ; i++) { //按列查询
            for (var j = 0; j < Barrier_Map[i].length; j++) {
                var type = Barrier_Map[i][j];

                if (type > 0) {

                    var sprite = new cc.Sprite(this.getBarrierFrame(type));

                    var x = Barrier_Org_Position[j].x;
                    var y = Barrier_Org_Position[j].y;

                    sprite.attr({
                        x:x,
                        y:y,
                        anchorX: 0.5,
                        anchorY: 0.5,
                        visible:false,
                        scale:GC.Barrier_Org_Scale[j]
                    });

                    this.getParent().addChild(sprite, GC.Barrier_Sprite);

                    var track = [
                        cc.p(x, y),
                        cc.p(Barrier_Goal_Position[j]),
                    ];

                    this.spriteArrays.push(sprite);
                    this.trackArrays.push(track);
                    this.goalScaleArrays.push(Barrier_Goal_Scale[j]);
                    this.timeLineArrays.push(Time_Line[i]);

                    if (type == 6) { //加速图片
                        this.crashType.push(GC.Crash_Speed_Up);
                    } else if (type == 5) { //减速图片
                        this.crashType.push(GC.Crash_Slow_Down);
                    } else {
                        this.crashType.push(GC.Crash_Shut_Down);
                    }
                }
            }
        }
    },

    //清理一张地图的障碍物
    clearBarrier:function () {
        if (this.spriteArrays.length > 0) {
            for (var i = 0; i < this.spriteArrays.length; i++) {
                this.clearBarrierArray(this.spriteArrays, i);
                this.clearBarrierArray(this.trackArrays, i);
                this.clearBarrierArray(this.goalScaleArrays, i);
                this.clearBarrierArray(this.timeLineArrays, i);
                this.clearBarrierArray(this.crashType, i);
                i = i - 1;
            }
        }

        this.oneMapTime = 0;
    },

    //定点清理障碍物
    clearBarrierArray:function (array, index) {
        array[index] = undefined;
        array.splice(index, 1);
    },

    //启动定时器
    startTimer:function () {
        if (this.getParent().gameStatus == GC.Game_Running) {
            this.setSpeed();
            this.schedule(this.setBarrier, GC.Game_Timer_Interval, cc.REPEAT_FOREVER, 0);
        } else {
            this.stopAllActions();
            this.unschedule(this.setBarrier);
        }
    },

    //设置纵向移动速度
    setSpeed:function () {
        this.verticalMoveTime = GC.Vertical_Move_Time;
    },

    //重新设置纵向移动速度
    resetSpeed:function (gameStatus) {
        if (GC.Game_Slow_Down == gameStatus) {
            this.verticalMoveTime = GC.Vertical_Move_Time * 2;
        } else if (GC.Game_Speed_Up == gameStatus) {
            this.verticalMoveTime = GC.Vertical_Move_Time / 2;
        } else if (GC.Game_Over == gameStatus) {
            this.stopAllActions();
            this.unschedule(this.setBarrier);
        } else {
            this.setSpeed();
        }
    },

    //自动速度调整
    autoAdjustMap:function (time) {
        if (time >=0 && time < GC.Game_Easy_To_Normal) {
            this.LoadingMaps(GC.Game_Level_Easy);
        } else if (time >= GC.Game_Easy_To_Normal && time < GC.Game_Easy_To_Normal) {
            this.LoadingMaps(GC.Game_Level_Normal);
        } else if (time > GC.Game_Easy_To_Normal) {
            this.LoadingMaps(GC.Game_Level_Hard);
        }
    },

    //根据地图画障碍物
    setBarrier:function () {
        this.oneMapTime += GC.Game_Timer_Interval;
        this.timeAdjustSpeed += GC.Game_Timer_Interval;

        if (this.spriteArrays.length > 0) {
            for (var i = 0; i < this.spriteArrays.length; i++) {
                if (this.oneMapTime.toFixed(1) == this.timeLineArrays[i] * 5) {
                    this.spriteArrays[i].visible = true;
                    this.moveSprite(this.spriteArrays[i], this.verticalMoveTime, this.trackArrays[i], this.goalScaleArrays[i]);

                } else if (this.oneMapTime > 10 * 5){
                    this.autoAdjustMap(this.timeAdjustSpeed / 5);
                }
                this.carCrash(this.spriteArrays[i], this.crashType[i]);
            }
        }
    },

    //移动障碍物
    moveSprite:function (sprite, time, track, scale) {
        this.getParent()._drawNode2.drawCatmullRom(track,50, 1);
        var spawn = cc.spawn(cc.catmullRomTo(time, track), cc.scaleTo(time, scale));
        var seq = cc.sequence(
            spawn,
            cc.rotateBy(time, 360),
            cc.fadeOut(time),
            cc.callFunc(function () {
                sprite.removeFromParent();
            })
        );

        sprite.runAction(seq);
    },

    //获取障碍物图片
    getBarrierFrame:function (value) {
        if (value > 0 && value < GC.Barrier_png_Max + 1) {
            return this.barrierSprites[value - 1];
        } else {
            return this.barrierSprites[0];
        }
    },

    //障碍物碰撞检测
    carCrash:function(target, crashType) {
        var carRect = this.getParent().carSprite.getBoundingBox();
        var barrierRect = target.getBoundingBox();

        if(cc.rectIntersectsRect (carRect, barrierRect)){
            if (crashType == GC.Crash_Shut_Down) { //所有动作停止
                target.stopAllActions();
                this.getParent().gameStatus = GC.Game_Over;
                var event = new cc.EventCustom("speed_change");
                event.setUserData(GC.Game_Over);
                cc.eventManager.dispatchEvent(event);
            } else {
                var spawn = cc.spawn(cc.rotateBy(0.2, 360), cc.fadeOut(0.2));
                target.runAction(cc.sequence(
                      spawn,
                      cc.callFunc(function () {
                            var event = new cc.EventCustom("speed_change");
                            if (crashType == GC.Crash_Speed_Up){ //加速
                                event.setUserData(GC.Game_Speed_Up);
                            } else if (crashType == GC.Crash_Slow_Down){ //减速
                                event.setUserData(GC.Game_Slow_Down);
                            }
                            target.removeFromParent();
                            cc.eventManager.dispatchEvent(event);
                      })
                ));
            }
        }
    }
});
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
    crashTypeArrays:null,
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
                eventName: "car_crash",
                callback: function(event){
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
        this.crashTypeArrays = [];

        for (var i = 0; i < GC.Barrier_png_Max; i++) {
            var str = "main_road_barrier" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.barrierSprites.push(frame);
        }

        this.autoAdjustMap(this.timeAdjustSpeed,false);

        this.startTimer();
    },

    //根据游戏难度加载相关难度地图
    LoadingMaps:function (level,isSpeed) {
        var value = 10 * cc.random0To1().toFixed(1);
        var barrierMap = [];
        var timeLine = [];

        if (value + 20 > GC.Barrier_Map_Max || value < 0) {
            return;
        } else if (value + 20 == GC.Barrier_Map_Max) {
            value -= 1;
        } else if (value == 0) {
            value += 1;
        }
//        value =0;
//        cc.log("LoadingMaps = ", value);
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
        this.LoadOneMap(barrierMap, timeLine,isSpeed);
    },

    //生成障碍物
    LoadOneMap:function (Barrier_Map, Time_Line,isSpeed) {
        for (var i = 0; i < Barrier_Map.length ; i++) { //按列查询
            for (var j = 0; j < Barrier_Map[i].length; j++) {
                var type = Barrier_Map[i][j];

                if (type > 0) {

                    var sprite = new cc.Sprite(this.getBarrierFrame(type));

                    var x = GC.Barrier_Org_Position[j].x;
                    var y = GC.Barrier_Org_Position[j].y;

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
                        cc.p(GC.Barrier_Goal_Position[j]),
                    ];

                    this.spriteArrays.push(sprite);
                    this.trackArrays.push(track);
                    this.goalScaleArrays.push(GC.Barrier_Goal_Scale[j]);
                    if(isSpeed){
//                         cc.log("Add Speed"+Time_Line[i]+"||"+Time_Line[i]*0.8);
                        Time_Line[i] = Time_Line[i]*0.8;
                    }
                    this.timeLineArrays.push(Time_Line[i]);

                    if (type == GC.Barrier_Type6) { //加速图片
                        this.crashTypeArrays.push(GC.Crash_Speed_Up);
                    } else if (type == GC.Barrier_Type5) { //减速图片
                        this.crashTypeArrays.push(GC.Crash_Slow_Down);
                    } else if (type == GC.Barrier_Type1 || type == GC.Barrier_Type2 || type == GC.Barrier_Type3 || type == GC.Barrier_Type4){
                        this.crashTypeArrays.push(GC.Crash_Shut_Down);
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
                this.clearBarrierArray(this.crashTypeArrays, i);
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
        this.setSpeed();
        this.schedule(this.setBarrier, GC.Game_Timer_Interval, cc.REPEAT_FOREVER, 0);
    },

    //设置纵向移动速度
    setSpeed:function () {
        this.verticalMoveTime = GC.Vertical_Move_Time;
    },

    //重新设置纵向移动速度
    resetSpeed:function (gameStatus) {
        switch (gameStatus) {
            case GC.Game_Slow_Down:
                this.verticalMoveTime = GC.Vertical_Move_Time * 2;
            break;

            case GC.Game_Speed_Up:
                this.verticalMoveTime = GC.Vertical_Move_Time / 2;
                this.autoAdjustMap(this.timeAdjustSpeed,true);
            break;

            case GC.Game_Over:
                this.stopAllActions();
                this.unschedule(this.setBarrier);
            break;

            default:
                this.setSpeed();
            break;
        }
    },

    //自动速度调整
    autoAdjustMap:function (time,isSpeed) {
        if (time >=0 && time < GC.Game_Easy_To_Normal) {
            this.LoadingMaps(GC.Game_Level_Easy,isSpeed);
        } else if (time >= GC.Game_Easy_To_Normal && time < GC.Game_Easy_To_Normal) {
            this.LoadingMaps(GC.Game_Level_Normal,isSpeed);
        } else if (time > GC.Game_Easy_To_Normal) {
            this.LoadingMaps(GC.Game_Level_Hard,isSpeed);
        }
    },

    //根据地图画障碍物
    setBarrier:function () {
        if (GC.Game_Current == GC.Game_Running) {
            this.oneMapTime += GC.Game_Timer_Interval;
            this.timeAdjustSpeed += GC.Game_Timer_Interval;

            if (this.spriteArrays.length > 0) {
                for (var i = 0; i < this.spriteArrays.length; i++) {
                    if (this.oneMapTime.toFixed(1) == this.timeLineArrays[i].toFixed(1) ) {
                        this.spriteArrays[i].visible = true;
                        this.moveSprite(this.spriteArrays[i], this.verticalMoveTime, this.trackArrays[i], this.goalScaleArrays[i]);
                    } else if (this.oneMapTime > 10 * 2){
                        this.autoAdjustMap(this.timeAdjustSpeed,false);
                    }
                    this.carCrash(this.spriteArrays[i], this.crashTypeArrays[i]);
                }
            }
        }
    },

    //移动障碍物
    moveSprite:function (sprite, time, track, scale) {
        var spawn = cc.spawn(cc.catmullRomTo(time, track), cc.scaleTo(time, scale));
        var seq = cc.sequence(
            spawn,
            cc.callFunc(function () {
                sprite.removeFromParent();
            })
        ).easing(cc.easeSineIn());

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
        if(this.judgeCrash(target)){
            target.stopAllActions();
            var effect = null;
            var event = new cc.EventCustom("car_crash");
            var eventData = -1;

            switch (crashType) {

                case GC.Crash_Shut_Down: //游戏停止
                    effect = this.getCrashEffect(target);
                    eventData = GC.Game_Over;
                break;

                case GC.Crash_Speed_Up: //加速
                    effect = this.getSpeedChangeEffect(target);
                    eventData = GC.Game_Speed_Up;
                break;

                case GC.Crash_Slow_Down: //减速
                    effect = this.getSpeedChangeEffect(target);
                    eventData = GC.Game_Slow_Down;
                break;
            }

            target.runAction(cc.sequence(
                effect,
                cc.callFunc(function () {
                    if (crashType == GC.Crash_Speed_Up
                        || crashType == GC.Crash_Slow_Down){
                        target.removeFromParent();
                    } else {
                        GC.Game_Current = GC.Game_Over;
                    }

                    event.setUserData(eventData);
                    cc.eventManager.dispatchEvent(event);
                })
            ));
        }
    },

    //碰撞检测算法
    judgeCrash:function (target) {
        var carRect = this.getParent().carSprite.getBoundingBox();
        var barrierRect = target.getBoundingBox();

        if (cc.rectContainsPoint(carRect, this.getBoxTop(barrierRect))
            ||cc.rectContainsPoint(carRect, this.getBoxLeft(barrierRect))
            ||cc.rectContainsPoint(carRect, this.getBoxRight(barrierRect))
            ||cc.rectContainsPoint(carRect, this.getBoxBottom(barrierRect))
            ||cc.rectContainsPoint(carRect, this.getBoxLT(barrierRect))
            ||cc.rectContainsPoint(carRect, this.getBoxRT(barrierRect))
            ||cc.rectContainsPoint(carRect, this.getBoxLB(barrierRect))
            ||cc.rectContainsPoint(carRect, this.getBoxRB(barrierRect))
            ||cc.rectIntersectsRect(carRect, barrierRect)
            ) {
            return true;
        }
        return false;
    },

    //碰撞特效算法
    getCrashEffect:function (target) {
        var spawn = null;
        var carRect = this.getParent().carSprite.getBoundingBox();
        var barrierRect = target.getBoundingBox();

        if (cc.rectGetMinY(barrierRect) <=  cc.rectGetMaxY(carRect)
            && cc.rectGetMinY(barrierRect) > cc.rectGetMidY(carRect)) {
            if (cc.rectGetMaxX(barrierRect) >= cc.rectGetMinX(carRect)
                        &&  cc.rectGetMaxX(barrierRect) <= cc.rectGetMidX(carRect)) {
                //向左上反弹
                spawn = cc.spawn(cc.rotateBy(0.5, -90), cc.moveBy(0.5, cc.p(-150, 150)));
            } else if (cc.rectGetMinX(barrierRect) <= cc.rectGetMaxX(carRect)
                        && cc.rectGetMinX(barrierRect) >=  cc.rectGetMidX(carRect)){
                //向右上反弹
                spawn = cc.spawn(cc.rotateBy(0.5, 90), cc.moveBy(0.5, cc.p(150, 150)));
            } else {
                //向上反弹
                if (cc.rectGetMidX(carRect) > GC.Car_Center_X + GC.Car_Range) {
                    spawn = cc.spawn(cc.rotateBy(0.5, -60), cc.moveBy(0.5, cc.p(-150, 150)));
                } else if (cc.rectGetMidX(carRect) < GC.Car_Center_X - GC.Car_Range){
                    spawn = cc.spawn(cc.rotateBy(0.5, 60), cc.moveBy(0.5, cc.p(150, 150)));
                } else {
                    if (cc.rectGetMidX(carRect) > GC.Car_Center_X) {
                        spawn = cc.spawn(cc.rotateBy(0.5, -60), cc.moveBy(0.5, cc.p(-150, 150)));
                    } else {
                        spawn = cc.spawn(cc.rotateBy(0.5, 60), cc.moveBy(0.5, cc.p(150, 150)));
                    }
                }
            }
        } else {
            if (cc.rectGetMaxX(barrierRect) >= cc.rectGetMinX(carRect)
                && cc.rectGetMaxX(barrierRect) <= cc.rectGetMidX(carRect)) {
                //左反弹
                spawn = cc.spawn(cc.rotateBy(0.5, -60), cc.moveBy(0.5, cc.p(-100, 0)));
            } else if (cc.rectGetMinX(barrierRect) <= cc.rectGetMaxX(carRect)
                && cc.rectGetMinX(barrierRect) >= cc.rectGetMidX(carRect)) {
                //右反弹
                spawn = cc.spawn(cc.rotateBy(0.5, 60), cc.moveBy(0.5, cc.p(100, 0)));
            } else {
                //下反弹
                if (cc.rectGetMidX(carRect) > GC.Car_Center_X) {
                    spawn = cc.spawn(cc.rotateBy(0.5, 0), cc.moveBy(0.5, cc.p(100, -100)));
                } else {
                    spawn = cc.spawn(cc.rotateBy(0.5, 0), cc.moveBy(0.5, cc.p(-100, -100)));
                }
            }
        }

        return spawn;
    },

    //加速特效算法
    getSpeedChangeEffect:function (target) {
        var spawn = null;
        var carRect = this.getParent().carSprite.getBoundingBox();
        var barrierRect = target.getBoundingBox();
        if (cc.rectGetMidX(carRect) > GC.Car_Center_X + GC.Car_Range) {
            spawn = cc.spawn(cc.jumpBy(0.5, cc.p(0, 100), 100, 1), cc.fadeOut(0.5), cc.moveBy(0.5, cc.p(-50, 0)));
        } else if (cc.rectGetMidX(carRect) < GC.Car_Center_X - GC.Car_Range){
            spawn = cc.spawn(cc.jumpBy(0.5, cc.p(0, 100), 100, 1), cc.fadeOut(0.5), cc.moveBy(0.5, cc.p(50, 0)));
        } else {
            spawn = cc.spawn(cc.jumpBy(0.5, cc.p(0, 100), 100, 1), cc.fadeOut(0.5));
        }
        return spawn;
    },

    //获取矩形上坐标
    getBoxTop:function (box) {
        return cc.p(box.x + box.width / 2, box.y + box.height);
    },

    //获取矩形左坐标
    getBoxLeft:function (box) {
        return cc.p(box.x, box.y + box.height / 2);
    },

    //获取矩形右坐标
    getBoxRight:function (box) {
        return cc.p(box.x + box.width, box.y + box.height / 2);
    },

    //获取矩形下坐标
    getBoxBottom:function (box) {
        return cc.p(box.x + box.width / 2, box.y);
    },

    //获取矩形中心坐标
    getBoxCore:function (box) {
        return cc.p(box.x + box.width / 2, box.y + box.height / 2);
    },

    //获取矩形左上坐标
    getBoxLT:function (box) {
        return cc.p(box.x, box.y + box.height);
    },

    //获取矩形右上坐标
    getBoxRT:function (box) {
        return cc.p(box.x + box.width, box.y + box.height);
    },

    //获取矩形左下坐标
    getBoxLB:function (box) {
        return cc.p(box.x, box.y);
    },

    //获取矩形右下坐标
    getBoxRB:function (box) {
        return cc.p(box.x + box.width, box.y);
    },
});
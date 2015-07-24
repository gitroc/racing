/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 障碍物层

 Author: roc from android team.

 Date: 2015-07-22

 ****************************************************************************/
var BarrierLayer = cc.Layer.extend({
    oneMapTime:0,
    barrierSprites:null,
    spriteArrays:null,
    trackArrays:null,
    goalScaleArrays:null,
    timeLineArrays:null,
    crashTypeArrays:null,

    speedListener:null,
    verticalMoveTime:0,
    ctor : function(){
        this._super();
        this.scheduleUpdate();
        this.addListener();
        this.initSprites();
        return true;
    },

    addListener:function() {
        this.speedListener = cc.eventManager.addListener(
             cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: "car_crash",
                callback: function(event){
                    var target = event.getCurrentTarget();
                    target.resetSpeed(event.getUserData(), target);
                }
            }),
            this
        );
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.speedListener);
    },

    //重新设置纵向移动速度
    resetSpeed:function (gameStatus, target) {
        switch (gameStatus) {
            case GC.Game_Slow_Down:
                GC.Music_Playing = true;
                cc.audioEngine.playMusic(res.Game_Music, true);
            break;

            case GC.Game_Speed_Up:
                this.speedUp(GC.Total_Time, true);
                GC.Music_Playing = true;
                cc.audioEngine.playMusic(res.Game_Music, true);
            break;

            case GC.Game_Bonus:
                GC.Music_Playing = true;
                cc.audioEngine.playMusic(res.Game_Music, true);
            break;

            case GC.Game_Over:
                GC.Game_Current = GC.Game_Over;
                this.getActionManager().pauseAllRunningActions();
                this.unscheduleUpdate();
                GC.Music_Playing = true;
            break;

            default:
            break;
        }
    },

    //加速
    speedUp:function (time) {
        if (time > GC.Game_Normal_To_Hard) {
            this.verticalMoveTime = GC.Vertical_Move_Time * 0.3;
            this.LoadingMaps(GC.Game_Level_Hard);
            cc.log("speedUp Game_Level_Hard");
        } else if (time > GC.Game_Easy_To_Normal) {
            this.verticalMoveTime = GC.Vertical_Move_Time * 0.4;
            this.LoadingMaps(GC.Game_Level_Normal);
            cc.log("speedUp Game_Level_Normal");
        } else {
            this.verticalMoveTime = GC.Vertical_Move_Time * 0.6;
            this.LoadingMaps(GC.Game_Level_Easy);
            cc.log("speedUp Game_Level_Easy");
        }
    },

    //自动调整速度
    autoSpeedUp:function (time) {
        if (time > GC.Game_Top_Level) {
            this.LoadingMaps(GC.Game_Level_Hard);
            cc.log("autoSpeedUp Game_Top_Level");
        } else if (time > GC.Game_Normal_To_Hard) {
            this.verticalMoveTime = GC.Vertical_Move_Time * 0.4;
            this.LoadingMaps(GC.Game_Level_Hard);
            cc.log("autoSpeedUp Game_Level_Hard");
        } else if (time > GC.Game_Easy_To_Normal) {
            this.verticalMoveTime = GC.Vertical_Move_Time * 0.6;
            this.LoadingMaps(GC.Game_Level_Normal);
            cc.log("autoSpeedUp Game_Level_Normal");
        } else {
            this.verticalMoveTime = GC.Vertical_Move_Time;
            this.LoadingMaps(GC.Game_Level_Easy);
            cc.log("autoSpeedUp Game_Level_Easy");
        }
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

        this.autoSpeedUp(GC.Total_Time);
    },

    getEasyIndex:function () {
        var value = 10 * cc.random0To1().toFixed(1);

        if (value >= 0 && value < 5) {
            return value;
        } else if (value >= 5 && value < 10){
            return value - 5;
        } else {
            return 0;
        }
    },

    getNormalIndex:function () {
        var value = 10 * cc.random0To1().toFixed(1);

        if (value >= 0 && value < 3) {
            return value;
        } else if (value >= 3 && value < 6) {
            return value - 3;
        } else if (value >= 6 && value < 9) {
            return value - 6;
        } else {
            return value - 9;
        }
    },

    getHardIndex:function () {
        var value = 10 * cc.random0To1().toFixed(1);

        if (value >= 0 && value < 4) {
            return value;
        } else if (value >= 4 && value < 8) {
            return value - 4;
        } else {
            return value - 8;
        }
    },

    //根据游戏难度加载相关难度地图, 并且加减速
    LoadingMaps:function (level) {
        var barrierMap = [];
        var timeLine = [];

        var index = -1;

        switch (level) {
            case GC.Game_Level_Easy:
                index = this.getEasyIndex();
            break;
            case GC.Game_Level_Normal:
                index = this.getNormalIndex() + 5;
            break;
            case GC.Game_Level_Hard:
                index = this.getHardIndex() + 5 + 3;
            break;
        }

        cc.log("LoadingMaps = ", index);

        barrierMap = GC.Barrier_Map[index][0];
        timeLine = GC.Barrier_Map[index][1];

        this.clearBarrier();
        this.LoadOneMap(barrierMap, timeLine);
    },

    //生成障碍物
    LoadOneMap:function (Barrier_Map, Time_Line) {
        cc.log("MapTotalTime = ", Time_Line[Time_Line.length - 1]);
        cc.log("Barrier_Map.length = ", Barrier_Map.length);
        for (var i = 0; i < Barrier_Map.length ; i++) { //按列查询
            for (var j = 0; j < Barrier_Map[i].length; j++) {
                var type = Barrier_Map[i][j];

                if (type > 0) {
                    var sprite = new Barrier(this.getBarrierFrame(type));
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

                    this.addChild(sprite, GC.Barrier_Sprite);

                    var track = [
                        cc.p(x, y),
                        cc.p(GC.Barrier_Goal_Position[j]),
                    ];

                    this.spriteArrays.push(sprite);
                    this.trackArrays.push(track);
                    this.goalScaleArrays.push(GC.Barrier_Goal_Scale[j]);
                    this.timeLineArrays.push(Time_Line[i]);

                    if (type == GC.Barrier_Type8 || type == GC.Barrier_Type7) {
                        this.crashTypeArrays.push(GC.Crash_Bonus);
                    } else if (type == GC.Barrier_Type6) { //加速图片
                        this.crashTypeArrays.push(GC.Crash_Speed_Up);
                    } else if (type == GC.Barrier_Type5) { //减速图片
                        this.crashTypeArrays.push(GC.Crash_Slow_Down);
                    } else if (type == GC.Barrier_Type1 || type == GC.Barrier_Type2 || type == GC.Barrier_Type3 || type == GC.Barrier_Type4){
                        this.crashTypeArrays.push(GC.Crash_Shut_Down);
                    } else {
                        this.crashTypeArrays.push(GC.Crash_Unknown);
                    }
                }
            }
        }
    },

    //清理一张地图的障碍物
    clearBarrier:function () {
        this.clearSprite();
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

    clearSprite:function () {
        if (this.spriteArrays.length > 0) {
            for (var i = 0; i < this.spriteArrays.length; i++) {
                if (this.spriteArrays[i].getParent() != null) {
                    this.spriteArrays[i].removeFromParent();
                }
            }
        }
    },

    //定点清理障碍物
    clearBarrierArray:function (array, index) {
        array[index] = undefined;
        array.splice(index, 1);
    },

    //根据地图画障碍物
    update:function(dt) {
        if (GC.Game_Current == GC.Game_Running) {
            this.oneMapTime += dt;

            if (this.spriteArrays.length > 0) {
                for (var i = 0; i < this.spriteArrays.length; i++) {
                    if ((this.oneMapTime.toFixed(1) == this.timeLineArrays[i].toFixed(1))
                        &&(this.spriteArrays[i].active)
                        &&(this.oneMapTime <= GC.Game_Easy_To_Normal)) {
                        this.spriteArrays[i].visible = true;
                        this.spriteArrays[i].active = false;
                        cc.log("move i = ", i);
                        this.moveSprite(this.spriteArrays[i], this.verticalMoveTime, this.trackArrays[i], this.goalScaleArrays[i]);
                    } else if (this.oneMapTime > GC.Game_Easy_To_Normal && GC.Total_Time > GC.Game_Easy_To_Normal){
                        cc.log("GC.Total_Time = ", GC.Total_Time);
                        this.autoSpeedUp(GC.Total_Time);
                        return;
                    }

                    this.carCrash(this.spriteArrays[i], this.crashTypeArrays[i]);
                }
            }
        }
    },

    //移动障碍物
    moveSprite:function (sprite, time, track, scale) {
        var spawn = cc.spawn(cc.catmullRomTo(time, track, 0), cc.scaleTo(time, scale));
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
        var rect = this.getBoundingBox();
        if(this.judgeCrash(target, rect)){
            target.stopAllActions();

            var effect = null;
            var event = new cc.EventCustom("car_crash");
            var eventData = -1;

            switch (crashType) {
                case GC.Crash_Shut_Down: //游戏停止
                    effect = this.getCrashEffect(target, rect);
                    this.crashMusic();
                    eventData = GC.Game_Over;
                break;

                case GC.Crash_Speed_Up: //加速
                    effect = this.getSpeedChangeEffect(target, rect);
                    this.speedUpMusic();
                    eventData = GC.Game_Speed_Up;
                break;

                case GC.Crash_Slow_Down: //减速
                    effect = this.getSpeedChangeEffect(target, rect);
                    eventData = GC.Game_Slow_Down;
                break;

                case GC.Crash_Bonus:
                    effect = this.getBonusEffect(target, rect);
                    eventData = GC.Game_Bonus;
                break;

                case GC.Crash_Unknown: //未知
                break;

                default:
                break;
            }

            target.runAction(cc.sequence(
                effect,
                cc.callFunc(function () {
                    event.setUserData(eventData);
                    cc.eventManager.dispatchEvent(event);
                })
            ));
        }
    },

    //碰撞检测算法
    judgeCrash:function (target, rect) {
        var barrierRect = target.getBoundingBox();

        if (cc.rectContainsPoint(rect, this.getBoxTop(barrierRect))
            ||cc.rectContainsPoint(rect, this.getBoxLeft(barrierRect))
            ||cc.rectContainsPoint(rect, this.getBoxRight(barrierRect))
            ||cc.rectContainsPoint(rect, this.getBoxBottom(barrierRect))
            ||cc.rectContainsPoint(rect, this.getBoxLT(barrierRect))
            ||cc.rectContainsPoint(rect, this.getBoxRT(barrierRect))
            ||cc.rectContainsPoint(rect, this.getBoxLB(barrierRect))
            ||cc.rectContainsPoint(rect, this.getBoxRB(barrierRect))
            ||cc.rectIntersectsRect(rect, barrierRect)
            ) {
            if (GC.Music_Playing) {
                GC.Music_Playing = false;
                return true;
            }
        }
        return false;
    },

    //添加碰撞音效
    crashMusic:function () {
        if (GC.SOUND_ON){
            cc.audioEngine.playMusic(res.Car_Crash, false);
        }
    },

    //加速音效
    speedUpMusic:function () {
        if (GC.SOUND_ON){
            cc.audioEngine.playMusic(res.Speed_Up, false);
        }
    },

    //碰撞特效算法
    getCrashEffect:function (target, rect) {
        var spawn = null;
        var barrierRect = target.getBoundingBox();

        if (cc.rectGetMinY(barrierRect) <=  cc.rectGetMaxY(rect)
            && cc.rectGetMinY(barrierRect) > cc.rectGetMidY(rect)) {
            if (cc.rectGetMaxX(barrierRect) >= cc.rectGetMinX(rect)
                        &&  cc.rectGetMaxX(barrierRect) <= cc.rectGetMidX(rect)) {
                //向左上反弹
                spawn = cc.spawn(cc.rotateBy(0.5, -90), cc.moveBy(0.5, cc.p(-150, 150)));
            } else if (cc.rectGetMinX(barrierRect) <= cc.rectGetMaxX(rect)
                        && cc.rectGetMinX(barrierRect) >=  cc.rectGetMidX(rect)){
                //向右上反弹
                spawn = cc.spawn(cc.rotateBy(0.5, 90), cc.moveBy(0.5, cc.p(150, 150)));
            } else {
                //向上反弹
                if (cc.rectGetMidX(rect) > GC.Car_Center_X + GC.Car_Range) {
                    spawn = cc.spawn(cc.rotateBy(0.5, -60), cc.moveBy(0.5, cc.p(-150, 150)));
                } else if (cc.rectGetMidX(rect) < GC.Car_Center_X - GC.Car_Range){
                    spawn = cc.spawn(cc.rotateBy(0.5, 60), cc.moveBy(0.5, cc.p(150, 150)));
                } else {
                    if (cc.rectGetMidX(rect) > GC.Car_Center_X) {
                        spawn = cc.spawn(cc.rotateBy(0.5, -60), cc.moveBy(0.5, cc.p(-150, 150)));
                    } else {
                        spawn = cc.spawn(cc.rotateBy(0.5, 60), cc.moveBy(0.5, cc.p(150, 150)));
                    }
                }
            }
        } else {
            if (cc.rectGetMaxX(barrierRect) >= cc.rectGetMinX(rect)
                && cc.rectGetMaxX(barrierRect) <= cc.rectGetMidX(rect)) {
                //左反弹
                spawn = cc.spawn(cc.rotateBy(0.5, -60), cc.moveBy(0.5, cc.p(-100, 0)));
            } else if (cc.rectGetMinX(barrierRect) <= cc.rectGetMaxX(rect)
                && cc.rectGetMinX(barrierRect) >= cc.rectGetMidX(rect)) {
                //右反弹
                spawn = cc.spawn(cc.rotateBy(0.5, 60), cc.moveBy(0.5, cc.p(100, 0)));
            } else {
                //下反弹
                if (cc.rectGetMidX(rect) > GC.Car_Center_X) {
                    spawn = cc.spawn(cc.rotateBy(0.5, 0), cc.moveBy(0.5, cc.p(100, -100)));
                } else {
                    spawn = cc.spawn(cc.rotateBy(0.5, 0), cc.moveBy(0.5, cc.p(-100, -100)));
                }
            }
        }

        return spawn;
    },

    //加速特效算法
    getSpeedChangeEffect:function (target, rect) {
        var spawn = null;
        var barrierRect = target.getBoundingBox();
        if (cc.rectGetMidX(rect) > GC.Car_Center_X + GC.Car_Range) {
            spawn = cc.spawn(cc.jumpBy(0.5, cc.p(0, 100), 100, 1), cc.fadeOut(0.5), cc.moveBy(0.5, cc.p(-50, 0)));
        } else if (cc.rectGetMidX(rect) < GC.Car_Center_X - GC.Car_Range){
            spawn = cc.spawn(cc.jumpBy(0.5, cc.p(0, 100), 100, 1), cc.fadeOut(0.5), cc.moveBy(0.5, cc.p(50, 0)));
        } else {
            spawn = cc.spawn(cc.jumpBy(0.5, cc.p(0, 100), 100, 1), cc.fadeOut(0.5));
        }
        return spawn;
    },

    //得分特效算法
    getBonusEffect:function (target, rect) {
        var spawn = null;
        var barrierRect = target.getBoundingBox();
        if (cc.rectGetMidX(rect) > GC.Car_Center_X + GC.Car_Range) {
           spawn = cc.spawn(cc.jumpBy(0.5, cc.p(0, 100), 100, 1), cc.fadeOut(0.5), cc.Blink(0.5, 2), cc.moveBy(0.5, cc.p(-50, 0)));
        } else if (cc.rectGetMidX(rect) < GC.Car_Center_X - GC.Car_Range){
           spawn = cc.spawn(cc.jumpBy(0.5, cc.p(0, 100), 100, 1), cc.fadeOut(0.5), cc.Blink(0.5, 2), cc.moveBy(0.5, cc.p(50, 0)));
        } else {
           spawn = cc.spawn(cc.jumpBy(0.5, cc.p(0, 100), 100, 1), cc.fadeOut(0.5), cc.Blink(0.5, 2));
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

    getBoundingBox:function () {
        var carRect = this.getParent().carSprite.getBoundingBox();
        return new cc.Rect(carRect.x, carRect.y + 137, carRect.width, carRect.height - 137);
    }
});
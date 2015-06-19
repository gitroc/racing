/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 障碍物精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var BarrierSprite = cc.Sprite.extend({
    totalTime:0,
    currentMapIndex:0,
    crushListener:null,
    touchListener:null,
    barrierSprites:null,
    spriteArrays:null,
    trackArrays:null,
    goalScaleArrays:null,
    timeLineArrays:null,
    crashType:null,
    onEnter:function () {
        this._super();
        this.initSprites();
        this.addCrushListener();
    },

    onExit:function () {
        this.removeCrushListener();
        this._super();
    },

    //添加碰撞事件监听
    addCrushListener:function() {
        this.crushListener = cc.eventManager.addListener(
             cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: "barrier_crush",
                callback: function(event){
                    cc.log("barrier_crush");
                    var target = event.getCurrentTarget();
                    target.carCrash(target);
                }
            }),
            this
        );
    },

    removeCrushListener:function() {
        cc.eventManager.removeListener(this.crushListener);
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

        this.generateBarrier(GC.Barrier_Map1, GC.Time_Line1, GC.Barrier_Org_Position, GC.Barrier_Org_Scale, GC.Barrier_Goal_Position, GC.Barrier_Goal_Scale);
        this.getBarrierMap(GC.Barrier_Map1, GC.Time_Line1);
        this.scheduleUpdate();
    },

    //获取障碍物地图
    getBarrierMap:function (barrierMap, timeLine) {
        this.generateBarrier(barrierMap, timeLine, GC.Barrier_Org_Position, GC.Barrier_Org_Scale, GC.Barrier_Goal_Position, GC.Barrier_Goal_Scale);
    },

    //生成障碍物
    generateBarrier:function (Barrier_Map, Time_Line, Barrier_Org_Position, Barrier_Org_Scale, Barrier_Goal_Position, Barrier_Goal_Scale) {
        for (var i = 0; i < Barrier_Map.length ; i++) { //按列查询
            for (var j = 0; j < Barrier_Map[i].length; j++) {
                var type = Barrier_Map[i][j];

                if (type > 0) {

                    var sprite = new cc.Sprite(this.getBarrierFrame(type));

                    var x = Barrier_Org_Position[j].x + this.getParent().currentBarrierOffset;
                    var y = Barrier_Org_Position[j].y;

                    sprite.attr({
                        x:x,
                        y:y,
                        anchorX: 0.5,
                        anchorY: 0.5,
                        visible:false,
                        scale:GC.Barrier_Org_Scale[j]
                    });

                    this.getParent().addChild(sprite, GC.Tree_Sprite);

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

    //清理障碍物
    clearBarrier:function () {
        if (this.spriteArrays.length > 0) {
            for (var i = 0; i < this.spriteArrays.length; i++) {
                this.clearBarrierArray(this.spriteArrays);
                this.clearBarrierArray(this.trackArrays);
                this.clearBarrierArray(this.goalScaleArrays);
                this.clearBarrierArray(this.timeLineArrays);
                this.clearBarrierArray(this.crashType);
                i = i - 1;
            }
        }
    },

    clearBarrierArray:function (array, index) {
        array = undefined;
        array.splice(index, 1);
    },

    update:function(dt) {
        this.totalTime += dt;
        if (this.getParent().gameStatus == GC.Game_Running) {
            if (this.spriteArrays.length > 0) {
                for (var i = 0; i < this.spriteArrays.length; i++) {
                    if (this.totalTime.toFixed(1) == this.timeLineArrays[i] * 5) {
                        this.spriteArrays[i].visible = true;
                        this.moveSprite(this.spriteArrays[i], GC.Vertical_Move_Time * 2, this.trackArrays[i], this.goalScaleArrays[i]);
                    }
                    this.carCrash(this.spriteArrays[i], this.crashType[i]);
                }
            }
        }
    },

    moveSprite:function (sprite, time, track, scale) {
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

    getScheduleTime:function (distance) {
        return (distance / GC.Barrier_Speed).toFixed(1)
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
                this.getParent().gameStatus = GC.Game_Over; //告知情景
            } else {
                if (crashType == GC.Crash_Speed_Up){

                } else if (crashType == GC.Crash_Slow_Down){

                }

                var spawn = cc.spawn(cc.rotateBy(0.2, 360), cc.fadeOut(0.2));
                target.runAction(cc.sequence(
                      spawn,
                      cc.callFunc(function () {
                          target.removeFromParent();
                      })
                ));
            }
        }
    }

});
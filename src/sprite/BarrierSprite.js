/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 障碍物精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var BarrierSprite = cc.Sprite.extend({
    totalTime:0,
    crushListener:null,
    touchListener:null,
    barrierSprites:null,
    spriteArrays:null,
    trackArrays:null,
    goalScaleArrays:null,
    timeLineArrays:null,
    onEnter:function () {
        this._super();
        this.initSprites();
        this.addCrushListener();
        this.addTouchListener();
    },

    onExit:function () {
        this.removeCrushListener();
        this.removeTouchListener();
        this._super();
    },

    //添加碰撞事件监听
    addCrushListener:function() {
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

    removeCrushListener:function() {
        cc.eventManager.removeListener(this.crushListener);
    },

    addTouchListener:function() {
        if('touches' in cc.sys.capabilities) { //支持触摸事件
            this.touchListener = cc.eventManager.addListener(
                cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                    onTouchesEnded:function (touches, event) {
                        if (touches.length <= 0) {
                            return;
                        }
                        var target = event.getCurrentTarget();
//                        target.updateOffset(target, touches[0].getLocation());
                    }
                }),
                this
            );
        } else if ('mouse' in cc.sys.capabilities) { //支持鼠标事件
            this.touchListener = cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    var target = event.getCurrentTarget();
//                    target.updateOffset(target, event.getLocation());
                }
            }, this);
        }
    },

    removeTouchListener:function() {
        cc.eventManager.removeListener(this.touchListener);
    },

    //初始化精灵图片
    initSprites:function () {
        this.barrierSprites = [];
        this.spriteArrays = [];
        this.trackArrays = [];
        this.goalScaleArrays = [];
        this.timeLineArrays = [];

        for (var i = 0; i < GC.Barrier_png_Max; i++) {
            var str = "main_road_barrier" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.barrierSprites.push(frame);
        }

        this.generateBarrier(GC.Barrier_Map1, GC.Time_Line1, GC.Barrier_Org_Position, GC.Barrier_Org_Scale, GC.Barrier_Goal_Position, GC.Barrier_Goal_Scale);

        this.scheduleUpdate();
    },

    //获取障碍物地图
    getBarrierMap:function () {
        return 0;
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

                }
            }
        }
    },

    update:function(dt) {
        this.totalTime += dt;

        for (var i = 0; i < this.timeLineArrays.length; i++) {
            if (this.totalTime.toFixed(1) == this.timeLineArrays[i]) {
                cc.log("this.totalTime.toFixed(1)", this.totalTime.toFixed(1));
                this.spriteArrays[i].visible = true;
                this.moveSprite(this.spriteArrays[i], 10, this.trackArrays[i], this.goalScaleArrays[i]);
            }
        }
    },

    moveSprite:function (sprite, time, track, scale) {
        var spawn = cc.spawn(cc.catmullRomTo(time, track), cc.scaleTo(time, scale));
//        var spawn = cc.spawn(cc.moveTo(10, cc.p(GC.Barrier_Goal_Position[1])), cc.scaleTo(time, 2));
        var seq = cc.sequence(
            spawn,
            cc.fadeOut(0.5),
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
    },

    updateOffset:function (target, position) {
        var positionX = Math.round(position.x);

        if (this.getParent().currentBarrierOffset == 0) { //在中间
            if (positionX < GC.Car_Center_X) {
                this.getParent().currentBarrierOffset = 100;// 向左移动
            } else {
                this.getParent().currentBarrierOffset = -100;// 向右移动
            }
        } else if (this.getParent().currentBarrierOffset == 100) {
            if (positionX > GC.Car_Left_X) {
                this.getParent().currentBarrierOffset = 0
            }
        } else if (this.getParent().currentBarrierOffset == -100) {
            if (positionX < GC.Car_Right_X) {
                this.getParent().currentBarrierOffset = 0
            }
        }

        var actionMove = cc.moveTo(GC.Horizontal_Move_Time,cc.p(this.getParent().currentBarrierOffset,0));//moveTo or moveBy
        this.runAction(actionMove);
    }
});
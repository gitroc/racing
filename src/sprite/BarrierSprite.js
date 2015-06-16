/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 障碍物精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var BarrierSprite = cc.Sprite.extend({
    crushListener:null,
    barrierSprites:null,
    spriteArrays:null,

    onEnter:function () {
        this._super();
        this.initSprites();
        this.schedule(this.generateBarrier, 26, cc.REPEAT_FOREVER, 0);
        this.addListener();
    },

    onExit:function () {
        this.removeListener();
        this._super();
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

    //初始化精灵图片
    initSprites:function () {
        this.barrierSprites = [];

        for (var i = 0; i < GC.Barrier_png_Max; i++) {
            var str = "main_road_barrier" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.barrierSprites.push(frame);
        }
    },

    generateBarrier:function () {
        for (var i = GC.Barrier_Map1.length - 1; i > 0 ; i--) {
            var time = this.getScheduleTime(GC.Barrier_Map1[i][0]);

            for (var j = 0; j < GC.Barrier_Map1[i].length; j++) {

                if (j > 0) {
                    var barrierType = GC.Barrier_Map1[i][j];
                    if (barrierType > 0) {
                        var sprite = new cc.Sprite(this.getBarrierFrame(barrierType));

                        var x = GC.Barrier_Position[0][j - 1];
                        var y = GC.Barrier_Org_Y;

                        sprite.attr({
                            x:x,
                            y:y,
                            anchorX: 0.5,
                            anchorY: 0.5,
                            scale:GC.Barrier_Org_Scale
                        });

                        var track = [
                            cc.p(x, y),
                            cc.p(GC.Barrier_Position[1][j - 1], GC.Barrier_Goal_Y),
                        ];

                        this.getParent().addChild(sprite, GC.Tree_Sprite);

                        this.getParent().moveSprite(sprite, time * 10, track, GC.Barrier_Goal_Scale);
                    }
                }
            }
        }
    },

    moveSprite:function (sprite, time, track, scale) {
        var spawn = cc.spawn(cc.catmullRomTo(time, track), cc.scaleTo(time, scale));

        var seq = cc.sequence(
            spawn,
            cc.fadeOut(0.5),
            cc.delayTime(1),
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
        if (value >= 0 && value < GC.Barrier_png_Max) {
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
    }
});
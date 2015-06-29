/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 树精灵

 Author: roc from android team.

 Date: 2015-06-08

****************************************************************************/
var TreeSprite = cc.Sprite.extend({
    treeFrames:null,
    speedListener:null,
    verticalMoveTime:0,
    onEnter:function () {
        this._super();
        this.initSprites();
        this.addListener();
    },

    onExit:function () {
        this.unschedule(this.plantTree);
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
        this.treeFrames = [];

        for (var i = 0; i < GC.Tree_Png_Max; i++) {
            var str = "main_bg_object_tree" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.treeFrames.push(frame);
        }

        this.startTimer();
    },

    //启动定时器
    startTimer:function () {
        if (this.getParent().gameStatus == GC.Game_Running) {
            this.setSpeed();
            this.schedule(this.plantTree, 1, cc.REPEAT_FOREVER, 0);
        } else {
            this.stopAllActions();
            this.unschedule(this.plantTree);
        }
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
            break;

            case GC.Game_Over:
                this.stopAllActions();
                this.unschedule(this.plantTree);
            break;

            case GC.Game_Hit:
                //
            break;

            default:
                this.setSpeed();
            break;
        }
    },

    //获取树图片
    getTreeFrame:function () {
        var value = 10 * cc.random0To1().toFixed(1);
        if (value >= 0 && value < GC.Tree_Png_Max) {
            return this.treeFrames[value];
        } else {
            return this.treeFrames[0];
        }
    },

    //获取树的初始坐标
    getTreeOrg:function () {
        var value = cc.random0To1();

        var x = 0;
        var y = 0;

        if (value > 0.5) {
            x = GC.Tree_Show_Right_X;
            y = GC.Tree_Show_Right_Y;
        } else {
            x = GC.Tree_Show_Left_X;
            y = GC.Tree_Show_Left_Y;
        }

        return cc.p(x, y);
    },

    //获取树的初始大小
    getTreeScale:function () {
        var value = cc.random0To1();
        var scale = 0;
        if (value < 0.5) {
            scale = GC.Tree_Show_Left_scale;
        } else {
            scale = GC.Tree_Show_Right_scale;
        }

        return scale;
    },

    //种树
    plantTree:function () {
        var value = cc.random0To1();
        var sprite = new cc.Sprite(this.getTreeFrame());

        var x = this.getTreeOrg().x;
        var y = this.getTreeOrg().y;

        sprite.attr({
            x:x,
            y:y,
            anchorX: 0.5,
            anchorY: 0.5,
            scale:this.getTreeScale()
        });

        this.getParent().addChild(sprite, GC.Tree_Sprite);

        var track = [
            cc.p(x, y),
            this.getParent().getSpriteGoal(cc.p(x, y)),
        ];

        this.getParent().moveSprite(sprite, this.verticalMoveTime, track, GC.Tree_Goal_scale);
    }
});

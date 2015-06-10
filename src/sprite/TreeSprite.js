/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 树精灵

 Author: roc from android team.

 Date: 2015-06-08

****************************************************************************/
var TreeSprite = cc.Sprite.extend({
    runListener:null,
    treeFrames:null,
    sprite:null,
    onEnter:function () {
        this._super();
        cc.log("TreeSprite onEnter");
        this.addListener();

        this.initAnimation();

        this.schedule(this.plantTree, 1, 16*1024, 1);
    },

    onExit:function () {
        cc.log("TreeSprite onExit");
        this.removeListener();
        this._super();
    },

    addListener:function() {
        this.runListener = cc.eventManager.addListener(
             cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: "start_run",
                callback: function(event){
//                    this.schedule(this.moveTree, 1, 16*1024, 1);
                }
            }),
            this
        );
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.runListener);
    },

    initAnimation:function () {
        this.treeFrames = [];
        for (var i = 0; i < GC.Tree_Png_Max; i++) {
            var str = "main_bg_object_tree" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.treeFrames.push(frame);
        }
    },

    getTreeFrame:function () {
        var value = 10 * cc.random0To1().toFixed(1);
        if (value >= 0 && value < GC.Tree_Png_Max) {
            return this.treeFrames[value];
        } else {
            return this.treeFrames[0];
        }
    },

    plantTree:function () {
        var value = cc.random0To1();
        this.sprite = new cc.Sprite(this.getTreeFrame());

        var x = 0;
        var y = 0;
        var scale = 0;
        if (value > 0.5) {
            x = GC.Tree_Show_Right_X - GC.Center_Offset;
            y = GC.Tree_Show_Right_Y;
            scale = GC.Tree_Show_Left_scale;
        } else {
            x = GC.Tree_Show_Left_X - GC.Center_Offset;
            y = GC.Tree_Show_Left_Y;
            scale = GC.Tree_Show_Right_scale;
        }

        this.sprite.attr({
            x:x,
            y:y,
            anchorX: 0.5,
            anchorY: 0.5,
            scale:scale
        });

        this.getParent().addChild(this.sprite);

        var track = [
            cc.p(x, y),
            this.getTreeGoal(cc.p(x, y)),
        ];

        this.moveTree(3, track, 2);
    },

    getTreeGoal:function (Org) {
        var radian = GC.Angle / 180 * Math.PI;

        var goalX = 0;
        var goalY = 0;

        if (Org.x > GC.Screen_Middle) {
            goalX = GC.Main_Scene_w + 420;
            goalY = Org.y - (GC.Main_Scene_w - Org.x) * Math.tan(radian)
        } else {
            goalX = -420;
            goalY = Org.y - Math.tan(radian) * Org.x;
        }

        return cc.p(goalX, Math.round(goalY));
    },

    moveTree:function (time, track, scale) {
        var action = cc.spawn(new cc.catmullRomTo(time, track), new cc.scaleTo(time, scale));
        this.sprite.runAction(action);
    },
});

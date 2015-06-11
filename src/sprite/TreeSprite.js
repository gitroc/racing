/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 树精灵

 Author: roc from android team.

 Date: 2015-06-08

****************************************************************************/
var TreeSprite = cc.Sprite.extend({
    treeSprites:null,
    touchListener:null,
    onEnter:function () {
        this._super();

        this.initSprites();

        this.addListener();

        this.schedule(this.plantTree, 1, 16*1024, 0);
    },

    onExit:function () {
        this.removeListener();
        this._super();
    },

    addListener:function() {
        if('touches' in cc.sys.capabilities) { //支持触摸事件
            this.touchListener = cc.eventManager.addListener(
                cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                    onTouchesEnded:function (touches, event) {
                        if (touches.length <= 0) {
                            return;
                        }
                        var target = event.getCurrentTarget();
                        target.treeOffset(target, touches[0].getLocation());
                    }
                }),
                this
            );
        } else if ('mouse' in cc.sys.capabilities) { //支持鼠标事件
            this.touchListener = cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    var target = event.getCurrentTarget();
                    target.treeOffset(target, event.getLocation());
                }
            }, this);
        }
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.touchListener);
    },

    initSprites:function () {
        this.treeSprites = [];
        for (var i = 0; i < GC.Tree_Png_Max; i++) {
            var str = "main_bg_object_tree" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.treeSprites.push(frame);
        }
    },

    getTreeFrame:function () {
        var value = 10 * cc.random0To1().toFixed(1);
        if (value >= 0 && value < GC.Tree_Png_Max) {
            return this.treeSprites[value];
        } else {
            return this.treeSprites[0];
        }
    },

    plantTree:function () {
        var value = cc.random0To1();
        var sprite = new cc.Sprite(this.getTreeFrame());

        var x = 0;
        var y = 0;
        var scale = 0;
        if (value > 0.5) {
            x = GC.Tree_Show_Right_X + this.getParent().screenOffset;
            y = GC.Tree_Show_Right_Y;
            scale = GC.Tree_Show_Left_scale;
        } else {
            x = GC.Tree_Show_Left_X + this.getParent().screenOffset;
            y = GC.Tree_Show_Left_Y;
            scale = GC.Tree_Show_Right_scale;
        }

        sprite.attr({
            x:x,
            y:y,
            anchorX: 0.5,
            anchorY: 0.5,
            scale:scale
        });

        this.getParent().addChild(sprite, GC.Tree_Sprite);

        var track = [
            cc.p(x, y),
            this.getTreeGoal(cc.p(x, y)),
        ];

        this.moveSprite(sprite, 3, track, 2);
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

    moveSprite:function (sprite, time, track, scale) {
        var action = cc.spawn(new cc.catmullRomTo(time, track), new cc.scaleTo(time, scale));
        sprite.runAction(action);
    },

    treeOffset:function () {

    }
});

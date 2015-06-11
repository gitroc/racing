/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 石头精灵

 Author: roc from android team.

 Date: 2015-06-08

****************************************************************************/

var StoneSprite = cc.Sprite.extend({
    stoneFrames:null,

    onEnter:function () {
        this._super();
        this.initSprites();
        this.schedule(this.buriedStone, 1, 16*1024, 0);
    },

    onExit:function () {
        this._super();
    },

    //初始化精灵图片
    initSprites:function () {
        this.stoneFrames = [];
        for (var i = 0; i < GC.Stone_Png_Max; i++) {
            var str = "main_bg_object_stone" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.stoneFrames.push(frame);
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

    //埋石头
    buriedStone:function () {
        var value = cc.random0To1();
        var sprite = new cc.Sprite(this.getStoneFrame());

        var x = 0;
        var y = 0;
        var scale = 0;
        if (value > 0.5) {
            x = GC.Stone_Show_Right_X + this.getParent().screenOffset;
            y = GC.Stone_Show_Right_Y;
            scale = GC.Stone_Show_Left_scale;
        } else {
            x = GC.Stone_Show_Left_X + this.getParent().screenOffset;
            y = GC.Stone_Show_Left_Y;
            scale = GC.Stone_Show_Right_scale;
        }

        sprite.attr({
            x:x,
            y:y,
            anchorX: 0.5,
            anchorY: 0.5,
            scale:scale
        });

        this.getParent().addChild(sprite, GC.Stone_Sprite);

        var track = [
            cc.p(x, y),
            this.getStoneGoal(cc.p(x, y)),
        ];

        this.moveSprite(sprite, 3, track, 2);
    },

    getStoneGoal:function (Org) {
        var radian = GC.Angle / 180 * Math.PI;

        var goalX = 0;
        var goalY = 0;

        if (Org.x > GC.Screen_Middle) {
            goalX = GC.Main_Scene_w + 80;
            goalY = Org.y - (GC.Main_Scene_w - Org.x) * Math.tan(radian)
        } else {
            goalX = -80;
            goalY = Org.y - Math.tan(radian) * Org.x;
        }

        return cc.p(goalX, Math.round(goalY));
    },

    moveSprite:function (sprite, time, track, scale) {
        var action = cc.spawn(new cc.catmullRomTo(time, track), new cc.scaleTo(time, scale));
        sprite.runAction(action);
    },

    stoneOffset:function () {
        
    }
});
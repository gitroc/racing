/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 背景层

 Author: roc from android team.

 Date: 2015-07-22

 ****************************************************************************/
var BackLayer = cc.Layer.extend({

    //背景精灵
    bgSprite:null,

    //树精灵
    fiveTrees:null,
    treeScale:null,
    treeOrg:null,
    treeGoal:null,

    //石头精灵
    fourStones:null,
    stoneScale:null,
    stoneOrg:null,
    stoneGoal:null,

    //偏移
    currentX:null,

    //汽车精灵
    carSprite:null,

    //障碍物
    oneMapTime:0,
    barrierSprites:null,
    spriteArrays:null,
    trackArrays:null,
    goalScaleArrays:null,
    timeLineArrays:null,
    crashTypeArrays:null,

    ctor:function () {
       this._super();
       this.scheduleUpdate();
       this.loadingGame();
       return true;
    },

    update:function(dt) {
        if (GC.Game_Current == GC.Game_Start){
            this.startMoveTree();
            this.startMoveStone();
            this.playBgMusic();
            GC.Game_Current = GC.Game_Running;
            return;
        }
    },

    //初始化游戏场景
    loadingGame:function () {
        this.addBackground();
        this.addStone();
        this.addTree();
        this.addCar();
        this.addBarrierLayer();
    },

    addBarrierLayer:function () {
        var barrierLayer = new BarrierLayer();
        this.addChild(barrierLayer);
    },

    addBackground:function(){
        this.bgSprite = new BackGroundSprite(cc.spriteFrameCache.getSpriteFrame("main_bg_road1.png"));
        this.bgSprite.attr({
            x:GC.w_2,
            y:GC.h_2,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(this.bgSprite, GC.BackGround_Sprite);
    },

    addStone:function () {
        this.buriedFourStone();

        var stoneAnimation = new StoneSprite();
        this.addChild(stoneAnimation, GC.Stone_Sprite);
    },

    buriedFourStone:function () {
        this.fourStones = [];
        for (var i = 0; i < GC.stoneOrg.length; i++) {
            var str = "main_bg_object_stone" + (i + 1) + ".png";
            var sprite = cc.spriteFrameCache.getSpriteFrame(str);
            var stone = new cc.Sprite(sprite);

            this.fourStones.push(stone);
        }

        this.addStoneSprite(stone, i);
    },

    addStoneSprite:function () {
        for (var i = 0; i < this.fourStones.length; i++) {
            var x = GC.stoneOrg[i].x;
            var y = GC.stoneOrg[i].y;

            this.fourStones[i].attr({
                x:x,
                y:y,
                anchorX: 0.5,
                anchorY: 0.5,
                scale:GC.stoneScale[i]
            });

            this.addChild(this.fourStones[i], GC.Stone_Sprite);
        }
    },

    startMoveStone:function () {
         for (var i = 0; i < this.fourStones.length; i++) {
            var x = GC.stoneOrg[i].x;
            var y = GC.stoneOrg[i].y;
            var track = [
                cc.p(x, y),
                this.getSpriteGoal(cc.p(x, y)),
            ];

            this.moveSprite(this.fourStones[i], GC.Stone_Time_Line[i], track, 2);
         }
    },

    addTree:function () {
        this.plantFiveTree();

        this.currentX = 320;
        var treeAnimation = new TreeSprite();
        this.addChild(treeAnimation, GC.Tree_Sprite);
    },

    plantFiveTree:function () {
        this.fiveTrees = [];

        for (var i = 0; i < GC.treeOrg.length; i++) {
            var str = "main_bg_object_tree" + (i + 1) + ".png";
            var sprite = cc.spriteFrameCache.getSpriteFrame(str);
            var tree = new cc.Sprite(sprite);
            this.fiveTrees.push(tree);
        }

        this.addTreeSprite();
    },

    addTreeSprite:function () {
        for (var i = 0; i < this.fiveTrees.length; i++) {
            var x = GC.treeOrg[i].x;
            var y = GC.treeOrg[i].y;

            this.fiveTrees[i].attr({
                x:x,
                y:y,
                anchorX: 0.5,
                anchorY: 0.5,
                scale:GC.treeScale[i]
            });
            this.addChild(this.fiveTrees[i], GC.Tree_Sprite);
        }
    },

    startMoveTree:function () {
        for (var i = 0; i < this.fiveTrees.length; i++) {
            var x = GC.treeOrg[i].x;
            var y = GC.treeOrg[i].y;

            var track = [
                cc.p(x, y),
                this.getSpriteGoal(cc.p(x, y)),
            ];

            this.moveSprite(this.fiveTrees[i], GC.Tree_Time_Line[i], track, 1);
        }
    },

    getSpriteGoal:function (Org) {
        var radian = GC.Angle / 180 * Math.PI;

        var goalX = 0;
        var goalY = 0;

        if (Org.x > GC.w_2) {
            goalX = GC.w * 2;
            goalY = Org.y - (GC.w - Org.x) * Math.tan(radian)
        } else {
            goalX = -GC.w * 2;
            goalY = Org.y - Math.tan(radian) * Org.x;
        }

        return cc.p(goalX, Math.round(goalY));
    },

    moveSprite:function (sprite, time, track, scale) {
        var spawn = cc.spawn(cc.cardinalSplineTo(time, track, 0), cc.scaleTo(time, scale));

        var seq = cc.sequence(
            spawn,
            cc.fadeOut(0.5),
            cc.callFunc(function () {
                sprite.removeFromParent();
            })
        );

        sprite.runAction(seq);
    },

    //添加汽车
    addCar:function () {
        this.carSprite = new CarSprite(this.getCarSprite(GC.Car_Center_X));

        this.carSprite.attr({
            x: GC.Car_Center_X,
            y: GC.Car_Center_Y,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this.addChild(this.carSprite, GC.Car_Sprite);
    },

    getCarSprite:function (currentX) {
        if (currentX == GC.Car_Left_X) {
            return cc.spriteFrameCache.getSpriteFrame("main_car_left.png")
        } else if (currentX == GC.Car_Right_X) {
            return cc.spriteFrameCache.getSpriteFrame("main_car_right.png");
        } else {
            return cc.spriteFrameCache.getSpriteFrame("main_car_back.png");
        }
    },

    //播放背景音乐，true代表循环无限次播放，false表示只播放一次。
    playBgMusic:function(){
        if (GC.SOUND_ON){
            cc.audioEngine.playMusic(res.Game_Music, true);
        }
    }
});
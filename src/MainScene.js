/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 游戏窗口场景

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/
var MainLayer = cc.Layer.extend({
    //游戏速度
    gameSpeed:GC.Car_Speed_Normal,
    //游戏时间
    totalTime:0,
    //偏移
    currentX:null,

    //遮罩精灵
    LoadingBg:null,

    //路精灵
    roadSprite:null,

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

    //背景精灵
    bgSprite:null,
    prospect:null,

    //汽车精灵
    carSprite:null,

    //障碍物精灵
    barrierSprite:null,
    newBgSprite:null,
    _drawNode2:null,
    ctor:function () {
        this._super();

        this.loading();

//        this._drawNode2 = new cc.DrawNode();
//        this._drawNode2.setDrawColor(cc.color(255,255,255,255));
//        this.addChild(this._drawNode2);

        return true;
    },

    update:function(dt) {
        this.totalTime += dt;//dt为每一帧执行的时间，把它加起来等于运行了多长时间
//        cc.log(this.totalTime);
        if (GC.Game_Current == GC.Game_Over) {
            this.getActionManager().pauseAllRunningActions();
            this.unscheduleUpdate();
            this.gameOver();
            return;
        } else if (GC.Game_Current == GC.Game_Start){
            this.startGame();
            return;
        }
    },

    //初始化游戏场景
    loading:function () {
        cc.spriteFrameCache.addSpriteFrames(res.Background_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Stone_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Tree_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Barrier_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Car_plist);
        cc.spriteFrameCache.addSpriteFrames(res.ReadyGo_plist);

        this.addSprite();

        this.scheduleUpdate();
    },

    loadingGuide:function () {
        if (GC.Game_Current == GC.Game_Loading) {
            this.LoadingBg = new cc.Sprite(res.LoadingBg_Png);
            this.LoadingBg.attr ({
                x: GC.w_2,
                y: GC.h_2,
                anchorX: 0.5,
                anchorY: 0.5
            });

            this.addChild(this.LoadingBg, GC.Loading_Guide);

            var loadingTimer = new ReadyGoSprite();
            this.addChild(loadingTimer, GC.Loading_Timer);
        }
    },

    //启动游戏
    startGame:function () {
        GC.Game_Current = GC.Game_Running;
        this.startMoveTree();
        this.startMoveStone();
    },

    addSprite:function () {
        this.addNewBackground();
        this.addStone();
        this.addTree();
        this.addBarrier();
        this.addCar();
        this.loadingGuide();
    },

    addNewBackground:function(){
        this.newBgSprite = new NewBgSprite(res.Road_png);
        this.newBgSprite.attr({
                    x:GC.w_2,
                    y:GC.h_2,
                    anchorX : 0.5,
                    anchorY : 0.5
                });
        this.addChild(this.newBgSprite);
    },
    //添加背景图片
    addBackGround:function () {
        this.bgSprite = new BgSprite(res.BackGround_png, cc.rect(GC.Bg_Center_X, GC.Bg_Center_Y, GC.w, GC.h));
        this.bgSprite.attr({
            x: GC.w_2,
            y: GC.h_2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this.addChild(this.bgSprite, GC.BackGround_Sprite);

//        var emitter = new cc.ParticleFireworks();
//        emitter.setTotalParticles(250);
//        emitter.texture = cc.textureCache.addImage(res.Fire_png);
//        this.addChild(emitter);
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

    addRoad:function () {
        cc.spriteFrameCache.addSpriteFrames(res.Road_plist);
        this.roadSprite = new RoadSprite();
        this.roadSprite.attr({
            x: GC.w_2,
            y: GC.h_2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(this.roadSprite, GC.Road_Sprite);
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
        if (GC.Game_Current == GC.Game_Running) {
            for (var i = 0; i < this.fiveTrees.length; i++) {
                var x = GC.treeOrg[i].x;
                var y = GC.treeOrg[i].y;

                var track = [
                    cc.p(x, y),
                    this.getSpriteGoal(cc.p(x, y)),
                ];

                this.moveSprite(this.fiveTrees[i], GC.Tree_Time_Line[i], track, 2);
            }
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
        var spawn = cc.spawn(cc.catmullRomTo(time, track), cc.scaleTo(time, scale));

        var seq = cc.sequence(
            spawn,
            cc.fadeOut(0.5),
            cc.callFunc(function () {
                sprite.removeFromParent();
            })
        );

        sprite.runAction(seq);
    },

    addMountain:function () {
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
        if (GC.Game_Current == GC.Game_Running) {
             for (var i = 0; i < this.fourStones.length; i++) {
                var x = GC.stoneOrg[i].x;
                var y = GC.stoneOrg[i].y;
                var track = [
                    cc.p(x, y),
                    this.getSpriteGoal(cc.p(x, y)),
                ];

                this.moveSprite(this.fourStones[i], GC.Stone_Time_Line[i], track, 2);
             }
        }
    },

    //添加障碍物精灵
    addBarrier:function () {
        this.barrierSprite = new BarrierSprite();
        this.addChild(this.barrierSprite, GC.Barrier_Sprite);
    },

    gameOver:function () {
        cc.log("Game over!");
        var timeCount = this.getParent().prospect.getLayerTimer().getTimer();
        GC.Total_Time  = timeCount;
        cc.log(timeCount+"--");
        cc.director.runScene(new cc.TransitionFade(1.2, new GameOverScene()));
    }
});

var ProspectLayer = cc.Layer.extend({
    //游戏计时
    timer:0,
    ctor:function () {
        this._super();
        this.addTimer();
        return true;
    },

    //初始化计时精灵
    addTimer:function () {
        this.timer = new TimerSprite();
        this.addChild(this.timer, GC.Timer_Sprite);
    },
    getLayerTimer:function(){
        return this.timer;
    }
});
var MainScene = cc.Scene.extend({
    prospect:null,
	onEnter:function () {
		this._super();

		var layer = new MainLayer();
		this.addChild(layer);

		this.prospect = new ProspectLayer();
		this.addChild(this.prospect);

		var timeCount = 0;
	}
});
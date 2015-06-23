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
    //游戏状态
    gameStatus:GC.Game_Loading,
    //游戏时间
    totalTime:0,
    //偏移
    currentX:null,

    //路精灵
    roadSprite:null,

    //树精灵
    currentTree:null,
    treeScale:null,
    treeOrg:null,
    treeGoal:null,

    //石头精灵
    stoneScale:null,
    stoneOrg:null,
    stoneGoal:null,

    //背景精灵
    bgSprite:null,
    prospect:null,

    //汽车精灵
    carSprite:null,

    //游戏计时
    timeout:300,
    timerLabel:null,

    //里程
    time:0,
    speed:30, //单位km/h
    kilometer:0,
    mileageLabel:null,

    //障碍物精灵
    barrierSprite:null,
    barrierRemove:0,
    newBgSprite:null,
    _drawNode2:null,
    ctor:function () {
        this._super();

        this.Loading();

        this._drawNode2 = new cc.DrawNode();
        this._drawNode2.setDrawColor(cc.color(255,255,255,255));
        this.addChild(this._drawNode2);

        return true;
    },

    update:function(dt) {
        this.totalTime += dt;//dt为每一帧执行的时间，把它加起来等于运行了多长时间
//        cc.log(this.totalTime);
        if (this.gameStatus == GC.Game_Over) {
            this.getActionManager().pauseAllRunningActions();
            this.gameOver();
            return;
        }
    },

    //加速
    speedUp:function () {
        this.gameSpeed = GC.Car_Speed_Fast;
        this.gameStatus = GC.Game_Running;
    },

    //减速
    slowDown:function () {
        this.gameSpeed = GC.Car_Speed_Slow;
        this.gameStatus = GC.Game_Running;
    },

    //速度恢复
    speedNormal:function () {
        this.gameStatus = GC.Game_Running;
    },

    //初始化游戏场景
    Loading:function () {

        cc.spriteFrameCache.addSpriteFrames(res.Background_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Stone_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Tree_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Barrier_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Car_plist);
        cc.spriteFrameCache.addSpriteFrames(res.ReadyGo_plist);

//        this.readyGo();
        this.startGame();
        this.scheduleUpdate();
    },

    readyGo:function () {
        this.gameStatus = GC.Game_Start;

        var readyGo = new ReadyGoSprite();
        readyGo.attr ({
            x: GC.w_2,
            y: GC.h_2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this.addChild(readyGo);
    },

    //启动游戏
    startGame:function () {
        this.gameStatus = GC.Game_Running;
        this.addSprite();
    },

    addSprite:function () {
        this.addNewBackground();
        this.addStone();
        this.addTree();
        this.addBarrier();
        this.addCar();
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
        this.currentTree = 0;
        this.treeOrg = [
            cc.p(GC.Tree_01_X, GC.Tree_01_Y),
            cc.p(GC.Tree_02_X, GC.Tree_02_Y),
            cc.p(GC.Tree_03_X, GC.Tree_03_Y),
            cc.p(GC.Tree_04_X, GC.Tree_04_Y),
            cc.p(GC.Tree_05_X, GC.Tree_05_Y)
        ];

        this.treeScale = [
            GC.Tree_01_Scale,
            GC.Tree_02_Scale,
            GC.Tree_03_Scale,
            GC.Tree_04_Scale,
            GC.Tree_05_Scale
        ];

        for (var i = 0; i < this.treeOrg.length; i++) {
            var str = "main_bg_object_tree" + (i + 1) + ".png";
            var sprite = cc.spriteFrameCache.getSpriteFrame(str);
            var tree = new cc.Sprite(sprite);

            this.addTreeSprite(tree, i);
        }

        this.currentX = 320;
        var treeAnimation = new TreeSprite();
        this.addChild(treeAnimation, GC.Tree_Sprite);
    },

    addTreeSprite:function (tree, index) {
        var x = this.treeOrg[index].x;
        var y = this.treeOrg[index].y;

        tree.attr({
            x:x,
            y:y,
            anchorX: 0.5,
            anchorY: 0.5,
            scale:this.treeScale[index]
        });

        this.addChild(tree, GC.Tree_Sprite);

        var track = [
            cc.p(x, y),
            this.getSpriteGoal(cc.p(x, y)),
        ];

        this.moveSprite(tree, GC.Tree_Time_Line[index], track, 2);
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
        this.stoneOrg = [
            cc.p(GC.Stone_01_X, GC.Stone_01_Y),
            cc.p(GC.Stone_02_X, GC.Stone_02_Y),
            cc.p(GC.Stone_03_X, GC.Stone_03_Y),
            cc.p(GC.Stone_04_X, GC.Stone_04_Y)
        ];

        this.stoneScale = [
            GC.Stone_01_Scale,
            GC.Stone_02_Scale,
            GC.Stone_03_Scale,
            GC.Stone_04_Scale
        ];

        for (var i = 0; i < this.stoneOrg.length; i++) {
            var str = "main_bg_object_stone" + (i + 1) + ".png";
            var sprite = cc.spriteFrameCache.getSpriteFrame(str);
            var stone = new cc.Sprite(sprite);

            this.addStoneSprite(stone, i);
        }

        var stoneAnimation = new StoneSprite();
        this.addChild(stoneAnimation, GC.Stone_Sprite);
    },

    addStoneSprite:function (stone, index) {
        var x = this.stoneOrg[index].x;
        var y = this.stoneOrg[index].y;

        stone.attr({
            x:x,
            y:y,
            anchorX: 0.5,
            anchorY: 0.5,
            scale:this.stoneScale[index]
        });

        this.addChild(stone, GC.Stone_Sprite);

        var track = [
            cc.p(x, y),
            this.getSpriteGoal(cc.p(x, y)),
        ];

        this.moveSprite(stone, GC.Stone_Time_Line[index], track, 2);
    },

    //初始化计时精灵
    addTimerSprite:function () {
        this.timerLabel = cc.LabelTTF.create(this.timeout, "Arial", 20);
        this.timerLabel.x = 60;
        this.timerLabel.y = size.height - 40;
        this.addChild(this.timerLabel, GC.Timer_Sprite);
    },

    //添加障碍物精灵
    addBarrier:function () {
        this.barrierSprite = new BarrierSprite();
        this.addChild(this.barrierSprite, GC.Barrier_Sprite);
    },

    gameOver:function () {
        var gameOver = new cc.LayerColor(cc.color(225,225,225,100));
        var titleLabel = new cc.LabelTTF("Game Over", "Arial", 38);
        titleLabel.attr({
            x:GC.w_2,
            y:GC.h_2
        });
        gameOver.addChild(titleLabel, 5);
        var TryAgainItem = new cc.MenuItemFont(
                "Try Again",
                function () {
                    cc.log("Menu is clicked!");
//                    var transition= cc.TransitionFade(1, new MainScene(),cc.color(255,255,255,255));
//                    cc.director.runScene(transition);
                    cc.director.runScene(new cc.TransitionFade(1.2, new MainScene(), cc.color(255,255,255,255)));
                }, this);
        TryAgainItem.attr({
            x:GC.w_2,
            y:GC.h_2 - 60,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(TryAgainItem);
        menu.x = 0;
        menu.y = 0;
        gameOver.addChild(menu, 1);
//        this.addChild(gameOver);
    }
});

var MainScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new MainLayer();
		this.addChild(layer);
	}
});
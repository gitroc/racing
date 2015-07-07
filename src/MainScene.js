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

    //偏移
    currentX:null,

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

    //汽车精灵
    carSprite:null,

    //障碍物精灵
    barrierSprite:null,
    bgSprite:null,

    //倒计时
    readyGoSprite:null,

    ctor:function () {
        this._super();
        this.loading();
        return true;
    },

    update:function(dt) {
        if (GC.Game_Current == GC.Game_Over) {
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

    //加载向导倒计时
    loadingGuide:function () {
        if (GC.Game_Current == GC.Game_Loading) {
            this.readyGoSprite = new ReadyGoSprite(res.MaskLayer_Png);
            this.readyGoSprite.attr({
                 x:GC.w_2,
                 y:GC.h_2,
                 anchorX : 0.5,
                 anchorY : 0.5
            });
            this.addChild(this.readyGoSprite, GC.Loading_Timer);
        }
    },

    //启动游戏
    startGame:function () {
        GC.Game_Current = GC.Game_Running;

        this.readyGoSprite.removeFromParent();

        this.showProLayer();
        this.startMoveTree();
        this.startMoveStone();
    },

    showProLayer:function () {
        var event = new cc.EventCustom("status_change");
        event.setUserData(GC.Game_Current);
        cc.eventManager.dispatchEvent(event);
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
        this.bgSprite = new NewBgSprite(res.Road_png);
        this.bgSprite.attr({
            x:GC.w_2,
            y:GC.h_2,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(this.bgSprite);
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
        this.getActionManager().pauseAllRunningActions();
        this.unscheduleUpdate();

        this.showProLayer();
    }
});

var ProspectLayer = cc.Layer.extend({

    //遮罩精灵
    maskLayer:null,

    //游戏计时
    timer:null,

    //游戏结束
    sloganSprite:null,
    word1Sprite:null,
    timeSprite:0,
    lineSprite:null,
    menuSprite:null,

    statusChangeListener:null,
    touchListener:null,

    explain:null,
    arrow:null,

    ctor:function () {
        this._super();
        return true;
    },

    onEnter:function () {
        this._super();
        this.addListener();
        this.addTouchListener();
    },

    onExit:function () {
        this.removeListener();
        this.removeTouchListener();
        this._super();
    },

    addListener:function() {
        this.statusChangeListener = cc.eventManager.addListener(
             cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: "status_change",
                callback: function(event){
                    var target = event.getCurrentTarget();
                    cc.log("status_change = ", event.getUserData());
                    target.showProLayer(event.getUserData());
                }
            }),
            this
        );
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.statusChangeListener);
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
                        target.removeArrow();
                    }
                }),
                this
            );
        } else if ('mouse' in cc.sys.capabilities) { //支持鼠标事件
            this.touchListener = cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    var target = event.getCurrentTarget();
                    target.removeArrow();
                }
            }, this);
        }
    },

    removeTouchListener:function() {
        cc.eventManager.removeListener(this.touchListener);
    },

    showProLayer:function (status) {
        switch (status) {
            case GC.Game_Loading:
                cc.log("GC.Game_Loading");
                this.addMaskLayer(GC.Mask_Layer_Main);
            break;

            case GC.Game_Running:
                cc.log("GC.Game_Running");
                this.addTimer();
            break;

            case GC.Game_Over:
                cc.log("GC.Game_Over");
                this.gameOver();
            break;

            default:
            break;
        }
    },

    //初始化计时精灵
    addTimer:function () {
        this.timer = new TimerSprite();
        this.addChild(this.timer, GC.Timer_Sprite);
    },

    //游戏结束
    gameOver:function () {
        cc.log("Game over!");
        this.addMaskLayer(GC.Mask_Layer_Main);
        this.addSlogan();
        this.addWord();
        this.addTime(GC.Total_Time.toFixed(2));
        this.addLine();
        this.addMenu(this.addReplay(), this.addShare());
    },

    removeAll:function () {
        GC.Game_Current = GC.Game_Loading;

        GC.Total_Time = 0;

        this.timer.removeFromParent();

        this.maskLayer.removeFromParent();
        this.sloganSprite.removeFromParent();
        this.word1Sprite.removeFromParent();
        this.timeSprite.removeFromParent();
        this.lineSprite.removeFromParent();
        this.menuSprite.removeFromParent();
    },

    //添加遮罩层
    addMaskLayer:function (layerIndex) {
        cc.log("addMaskLayer");
        this.maskLayer = new cc.Sprite(res.MaskLayer_Png);
        this.maskLayer.attr ({
            x: GC.w_2,
            y: GC.h_2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this.addChild(this.maskLayer, layerIndex);
    },

    //记得晒成绩哦
    addSlogan:function () {
        this.sloganSprite = new cc.Sprite(res.Slogan_Png);
        this.sloganSprite.attr({
            x:320,
            y:788,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(this.sloganSprite, GC.Slogan_Sprite);
    },

    //本轮成绩
    addWord:function () {
        this.word1Sprite = new cc.Sprite(res.Word_Png);
        this.word1Sprite.attr({
            x:215,
            y:605,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(this.word1Sprite, GC.Word1_Sprite);
    },

    //时间
    addTime:function (counter) {
        this.timeSprite = cc.LabelTTF.create(counter+"s", "黑体", 80, cc.TEXT_ALIGNMENT_RIGHT);
        this.timeSprite.setPosition(cc.p(420,605));
        this.timeSprite.setFontFillColor(cc.color(255,193,25));
        this.addChild(this.timeSprite, GC.TotalTime_Sprite);
    },

    //分割线
    addLine:function () {
        this.lineSprite = new cc.Sprite(res.Line_Png);
        this.lineSprite.attr({
            x:320,
            y:495,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(this.lineSprite, GC.Line_Sprite);
    },

    //再战一轮
    addReplay:function () {
        var replayItem = new cc.MenuItemImage(
            res.Again_png,
            res.AgainSel_png,
            function () {
                if (GC.Game_Current == GC.Game_Over) {
                    cc.log("replay game!");
                    this.removeAll();
                    cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
                }
            }, this);
        replayItem.attr({
            x:190,
            y:150,
            anchorX : 0.5,
            anchorY : 0.5
        });

        return replayItem;
    },

    //分享
    addShare:function () {
        var shareItem = new cc.MenuItemImage(
            res.Share_png,
            res.ShareSel_png,
            function () {
                if (GC.Game_Current == GC.Game_Over) {
                    cc.log("share game!");
                    document.title = window.wxData.desc = "我在超耐力赛车游戏中跑了" +  GC.Total_Time.toFixed(2) + "秒，快来试试吧";
                    document.title = window.wxFriend.desc = "我在超耐力赛车游戏中跑了" +  GC.Total_Time.toFixed(2) + "秒，快来试试吧";
                    window.shareMessage();
                    this.addArrow();
                    this.addMaskLayer(GC.Mask_Layer_Share);
                }
            }, this);

        shareItem.attr({
            x:450,
            y:150,
            anchorX : 0.5,
            anchorY : 0.5
        });

        return shareItem;
    },

    //菜单
    addMenu:function (menu1, menu2) {
        this.menuSprite = new cc.Menu(menu1, menu2);
        this.menuSprite.x = 0;
        this.menuSprite.y = 150;
        this.addChild(this.menuSprite, GC.Menu_Sprite);
    },

    //添加箭头
    addArrow:function () {
        this.explain = new cc.Sprite(res.Explain_png);
        this.explain.attr({
            x:320,
            y:970,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(this.explain, GC.Share_Sprite);

        this.startAction(this.explain);

        this.arrow = new cc.Sprite(res.Arrow_png);
        this.arrow.attr({
            x:557,
            y:1050,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(this.arrow, GC.Share_Sprite);
    },

    startAction:function (sprite) {
        var action;

        action = cc.spawn(action = cc.blink(1, 2), cc.scaleBy(1, 1.1));

        var action_back = action.reverse();
//        var seq = cc.sequence(action, action_back);

        sprite.runAction(cc.sequence(
                action,
                action_back,
                cc.callFunc(function () {
                    GC.Game_Current = GC.Game_Share;
                })
            )
        );
    },

    removeArrow:function () {
        if (GC.Game_Current == GC.Game_Share) {
            this.explain.removeFromParent();
            this.arrow.removeFromParent();
            this.maskLayer.removeFromParent();
            GC.Game_Current = GC.Game_Over;
        }
    }
});

var MainScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new MainLayer();
		this.addChild(layer);

		var proLayer = new ProspectLayer();
        this.addChild(proLayer, 1);
	}
});
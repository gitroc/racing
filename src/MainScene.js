/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 游戏窗口场景

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/
var MainLayer = cc.Layer.extend({

    space:null,

    //路精灵
    roadSprite:null,

    //树精灵
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
    _drawNode: null,
    carSprite:null,

    //倒计时
    timeout:300,
    timeoutLabel:null,

    //里程
    time:0,
    speed:30, //单位km/h
    kilometer:0,
    mileageLabel:null,

    //障碍物精灵
    barrierSprites:null,
    barrierRemove:0,

    ctor:function () {
        this._super();

        this.addSprite();

        return true;
    },

    steupView:function () {
        var size = cc.winSize;

        this.prospect = new cc.Sprite(res.Prospect_png);
        this.prospect.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(this.prospect);
    },

    onEnter: function () {
        this._super();
         cc.log("onEnter");
//         cc.eventManager.addListener({
//             event: cc.EventListener.TOUCH_ONE_BY_ONE,
//             onTouchBegan: this.onTouchBegan
//         }, this);

//        this.schedule(this.updateTree, 1, 16*1024, 1);
        this.scheduleUpdate();
    },

    onTouchBegan: function (touch, event) {
        cc.log("onTouchBegan");
        var target = event.getCurrentTarget();
        var location = touch.getLocation();
//        target.addPhysicsSprite(res.Car_png, location);
        return false;
    },

    onExit: function () {
        this._super();
        cc.log("onExit");
//        cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
    },

    update: function (dt) {
//        var timeStep = 0.03;
//        this.space.step(timeStep);

//        this.updateLine(dt);
//        this.eventHander();
    },

    updateLine:function (dt) {
        var size = cc.winSize;

        if (this.prospect.getPositionY() <= size.height/2 - 15) {
            this.prospect.setPosition(cc.p(size.width/2, size.height/2));
        }else{
            this.prospect.setPosition(cc.pAdd(this.prospect.getPosition(), cc.p(0,-1)));
        }
    },

    //初始化游戏场景
    addSprite:function () {
        this.addBackGround();
        this.addRoad();
        this.addStone();
        this.addTree();
        this.addCar();
        
        this.addCounterSprite();
        this.addMileageSprite();
        this.addBarrierSprite();
    },

    //添加背景图片
    addBackGround:function () {
        var size = cc.winSize;

        this.bgSprite = new cc.Sprite(res.BackGround_png, cc.rect(100, 0, GC.w, GC.h));
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
        var size = cc.winSize;
        this.carSprite = new CarSprite(res.Car_png);

        this.carSprite.attr({
            x: GC.Car_Center_X - GC.Center_Offset,
            y: GC.Car_Center_Y,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this.addChild(this.carSprite, GC.Car_Sprite);

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
        cc.spriteFrameCache.addSpriteFrames(res.Tree_plist);

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
            var tree = new TreeSprite(sprite);

            this.addTreeSprite(tree, i);
        }
    },

    addTreeSprite:function (tree, index) {
        var x = this.treeOrg[index].x - GC.Center_Offset;
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
            this.getTreeGoal(cc.p(x, y)),
        ];

        this.moveTree(tree, 3, track, 2);
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

    moveTree:function (sprite, time, track, scale) {
        var action = cc.spawn(cc.catmullRomTo(time, track),
                        cc.scaleTo(time, scale)
                     );
        sprite.runAction(action);
    },

    addMountain:function () {
    },

    addStone:function () {
        cc.spriteFrameCache.addSpriteFrames(res.Stone_plist);

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
            var stone = new StoneSprite(sprite);

            this.addStoneSprite(stone, i);
        }
    },

    addStoneSprite:function (stone, index) {
        var x = this.stoneOrg[index].x - GC.Center_Offset;
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
            this.getStoneGoal(cc.p(x, y)),
        ];

        this.moveStone(stone, 3, track, 2);
    },

    moveStone:function (sprite, time, track, scale) {
        var action = cc.spawn(cc.catmullRomTo(time, track),
                        cc.scaleTo(time, scale)
                     );
        sprite.runAction(action);
    },

    getStoneGoal:function (Org) {
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

    updateSprite:function () {
        var size = cc.winSize;

        var x = (size.width / 2) * cc.random0To1();
        var y = size.height - 40;

        this.addPhysicsSprite(res.Barrier_png, cp.v(x, y));
    },

    //初始化计数精灵
    addCounterSprite:function () {
        var size = cc.winSize;
        this.timeoutLabel = cc.LabelTTF.create(this.timeout, "Arial", 20);
        this.timeoutLabel.x = 60;
        this.timeoutLabel.y = size.height - 40;
        this.addChild(this.timeoutLabel, 5);
    },

    //初始化里程精灵
    addMileageSprite:function () {
        var size = cc.winSize;
        this.mileageLabel = cc.LabelTTF.create(this.kilometer  + " km", "Arial", 20);
        this.mileageLabel.x = size.width / 2 - 20;
        this.mileageLabel.y = size.height - 40;
        this.addChild(this.mileageLabel, 5);
    },

    //添加障碍物精灵
    addBarrierSprite:function () {
        this.barrierSprites = [];
    },

    //刷新障碍物精灵
    updateBarrierSprite:function () {
        var size = cc.winSize;

        var barrierSprite = new BarrierSprite("res/main/main_bg_object_tree1.png");
        this.barrierRemove = barrierSprite.height;
        var x = barrierSprite.width/2 + GC.w * cc.random0To1();
        var y = GC.h_2 + 160;

        barrierSprite.attr({
            x: x,
            y: y,
            anchorX: 0.5,
            anchorY: 0.5,
            scale : 0.2
        });

//        var body = new cp.Body(1, cp.momentForBox(1, barrierSprite.width, barrierSprite.height));
//        body.setPos(cc.p(x, y));
//        this.space.addBody(body);
//
//        var shape = new cp.BoxShape(body, barrierSprite.width, barrierSprite.height);
//        shape.setElasticity(0.5);
//        shape.setFriction(0.5);
//        this.space.addShape(shape);

        this.barrierSprites.push(barrierSprite);
        barrierSprite.index = this.barrierSprites.length;

//        barrierSprite.setBody(body);
        this.addChild(barrierSprite, GC.Barrier_Sprite);

        barrierSprite.runAction(
            cc.spawn(new cc.MoveTo(4, cc.p(barrierSprite.x, -this.barrierRemove)),
                new cc.scaleTo(4, 1.5),
                new cc.CallFunc(function () {
//                    cc.log("CallFunc");
                    var event = new cc.EventCustom("barrier_crush");
                    cc.eventManager.dispatchEvent(event);
                })
            )
        );

        this.removeBarrierSprite();
    },

    sendBarrierEvent:function () {
        var event = new cc.EventCustom("barrier_crush");
        cc.eventManager.dispatchEvent(event);
    },

    removeBarrierSpriteByCrush:function(dx) {
        if(isNaN(dx) || dx > this.barrierSprites.length){
            return false;
        }

        for(var i = 0, n = 0; i < this.barrierSprites.length; i++) {
            if(this.barrierSprites[i] != this[dx])
            {
                cc.log("--------------");
                this.barrierSprites[n++] = this.barrierSprites[i]
            }
        }

        if (this.barrierSprites.length >= 1) {
            this.barrierSprites.length -= 1;
        }
    },

    //障碍物精灵自动消失
    removeBarrierSprite:function () {
        for (var i = 0; i < this.barrierSprites.length; i++) {
//            cc.log("this.barrierSprites[i].y = ", this.barrierSprites[i].y);
            if(-this.barrierRemove == this.barrierSprites[i].y) {
//                cc.log("======removeBarrierSprite: " + i);
                this.barrierSprites[i].removeFromParent();
                this.barrierSprites[i] = undefined;
                this.barrierSprites.splice(i, 1);
                i = i - 1;
            }
        }
    },

    onBugMe:function (node) {
        node.stopAllActions(); //After this stop next action not working, if remove this stop everything is working
//        node.runAction(cc.scaleTo(2, 2));

//        node.runAction(cc.rotateBy(1.5, 360));
        node.runAction(cc.sequence(
            cc.delayTime(1.4),
            cc.fadeOut(1.1))
        );
    },


    //刷新倒计时精灵
    updateCounterSprite:function () {
        var size = cc.winSize;

        var counter = new CounterSprite();

        counter.attr({
            x: 60,
            y:size.height - 40
        });

        this.addChild(counter, 5);
    },

    //刷新里程精灵
    updateMileageSprite:function () {
        var size = cc.winSize;

        var mileage = new MileageSprite();

        mileage.attr({
            x:size.width / 2 - 20,
            y:size.height - 40
        });

        this.addChild(mileage, 5);
    },

    //刷新违规精灵
    updateFaultSprite:function () {

    },

    carCrash:function() {
        for (var i = 0; i < this.barrierSprites.length; i++) {
            var carRect = this.carSprite.getBoundingBox();
            var barrierRect = this.barrierSprites[i].getBoundingBox();
            cc.log("carRect.y = ", carRect.y);
            cc.log("carRect.height = ", carRect.height);
            cc.log("barrierRect.y = ", barrierRect.y);
            cc.log("barrierRect.height = ", barrierRect.height);

            if(cc.rectIntersectsRect(carRect, barrierRect)){
                  //发生碰撞事件
                cc.log("carCrash");
                this.barrierSprites[i].runAction(cc.sequence(
                    cc.rotateBy(0.5, 360),
                    cc.fadeOut(0.5))
                );
                this.removeBarrierSpriteByCrush(i);

                return true;
            }
        }
    }
});

var MainScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new MainLayer();
		this.addChild(layer);
	}
});
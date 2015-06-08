/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 游戏窗口场景

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/
var BackGround_SPRITE = 0;
var Road_SPRITE = 1;
var Car_SPRITE = 2;
var Barrier_SPRITE = 3;
var Tree_SPRITE = 1;

var MainLayer = cc.Layer.extend({

    space:null,

    //路精灵
    roadSprite:null,

    //树精灵
    treeSprite:null,

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

//        this.initPhysics();

        this.addSprite();

//        this.steupView();

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

        this.schedule(this.updateBarrierSprite, 1, 16*1024, 1);
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

    initPhysics:function() {
        var winSize = cc.director.getWinSize();

        this.space = new cp.Space();
//        this.setupDebugNode();

        // 设置重力
        this.space.gravity = cp.v(0, -50);
        var staticBody = this.space.staticBody;

        // 设置空间边界
        var walls = [
            new cp.SegmentShape(staticBody, cp.v(0, 0), cp.v(winSize.width, 0), 0),
            new cp.SegmentShape(staticBody, cp.v(0, winSize.height), cp.v(winSize.width, winSize.height), 0),
            new cp.SegmentShape(staticBody, cp.v(0, 0), cp.v(0, winSize.height), 0),
            new cp.SegmentShape(staticBody, cp.v(winSize.width, 0), cp.v(winSize.width, winSize.height), 0)
        ];

        for (var i = 0; i < walls.length; i++) {
            var shape = walls[i];
            shape.setElasticity(1);
            shape.setFriction(1);
            this.space.addStaticShape(shape);
        }
    },

    //初始化游戏场景
    addSprite:function () {
        this.addBackGround();
        this.addRoad();
        this.addTree();
        this.addCar();
        
        this.addCounterSprite();
        this.addMileageSprite();
        this.addBarrierSprite();
    },

    //添加背景图片
    addBackGround:function () {
        var size = cc.winSize;

        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: GC.w_2,
            y: GC.h_2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(this.bgSprite, BackGround_SPRITE);

//        var emitter = new cc.ParticleFireworks();
//        emitter.setTotalParticles(250);
//        emitter.texture = cc.textureCache.addImage(res.Fire_png);
//        this.addChild(emitter);
    },

    //添加汽车
    addCar:function () {
        var size = cc.winSize;
        this.carSprite = new CarSprite(res.Car_png);

        var x = GC.Car_CENTER;
        var y = this.carSprite.height / 2;
//        this.carSprite.scale = 0.5;
        this.carSprite.attr({
            x: x,
            y: y,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this.addChild(this.carSprite, Car_SPRITE);

//        var actionTo = cc.jumpTo(2, cc.p(300, 300), 50, 4);
//        var actionBy = cc.jumpBy(2, cc.p(300, 0), 50, 4);
//        var actionUp = cc.jumpBy(2, cc.p(0, 0), 80, 4);
//        var actionByBack = actionBy.reverse();
//
//        var delay = cc.delayTime(0.25);

//        this.carSprite.runAction(actionTo);
//        this.carSprite.runAction(cc.sequence(actionBy, delay, actionByBack));

//        var action = cc.sequence(actionUp, delay.clone()).repeatForever();
        // 3 and only 3 control points should be used for Bezier actions.
//        var controlPoints = [ cc.p(0, 374),
//                                cc.p(300, -374),
//                                cc.p(300, 100) ];
//
//        var bezierForward = cc.bezierBy(2, controlPoints);
//        var rep = cc.sequence(bezierForward, delay, bezierForward.reverse(), delay.clone()).repeatForever();
//        var controlPoints1 = [ cc.p(428, 279), cc.p(100, 100), cc.p(100, 100)];
//        var controlPoints2 = [ cc.p(100, 100), cc.p(428, 279), cc.p(428, 279)];
//
//        var bz1 = cc.bezierTo(1.5, controlPoints1);
//        var bz2 = cc.bezierTo(1.5, controlPoints2);
//        var trace = cc.callFunc(this.onTrace, this);
//        var delay = cc.delayTime(0.25);
//
//        var rep = cc.sequence(bz1, bz2, trace,delay).repeatForever();
//        this.carSprite.runAction(rep);
//        var array = [
//            cc.p(0, 0),
//            cc.p(size.width / 2 - 30, 0),
//            cc.p(size.width / 2 - 30, size.height - 80),
//            cc.p(0, size.height - 80),
//            cc.p(0, 0)
//        ];
//
//        var action1 = cc.cardinalSplineBy(2, array, 0);
//                var reverse1 = action1.reverse();
//                var seq = cc.sequence(action1, delay, reverse1, delay.clone() );
//        var x = 320;
//        var y = 256;
//        var array = [
//            cc.p(x, y),
//            cc.p(x - 32, 80),
//            cc.p(x - 64, 160),
//            cc.p(x - 96, 240),
//            cc.p(x - 128, 320),
//            cc.p(x - 160, 360),
//            cc.p(x - 192, 400),
//            cc.p(x - 224, 480),
//            cc.p(x - 256, 560),
//            cc.p(x - 288, 640),
//        ];
//
//        var action1 = cc.catmullRomBy(3, array);
//        var reverse1 = action1.reverse();
//        var seq1 = cc.sequence(action1, delay, reverse1);
//                this.carSprite.runAction(seq1);

//        this._drawNode = new cc.DrawNode();
//        this._drawNode.x = x;
//        this._drawNode.y = y;
//        this._drawNode.setDrawColor(cc.color(255,255,255,255));
//        this.addChild(this._drawNode);

//        var delay = cc.delayTime(0.25);
//        var action1 = cc.catmullRomBy(3, array);
//        var reverse1 = action1.reverse();
//        var seq1 = cc.sequence(action1, delay, reverse1);
//
//        this.carSprite.runAction(seq1);

//        this._drawNode.drawCatmullRom(array,50, 1);

//        var body = new cp.Body(1, cp.momentForBox(1, this.carSprite.width, this.carSprite.height));
//        body.setPos(cc.p(x, y));
//        this.space.addBody(body);
//
//        var shape = new cp.BoxShape(body, this.carSprite.width, this.carSprite.height);
//        shape.setElasticity(0.5);
//        shape.setFriction(0.5);
//        this.space.addShape(shape);
//
//        this.carSprite.setBody(body);
//        this.carSprite.runAction(cc.scaleTo(0, 0.25));

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
        this.addChild(this.roadSprite, Road_SPRITE);
    },

    addTree:function () {
        this.treeSprite = new TreeSprite(res.Tree01_png);
        this.treeSprite.attr({
            x: GC.Tree_X,
            y: GC.Tree_Y,
            anchorX: 0.5,
            anchorY: 0.5,
            scale : 0.5
        });
        this.addChild(this.treeSprite, Tree_SPRITE);

        this.treeSprite.runAction(
            cc.sequence(
                    new cc.CallFunc(function () {
                    var event = new cc.EventCustom("start_run");
                    cc.eventManager.dispatchEvent(event);
                })
            )
        );
    },

    addMountain:function () {
    },

    addRock:function () {
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

        var barrierSprite = new BarrierSprite(res.Barrier_png);
        this.barrierRemove = barrierSprite.height;
        var x = barrierSprite.width/2 + GC.w * cc.random0To1();
        var y = GC.h_2 + 160;

        barrierSprite.attr({
            x: x,
            y: y,
            anchorX: 0.5,
            anchorY: 0.5,
            scale : 0.5
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
        this.addChild(barrierSprite, Barrier_SPRITE);

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
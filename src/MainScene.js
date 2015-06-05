/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 游戏窗口场景

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var SPRITE_WIDTH = 64;
var SPRITE_HEIGHT = 64;

var BackGround_SPRITE = 0;
var Barrier_SPRITE = 1;
var Car_SPRITE = 2;

var MainLayer = cc.Layer.extend({

    space:null,

    //背景精灵
    bgSprite:null,
    prospect:null,

    //汽车精灵
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

//        this.schedule(this.updateBarrierSprite, 1, 16*1024, 1);
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
        this.addCar();
        
        this.addCounterSprite();
        this.addMileageSprite();
        this.addBarrierSprite();
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
        var x = barrierSprite.width/2 + (size.width / 2) * cc.random0To1();
        var y = size.height - barrierSprite.height;

        barrierSprite.attr({
            x: x,
            y: y,
            anchorX: 0.5,
            anchorY: 0.5
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
            cc.sequence(new cc.MoveTo(4, cc.p(barrierSprite.x, -this.barrierRemove)),
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

    //添加背景图片
    addBackGround:function () {
        var size = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(res.BackGround_plist);

        this.bgSprite = new BgSprite();
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

        var x = size.width / 2;
        var y = this.carSprite.height / 2;
        this.carSprite.scale = 0.5;
        this.carSprite.attr({
            x: x,
            y: y,
            anchorX: 0.5,
            anchorY: 0.5
        });

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
        this.addChild(this.carSprite, Car_SPRITE);
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
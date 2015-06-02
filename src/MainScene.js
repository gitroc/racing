/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 游戏窗口场景

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/
var BackGround_SPRITE = 0;
var Barrier_SPRITE = 1;
var Car_SPRITE = 2;

var MainLayer = cc.Layer.extend({
    //背景精灵
    bgSprite:null,

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
    currentBarrierSprite:null,
    barrierNumber:0,

    ctor:function () {
        this._super();

        this.addSprite();

        this.schedule(this.updateCounterSprite, 1, 16*1024, 1);

        this.schedule(this.updateMileageSprite, 1, 16*1024, 1);

        this.schedule(this.addBarrierSprite, 3, 16*1024, 1);

        return true;
    },

    //初始化游戏场景
    addSprite:function () {
        this.addBackGround();
        this.addCar();
        
        this.addCounterSprite();
        this.addMileageSprite();
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
        var size = cc.winSize;

        this.barrierSprites = [];

        this.currentBarrierSprite = new BarrierSprite(res.Barrier_png);
        var x = this.currentBarrierSprite.width/2 + (size.width / 2) * cc.random0To1();
        var y = size.height - this.currentBarrierSprite.height;
        this.currentBarrierSprite.attr({
            x: x,
            y: y
        });

        this.barrierSprites.push(this.currentBarrierSprite);

        this.addChild(this.currentBarrierSprite, Barrier_SPRITE);

        var fall = cc.MoveTo(4, cc.p(this.currentBarrierSprite.x, -this.currentBarrierSprite.height));
        this.currentBarrierSprite.runAction(fall);

        this.carCrash();

//        this.removeBarrierSprite();
    },

    //
    removeBarrierSprite:function () {
        for (var i = 0; i < this.barrierSprites.length; i++) {
            cc.log("removeBarrierSprite");
            var sprite = this.getChildByTag(Barrier_SPRITE);
            if(sprite.y == this.barrierSprites[i].y) {
                cc.log("==============remove:"+i);
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
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(this.bgSprite, BackGround_SPRITE);

        var emitter = new cc.ParticleFireworks();
        emitter.setTotalParticles(250);
        emitter.texture = cc.textureCache.addImage(res.Fire_png);
        this.addChild(emitter);
    },

    //添加汽车
    addCar:function () {
        var size = cc.winSize;
        this.carSprite = new CarSprite(res.Car_png);

        var y = this.carSprite.height / 2;
        this.carSprite.attr({
            x: size.width / 2,
            y: y,
            anchorX: 0.5,
            anchorY: 0.5
        });
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
//            var carRect = this.carSprite.getBoundingBox();
//            var barrierRect = this.barrierSprites[i].getBoundingBox();
//            cc.log("carRect = ", carRect);
//            cc.log("barrierRect = ", barrierRect);

//            var distance = cc.pDistance(this.carSprite.getPosition(), this.barrierSprites[i].getPosition());
//            var radius = this.carSprite.radius + this.barrierSprites[i].radius;
//            cc.log("distance:" + distance + "; radius:" + radius);
//            if(distance < radiusSum){
//                //发生碰撞
//                cc.log("carCrash");
//            }
//            if(cc.rectIntersectsRect(carRect, barrierRect)){
//                  //发生碰撞事件
//                  cc.log("carCrash");
//                  barrierSprites[i].runAction(cc.sequence(
//                      cc.delayTime(1.4),
//                      cc.fadeOut(1.1))
//                  );
//            }
            var boxBarrier = this.barrierSprites[i].getBoundingBox();
            var bottom = cc.p(boxBarrier.x + boxBarrier.width / 2, boxBarrier.y);
            var right = cc.p(boxBarrier.x + boxBarrier.width, boxBarrier.y + boxBarrier.height / 2);
            var left = cc.p(boxBarrier.x, boxBarrier.y + boxBarrier.height / 2);
            var top = cc.p(boxBarrier.x + boxBarrier.width / 2, boxBarrier.y + boxBarrier.height);

            cc.log("bottom", bottom);
            cc.log("right", right);
            cc.log("left", left);
            cc.log("top", top);

            var boxCar = this.carSprite.getBoundingBox();
            if(cc.rectContainsPoint(boxCar, left)||cc.rectContainsPoint(boxCar, right)||cc.rectContainsPoint(boxCar, top)||cc.rectContainsPoint(boxCar, bottom)){
              //发生碰撞
              cc.log("carCrash");
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
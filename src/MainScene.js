/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 游戏窗口场景

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var MainLayer = cc.Layer.extend({
    //倒计时
    timeout:300,
    timeoutLabel:null,

    //里程
    time:0,
    speed:30, //单位km/h
    kilometer:0,
    mileageLabel:null,

    //障碍物
    barrierNumber:0,

    ctor:function () {
        this._super();

        this.initMain();

        this.schedule(this.updateCounterSprite, 1, 16*1024, 1);

        this.schedule(this.updateMileageSprite, 1, 16*1024, 1);

//        this.schedule(this.updateBarrierSprite, 1, 16*1024, 1);
        this.updateBarrierSprite();
        return true;
    },

    //初始化游戏场景
    initMain:function () {
        this.addBackGround();
        this.initCounterSprite();
        this.initMileageSprite();
//        this.initBarrierSprite();
    },

    //初始化计数精灵
    initCounterSprite:function () {
        var size = cc.winSize;
        this.timeoutLabel = cc.LabelTTF.create(this.timeout, "Arial", 20);
        this.timeoutLabel.x = 60;
        this.timeoutLabel.y = size.height - 40;
        this.addChild(this.timeoutLabel, 5);
    },

    //初始化里程精灵
    initMileageSprite:function () {
        var size = cc.winSize;
        this.mileageLabel = cc.LabelTTF.create(this.kilometer  + " km", "Arial", 20);
        this.mileageLabel.x = size.width / 2 - 20;
        this.mileageLabel.y = size.height - 40;
        this.addChild(this.mileageLabel, 5);
    },

    initBarrierSprite:function () {
        var size = cc.winSize;
        var grossini = new cc.Sprite("res/car02.png");
        this.addChild(grossini, 0, 2);
        grossini.x = size.width/2 * cc.random0To1();
        grossini.y = size.height - 20;

        grossini.runAction(cc.sequence(
            cc.fadeIn(1.1),
            cc.scaleTo(0.5, 2),
            cc.moveBy(1, cc.p(0, -50)),
            cc.callFunc(this.onBugMe, this))
        );
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
        });
        this.addChild(this.bgSprite, 0);
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

    //刷新障碍物精灵
    updateBarrierSprite:function () {
        var size = cc.winSize;

        var barrier = new BarrierSprite("res/car05.png");

        barrier.attr({
            x: 100,
            y: size.height/2 - 70
        });

        this.addChild(barrier, 5);

        var actionTo = cc.scaleTo(2, 0.5);
        var actionBy = cc.scaleBy(0.1, 1);
        var actionBy2 = cc.scaleBy(2, 0.25, 4.5);

        barrier.runAction(actionBy);

        var emitter = new cc.ParticleFireworks();
        emitter.setTotalParticles(250);
        emitter.texture = cc.textureCache.addImage("res/fire.png");
        this.addChild(emitter);
    }
});

var MainScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new MainLayer();
		this.addChild(layer);
	}
});
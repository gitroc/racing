/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 游戏窗口场景

 Author: roc from android team.

 Date: 2015-06-02

 ****************************************************************************/

var SPRITE_WIDTH = 64;
var SPRITE_HEIGHT = 64;
var DEBUG_NODE_SHOW = true;

var PlayLayer = cc.Layer.extend({
	space:null,

    ctor : function () {
        this._super();

        this.initPhysics();

        this.scheduleUpdate();
    },

    update: function (dt) {
        var timeStep = 0.03;
        this.space.step(timeStep);
    },

	// init space of chipmunk
    initPhysics:function() {
        var winSize = cc.director.getWinSize();


        this.space = new cp.Space();
        this.setupDebugNode();


        // 设置重力
        this.space.gravity = cp.v(0, -100);
        var staticBody = this.space.staticBody;


        // 设置空间边界
        var walls = [ new cp.SegmentShape(staticBody, cp.v(0, 0),
                                    cp.v(winSize.width, 0), 0),
                        new cp.SegmentShape(staticBody, cp.v(0, winSize.height),
                                                    cp.v(winSize.width, winSize.height), 0),
                        new cp.SegmentShape(staticBody, cp.v(0, 0),
                                                    cp.v(0, winSize.height), 0),
                        new cp.SegmentShape(staticBody, cp.v(winSize.width, 0),
                                                    cp.v(winSize.width, winSize.height), 0)
                    ];
        for (var i = 0; i < walls.length; i++) {
            var shape = walls[i];
            shape.setElasticity(1);
            shape.setFriction(1);
            this.space.addStaticShape(shape);
        }
    },

    addNewSpriteAtPosition: function (p) {
         cc.log("addNewSpriteAtPosition");

         var body = new cp.Body(1, cp.momentForBox(1, SPRITE_WIDTH, SPRITE_HEIGHT));
         body.setPos(p);
         this.space.addBody(body);

         var shape = new cp.BoxShape(body, SPRITE_WIDTH, SPRITE_HEIGHT);
         shape.setElasticity(0.5);
         shape.setFriction(0.5);
         this.space.addShape(shape);


         //创建物理引擎精灵对象
         var sprite = new cc.PhysicsSprite(res.Barrier_png);
         sprite.setBody(body);
         sprite.setPosition(cc.p(p.x, p.y));
         this.addChild(sprite);
    },

    setupDebugNode: function () {
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.visible = DEBUG_NODE_SHOW;
        this.addChild(this._debugNode);
    },

    onEnter: function () {
         this._super();
         cc.log("onEnter");
         cc.eventManager.addListener({
             event: cc.EventListener.TOUCH_ONE_BY_ONE,
             onTouchBegan: this.onTouchBegan
         }, this);
     },
     onTouchBegan: function (touch, event) {
         cc.log("onTouchBegan");
         var target = event.getCurrentTarget();
         var location = touch.getLocation();
         target.addNewSpriteAtPosition(location);
         return false;
     },
     onExit: function () {
         this._super();
         cc.log("onExit");
         cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
     }
});
var PlayScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new PlayLayer();
		this.addChild(layer);
	}
});
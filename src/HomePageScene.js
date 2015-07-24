//游戏入口场景
/**
* Created by Daiyan on 15-06-03
*/
var HomePageLayer = cc.Layer.extend({
    bgSprite:null,
    buttonSprite:null,
    scoreLabel:null,
    touchListener:null,
    ctor:function () {
        this._super();
        this.addLoadingBg();
        this.addButtonSprite();
        this.addListener();
        this.loadResource();
        this.playMusic();
    },

    loadResource:function () {
        cc.spriteFrameCache.addSpriteFrames(res.Background_plist);
        cc.spriteFrameCache.addSpriteFrames(res.ReadyGo_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Stone_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Tree_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Barrier_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Car_plist);
        cc.spriteFrameCache.addSpriteFrames(res.GameOver_plist);
    },

    addLoadingBg:function () {
        this._sptBg = new cc.Sprite(res.LoadingBg_Png);
        this._sptBg.attr({
            x : GC.w_2,
            y : GC.h_2,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(this._sptBg, 1);
    },

    addButtonSprite:function () {
        this.buttonSprite = new cc.Sprite(res.LoadingBtOff_Png);
        this.buttonSprite.attr({
            x : 450,
            y : 150,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(this.buttonSprite, 2);

        this.startAnimation();
    },

    startAnimation:function() {
        var frames =[];
        var frameOn = new cc.SpriteFrame(res.LoadingBtOn_Png, cc.rect(0, 0, 290, 160));
        var frameOff = new cc.SpriteFrame(res.LoadingBtOff_Png, cc.rect(0, 0, 290, 160));
        frames.push(frameOn);
        frames.push(frameOff);

        var animation = new cc.Animation(frames, 0.15);
        var action = new cc.Animate(animation).repeatForever();
        this.buttonSprite.runAction(action);
    },

    //添加监听
    addListener:function () {
        // 创建一个事件监听器 OneByOne 为单点触摸
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
            onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件回调函数
                var target = event.getCurrentTarget();  // 获取事件所绑定的 target
                // 获取当前点击点所在相对按钮的位置坐标
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {     // 点击范围判断检测
                    cc.eventManager.removeListener(this.touchListener);
                    cc.audioEngine.stopMusic();
                    cc.director.runScene(new cc.TransitionFade(1.2, new PlayScene()));
                    target.opacity = 180;
                    return true;
                }
                return false;
            }
        });

        cc.eventManager.addListener(this.touchListener, this.buttonSprite);
    },

    playMusic:function(){
        if (GC.SOUND_ON){
            cc.audioEngine.playMusic(res.Game_Start, true);
        }
    }
});
var HomePageScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new HomePageLayer();
		this.addChild(layer);
	}
});
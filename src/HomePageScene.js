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
        this.playMusic();
        this.addLoadingBg();
        this.addButtonSprite();
        this.addListener();
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
        cc.spriteFrameCache.addSpriteFrames(res.Loading_btn_plist);
        this.buttonSprite = new PlayButtonSprite(cc.spriteFrameCache.getSpriteFrame("loading_btn_off.png"));
        this.buttonSprite.attr({
            x : 450,
            y : 150,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(this.buttonSprite, 2);
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
                    cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
                    target.opacity = 180;
                    return true;
                }
                return false;
            }
        });

        cc.eventManager.addListener(this.touchListener, this.buttonSprite);
    },

    //播放背景音乐，true代表循环无限次播放，false表示只播放一次。
    playMusic:function(){
        if (GC.SOUND_ON){
            if (cc.audioEngine.isMusicPlaying()){
                cc.audioEngine.stopAllEffects();
                cc.audioEngine.stopMusic();
            }
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
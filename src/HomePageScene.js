//游戏入口场景
/**
* Created by Daiyan on 15-06-03
*/
var HomePageLayer = cc.Layer.extend({
	bgSprite:null,
	buttonSprite:null,
	scoreLabel:null,
	ctor:function () {
		this._super();
        this._sptBg = new cc.Sprite(res.LoadingBg_Png);
        this._sptBg.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x: GC.w_2,
            y: GC.h_2
        });
        this.addChild(this._sptBg,1);

        this.buttonSprite = new PlayButtonSprite(res.PlayOn_png);
        this.buttonSprite.attr({
            x: 450,
            y: 150,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(this.buttonSprite,2);
        // 创建一个事件监听器 OneByOne 为单点触摸
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
            onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件回调函数
                var target = event.getCurrentTarget();  // 获取事件所绑定的 target
                // 获取当前点击点所在相对按钮的位置坐标
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {       // 点击范围判断检测
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
                    target.opacity = 180;
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(listener1, this.buttonSprite);
    },

});
var HomePageScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new HomePageLayer();
		this.addChild(layer);

	}
});
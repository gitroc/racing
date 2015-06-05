var DemoLayer = cc.Layer.extend({
    disappearAction:null,
    ctor:function(){
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.BackGround_plist);

        var demoSprite = new DemoSprite("res/bg.png");
        demoSprite.attr({
            x:GC.w_2,
            y:GC.h_2,
            anchorX : 0.5,
            anchorY : 0.5
        });

        this.addChild(demoSprite);
    },

});
var DemoScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new DemoLayer();
		this.addChild(layer);
	}
});
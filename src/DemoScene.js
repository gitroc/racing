var DemoLayer = cc.Layer.extend({
    disappearAction:null,
    ctor:function(){
        this._super();
        cc.spriteFrameCache.addSpriteFrames("res/line.plist");

        var demoSprite = new DemoSprite("#01.png");
        demoSprite.attr({
            x:GC.w_2,
            y:GC.h_2,
            anchorX : 0.5,
            anchorY : 0.5
        });

        this.addChild(demoSprite,0);
    },

});
var DemoScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new DemoLayer();
		this.addChild(layer);
	}
});
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

        this.buttonSprite = new PlayButtonSprite(res.Play_N_png);
        this.buttonSprite.attr({
            x: 450,
            y: 150,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(this.buttonSprite,2);
    }
});
var HomePageScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new HomePageLayer();
		this.addChild(layer);

	}
});
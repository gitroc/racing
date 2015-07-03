//游戏入口场景
/**
* Created by Daiyan on 15-06-03
*/
var HomePageLayer = cc.Layer.extend({
	bgSprite:null,
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
        this.addChild(this._sptBg);

        var startItem = new cc.MenuItemImage(
            res.Play_S_png,
            res.Play_N_png,
            function () {
                cc.log("PlayMenu is clicked!");
                cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
            }, this);
        startItem.attr({
			x: 450,
			y: 150,
			anchorX: 0.5,
			anchorY: 0.5
		});
        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
    }
});
var HomePageScene = cc.Scene.extend({
	onEnter:function () {
		this._super();

		var layer = new HomePageLayer();
		this.addChild(layer);

	}
});
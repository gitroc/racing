//赛前询问场景
/**
* Created by Daiyan on 15-06-03
*/
var AskLayer = cc.Layer.extend({
	_sptBg:null,
	ctor:function(){
		this._super();
		this._sptBg = new cc.Sprite(res.BackGround_png);
			this._sptBg.attr({
				anchorX : 0.5,
				anchorY : 0.5,
				x: GC.w_2,
				y: GC.h_2
			});
		this.addChild(this._sptBg);
		this.addTouchLayer();
	},
	addTouchLayer:function(){
		//add Slogan
		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(50);
		var title = new cc.MenuItemFont("选择爱车，狂飙梦想");
		title.setEnabled(false);
		//循环缩放
		var fadeIn = cc.fadeIn(1);
		title.runAction(cc.sequence(fadeIn,fadeIn.reverse()).repeatForever());

		//add prompt1
		cc.MenuItemFont.setFontName("Arial");
		cc.MenuItemFont.setFontSize(30);
		var prompt = new cc.MenuItemFont("Are You Ready?");
		prompt.setEnabled(false);

		var backItem = new cc.MenuItemImage(
			"res/backtotopnormal.png",
			"res/backtotoppressed.png",
			function () {
				cc.log("Back is clicked!");
				cc.director.runScene(new cc.TransitionFade(1.2, new StartScene()));
			}, this);

		var nextItem = new cc.MenuItemImage(
			"res/backtotopnormal.png",
			"res/backtotoppressed.png",
			function () {
				cc.log("Next is clicked!");
				cc.director.runScene(new cc.TransitionFade(1.2, new SelectCarScene()));
			}, this);

		var menu = new cc.Menu(title,prompt,backItem,nextItem);
		menu.alignItemsInColumns(1,1,2);
		menu.x = GC.w_2;
		menu.y =200;
		this.addChild(menu, 1);

		title.y +=100;
		prompt.y+=50;
	}
});
var RaceAskScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new AskLayer();
		this.addChild(layer);
	}
});
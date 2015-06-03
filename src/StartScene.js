//游戏入口场景
/**
* Created by Daiyan on 15-06-03
*/
var StartLayer = cc.Layer.extend({
	bgSprite:null,
	scoreLabel:null,
	ctor:function () {
		this._super();
		this.addBackgroundLayer();
		this.addTouchLayer();
		this.playMusic();//播放背景音乐
	},
	addBackgroundLayer:function(){
    	this._sptBg = new cc.Sprite(res.BackGround_png);
    	this._sptBg.attr({
        	anchorX : 0.5,
        	anchorY : 0.5,
         	x: GC.w_2,
        	y: GC.h_2
    	});
    	this.addChild(this._sptBg);

            //add Game name
        this._sptLogo = new cc.Sprite("res/logo.png");
        this._sptLogo.attr({
             anchorX : 0.5,
             anchorY : 0,
             x: GC.w_2,
             y: GC.h_2
        });
        this.addChild(this._sptLogo);
    },
    addTouchLayer:function(){
    	//设置MenuItemFont字体以及大小
    	cc.MenuItemFont.setFontName("Arial");
    	cc.MenuItemFont.setFontSize(26);
    	var title = new cc.MenuItemFont("Racing Game");
    	title.setEnabled(false);
    	//add start menu
    	var startItem = new cc.MenuItemImage(
    		res.Start_N_png,
    		res.Start_S_png,
    		function () {
    			cc.log("Menu is clicked!");
//    			cc.director.replaceScene(cc.TransitionFade(1.2, new RaceAskScene()));
    			cc.director.runScene(new cc.TransitionFade(1.2, new RaceAskScene()));
    		}, this);

    	var menu = new cc.Menu(title,startItem);
    	menu.alignItemsInColumns(1, 1);
    	menu.x = GC.w_2;
    	menu.y = 200;
    	this.addChild(menu, 1);
    },
    playMusic : function(){
    //播放背景音乐，true代表循环无限次播放，false表示只播放一次。
		if (GC.SOUND_ON){
			if (cc.audioEngine.isMusicPlaying()){
				return;
			}
			cc.audioEngine.playMusic("res/music/mainMusic.mp3", false);
		}
	}
});

var StartScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new StartLayer();
		this.addChild(layer);
	}
});
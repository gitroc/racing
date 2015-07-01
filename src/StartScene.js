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
        this._sptLogo.scale = 0.5;//设置默认显示图片的大小
        this._sptLogo.attr({
             anchorX : 0.5,
             anchorY : 0,
             x: GC.w_2,
             y: GC.h_2
        });
        this.addChild(this._sptLogo);

        var actionTo = cc.scaleTo( 1,1.5);//(时间，倍数)
		var actionBy = cc.scaleBy(2, 0.5);
		var actionBy2 = cc.scaleBy(2, 0.25, 4.5);//(时间，X轴倍数，Y轴倍数)
		this._sptLogo.runAction(actionTo);
//		this._sptLogo.runAction(cc.sequence(actionBy2, cc.delayTime(0.25), actionBy2.reverse()));
//		this._sptLogo.runAction(cc.sequence(actionBy, cc.delayTime(0.25), actionBy.reverse()));
	},
    addTouchLayer:function(){
    	//设置MenuItemFont字体以及大小
    	cc.MenuItemFont.setFontName("Arial");
    	cc.MenuItemFont.setFontSize(30);
    	var title = new cc.MenuItemFont("Racing Game");
    	title.setEnabled(false);
    	var actionMove = cc.moveTo(4,cc.p(0,600));//moveTo or moveBy
		title.runAction(actionMove);


		var title2 = new cc.MenuItemFont("Racing Game22222");
    	title2.setEnabled(false);
    	var actionMove = cc.moveTo(4,cc.p(0,600));//moveTo or moveBy
		title2.runAction(actionMove);
    	//add start menu
    	var startItem = new cc.MenuItemImage(
    		res.Start_N_png,
    		res.Start_S_png,
    		function () {
    			cc.log("Menu is clicked!");
//    			cc.director.replaceScene(cc.TransitionFade(1.2, new RaceAskScene()));
    			cc.director.runScene(new cc.TransitionFade(1.2, new RaceAskScene()));
    		}, this);

    	var menu = new cc.Menu(title,title2,startItem);
    	menu.alignItemsInColumns(1, 1,1);
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
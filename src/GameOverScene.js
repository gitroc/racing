//游戏结束场景
/**
* Created by Daiyan on 15-06-24
*/
var OverLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.initSprite();
    },
    initSprite:function(){
        var startItem = new cc.MenuItemImage(
            res.Start_N_png,
            res.Start_S_png,
            function () {
                cc.log("Menu is clicked!");
//    			cc.director.replaceScene(cc.TransitionFade(1.2, new RaceAskScene()));
//                cc.director.runScene(new cc.TransitionFade(1.2, new RaceAskScene()));
                document.title = window.wxFriend.desc = "我拿了分，战胜了个汪，超越了％的好友！你能超过我吗";
                cc.log(window.wxFriend.desc);
            }, this);

        var menu = new cc.Menu(startItem);
//        menu.alignItemsInColumns(1, 1);
        menu.x = GC.w_2;
        menu.y = 200;
        this.addChild(menu, 1);
    }
});

var GameOverScene =  cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new OverLayer();
		this.addChild(layer);
	}
});
//游戏结束场景
/**
* Created by Daiyan on 15-06-24
*/
var OverLayer = cc.Layer.extend({
    time:null,
    ctor:function(){
        this._super();
        this.time = 6660;
        this.initSprite();
    },
    initSprite:function(){
        var title = cc.LabelTTF.create("GAME OVER","黑体",50);
        var lb = cc.LabelTTF.create("最终时间：", "黑体", 20, cc.size(225,105), cc.TEXT_ALIGNMENT_LEFT);
        var time = cc.LabelTTF.create("50"+this.time+"!!", "黑体", 50, cc.TEXT_ALIGNMENT_RIGHT);
        lb.strokeStyle = cc.color(0,0,0);
        title.setPosition(cc.p(GC.w_2,GC.h_2+100));
        lb.setPosition(cc.p(GC.w_2,GC.h_2));
        time.setPosition(cc.p(GC.w_2,GC.h_2-100));
        time.strokeStyle = cc.color(0,0,0);
        this.addChild(title);
        this.addChild(lb);
        this.addChild(time);

        var startItem = new cc.MenuItemImage(
            res.Start_N_png,
            res.Start_S_png,
            function () {
                cc.log("Menu is clicked!");
                document.title =  window.wxData.desc = "wxData喵星刷屏！喵获得";
                document.title = window.wxFriend.desc = "wxFriend我拿了分，战胜了个汪，超越了％的好友！你能超过我吗";

                cc.log(window.wxData.desc);
                cc.log(window.wxFriend.desc);
            }, this);
       startItem.attr({
            x:GC.w_2-200,
            y:GC.h_2-100
        });

       var againItem = new cc.MenuItemImage(
            res.Start_N_png,
            res.Start_S_png,
            function () {
                cc.log("EndMenu is clicked!");
                document.title = window.wxFriend.desc = "Again!!";
                cc.log(window.wxFriend.desc);
                cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
            }, this);
       againItem.attr({
            x:GC.w_2+200,
            y:GC.h_2-100
       });

        var menu = new cc.Menu(startItem,againItem);
        menu.alignItemsInColumns(1,1);
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
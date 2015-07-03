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
        //遮罩
        var endGuide = new cc.Sprite("res/image/end_guide_bg.png");
        endGuide.attr({
            x:GC.w_2,
            y:GC.h_2,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(endGuide);
        //记得晒成绩哦
        var sloganImage = new cc.Sprite("res/image/end_icon_slogan.png");
        sloganImage.attr({
            x:320,
            y:788,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(sloganImage);
        //本轮成绩
        var word1 = new cc.Sprite("res/image/end_icon_word1.png");
        word1.attr({
            x:215,
            y:605,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(word1);
        //时间
        var time = cc.LabelTTF.create(GC.Total_Time+"S", "黑体", 80, cc.TEXT_ALIGNMENT_RIGHT);
        time.setPosition(cc.p(420,605));
        time.setFontFillColor(cc.color(255,193,25));
//        time.strokeStyle = cc.color(232,115,20);
        this.addChild(time);

        //分割线
        var line = new cc.Sprite("res/image/end_icon_line.png");
        line.attr({
            x:320,
            y:495,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(line);
        //再战一轮
        var replayItem = new cc.MenuItemImage(
            res.Again_png,
            res.Again_png,
            function () {
                cc.log("EndMenu is clicked!");
                document.title = window.wxFriend.desc = "Again!!";
                GC.Game_Current = GC.Game_Loading;
                cc.log(window.wxFriend.desc);
                cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
            }, this);
        replayItem.attr({
            x:190,
            y:150,
            anchorX : 0.5,
            anchorY : 0.5
        });
       //分享
        var shareItem = new cc.MenuItemImage(
            res.Share_png,
            res.Share_png,
            function () {
                cc.log("Menu is clicked!");
                document.title =  window.wxData.desc = "wxData喵星刷屏！喵获得";
                document.title = window.wxFriend.desc = "wxFriend我拿了分，战胜了个汪，超越了％的好友！你能超过我吗";

                cc.log(window.wxData.desc);
                cc.log(window.wxFriend.desc);
            }, this);
        shareItem.attr({
            x:450,
            y:150,
            anchorX : 0.5,
            anchorY : 0.5
        });

        var menu = new cc.Menu(replayItem,shareItem);
        menu.x = 0;
        menu.y = 150;
        this.addChild(menu);
    }
});

var GameOverScene =  cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new OverLayer();
		this.addChild(layer);
	}
});
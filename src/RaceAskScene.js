//赛前询问场景
var AskLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		var size = cc.winSize;
		//add Slogan
		var sloganText = new ccui.Text("选择爱车，狂飙梦想", "AmericanTypewriter", 30);
		sloganText.setPosition(cc.p(size.width/2.0,size.height/2.0+150));
		this.addChild(sloganText);
		//add prompt1
		var promptText = new ccui.Text("Are You Ready?", "AmericanTypewriter", 30);
		promptText.setPosition(cc.p(size.width/2.0,size.height/2.0));
        this.addChild(promptText);

        //add TextButton
        var backButton = new ccui.Button();
		backButton.setTouchEnabled(true);
        backButton.loadTextures("res/backtotopnormal.png", "res/backtotoppressed.png", "");
        backButton.setTitleText("随便说说");
        backButton.x = size.width / 4.0;
        backButton.y = size.height / 4.0;
        backButton.addTouchEventListener(this.bTouchEvent ,this);
        this.addChild(backButton);

        var nextButton = new ccui.Button();
        nextButton.setTouchEnabled(true);
        nextButton.loadTextures("res/backtotopnormal.png", "res/backtotoppressed.png", "");
        nextButton.setTitleText("为梦狂飙");
        nextButton.x = size.width /4.0*3;
        nextButton.y = size.height / 4.0;
        nextButton.addTouchEventListener(this.touchEvent ,this);
        this.addChild(nextButton);
	},
	bTouchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
            cc.log("Button is clicked!");
            cc.director.replaceScene( cc.TransitionPageTurn(1, new StartScene(), false) );
        }
    },
	touchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
            cc.log("Button is clicked!");
            cc.director.replaceScene( cc.TransitionPageTurn(1, new SelectCarScene(), false) );
        }
    }
});
var RaceAskScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new AskLayer();
		this.addChild(layer);
	}
});
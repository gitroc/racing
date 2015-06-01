var LoadingLayer = cc.Layer.extend({
	_loadingBar:null,
	_count:0,
	ctor:function(){
		this._super();
        this._count = 0;
        var size = cc.winSize;
		this.createLoadingBar();
		this.scheduleUpdate();

		var nextButton = new ccui.Button();
                nextButton.setTouchEnabled(true);
                nextButton.loadTextures("res/backtotopnormal.png", "res/backtotoppressed.png", "");
                nextButton.setTitleText("停止");
                nextButton.x = size.width /4.0*3;
                nextButton.y = size.height / 4.0;
                nextButton.addTouchEventListener(this.touchEvent ,this);
                this.addChild(nextButton);
	},
	createLoadingBar:function(){
		var widgetSize = cc.winSize;
        var loadingBar = new ccui.LoadingBar();
         loadingBar.setName("LoadingBar");
         loadingBar.loadTexture("res/sliderProgress.png");
         loadingBar.setPercent(0);
         loadingBar.x = widgetSize.width / 2;
         loadingBar.y = widgetSize.height / 2 + loadingBar.height / 4;
         this.addChild(loadingBar);
         this._loadingBar = loadingBar;
	},
	update:function(dt){
		this._count++;
        if (this._count > 100) {
        	this._count = 0;
        }
        this._loadingBar && this._loadingBar.setPercent(this._count);
	},
	touchEvent: function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                cc.log("Stop clicked!");
                this.unscheduleUpdate();
            }
        }
});
var LoadingBarScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new LoadingLayer();
		this.addChild(layer);
	}
});
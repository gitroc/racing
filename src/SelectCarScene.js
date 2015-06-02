//赛车选择场景
var CarLayer = cc.Layer.extend({
    carBrands:[],
    carUrls:[],
    carIndex:null,
    carText:null,
    carSprite:null,
    carItem:null,
    ctor:function(){
        this._super();
        var size = cc.winSize;
        this.carIndex = 0;
        this.carBrands = ["兰博基尼1","兰博基尼2","兰博基尼3","兰博基尼4"];
        this.carUrls = ["car02.png","car04.png","car05.png","car08.jpg"];
        //Add Background
        this.bgSprite = new cc.Sprite(res.BackGround_png);
		this.bgSprite.attr({
			x: size.width / 2,
			y: size.height / 2,
		});
		this.addChild(this.bgSprite, 0);

        //Car Brand
        carText = new ccui.Text("兰博基尼", "AmericanTypewriter", 30);
        carText.setPosition(cc.p(size.width/2.0,size.height/8.0*7));
        this.addChild(carText);

//        //Left
//        var leftButton = new ccui.Button();
//        leftButton.setTouchEnabled(true);
//        leftButton.loadTextures("res/backtotopnormal.png", "res/backtotoppressed.png", "");
//        leftButton.setTitleText("LEFT");
//        leftButton.x = size.width/6.0;
//        leftButton.y = size.height / 2.0;
//        leftButton.addTouchEventListener(this.lTouchEvent ,this);
//        this.addChild(leftButton);
//
//         //Right
//        var rightButton = new ccui.Button();
//        rightButton.setTouchEnabled(true);
//        rightButton.loadTextures("res/backtotopnormal.png", "res/backtotoppressed.png", "");
//        rightButton.setTitleText("RIGHT");
//        rightButton.x = size.width/6.0*5;
//        rightButton.y = size.height / 2.0;
//        rightButton.addTouchEventListener(this.touchEvent ,this);
//        this.addChild(rightButton);

        //Car Pictures
//        carSprite = new cc.Sprite("res/car02.png");
//        carSprite.attr({
//            x: size.width / 2,
//            y: size.height / 2,
//        });
//        this.addChild(carSprite);

        var leftItem = new cc.MenuItemImage(
        	"res/backtotopnormal.png",
        	"res/backtotoppressed.png",
        	function () {
                cc.log("left"+this.carIndex);
                if(this.carIndex>0){
                    this.carIndex--;
                }else{
                    this.carIndex = this.carBrands.length - 1;
                }
                cc.log("left"+this.carIndex);
                this.selectCar(this.carIndex);
            }, this);

     	leftItem.attr({
        	x: size.width/6.0,
        	y:size.height / 2.0,
        	anchorX: 0.5,
        	anchorY: 0.5
     	});

		var rightItem = new cc.MenuItemImage(
        	"res/backtotopnormal.png",
        	"res/backtotoppressed.png",
        	function () {
                if(this.carIndex<this.carBrands.length-1){
                    this.carIndex++;
                }else{
                    this.carIndex = 0;
                }
                cc.log("right"+this.carIndex);
                this.selectCar(this.carIndex);
        	}, this);

     	rightItem.attr({
        	x: size.width/6.0*5,
        	y: size.height /2.0,
        	anchorX: 0.5,
        	anchorY: 0.5
     	});

     	carItem = new cc.MenuItemImage(
                	"res/car02.png",
                	"res/car02.png",
                	function () {
                        cc.log("car"+this.carIndex);
                        cc.director.replaceScene( cc.TransitionPageTurn(1, new LoadingBarScene(), false) );
                    }, this);

             	carItem.attr({
                	x: size.width / 2,
                	y:size.height / 2,
                	anchorX: 0.5,
                	anchorY: 0.5
             	});
    	var menu = new cc.Menu(leftItem,rightItem,carItem);
     	menu.x = 0;
    	menu.y = 0;
    	this.addChild(menu, 1);




        //Game Instruction
        var title = new ccui.Text("游戏规则", "AmericanTypewriter", 20);
        title.setPosition(cc.p(size.width/2.0,100));
        this.addChild(title);
        var instructText =new ccui.Text("1.在5分钟内行驶够10公里，且未闯红灯、未违反交通违规，2.每人每日可最多邀请5个朋友帮忙接力驾驶，奖励规则同上3.每人每日可最多驾驶3次，以最高成绩计入个人驾驶成绩单，邀请朋友进行驾驶后，将不能再次进行游戏", "AmericanTypewriter", 12);
        instructText.ignoreContentAdaptWithSize(false);
        instructText.setContentSize(cc.size(size.width, 150));
        instructText.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        instructText.setPosition(cc.p(size.width/2.0,10));
        this.addChild(instructText);
    },
    lTouchEvent:function(sender,type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
            cc.log("left"+this.carIndex);
                if(this.carIndex>0){
                    this.carIndex--;
                }else{

                    this.carIndex = this.carBrands.length - 1;
                }
                cc.log("left"+this.carIndex);
                this.selectCar(this.carIndex);
            break;
        }
    },
    touchEvent:function(sender,type){
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if(this.carIndex<this.carBrands.length-1){
                    this.carIndex++;
                }else{
                    this.carIndex = 0;
                }
                cc.log("right"+this.carIndex);
                this.selectCar(this.carIndex);
            break;
        }
    },
    selectCar:function(num){
        var carName = this.carBrands[num];
        var carUrl = this.carUrls[num];
        var newtexture = cc.textureCache.addImage("res/"+carUrl);
        carText.setString(carName);
//        carSprite.setTexture(newtexture);

        frame1 = new cc.SpriteFrame(newtexture,cc.rect(0,0,cc.winSize.width/2.0,cc.winSize.height/2.0));
        carItem.setNormalSpriteFrame(frame1);
    },
    getCarIndex:function(){
        return carIndex;
    }
});

var SelectCarScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new CarLayer();
		this.addChild(layer);
	}
});
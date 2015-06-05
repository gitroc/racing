//赛车选择场景
/**
* Created by Daiyan on 15-06-03
*/
var CarLayer = cc.Layer.extend({
    carBrands:[],
    carUrls:[],
    carIndex:null,
    carItem:null,
    car:null,
    _name:null,
    _intro:null,
    ctor:function(){
        this._super();
        var size = cc.winSize;
        this.carIndex = 0;
        this.carBrands = ["兰博基尼1","兰博基尼2","兰博基尼3","兰博基尼4"];
        this.carUrls = ["car02.png","car04.png","car05.png","car08.jpg"];
        //Add Background
        this.bgSprite = new cc.Sprite(res.BackGround_png);
		this.bgSprite.attr({
			x: GC.w_2,
			y: GC.h_2,
		});
		this.addChild(this.bgSprite, 0);

        //Car Brand
        this._name = new cc.LabelTTF("兰博基尼", "Arial", 30);
        this._name.attr({
            x: GC.w_2,
            y: GC.h/8.0*7,
            color : cc.color(255, 0, 0)
        });
        this.addChild(this._name, 1000);

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
        	x:  GC.w/6.0,
        	y: GC.h_2,
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
        	x:  GC.w/6.0*5,
        	y:  GC.h_2,
        	anchorX: 0.5,
        	anchorY: 0.5
     	});

     	this.car = new CarTypeSprite("res/car02.png");
     	this.car.attr({
     	    x: GC.w_2,
            y: GC.h_2,
            anchorX: 0.5,
            anchorY: 0.5
     	});
     	this.addChild(this.car);

    	var menu = new cc.Menu(leftItem,rightItem);
     	menu.x = 0;
    	menu.y = 0;
    	this.addChild(menu, 1);

        //Game Instruction
        this._intro = new cc.LabelTTF("游戏规则", "Arial", 20);
        this._intro.attr({
            x: GC.w_2,
            y: 150,
            color : cc.color(255, 0, 0)
        });
        this.addChild(this._intro, 1000);

        var instructText = new cc.LabelTTF("1.在5分钟内行驶够10公里，且未闯红灯、未违反交通违规\n"+
        "2.每人每日可最多邀请5个朋友帮忙接力驾驶，奖励规则同上\n"+
        "3.每人每日可最多驾驶3次，以最高成绩计入个人驾驶成绩单，\n"+
        "邀请朋友进行驾驶后，将不能再次进行游戏", "Arial", 15);
        instructText.attr({
            x: GC.w_2,
            y: 50,
            anchorX: 0.5,
            anchorY: 0.5
        });
        instructText.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.addChild(instructText, 1000);

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
        this._name.setString(carName);
        this.car.setTexture(newtexture);
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
/**
*Created by Daiyan on 15-06-18
*测试场景整体移动效果
*/
var RouteLayer = cc.Layer.extend({
    //添加三个精灵
    carSprite:null,
    bgSprite:null,
    oneSprite:null,
    twoSprite:null,
    ctor:function(){
        this._super();
        this.initSprites();
        this.addListener();
        var delay = cc.delayTime(0.25);
        var array = [
            cc.p(0, 0),
//            cc.p(80, 80),
//            cc.p(GC.w - 80, 80),
//            cc.p(GC.w - 80, GC.h - 80),
//            cc.p(80, GC.h - 80),
//            cc.p(80, 80),
            cc.p(GC.w_2, GC.h_2)
        ];
        cc.log("width:"+GC.w);
        cc.log("height:"+GC.h);
        var action1 = cc.catmullRomBy(3, array);
        var reverse1 = action1.reverse();
        var seq1 = cc.sequence(action1, delay, reverse1).repeatForever();
        this.oneSprite.runAction(seq1);


    var array2 = [
        cc.p(GC.w_2, 30),
//        cc.p(GC.w - 80, 30),
//        cc.p(GC.w - 80, GC.h - 80),
//        cc.p(GC.w_2, GC.h - 80),
        cc.p(GC.w_2, GC.h) ];

    var action2 = cc.catmullRomTo(3, array2);
    var reverse2 = action2.reverse();
    var seq2 = cc.sequence(action2, delay.clone(), reverse2).repeatForever();
    this.twoSprite.runAction(seq2);

//    this.bgSprite.runAction(cc.follow(this.twoSprite));
    },
    initSprites:function(){
        this.carSprite = new CarSprite("res/main/main_car_back.png");
        this.bgSprite = new cc.Sprite("res/main/main_bg_road1.png");
        this.oneSprite = new cc.Sprite("res/main/main_bg_object_stone1.png");
        this.twoSprite = new cc.Sprite("res/main/main_bg_object_tree1.png");

        this.carSprite.attr({
            x: GC.w_2,
            y: GC.h_2
        });

        this.bgSprite.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x: GC.w_2,
            y: GC.h_2
        });
        this.oneSprite.attr({
            x: 0,
            y: 70,
//            opacity: 128
        });

        this.twoSprite.attr({
            x: 0,
            y: 0,
//            opacity: 128
        });

        this.addChild(this.bgSprite);
        this.addChild(this.oneSprite);
        this.addChild(this.twoSprite);
        this.addChild(this.carSprite);
    },
    addListener:function() {
        if('touches' in cc.sys.capabilities) { //支持触摸事件
            this.touchListener = cc.eventManager.addListener(
                cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                    onTouchesEnded:function (touches, event) {
                        if (touches.length <= 0) {
                            return;
                        }
                        var target = event.getCurrentTarget();
                        target.moveCar(target, touches[0].getLocation());
//                        target.carCrash();
                    }
                }),
                this
            );
        } else if ('mouse' in cc.sys.capabilities) { //支持鼠标事件
            this.touchListener = cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    var target = event.getCurrentTarget();
                    target.moveCar(target, event.getLocation());
//                    target.carCrash(target);
                }
            }, this);
        }
    },
    moveCar:function(target, position){
        var centerX = 0;
        var carX = 0;

        var positionX = Math.round(position.x);

        if (positionX > currentBg - GC.Car_Range && positionX < currentBg + GC.Car_Range) { //避开汽车范围
             return;
        }

        cc.log("positionX:"+positionX+"||currentBg:"+currentBg+"||centerX:"+centerX);
         if(currentBg == GC.Car_Right_X){ //车在最右边
             if(positionX < currentBg){
                 carX = GC.w_2;
                 centerX = GC.w_2;
                 currentBg = GC.Car_Center_X; //向左移动
             } else {
                 return; //背景不动
             }
         }else if(currentBg == GC.Car_Center_X){ //车在中间
             if(positionX < GC.Car_Center_X){
                 carX = GC.w_2-100-90;
                 centerX = GC.w_2-100;
                 currentBg = GC.Car_Left_X; //向左移动
             } else {
                 carX = GC.w_2+100+90;
                 centerX = GC.w_2+100;
                 currentBg = GC.Car_Right_X; //向右移动
             }
         }else if(currentBg == GC.Car_Left_X){ //车在最左边
             if(positionX > currentBg){
                 carX = GC.w_2;
                 centerX = GC.w_2;
                 currentBg = GC.Car_Center_X;//向右移动
             } else {
                 return; //背景不动
             }
         }
        cc.log("centerX:"+centerX+"carX:"+carX);
          var actionMove = cc.moveTo(0.5,cc.p(carX,275));//moveTo or moveBy
          this.carSprite.runAction(actionMove);

          var scene = cc.moveTo(0.5,cc.p(-(centerX-320),0));
          this.runAction(scene);

     }
});
var currentBg = GC.Car_Center_X;
var RouteScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new RouteLayer();
		this.addChild(layer);
	}
});
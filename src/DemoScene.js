var DemoLayer = cc.Layer.extend({
    disappearAction:null,
    treeSprite:null,
    time : null,
    timeSprite : null,
    ctor:function(){
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.Road_plist);

        var demoSprite = new DemoSprite("res/bg.png");
        demoSprite.attr({
            x:GC.w_2,
            y:GC.h_2,
            anchorX : 0.5,
            anchorY : 0.5
        });

        this.addChild(demoSprite);


        this.timeSprite = new cc.Sprite("res/image/stone04.png");
        this.timeSprite.attr({
            x:GC.w_2,
            y:GC.h_2,
            anchorX : 0.5,
            anchorY : 0.5
        });
        this.addChild(this.timeSprite);
        time = 0;

        //添加倒计时
        this.schedule(this.timer,1,4,1);

//        this.treeSprite = new TreeSprite(res.Tree01_png);
//        this.treeSprite.attr({
//            x: GC.w_2,
//            y: GC.h_2,
//            anchorX: 0.5,
//            anchorY: 0.5,
//            scale : 0.5
//        });
//        this.addChild(this.treeSprite, Tree_SPRITE);

//        this.rote();
    },
    timer:function(){
        var actionTo = cc.scaleTo( 1,2);//(时间，倍数)
        var array = ["stone01.png","stone02.png","stone03.png","stone04.png"];
        this.timeSprite.scale=1;
        if(time<4){
            var pic = cc.textureCache.addImage("res/image/"+array[time]);
            this.timeSprite.setTexture(pic);
            if(time == 3){//只是数字进行缩放
                this.timeSprite.scale= 2;
            }else{
                this.timeSprite.runAction(actionTo);
            }
            time+=1;
        }else{
            time = 0;
            this.unschedule(this.timer);
            this.timeSprite.removeFromParent();
        }

    },
    //轨迹
    rote:function(){
//        var array=[cc.p(0,0),cc.p(100,100),cc.p(100,0),cc.p(0,100)];//增量
//        var action1 = cc.catmullRomBy(2, array);
//        var reverse1 = action1.reverse();
//        var seq1 = cc.sequence(action1, reverse1);
//        var repeat = seq1.repeatForever();
//        this.treeSprite.runAction(repeat);

//        cc.log("tan30度：5/18="+(5/18)+"pi/4"+Math.PI/4);
//        cc.log("tan45度："+Math.tan(Math.PI/4));
//        cc.log("tan90度："+Math.tan(Math.PI/2.0));
//        cc.log("tan180度："+Math.tan(180));
//
//        cc.log("atan45度："+Math.atan(45));

        this.angle(50,420,1136);

    },
    //角度，初始x,y
    angle:function(a,x,y){
        cc.log("初始化："+a+"--x:"+x+"--y:"+y);
       var number = a/180*Math.PI;
       //从左边出界  x=0,从右边出界 x=840

        //左边
       leftY = y-Math.tan(number)*x;
        //右边
       rightY = y-(840-x)*Math.tan(number);

       cc.log("leftY"+leftY+"--rightY"+rightY);
       cc.log("四舍五入："+Math.round(leftY));
    },

    time:function(){


        var action = cc.fadeOut(1);
    }

});
var DemoScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new DemoLayer();
		this.addChild(layer);
	}
});
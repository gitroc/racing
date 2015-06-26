//游戏背景精灵
/**
* Created by Daiyan on 15-06-16
*/
var currentBg = GC.Car_Center_X;
var NewBgSprite = cc.Sprite.extend({
    onceTime:null,
    allTime:null,
    bgs:null,
    speedListener:null,
    onEnter:function(){
        this._super();
        this.initSprite();
        this.onceTime =GC.Speed_Normal_Once;
        this.allTime = GC.Speed_Normal_All;
        this.schedule(this.update, this.allTime, cc.REPEAT_FOREVER, 0);
//        this.addListener();
        this.addSpeedListener();
    },
    onExit:function(){
        this.unschedule(this.update);
        this._super();
    },
    initSprite:function(){
        this.bgs =[];
        for (var i = 0; i < 4; i++) {
            var str = "main_bg_road" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.bgs.push(frame);
        }
    },
    //循环动画
    update:function(){
        if (this.getParent().gameStatus == GC.Game_Running) {
            var animation = new cc.Animation(this.bgs, this.onceTime);
            var action = new cc.Animate(animation);
            this.runAction(action);
        } else {
            this.stopAllActions();
            this.unschedule(this.update);
        }

    },
    //重启动画,碰到加（减）速道具速度改变
    updateAction:function(oTime,aTime,object){
        this.unschedule(this.update);
        this.onceTime = oTime;
        this.allTime=aTime;
        cc.log("Once:"+this.onceTime+"--All:"+this.allTime);
//        this.update(this.schedule);
        this.schedule(this.update, this.allTime, cc.REPEAT_FOREVER, 0);
        this.runAction(cc.Sequence.create( cc.DelayTime.create(3), cc.CallFunc.create(function () {
            object.origin();
        })));
    },
    origin:function(){
        this.unschedule(this.update);
        this.onceTime = GC.Speed_Normal_Once;
        this.schedule(this.update, GC.Speed_Normal_All, cc.REPEAT_FOREVER, 0);
    },
    addSpeedListener:function(){
        this.speedListener = cc.eventManager.addListener(
             cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: "speed_change",
                callback: function(event){
                    var target = event.getCurrentTarget();
                    target.updateSpeed(event.getUserData(),target);
                }
            }),
            this
        );
    },
    removeSpeedListener:function(){
         cc.eventManager.removeListener(this.speedListener);
    },
    updateSpeed:function(gameStatus,target){
        if (GC.Game_Slow_Down == gameStatus) {
            this.updateAction(GC.Speed_Low_Once,GC.Speed_Low_All,target);
        } else if (GC.Game_Speed_Up == gameStatus) {
            this.updateAction(GC.Speed_High_Once,GC.Speed_High_All,target);
        } else if (GC.Game_Over == gameStatus) {
            this.stopAllActions();
            this.unschedule(this.update);
        }else {
            this.updateAction(Speed_Normal_Once,Speed_Normal_All,target);
        }
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
//                            target.move(target, touches[0].getLocation());
                    }
                }),this);
        } else if ('mouse' in cc.sys.capabilities) { //支持鼠标事件
            this.touchListener = cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    var target = event.getCurrentTarget();
//                        target.move(target, event.getLocation());
                }
            }, this);
        }
        },

    move:function(target,position){
        var positionX = Math.round(position.x);
        var targetX = Math.round(target.x);

        var bgX = 0;
        var bgY = 0;

        //移动改变中心点x方向
        var centerX = 0;
//        cc.log("New--positionX"+positionX+"--currentBg"+currentBg+"--centerX"+centerX);
        if (positionX > currentBg - GC.Car_Range && positionX < currentBg + GC.Car_Range) { //避开汽车范围
            return;
        }

        if(currentBg == GC.Car_Right_X){ //车在最右边
            if(positionX < currentBg){
                centerX = GC.w_2;
                currentBg = GC.Car_Center_X; //向左移动
            } else {
                return; //背景不动
            }
        }else if(currentBg == GC.Car_Center_X){ //车在中间
            if(positionX < GC.Car_Center_X){
                centerX = GC.w_2+100;
                currentBg = GC.Car_Left_X; //向左移动
            } else {
                centerX = GC.w_2-100;
                currentBg = GC.Car_Right_X; //向右移动
            }
        }else if(currentBg == GC.Car_Left_X){ //车在最左边
            if(positionX > currentBg){
                centerX = GC.w_2;
                currentBg = GC.Car_Center_X;//向右移动
            } else {
                return; //背景不动
            }
        }

//        cc.log("End--positionX"+positionX+"--currentBg"+currentBg+"--centerX"+centerX);
        var actionMove = cc.moveTo(0.5,cc.p(centerX,GC.h_2));//moveTo or moveBy
        this.runAction(actionMove);
    }
});
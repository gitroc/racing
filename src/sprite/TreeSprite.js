/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 树精灵

 Author: roc from android team.

 Date: 2015-06-08

****************************************************************************/
var TreeSprite = cc.Sprite.extend({
    treeOffset:null,
    treeSprites:null,
    touchListener:null,
    onEnter:function () {
        this._super();
        this.initSprites();
        this.addListener();
        this.schedule(this.plantTree, 1, cc.REPEAT_FOREVER, 0);
    },

    onExit:function () {
        this.removeListener();
        this.unschedule(this.plantTree);
        this._super();
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
//                        target.updateOffset(target, touches[0].getLocation());
                    }
                }),
                this
            );
        } else if ('mouse' in cc.sys.capabilities) { //支持鼠标事件
            this.touchListener = cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    var target = event.getCurrentTarget();
//                    target.updateOffset(target, event.getLocation());
                }
            }, this);
        }
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.touchListener);
    },

    //初始化精灵图片
    initSprites:function () {
        this.treeSprites = [];

        for (var i = 0; i < GC.Tree_Png_Max; i++) {
            var str = "main_bg_object_tree" + (i + 1) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            this.treeSprites.push(frame);
        }
    },

    //获取树图片
    getTreeFrame:function () {
        var value = 10 * cc.random0To1().toFixed(1);
        if (value >= 0 && value < GC.Tree_Png_Max) {
            return this.treeSprites[value];
        } else {
            return this.treeSprites[0];
        }
    },

    getStoneOrg:function () {
        var value = cc.random0To1();

        var x = 0;
        var y = 0;

        if (value > 0.5) {
            x = GC.Tree_Show_Right_X + this.getParent().currentTreeOffset;
            y = GC.Tree_Show_Right_Y;
        } else {
            x = GC.Tree_Show_Left_X + this.getParent().currentTreeOffset;
            y = GC.Tree_Show_Left_Y;
        }

        return cc.p(x, y);
    },

    getTreeScale:function () {
        var value = cc.random0To1();
        var scale = 0;
        if (value < 0.5) {
            scale = GC.Tree_Show_Left_scale;
        } else {
            scale = GC.Tree_Show_Right_scale;
        }

        return scale;
    },

    plantTree:function () {
        if (this.getParent().gameStatus == GC.Game_Running) {
            var value = cc.random0To1();
            var sprite = new cc.Sprite(this.getTreeFrame());

            var x = this.getStoneOrg().x;
            var y = this.getStoneOrg().y;

            sprite.attr({
                x:x,
                y:y,
                anchorX: 0.5,
                anchorY: 0.5,
                scale:this.getTreeScale()
            });

            this.getParent().addChild(sprite, GC.Tree_Sprite);

            var track = [
                cc.p(x, y),
                this.getParent().getSpriteGoal(cc.p(x, y), this.getParent().currentTreeOffset),
            ];

            this.getParent().moveSprite(sprite, GC.Vertical_Move_Time, track, GC.Tree_Goal_scale);
        } else {
            this.stopAllActions();
            this.unschedule(this.plantTree);
        }
    },

    updateOffset:function (target, position) {
        var positionX = Math.round(position.x);
//        target.stopAllActions();
//        target.unschedule(target.plantTree);


        var currentBg = this.getParent().currentX;
//        cc.log("--offset!!--||"+this.getParent().currentTreeOffset+"positionX"+positionX+"-currentX:"+currentBg);
        //-----------------------------
        if (positionX > currentBg - GC.Car_Range && positionX < currentBg + GC.Car_Range) { //避开汽车范围
            return;
        }

        if(currentBg == GC.Car_Right_X){ //车在最右边
            if(positionX < currentBg){
                this.getParent().currentTreeOffset = 0;// 向左移动
                this.getParent().currentX = GC.Car_Center_X; //向左移动
            } else {
                return; //背景不动
            }
        }else if(currentBg == GC.Car_Center_X){ //车在中间
            if(positionX < GC.Car_Center_X){
                this.getParent().currentTreeOffset = 100;// 向左移动
                this.getParent().currentX = GC.Car_Left_X; //向左移动
            } else {
                this.getParent().currentTreeOffset = -100;// 向右移动
                this.getParent().currentX = GC.Car_Right_X; //向右移动
            }
        }else if(currentBg == GC.Car_Left_X){ //车在最左边
            if(positionX > currentBg){
                this.getParent().currentTreeOffset = 0;
                this.getParent().currentX = GC.Car_Center_X;//向右移动
            } else {
                return; //背景不动
            }
        }

//        if (this.getParent().currentTreeOffset == 0) { //在中间
//            if (positionX < GC.Car_Center_X) {
//                this.getParent().currentTreeOffset = 100;// 向左移动
//            } else {
//                this.getParent().currentTreeOffset = -100;// 向右移动
//            }
//        } else if (this.getParent().currentTreeOffset == 100) {
//            if (positionX > GC.Car_Left_X) {
//                this.getParent().currentTreeOffset = 0
//            }
//        } else if (this.getParent().currentTreeOffset == -100) {
//            if (positionX < GC.Car_Right_X) {
//                this.getParent().currentTreeOffset = 0
//            }
//        }

        var actionMove = cc.moveTo(GC.Horizontal_Move_Time, cc.p(this.getParent().currentTreeOffset,0));//moveTo or moveBy
        this.runAction(actionMove);


//        var tree = new TreeSprite();
//
//        this.getParent().addChild(tree, GC.Tree_Sprite);
//
//        target.removeFromParent();
    }
});

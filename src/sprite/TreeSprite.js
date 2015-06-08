/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 树精灵

 Author: roc from android team.

 Date: 2015-06-08

****************************************************************************/
var TreeSprite = cc.Sprite.extend({
    runListener:null,
    onEnter:function () {
        this._super();
        cc.log("TreeSprite onEnter");
        this.addListener();
    },

    onExit:function () {
        cc.log("TreeSprite onExit");
        this._super();
    },

    //添加碰撞事件监听
    addListener:function() {
        this.runListener = cc.eventManager.addListener(
             cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: "start_run",
                callback: function(event){
                    var target = event.getCurrentTarget();
                    target.moveTree(target);
                }
            }),
            this
        );
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.runListener);
    },

    moveTree:function (target) {
        var array = [
            cc.p(GC.Tree_X, GC.Tree_Y),
//            cc.p(0, GC.Tree_Y),
//            cc.p(GC.w_2, GC.h_2),
            cc.p(1330, -180),
        ];
        this.getParent().treeSprite.scale = 0.5;
//        var delay = cc.delayTime(0.25);
        var action1 = cc.catmullRomTo(3, array);
//        var reverse1 = action1.reverse();
//        var seq1 = cc.sequence(action1, cc.scaleTo(3, 2));
        var seq1 = cc.spawn(action1, cc.scaleTo(3, 2));
        target.runAction(seq1.repeatForever());
    }
});

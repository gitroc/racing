//开始按钮精灵
/**
* Created by Daiyan on 15-07-03
*/
var PlayButtonSprite = cc.Sprite.extend({
    bgs:null,
    onEnter:function(){
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.Loading_btn_plist);
        this.initSprite();

        this.schedule(this.update, 1, cc.REPEAT_FOREVER, 0);
        this.addListener();
    },

    initSprite:function(){
        this.bgs =[];
        var frameS = cc.spriteFrameCache.getSpriteFrame("loading_btn_on.png");
        var frameN = cc.spriteFrameCache.getSpriteFrame("loading_btn_off.png");
        this.bgs.push(frameS);
        this.bgs.push(frameN);
    },

    update:function(){
        var animation = new cc.Animation(this.bgs, 0.5);

        var action = new cc.Animate(animation);
        this.runAction(action);
    },

    onExit:function(){
        this._super();
        this.removeListener();
        this.unschedule(this.update);
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
                        cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
                    }
                }),
                this
            );
        } else if ('mouse' in cc.sys.capabilities) { //支持鼠标事件
            this.touchListener = cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    var target = event.getCurrentTarget();
                    cc.log("PlayMenu is clicked!");
                    cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
                }
            }, this);
        }
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.touchListener);
    }
});
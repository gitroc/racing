//开始按钮精灵
/**
* Created by Daiyan on 15-07-03
*/
var PlayButtonSprite = cc.Sprite.extend({
    bgs:null,
    speedListener:null,
    onEnter:function(){
        this._super();
        this.initSprite();
        this.schedule(this.update, 0.4, cc.REPEAT_FOREVER, 0);
    },

    initSprite:function(){
        this.bgs =[];
        var frameS = cc.spriteFrameCache.getSpriteFrame("loading_btn_on.png");
        var frameN = cc.spriteFrameCache.getSpriteFrame("loading_btn_off.png");
        this.bgs.push(frameS);
        this.bgs.push(frameN);
    },

    update:function(){
        var animation = new cc.Animation(this.bgs, 0.2);
        var action = new cc.Animate(animation);
        this.runAction(action);
    },

    onExit:function(){
        this._super();
        this.unschedule(this.update);
    }
});
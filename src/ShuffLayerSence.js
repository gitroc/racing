/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 游戏窗口场景

 Author: roc from android team.

 Date: 2015-06-03

 ****************************************************************************/

var ShuffLayer = cc.Layer.extend({
    _turnImg1:null,
    _turnImg2:null,
    init:function(){
        var bRef = false;
        if(this._super()){
            this.steupView(res.Ground_png);
            bRef = true;
        }
        return bRef;
    },
    steupView:function(fileName){
        this._turnImg1 = new cc.Sprite(fileName);
        this._turnImg1.setPosition(cc.p(this._turnImg1.getContentSize().width/2,this._turnImg1.getContentSize().height/2));
        this.addChild(this._turnImg1);

        this._turnImg2 = new cc.Sprite(fileName);
        this._turnImg2.setPosition(cc.p(this._turnImg2.getContentSize().width * 1.5,this._turnImg2.getContentSize().height /2));
        this.addChild(this._turnImg2);
    },
    onEnter:function(){
        this._super();
        this.scheduleUpdate();
    },
    update:function(dt){
        //如果第一张背景图的中点到达屏幕下方背景图高度的一半的时候(也就是第一张图片移除图片下面的时候)重新设置他的位置到屏幕上面，图片下边缘跟手机屏幕上边缘重合-1个像素
        if (this._turnImg1.getPositionX()<=-this._turnImg1.getContentSize().width/2) {
            this._turnImg1.setPosition(cc.p(this._turnImg1.getContentSize().width * 1.5 -1 , this._turnImg1.getContentSize().height/2));
        }else{//如果还没需要换位置就让他向下移动一个像素
            this._turnImg1.setPosition(cc.pAdd(this._turnImg1.getPosition(), cc.p(-1,0)));
        }
        //如果第二张背景图移出屏幕最下方则重新设置他的位置在屏幕的最上方
        if (this._turnImg2.getPositionX() <= -this._turnImg2.getContentSize().width / 2) {
            this._turnImg2.setPosition(cc.p(this._turnImg2.getContentSize().width * 1.5 -1, this._turnImg2.getContentSize().height / 2));
        }else{//向下移动
            this._turnImg2.setPosition(cc.pAdd(this._turnImg2.getPosition(), cc.p(-1,0)));
        }
    }
});

ShuffLayer.create = function () {
    var ly = new ShuffLayer();
    if(ly && ly.init()){
        return ly;
    }
    return null;
};

ShuffLayer.scene = function () {
    var sc = new cc.Scene();
    sc.addChild(ShuffLayer.create());
    return sc;
};
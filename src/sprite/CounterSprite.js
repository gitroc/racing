/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 计时精灵

 Author: roc from android team.

 Date: 2015-06-27

 ****************************************************************************/
var TimerSprite = cc.Sprite.extend({
    timerLabel:null,
    timerX:100,
    timerY:GC.h - 40,
    onEnter:function () {
        this._super();
        this.initTimer();
    },

    onExit:function () {

        this._super();
    },

    //计时精灵刷新
    update:function (dt) {
        if (GC.Game_Current == GC.Game_Running) {
            GC.Total_Time += dt;
            this.timerLabel.attr({
                x:this.timerX,
                y:this.timerY
            });
            this.timerLabel.setString("Time : " + GC.Total_Time.toFixed(2));
        }
    },

    initTimer:function () {
        this.timerLabel = new cc.LabelTTF("Time : " + GC.Total_Time.toFixed(2), "Tahoma", 32);
        this.timerLabel.attr({
            x:this.timerX,
            y:this.timerY
        });
        this.timerLabel.setFontFillColor(cc.color(0,0,255));
        this.addChild(this.timerLabel, GC.Timer_Sprite);

        this.scheduleUpdate();
    }
});
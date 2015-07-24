/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 计时精灵

 Author: roc from android team.

 Date: 2015-06-27

 ****************************************************************************/
var TimerSprite = cc.Sprite.extend({
    timerLabel:null,
    timerX:320,
    timerY:GC.h - 40,
    onEnter:function () {
        this._super();
        this.initTimer();
    },

    onExit:function () {
        this.unscheduleUpdate();
        this._super();
    },

    //计时精灵刷新
    update:function (dt) {
        if (GC.Game_Current == GC.Game_Running) {
            GC.Total_Time += dt;

            if (GC.Total_Time > GC.Pass_All_Time) {
                GC.Game_Current = GC.Game_Complete;
                this.unscheduleUpdate();
            } else {
                this.timerLabel.attr({
                    x:this.timerX+20,
                    y:this.timerY
                });
                this.timerLabel.setString(GC.Total_Time.toFixed(2)+"s");
            }
        }
    },

    initTimer:function () {
        var timerSprite = new cc.Sprite(res.Timer_png);
        timerSprite.attr({
            x:this.timerX,
            y:this.timerY
        });
        this.addChild(timerSprite, 0);

        this.timerLabel = new cc.LabelTTF(GC.Total_Time.toFixed(2)+"s", "Tahoma", 24);
        this.timerLabel.attr({
            x:this.timerX+20,
            y:this.timerY
        });
        this.timerLabel.setFontFillColor(cc.color(232,115,20));
        this.addChild(this.timerLabel, GC.Timer_Sprite);

        this.scheduleUpdate();
    }
});
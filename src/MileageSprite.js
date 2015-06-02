/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 里程精灵

 Author: roc from android team.

 Date: 2015-05-27

 ****************************************************************************/

var MileageSprite = cc.Sprite.extend({
    onEnter:function () {
//        cc.log("MileageSprite onEnter");
        this._super();

        this.onUpdate();
    },

    onExit:function () {
//        cc.log("MileageSprite onExit");
        this._super();
    },

    //精灵刷新
    onUpdate:function () {
        if (this.getParent().time == 300) {
            this.getParent().kilometer = 0;
            return;
        }

        this.getParent().time += 1;
        this.getParent().kilometer = this.getParent().speed * this.getParent().time;
        this.getParent().mileageLabel.setString(this.getParent().kilometer + " km");
    }
});
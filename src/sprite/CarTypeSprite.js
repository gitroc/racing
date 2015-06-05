/**
* Created by Daiyan on 15-06-03
*选择车型精灵
*/
var CarTypeSprite = cc.Sprite.extend({
    onEnter:function () {
        cc.log("onEnter");
        this._super();

        this.addTouchEventListener();
    },
    onExit:function () {
        cc.log("onExit");
        this._super();
    },
   addTouchEventListener:function(){
   		this.touchListener = cc.EventListener.create({
   			event: cc.EventListener.TOUCH_ONE_BY_ONE,
   			swallowTouches: true,
   			onTouchBegan: function (touch, event) {
   				var pos = touch.getLocation();
   				var target = event.getCurrentTarget();
   				if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {
   //					target.removeTouchEventListener();
   					cc.log("响应精灵点中pos.x="+pos.x+",pos.y="+pos.y);
					cc.director.runScene(new cc.TransitionFade(1.2, new LoadingBarScene()));
   					return true;
   				}
   				return false;
   			}
   		});

   		cc.eventManager.addListener(this.touchListener,this);
   	},
});
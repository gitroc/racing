/****************************************************************************
 Copyright (c) 2008-2010 Auto Games

 http://www.autogames.com

 前景层

 Author: roc from android team.

 Date: 2015-07-22

 ****************************************************************************/
var ForeLayer = cc.Layer.extend({

    //遮罩精灵
    maskLayerSprite1:null,
    maskLayerSprite2:null,

    //倒计时
    readyGoSprite:null,

    //游戏计时
    timerSprite:null,

    //游戏结束
    sloganSprite:null,
    word1Sprite:null,
    word2Sprite:null,
    counterSprite:null,
    lineSprite:null,
    menuSprite:null,

    statusChangeListener:null,
    touchListener:null,

    replayItem:null,
    shareItem:null,

    explain:null,
    arrow:null,

    ctor:function () {
        this._super();
        this.scheduleUpdate();
        return true;
    },

    update:function(dt) {
        this.showProLayer();
    },

    onEnter:function () {
        this._super();
        this.addListener();
        this.addTouchListener();
    },

    onExit:function () {
        this.removeListener();
        this.removeTouchListener();
        this._super();
    },

    addListener:function() {
        this.statusChangeListener = cc.eventManager.addListener(
             cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: "status_change",
                callback: function(event){
                    var target = event.getCurrentTarget();
                    target.showProLayer(event.getUserData());
                }
            }),
            this
        );
    },

    removeListener:function() {
        cc.eventManager.removeListener(this.statusChangeListener);
    },

    addTouchListener:function() {
        if('touches' in cc.sys.capabilities) { //支持触摸事件
            this.touchListener = cc.eventManager.addListener(
                cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                    onTouchesEnded:function (touches, event) {
                        if (touches.length <= 0) {
                            return;
                        }
                        var target = event.getCurrentTarget();
                        target.removeShareMark();
                    }
                }),
                this
            );
        } else if ('mouse' in cc.sys.capabilities) { //支持鼠标事件
            this.touchListener = cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseUp: function (event) {
                    var target = event.getCurrentTarget();
                    target.removeShareMark();
                }
            }, this);
        }
    },

    removeTouchListener:function() {
        cc.eventManager.removeListener(this.touchListener);
    },

    showProLayer:function () {
        switch (GC.Game_Current) {
            case GC.Game_Loading:
                this.showLoading();
            break;

            case GC.Game_Running:
                this.removeLoading();
                this.showRunning();
            break;

            case GC.Game_Over:
                this.unscheduleUpdate();
                this.showGameOver();
            break;

            default:
            break;
        }
    },

    showLoading:function () {
        this.readyGoMusic();

        this.addMaskLayer();
        this.addReadyGo();
    },

    removeLoading:function () {
        this.removeMaskLayer();
        this.removeReadyGo();
    },

    showRunning:function () {
        this.addTimer();
    },

    showGameOver:function () {
        this.gameOverMusic();

        this.gameOver();
    },

    //初始化计时精灵
    addTimer:function () {
        if (this.timerSprite == null) {
            this.timerSprite = new TimerSprite();
            this.addChild(this.timerSprite, GC.Timer_Sprite);
        }
    },

    removeTimer:function () {
        if (this.timerSprite != null) {
            this.timerSprite.removeFromParent();
            this.timerSprite = null;
        }
    },

    //添加ReadyGo
    addReadyGo:function () {
        GC.Game_Current = GC.Game_ReadyGo;
        if (this.readyGoSprite == null) {
            this.readyGoSprite = new ReadyGoSprite();
            this.readyGoSprite.attr({
                 x:GC.w_2,
                 y:GC.h_2,
                 anchorX : 0.5,
                 anchorY : 0.5
            });
            this.addChild(this.readyGoSprite, GC.Loading_Timer);
        }
    },

    //删除ReadyGo
    removeReadyGo:function () {
        if (this.readyGoSprite != null) {
            this.readyGoSprite.removeFromParent();
            this.readyGoSprite = null;
        }
    },

    //游戏结束
    gameOver:function () {
        this.addMaskLayer();
        this.addSlogan();
        if(GC.Total_Time >= GC.Pass_All_Time){
            //通关显示
            this.addWord2();
            this.addShareSuccess();
        }else{
            this.addWord();
            this.addCounter(GC.Total_Time.toFixed(2));
            this.addReplay();
            this.addShare()
            this.addMenu(this.replayItem, this.shareItem);
        }
        this.addLine();
    },

    //分享
    addShareSuccess:function(){
        var shareItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("end_btn_share.png"),
            cc.spriteFrameCache.getSpriteFrame("end_btn_share_sel.png"),
            function () {
                if (GC.Game_Current == GC.Game_Over) {
                    GC.Game_Current = GC.Game_Share_Mark;
                    document.title = window.wxData.desc = "我在超耐力赛车游戏中通关了，来挑战我吧！";
                    document.title = window.wxFriend.desc = "我在超耐力赛车游戏中通关了，来挑战我吧！";
                    window.shareMessage();
                    this.addShareMark();
                }
            }, this);

        shareItem.attr({
            x:GC.w_2,
            y:150,
            anchorX : 0.5,
            anchorY : 0.5
        });

        if (this.menuSprite == null) {
            this.menuSprite = new cc.Menu(shareItem);
            this.menuSprite.x = 0;
            this.menuSprite.y = 150;
            this.addChild(this.menuSprite, GC.Menu_Sprite);
        }
    },

    //删除GameOver
    removeGameOver:function () {
        GC.Game_Current = GC.Game_Loading;
        GC.Total_Time = 0;

        this.removeTimer();
        this.removeMaskLayer();
        this.removeSlogan();
        this.removeWord();
        this.removeWord2();
        this.removeCounter();
        this.removeLine();
        this.removeMenu();

        this.unscheduleUpdate();
    },

    removeShareMark:function () {
        if (GC.Game_Current == GC.Game_Share) {
            this.removeExplain();
            this.removeArrow();
            this.removeMaskLayer2();

            GC.Game_Current = GC.Game_Over;
        }
    },

    //添加遮罩层
    addMaskLayer:function () {
        if (this.maskLayerSprite1 == null) {
            this.maskLayerSprite1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("mask_layer.png"));
            this.maskLayerSprite1.attr ({
                x: GC.w_2,
                y: GC.h_2,
                anchorX: 0.5,
                anchorY: 0.5
            });

            this.addChild(this.maskLayerSprite1, GC.Mask_Layer_Main);
        }
    },

    //删除遮罩层
    removeMaskLayer:function () {
        if (this.maskLayerSprite1 != null) {
            this.maskLayerSprite1.removeFromParent();
            this.maskLayerSprite1 = null;
        }
    },

    //添加遮罩层2
    addMaskLayer2:function () {
        if (this.maskLayerSprite2 == null) {
            this.maskLayerSprite2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("mask_layer.png"));
            this.maskLayerSprite2.attr ({
                x: GC.w_2,
                y: GC.h_2,
                anchorX: 0.5,
                anchorY: 0.5
            });

            this.addChild(this.maskLayerSprite2, GC.Mask_Layer_Share);
        }
    },

    //删除遮罩层2
    removeMaskLayer2:function () {
        if (this.maskLayerSprite2 != null) {
            this.maskLayerSprite2.removeFromParent();
            this.maskLayerSprite2 = null;
        }
    },

    //记得晒成绩哦
    addSlogan:function () {
        if (this.sloganSprite == null) {
            this.sloganSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("end_icon_slogan.png"));
            this.sloganSprite.attr({
                x:320,
                y:788,
                anchorX : 0.5,
                anchorY : 0.5
            });
            this.addChild(this.sloganSprite, GC.Slogan_Sprite);
        }
    },

    removeSlogan:function () {
        if (this.sloganSprite != null) {
            this.sloganSprite.removeFromParent();
            this.sloganSprite = null;
        }
    },

    //本轮成绩
    addWord:function () {
        if (this.word1Sprite == null) {
            this.word1Sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("end_icon_word1.png"));
            this.word1Sprite.attr({
                x:215,
                y:605,
                anchorX : 0.5,
                anchorY : 0.5
            });
            this.addChild(this.word1Sprite, GC.Word1_Sprite);
        }
    },

    removeWord:function () {
        if (this.word1Sprite != null) {
            this.word1Sprite.removeFromParent();
            this.word1Sprite = null;
        }
    },

    //恭喜通关
    addWord2:function () {
        if (this.word2Sprite == null) {
            this.word2Sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("end_icon_word2.png"));
            this.word2Sprite.attr({
                x:GC.w_2,
                y:605,
                anchorX : 0.5,
                anchorY : 0.5
            });
            this.addChild(this.word2Sprite, GC.Word2_Sprite);
        }
    },

    removeWord2:function () {
        if (this.word2Sprite != null) {
             this.word2Sprite.removeFromParent();
             this.word2Sprite = null;
        }
    },

    //时间
    addCounter:function (counter) {
        if (this.counterSprite == null) {
            this.counterSprite = cc.LabelTTF.create(counter+"s", "黑体", 80, cc.TEXT_ALIGNMENT_RIGHT);
            this.counterSprite.setPosition(cc.p(420,605));
            this.counterSprite.setFontFillColor(cc.color(255,193,25));
            this.addChild(this.counterSprite, GC.TotalTime_Sprite);
        }
    },

    removeCounter:function () {
        if (this.counterSprite != null) {
            this.counterSprite.removeFromParent();
            this.counterSprite = null;
        }
    },

    //分割线
    addLine:function () {
        if (this.lineSprite == null) {
            this.lineSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("end_icon_line.png"));
            this.lineSprite.attr({
                x:320,
                y:495,
                anchorX : 0.5,
                anchorY : 0.5
            });
            this.addChild(this.lineSprite, GC.Line_Sprite);
        }
    },

    removeLine:function () {
        if (this.lineSprite != null) {
            this.lineSprite.removeFromParent();
            this.lineSprite = null;
        }
    },

    //再战一轮
    addReplay:function () {
        this.replayItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("end_btn_replay.png"),
            cc.spriteFrameCache.getSpriteFrame("end_btn_replay_sel.png"),
            function () {
                if (GC.Game_Current == GC.Game_Over) {
                    this.removeGameOver();
                    cc.director.runScene(new cc.TransitionFade(1.2, new PlayScene()));
                }
            }, this);
        this.replayItem.attr({
            x:190,
            y:150,
            anchorX : 0.5,
            anchorY : 0.5
        });
    },

    //分享
    addShare:function () {
        this.shareItem = new cc.MenuItemImage(
            cc.spriteFrameCache.getSpriteFrame("end_btn_share.png"),
            cc.spriteFrameCache.getSpriteFrame("end_btn_share_sel.png"),
            function () {
                if (GC.Game_Current == GC.Game_Over) {
                    GC.Game_Current = GC.Game_Share_Mark;
                    document.title = window.wxData.desc = "我在超耐力赛车游戏中跑了" +  GC.Total_Time.toFixed(2) + "秒，快来试试吧";
                    document.title = window.wxFriend.desc = "我在超耐力赛车游戏中跑了" +  GC.Total_Time.toFixed(2) + "秒，快来试试吧";
                    window.shareMessage();
                    this.addShareMark();
                }
            }, this);

        this.shareItem.attr({
            x:450,
            y:150,
            anchorX : 0.5,
            anchorY : 0.5
        });
    },

    //菜单
    addMenu:function (menu1, menu2) {
        this.menuSprite = new cc.Menu(menu1, menu2);
        this.menuSprite.x = 0;
        this.menuSprite.y = 150;
        this.addChild(this.menuSprite, GC.Menu_Sprite);
    },

    removeMenu:function () {
        if (this.menuSprite != null) {
            this.menuSprite.removeChild(this.replayItem, true);
            this.menuSprite.removeChild(this.shareItem, true);
            this.menuSprite.removeFromParent();
            this.menuSprite = null;
        }
    },

    //添加分享标志
    addShareMark:function () {
        this.addMaskLayer2();
        this.addExplain();
        this.addArrow();
    },

    //分项说明
    addExplain:function () {
        if (this.explain == null) {
            this.explain = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("end_icon_word.png"));
            this.explain.attr({
                x:320,
                y:970,
                anchorX : 0.5,
                anchorY : 0.5
            });
            this.addChild(this.explain, GC.Share_Sprite);

            this.startAction(this.explain);
        }
    },

    //删除分享说明
    removeExplain:function () {
        if (this.explain != null) {
            this.explain.removeFromParent();
            this.explain = null;
        }
    },

    //添加箭头
    addArrow:function () {
        if (this.arrow == null) {
            this.arrow = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("end_icon_arrow.png"));
            this.arrow.attr({
                x:557,
                y:1050,
                anchorX : 0.5,
                anchorY : 0.5
            });
            this.addChild(this.arrow, GC.Share_Sprite);
        }
    },

    //删除箭头
    removeArrow:function () {
        if (this.arrow != null) {
            this.arrow.removeFromParent();
            this.arrow = null;
        }
    },

    //分享说明动作
    startAction:function (sprite) {
        var action;

        action = cc.spawn(action = cc.blink(1, 2), cc.scaleBy(1, 1.1));

        var action_back = action.reverse();

        sprite.runAction(cc.sequence(
                action,
                action_back,
                cc.callFunc(function () {
                    GC.Game_Current = GC.Game_Share;
                })
            )
        );
    },

    //播放背景音乐，true代表循环无限次播放，false表示只播放一次。
    playBgMusic:function(){
        if (GC.SOUND_ON){
            cc.audioEngine.playMusic(res.Game_Music, true);
        }
    },

    //停止背景音乐
    stopBgMusic:function () {
        if (cc.audioEngine.isMusicPlaying()){
            cc.audioEngine.stopMusic();
        }
    },

    //倒计时音乐
    readyGoMusic:function () {
        if (GC.SOUND_ON){
            cc.audioEngine.playMusic(res.Ready_Go, false);
        }
    },

    gameOverMusic:function () {
        if (GC.SOUND_ON){
            this.stopBgMusic();
            if(GC.Total_Time >=  GC.Pass_All_Time){
                cc.audioEngine.playMusic(res.Game_All, false);
            }else{
                cc.audioEngine.playMusic(res.Game_Over, false);
            }
        }
    }
});
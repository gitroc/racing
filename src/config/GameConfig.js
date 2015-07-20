/**
* Created by Daiyan on 15-06-03
*/
var GC = GC || {};

GC.winSize = cc.size(640, 1136);

GC.h = GC.winSize.height;

GC.w = GC.winSize.width;

GC.w_2 = GC.winSize.width / 2 ;

GC.h_2 = GC.winSize.height / 2;

GC.SOUND_ON = true;

//精灵添加到场景的次序
GC.BackGround_Sprite = 0;
GC.Road_Sprite = 1;
GC.Barrier_Sprite = 2;
GC.Car_Sprite = 3;
GC.Stone_Sprite = 4;
GC.Tree_Sprite = 5;
GC.Timer_Sprite = 6;
GC.Mask_Layer_Main = 7;
GC.Loading_Timer = 8;
GC.Slogan_Sprite = 9;
GC.Word1_Sprite = 10;
GC.Word2_Sprite = 11;
GC.TotalTime_Sprite = 12;
GC.Line_Sprite = 13;
GC.Menu_Sprite = 14;
GC.Mask_Layer_Share = 15;
GC.Share_Sprite = 16;


//路的图片的最大数
GC.Road_Png_Max = 4;

//树的图片最大个数
GC.Tree_Png_Max = 5;

//石头图片最大个数
GC.Stone_Png_Max = 4;

GC.Barrier_png_Max = 6;

//树的移动角度
GC.Angle = 75;

//水平移动时间
GC.Horizontal_Move_Time = 0.1;
//竖直移动时间
GC.Vertical_Move_Time = 3;

//截最左边背景截图
GC.Bg_Left_Offset_X = 100;

//截最中间背景截图
GC.Bg_Center_Offset_X = 0;

//截最右边背景截图
GC.Bg_Right_Offset_X = -100;

//汽车的范围
GC.Car_Range = 120;

//汽车在中间位置
GC.Car_Center_X = 320;
GC.Car_Center_Y = 275;

//汽车在左边位置
GC.Car_Left_X = 40;
GC.Car_Left_Y = 275;

//汽车在右边位置
GC.Car_Right_X = 600;
GC.Car_Right_Y = 275;

//游戏内部timer间隔
GC.Game_Timer_Interval = 0.05;

//随机出现左边树位置
GC.Tree_Show_Left_X = 150;
GC.Tree_Show_Left_Y = 700;

//随机出现右边树位置
GC.Tree_Show_Right_X = 470;
GC.Tree_Show_Right_Y = 700;

//随机出现左右边树初始化缩放大小
GC.Tree_Show_Left_scale = 0.1;
GC.Tree_Show_Right_scale = 0.2;

//随机出现树的最终缩放大小
GC.Tree_Goal_scale = 2;


//五棵树的时间轴
GC.Tree_Time_Line = [
    4, 2, 4, 3, 1
];

//第一棵树初始化缩放大小及位置
GC.Tree_01_Scale = 0.2;
GC.Tree_01_X = 160;
GC.Tree_01_Y = 700;

//第二棵树初始化缩放大小及位置
GC.Tree_02_Scale = 0.8;
GC.Tree_02_X = 25;
GC.Tree_02_Y = 625;

//第三棵树初始化缩放大小及位置
GC.Tree_03_Scale = 0.3;
GC.Tree_03_X = 460;
GC.Tree_03_Y = 700;

//第四棵树初始化缩放大小及位置
GC.Tree_04_Scale = 0.6;
GC.Tree_04_X = 550;
GC.Tree_04_Y = 710;

//第五棵树初始化缩放大小及位置
GC.Tree_05_Scale = 0.5;
GC.Tree_05_X = 600;
GC.Tree_05_Y = 580;

GC.treeOrg = [
    cc.p(GC.Tree_01_X, GC.Tree_01_Y),
    cc.p(GC.Tree_02_X, GC.Tree_02_Y),
    cc.p(GC.Tree_03_X, GC.Tree_03_Y),
    cc.p(GC.Tree_04_X, GC.Tree_04_Y),
    cc.p(GC.Tree_05_X, GC.Tree_05_Y)
];

GC.treeScale = [
    GC.Tree_01_Scale,
    GC.Tree_02_Scale,
    GC.Tree_03_Scale,
    GC.Tree_04_Scale,
    GC.Tree_05_Scale
];

//随机出现左边石头位置
GC.Stone_Show_Left_X = 190;
GC.Stone_Show_Left_Y = 685;

//随机出现右边石头位置
GC.Stone_Show_Right_X = 460;
GC.Stone_Show_Right_Y = 680;

//随机出现左右边石头初始化缩放大小
GC.Stone_Show_Left_scale = 0.1;
GC.Stone_Show_Right_scale = 0.2;

//随机出现石头的最终缩放大小
GC.Stone_Goal_scale = 2;

GC.Stone_Time_Line = [
    5, 3, 1, 2
];

//第一棵石头初始化缩放大小及位置
GC.Stone_01_Scale = 0.5;
GC.Stone_01_X = 190;
GC.Stone_01_Y = 685;

//第二棵石头初始化缩放大小及位置
GC.Stone_02_Scale = 1;
GC.Stone_02_X = 115;
GC.Stone_02_Y = 655;

//第三棵石头初始化缩放大小及位置
GC.Stone_03_Scale = 1;
GC.Stone_03_X = 5;
GC.Stone_03_Y = 485;

//第四棵石头初始化缩放大小及位置
GC.Stone_04_Scale = 1;
GC.Stone_04_X = 550;
GC.Stone_04_Y = 630;

GC.stoneOrg = [
    cc.p(GC.Stone_01_X, GC.Stone_01_Y),
    cc.p(GC.Stone_02_X, GC.Stone_02_Y),
    cc.p(GC.Stone_03_X, GC.Stone_03_Y),
    cc.p(GC.Stone_04_X, GC.Stone_04_Y)
];

GC.stoneScale = [
    GC.Stone_01_Scale,
    GC.Stone_02_Scale,
    GC.Stone_03_Scale,
    GC.Stone_04_Scale
];

//障碍物类型
GC.Barrier_Type1 = 1;
GC.Barrier_Type2 = 2;
GC.Barrier_Type3 = 3;
GC.Barrier_Type4 = 4;
GC.Barrier_Type5 = 5; // 减速
GC.Barrier_Type6 = 6; // 加速

//障碍物速度 xxx/s 像素每秒
GC.Barrier_Speed = 300;

//障碍物初始缩放大小及位置坐标
GC.Barrier_Org_Scale = [
    0.1, 0.1, 0.1
];

GC.Barrier_Org_Position = [
    cc.p(250, 700),
    cc.p(320, 700),
    cc.p(390, 700),
];

//障碍物结束缩放大小及位置坐标
GC.Barrier_Goal_Scale = [
    2.2, 2.2, 2.2
];

GC.Barrier_Goal_Position = [
    cc.p(-180, -150),
    cc.p( 320, -150),
    cc.p( 820, -150),
];

//碰撞类型
GC.Crash_Unknown   = 0; //未知
GC.Crash_Shut_Down = 1; //停车
GC.Crash_Only_Hit  = 2; //碰撞
GC.Crash_Speed_Up  = 3; //加速
GC.Crash_Slow_Down = 4; //减速

//游戏主界面状态机
GC.Game_Loading   = 1;
GC.Game_ReadyGo   = 2;
GC.Game_Start     = 3;
GC.Game_Running   = 4;
GC.Game_Speed_Up  = 5;
GC.Game_Slow_Down = 6;
GC.Game_Over      = 7;
GC.Game_Pause     = 8;
GC.Game_Share     = 9;

//游戏难度
GC.Game_Level_Easy   = 1;
GC.Game_Level_Normal = 2;
GC.Game_Level_Hard   = 3;

//游戏难度调整时间 秒
GC.Game_Easy_To_Normal = 20;
GC.Game_Normal_To_Hard = 40;

GC.Total_Time = 0;//显示总时间
GC.Speed_Normal_Once = 0.1;
GC.Speed_Normal_All = 0.4;
GC.Speed_High_Once = 0.05;
GC.Speed_High_All = 0.2;
GC.Speed_Low_Once = 0.15;
GC.Speed_Low_All = 0.6;

//ready go 图片个数
GC.Loading_Guide_Max = 6;



//当前游戏状态 可修改
GC.Game_Current   = GC.Game_Loading;

//碰撞音效播放完成
GC.Music_Playing = true;

//通关时间
GC.Pass_All_Time = 300;





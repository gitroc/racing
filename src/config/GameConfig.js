/**
* Created by Daiyan on 15-06-03
*/
var GC = GC || {};

GC.winSize = cc.size(640, 1136);

GC.h = GC.winSize.height;

GC.w = GC.winSize.width;

GC.w_2 = GC.winSize.width / 2 ;

GC.h_2 = GC.winSize.height / 2;

GC.SOUND_ON = false;

//精灵添加到场景的次序
GC.BackGround_Sprite = 0;
GC.Road_Sprite = 1;
GC.Barrier_Sprite = 2;
GC.Car_Sprite = 2;
GC.Stone_Sprite = 3;
GC.Tree_Sprite = 4;

//路的图片的最大数
GC.Road_Png_Max = 4;

//树的图片最大个数
GC.Tree_Png_Max = 5;

//石头图片最大个数
GC.Stone_Png_Max = 4;

GC.Barrier_png_Max = 6;

//树的移动角度
GC.Angle = 60;

//水平移动时间
GC.Horizontal_Move_Time = 0.5;
//竖直移动时间
GC.Vertical_Move_Time = 5;

//截最左边背景截图
GC.Bg_Left_X = 0;
GC.Bg_Left_Y = 0;

//截最中间背景截图
GC.Bg_Center_X = 100;
GC.Bg_Center_Y = 0;

//截最右边背景截图
GC.Bg_Right_X = 200;
GC.Bg_Right_Y = 0;

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

GC.Tree_Time_Line = [
    5, 2, 5, 3, 1
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

//障碍物类型
GC.Barrier_Type1 = 1;
GC.Barrier_Type2 = 2;
GC.Barrier_Type3 = 3;
GC.Barrier_Type4 = 4;
GC.Barrier_Type5 = 5;
GC.Barrier_Type6 = 6;

//障碍物速度 xxx/s 像素每秒
GC.Barrier_Speed = 300;

//障碍物初始缩放大小及位置坐标
GC.Barrier_Org_Scale = [
    0.4, 0.4, 0.4
];

GC.Barrier_Org_Position = [
    cc.p(260, 710),
    cc.p(320, 710),
    cc.p(400, 710),
];

//障碍物结束缩放大小及位置坐标
GC.Barrier_Goal_Scale = [
    3, 3, 3
];

GC.Barrier_Goal_Position = [
    cc.p(-300, -500),
    cc.p( 320, -500),
    cc.p( 930, -500),
];

//障碍物最大地图个数
GC.Barrier_Map_Max = 3;

//障碍物地图1
GC.Barrier_Map1 = [
    [6, 0, 0],
    [0, 1, 0],
    [0, 2, 0],
    [0, 0, 5],
    [1, 0, 2],
    [0, 0, 3],
    [0, 6, 0],
    [3, 0, 0],
    [3, 0, 3],
    [0, 1, 0],
    [1, 0, 0],
    [2, 0, 0],
    [0, 0, 3],
    [0, 3, 0],
    [0, 4, 0],
    [0, 3, 0],
    [0, 3, 0],
    [0, 0, 3],
];

//障碍物时间轴1
GC.Time_Line1 = [
    0.1, 1.5, 1.7, 2.5, 3.2, 3.5, 4.2, 5, 5.3, 6, 6.7, 6.9, 7.5, 8, 8.3, 8.6, 9.2, 9.8
];

//障碍物地图2
GC.Barrier_Map2 = [
    [6, 0, 0],
    [0, 1, 0],
    [0, 2, 0],
    [0, 0, 5],
    [1, 0, 2],
    [0, 0, 3],
    [0, 6, 0],
    [3, 0, 0],
    [3, 0, 3],
    [0, 1, 0],
    [1, 0, 0],
    [2, 0, 0],
    [0, 0, 3],
    [0, 3, 0],
    [0, 4, 0],
    [0, 3, 0],
    [0, 3, 0],
    [0, 0, 3],
];

//障碍物时间轴2
GC.Time_Line2 = [
    0.1, 1.5, 1.7, 2.5, 3.2, 3.5, 4.2, 5, 5.3, 6, 6.7, 6.9, 7.5, 8, 8.3, 8.6, 9.2, 9.8
];

//障碍物地图3
GC.Barrier_Map3 = [
    [6, 0, 0],
    [0, 1, 0],
    [0, 2, 0],
    [0, 0, 5],
    [1, 0, 2],
    [0, 0, 3],
    [0, 6, 0],
    [3, 0, 0],
    [3, 0, 3],
    [0, 1, 0],
    [1, 0, 0],
    [2, 0, 0],
    [0, 0, 3],
    [0, 3, 0],
    [0, 4, 0],
    [0, 3, 0],
    [0, 3, 0],
    [0, 0, 3],
];

//障碍物时间轴3
GC.Time_Line3 = [
    0.1, 1.5, 1.7, 2.5, 3.2, 3.5, 4.2, 5, 5.3, 6, 6.7, 6.9, 7.5, 8, 8.3, 8.6, 9.2, 9.8
];

//碰撞类型
GC.Crash_Shut_Down = 0; //停车
GC.Crash_Speed_Up  = 1; //加速
GC.Crash_Slow_Down = 2; //减速

//游戏主界面状态机
GC.Game_Loading   = 1;
GC.Game_Start     = 2;
GC.Game_Running   = 3;
GC.Game_Over      = 0;



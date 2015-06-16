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
GC.Car_Sprite = 3;
GC.Stone_Sprite = 4;
GC.Tree_Sprite = 5;

//路的图片的最大数
GC.Road_Png_Max = 4;

//树的图片最大个数
GC.Tree_Png_Max = 5;

//石头图片最大个数
GC.Stone_Png_Max = 4;

GC.Barrier_png_Max = 6;

//树的移动角度
GC.Angle = 45;

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
GC.Car_Center_Y = 175;

//汽车在左边位置
GC.Car_Left_X = 190;
GC.Car_Left_Y = 175;

//汽车在右边位置
GC.Car_Right_X = 450;
GC.Car_Right_Y = 175;

//随机出现左边树位置
GC.Tree_Show_Left_X = 150;
GC.Tree_Show_Left_Y = 700;

//随机出现右边树位置
GC.Tree_Show_Right_X = 470;
GC.Tree_Show_Right_Y = 700;

//随机出现左右边树初始化缩放大小
GC.Tree_Show_Left_scale = 0.1;
GC.Tree_Show_Right_scale = 0.2;

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
GC.Barrier_Org_Scale = 0.2;
GC.Barrier_Org_Left_X = 260;
GC.Barrier_Org_Center_X = 320;
GC.Barrier_Org_Right_X = 400;
GC.Barrier_Org_Y = 700;

//障碍物结束缩放大小及位置坐标
GC.Barrier_Goal_Scale = 1;
GC.Barrier_Goal_Left_X = -100;
GC.Barrier_Goal_Center_X = 320;
GC.Barrier_Goal_Right_X = 730;
GC.Barrier_Goal_Y = -100;

GC.Barrier_Position = [
    [GC.Barrier_Org_Left_X, GC.Barrier_Org_Center_X, GC.Barrier_Org_Right_X],
    [GC.Barrier_Goal_Left_X, GC.Barrier_Goal_Center_X, GC.Barrier_Goal_Right_X],
];

//障碍物地图1
GC.Barrier_Map1 = [
    [0,     6, 0, 0],
    [500,   0, 1, 0],
    [700,   0, 2, 0],
    [850,   0, 0, 5],
    [1000,  1, 0, 2],
    [1150,  0, 0, 3],
    [1500,  0, 6, 0],
    [2000,  3, 0, 0],
    [2400,  3, 0, 3],
    [3000,  0, 1, 0],
    [3500,  1, 0, 0],
    [4000,  2, 0, 0],
    [4500,  0, 0, 3],
    [4750,  0, 3, 0]
];

//障碍物地图2
GC.Barrier_Map2 = [
    [0.1,     5, 0, 0],
    [5.2,   0, 1, 0],
    [7.2,   0, 2, 0],
    [8.5,   0, 0, 6],
    [10,  1, 0, 2],
    [11.5,  0, 0, 3],
    [15,  0, 5, 0],
    [20,  3, 0, 0],
    [24,  3, 0, 3],
    [30,  0, 1, 0],
    [35,  1, 0, 0],
    [40,  2, 0, 1],
    [45,  0, 0, 3],
    [47,  0, 3, 0]
];


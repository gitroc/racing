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

//背景图的宽高
GC.Main_Scene_w = 840;
GC.Main_Scene_h = 1136;

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

//树的移动角度
GC.Angle = 45;

GC.Screen_Middle = GC.Main_Scene_w / 2;

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
GC.Stone_Show_Left_X = 290;
GC.Stone_Show_Left_Y = 685;

//随机出现右边石头位置
GC.Stone_Show_Right_X = 560;
GC.Stone_Show_Right_Y = 680;

//随机出现左右边石头初始化缩放大小
GC.Stone_Show_Left_scale = 0.1;
GC.Stone_Show_Right_scale = 0.2;

//第一棵石头初始化缩放大小及位置
GC.Stone_01_Scale = 0.5;
GC.Stone_01_X = 290;
GC.Stone_01_Y = 685;

//第二棵石头初始化缩放大小及位置
GC.Stone_02_Scale = 1;
GC.Stone_02_X = 215;
GC.Stone_02_Y = 655;

//第三棵石头初始化缩放大小及位置
GC.Stone_03_Scale = 1;
GC.Stone_03_X = 105;
GC.Stone_03_Y = 485;

//第四棵石头初始化缩放大小及位置
GC.Stone_04_Scale = 1;
GC.Stone_04_X = 650;
GC.Stone_04_Y = 630;


GC.Road_Map = [
    [0, 0, 1],
    [0, 0, 0],
    [0, 0, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 0],
    [1, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 1],
    [0, 0, 0],
    [0, 0, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];


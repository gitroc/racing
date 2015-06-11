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


GC.Main_Scene_w = 840;
GC.Main_Scene_h = 1136;

GC.BackGround_Sprite = 0;
GC.Road_Sprite = 1;
GC.Barrier_Sprite = 2;
GC.Car_Sprite = 3;
GC.Stone_Sprite = 4;
GC.Tree_Sprite = 5;

GC.Road_Png_Max = 4;
GC.Tree_Png_Max = 5;
GC.Stone_Png_Max = 4;

GC.Angle = 45;
GC.Screen_Middle = GC.Main_Scene_w / 2;

GC.Screen_Offset = 100;

//背景截图说明
GC.Bg_Left_X = 0;
GC.Bg_Left_Y = 0;

GC.Bg_Center_X = 100;
GC.Bg_Center_Y = 0;

GC.Bg_Right_X = 200;
GC.Bg_Right_Y = 0;

GC.Car_Center_X = 320;
GC.Car_Center_Y = 175;

GC.Car_Left_X = 190;
GC.Car_Left_Y = 175;

GC.Car_Right_X = 450;
GC.Car_Right_Y = 175;

GC.Tree_Show_Left_scale = 0.1;
GC.Tree_Show_Right_scale = 0.2;
GC.Tree_Show_Left_X = 250;
GC.Tree_Show_Left_Y = 700;
GC.Tree_Show_Right_X = 570;
GC.Tree_Show_Right_Y = 700;

GC.Tree_01_Scale = 0.2;
GC.Tree_01_X = 260;
GC.Tree_01_Y = 700;

GC.Tree_02_Scale = 0.8;
GC.Tree_02_X = 125;
GC.Tree_02_Y = 625;

GC.Tree_03_Scale = 0.3;
GC.Tree_03_X = 560;
GC.Tree_03_Y = 700;

GC.Tree_04_Scale = 0.6;
GC.Tree_04_X = 650;
GC.Tree_04_Y = 710;

GC.Tree_05_Scale = 0.5;
GC.Tree_05_X = 700;
GC.Tree_05_Y = 580;

GC.Stone_Show_Left_scale = 0.1;
GC.Stone_Show_Right_scale = 0.2;
GC.Stone_Show_Left_X = 290;
GC.Stone_Show_Left_Y = 685;
GC.Stone_Show_Right_X = 560;
GC.Stone_Show_Right_Y = 680;

GC.Stone_01_Scale = 0.5;
GC.Stone_01_X = 290;
GC.Stone_01_Y = 685;

GC.Stone_02_Scale = 1;
GC.Stone_02_X = 215;
GC.Stone_02_Y = 655;

GC.Stone_03_Scale = 1;
GC.Stone_03_X = 105;
GC.Stone_03_Y = 485;

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


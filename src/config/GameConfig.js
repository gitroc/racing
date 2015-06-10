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

GC.Road_Png_Max = 4;
GC.Tree_Png_Max = 5;

GC.Angle = 45;
GC.Screen_Middle = GC.Main_Scene_w / 2;

GC.Center_Offset = 100;
GC.Right_Offset = 100;

GC.Standard_scale = 0.4;
GC.Standard_Y40 = 690;
GC.Standard_Y100 = 600;

GC.Car_Error = 150;

GC.Car_Center_X = 420;
GC.Car_Center_Y = 175;

GC.Car_Left_X = 100;
GC.Car_Left_Y = 175;

GC.Car_Right_X = 500;
GC.Car_Right_Y = 175;

GC.Tree_Show_Left_scale = 0.1;
GC.Tree_Show_Right_scale = 0.2;
GC.Tree_Show_Left_X = 250;
GC.Tree_Show_Left_Y = 700;
GC.Tree_Show_Right_X = 570;
GC.Tree_Show_Right_Y = 700;

GC.Tree_01_Scale = 0.4;
GC.Tree_01_X = 260;
GC.Tree_01_Y = 700;

GC.Tree_02_Scale = 0.8;
GC.Tree_02_X = 125;
GC.Tree_02_Y = 625;

GC.Tree_03_Scale = 0.3;
GC.Tree_03_X = 560;
GC.Tree_03_Y = 700;

GC.Tree_04_Scale = 0.9;
GC.Tree_04_X = 710;
GC.Tree_04_Y = 710;

GC.Tree_05_Scale = 0.7;
GC.Tree_05_X = 740;
GC.Tree_05_Y = 580;

GC.Rock_01_X = 290;
GC.Rock_01_Y = 685;

GC.Rock_02_X = 215;
GC.Rock_02_Y = 655;

GC.Rock_03_X = 105;
GC.Rock_03_Y = 485;

GC.Rock_04_X = 660;
GC.Rock_04_Y = 610;

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


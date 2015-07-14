var GC = GC || {};
//障碍物地图1--17
GC.Barrier_Map1 = [
    [0, 1, 0],
    [2, 0, 0],
    [0, 3, 0],
    [1, 0, 2],
    [0, 0, 3],
    [0, 1, 0],
    [3, 0, 0],
    [3, 0, 3],
    [0, 1, 0],
    [1, 0, 6],
    [2, 0, 0],
    [0, 0, 3],
    [0, 3, 0],
    [0, 4, 0],
    [0, 3, 0],
    [0, 3, 0],
    [0, 0, 3],
];

//障碍物时间轴1
var time1 = 0;
GC.Time_Line1 = [];
var spaceArray1 = [
    1.0,1.5,1.5,1.5,1.5,
    1.0,1.0,2.0,1.5,2.0,
    3.0,1.0,2.0,1.0,2.0,
    1.0,2.0];
for(var i=0;i<GC.Barrier_Map1.length;i++){
    GC.Time_Line1[i] = time1 + spaceArray1[i];
    time1 =  GC.Time_Line1[i];
}

//障碍物地图2--18
GC.Barrier_Map2 = [
    [0, 3, 0],
    [0, 1, 0],
    [2, 0, 1],
    [0, 3, 0],
    [1, 0, 2],
    [0, 0, 3],
    [0, 6, 0],
    [3, 0, 0],
    [3, 3, 0],
    [0, 1, 0],
    [1, 0, 0],
    [2, 0, 0],
    [0, 0, 3],
    [0, 3, 0],
    [0, 0, 2],
    [0, 0, 1],
    [2, 0, 0],
    [2, 0, 3],
];

//障碍物时间轴2
var time2 = 0;
GC.Time_Line2=[];
var spaceArray2 = [
    1.0,2.0,2.0,2.0,3.0,
    2.0,1.0,3.0,1.0,1.0,
    2.0,1.0,1.0,2.0,1.0,
    3.0,2.0,2.0];
for(var i=0;i<GC.Barrier_Map2.length;i++){
    GC.Time_Line2[i] = time2 + spaceArray2[i];
    time2 = GC.Time_Line2[i];
}

//障碍物地图3--18
GC.Barrier_Map3 = [
    [0, 2, 0],
    [0, 0, 2],
    [0, 2, 0],
    [0, 0, 6],
    [3, 0, 2],
    [0, 0, 1],
    [4, 4, 0],
    [1, 0, 0],
    [1, 0, 3],
    [0, 3, 0],
    [3, 0, 0],
    [4, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
    [0, 2, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 1],
];

//障碍物时间轴3
var time3 = 0;
GC.Time_Line3=[];
var spaceArray3 = [
    1.0,2.0,1.0,1.0,3.5,
    1.0,1.0,2.0,1.0,2.0,
    2.0,1.0,2.0,1.0,2.0,
    1.0,2.0,1.0,1.0];
for(var i=0;i<GC.Barrier_Map3.length;i++){
    GC.Time_Line3[i] = time3 + spaceArray3[i];
    time3 = GC.Time_Line3[i];
}

//障碍物地图4--19
GC.Barrier_Map4 = [
    [0, 4, 0],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [0, 0, 2],
    [0, 2, 0],
    [2, 0, 0],
    [0, 3, 0],
    [0, 3, 0],
    [0, 0, 6],
    [1, 0, 0],
    [1, 0, 0],
    [0, 0, 2],
    [0, 0, 2],
    [3, 0, 3],
    [3, 0, 3],
    [4, 0, 0],
    [0, 4, 0],
    [0, 0, 4],
];
//障碍物时间轴4
var time4 = 0;
GC.Time_Line4=[];
var spaceArray4 = [
    1.0,2.0,1.0,1.0,2.0,
    1.0,1.0,2.0,1.0,2.0,
    3.0,1.0,2.0,1.0,2.0,
    1.0,2.0,1.0,1.0];
for(var i=0;i<GC.Barrier_Map4.length;i++){
    GC.Time_Line4[i] = time4 + spaceArray4[i];
    time4 = GC.Time_Line4[i];
}
//障碍物地图5--19
GC.Barrier_Map5 = [
    [0, 4, 0],
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
    [0, 6, 0],
    [0, 2, 0],
    [2, 0, 0],
    [0, 3, 0],
    [0, 3, 0],
    [2, 0, 2],
    [1, 0, 0],
    [1, 0, 0],
    [0, 0, 2],
    [0, 0, 2],
    [0, 3, 3],
    [0, 3, 3],
    [4, 0, 0],
    [0, 4, 0],
    [0, 0, 4],
];

//障碍物时间轴5
var time5 = 0;
GC.Time_Line5=[];
var spaceArray5 = [
    1.0,2.0,1.0,1.0,2.0,
    3.0,1.0,2.0,1.0,2.0,
    1.0,1.0,2.0,1.0,2.0,
    1.0,2.0,1.0,1.0];
for(var i=0;i<GC.Barrier_Map5.length;i++){
    GC.Time_Line5[i] = time5 + spaceArray5[i];
    time5 = GC.Time_Line5[i];
}

//障碍物地图11
GC.Barrier_Map11 = [
    [0, 3, 0],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [2, 1, 0],
    [2, 1, 0],
    [2, 1, 0],
    [0, 3, 0],
    [0, 0, 1],
    [4, 0, 4],
    [4, 0, 4],
    [0, 3, 0],
    [0, 3, 0],
    [0, 3, 6],
    [1, 0, 0],
    [0, 2, 0],
    [0, 0, 3],
];
//障碍物时间轴11
var time11 = 0;
GC.Time_Line11=[];
var spaceArray11 = [
    1.0,2.0,1.0,1.0,2.0,
    1.0,1.0,1.0,1.0,2.0,
    1.0,2.0,1.0,1.0,3.0,
    1.0,1.0];
for(var i=0;i<GC.Barrier_Map11.length;i++){
    GC.Time_Line11[i] = time11 + spaceArray11[i];
    time11 = GC.Time_Line11[i];
}

//障碍物地图12
GC.Barrier_Map12 = [
    [0, 2, 0],
    [0, 2, 0],
    [0, 0, 3],
    [1, 0, 0],
    [0, 2, 0],
    [0, 0, 3],
    [0, 6, 0],
    [4, 0, 4],
    [4, 0, 4],
    [1, 2, 0],
    [1, 2, 0],
    [0, 3, 1],
    [0, 3, 1],
    [0, 3, 1],
    [3, 0, 4],
    [0, 0, 4],
    [0, 2, 0],
    [0, 2, 0],
];

//障碍物时间轴12
var time12 = 0;
GC.Time_Line12=[];
var spaceArray12 = [
    1.0,1.0,1.0,1.0,1.0,
    1.0,1.0,3.0,1.0,2.0,
    1.0,2.0,1.0,1.0,2.0,
    1.0,1.0,1.0];

for(var i=0;i<GC.Barrier_Map12.length;i++){
    GC.Time_Line12[i] = time12 + spaceArray12[i];
    time12 = GC.Time_Line12[i];
}

//障碍物地图13
GC.Barrier_Map13 = [
    [1, 0, 0],
    [4, 3, 0],
    [1, 2, 0],
    [4, 0, 0],
    [3, 0, 0],
    [0, 3, 3],
    [0, 2, 0],
    [1, 4, 0],
    [1, 0, 1],
    [0, 3, 0],
    [3, 0, 0],
    [4, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
    [0, 2, 0],
    [0, 1, 0],
    [6, 1, 0],
    [0, 0, 1],
];
//障碍物时间轴7
var time13 = 0;
GC.Time_Line13=[];
var spaceArray13 = [
    1.0,1.0,1.0,2.0,1.0,
    1.0,2.0,1.0,1.0,2.0,
    1.0,1.0,1.0,1.0,2.0,
    1.0,2.0,3.0];

for(var i=0;i<GC.Barrier_Map13.length;i++){
    GC.Time_Line13[i] = time13 + spaceArray13[i];
    time13 = GC.Time_Line13[i];
}


//障碍物地图21
GC.Barrier_Map21 = [
    [2, 0, 0],
    [4, 3, 0],
    [1, 0, 0],
    [0, 3, 4],
    [1, 0, 1],
    [0, 1, 1],
    [2, 2, 0],
    [1, 0, 1],
    [0, 1, 2],
    [3, 0, 3],
    [1, 0, 6],
    [4, 0, 3],
    [1, 2, 0],
    [4, 0, 3],
    [3, 4, 0],
    [0, 3, 4],
    [2, 0, 2],
    [1, 4, 0],
];

//障碍物时间轴21
var time21 = 0;
GC.Time_Line21=[];
var spaceArray21 = [
    1.0,1.0,1.0,1.0,1.0,
    1.0,1.5,1.0,1.0,1.0,
    1.0,3.0,1.0,1.0,1.0,
    1.5,1.0,1.0];

for(var i=0;i<GC.Barrier_Map21.length;i++){
    GC.Time_Line21[i] = time21 + spaceArray21[i];
    time21 = GC.Time_Line21[i];
}

//障碍物地图22
GC.Barrier_Map22 = [
    [1, 3, 0],
    [0, 0, 3],
    [3, 0, 3],
    [4, 4, 0],
    [1, 0, 1],
    [0, 1, 1],
    [1, 0, 2],
    [6, 1, 0],
    [2, 0, 1],
    [0, 3, 1],
    [1, 3, 0],
    [4, 0, 2],
    [1, 2, 0],
    [4, 0, 4],
    [3, 3, 0],
    [3, 0, 3],
    [0, 1, 2],
    [1, 4, 0],
];

//障碍物时间轴9
var time22= 0;
GC.Time_Line22=[];
var spaceArray22 = [
    1.0,1.0,1.0,1.0,1.0,
    1.0,1.0,1.5,3.0,1.0,
    1.5,1.0,1.0,1.0,1.0,
    1.0,1.0,1.5];

for(var i=0;i<GC.Barrier_Map22.length;i++){
    GC.Time_Line22[i] = time22 + spaceArray22[i];
    time22 = GC.Time_Line22[i];
}

//障碍物地图23 19.5s
GC.Barrier_Map23 = [
    [2, 1, 0],
    [0, 2, 1],
    [1, 0, 2],
    [0, 3, 4],
    [3, 4, 0],
    [4, 0, 3],
    [1, 2, 0],
    [1, 0, 2],
    [3, 4, 0],
    [3, 0, 4],
    [0, 3, 4],
    [1, 0, 1],
    [1, 0, 1],
    [4, 4, 0],
    [0, 4, 4],
    [0, 2, 0],
    [0, 0, 1],
    [1, 0, 4],
];

//障碍物时间轴23
var time23 = 0;
GC.Time_Line23=[];
var spaceArray23 = [
    1.0,1.5,1.0,1.0,1.5,
    1.0,1.0,1.0,1.0,1.0,
    1.0,1.0,1.0,1.0,1.5,
    1.0,1.0,1.0];

for(var i=0;i<GC.Barrier_Map23.length;i++){
    GC.Time_Line23[i] = time23 + spaceArray23[i];
    time23 = GC.Time_Line23[i];
}

//障碍物地图24
GC.Barrier_Map24 = [
    [3, 3, 0],
    [0, 4, 4],
    [1, 1, 0],
    [0, 1, 1],
    [2, 0, 2],
    [0, 1, 1],
    [1, 1, 0],
    [3, 0, 3],
    [3, 0, 3],
    [0, 4, 0],
    [0, 4, 0],
    [3, 0, 0],
    [0, 0, 3],
    [1, 1, 0],
    [0, 1, 1],
];

//障碍物时间轴24 21s
var time24 = 0;
GC.Time_Line24 = [];
var spaceArray24 = [
    1.0,1.5,1.5,1.5,1.5,
    1.5,1.5,1.5,1.0,1.0,
    1.5,1.5,1.5,1.5,1.5];

for(var i=0;i<GC.Barrier_Map24.length;i++){
    GC.Time_Line24[i] = time24 + spaceArray24[i];
    time24 = GC.Time_Line24[i];
}

//地图切换时间
GC.Game_Map_Adjust_Time = 10;

//障碍物最大地图个数
GC.Barrier_Map_Max = 30;

GC.Barrier_Map = [
   [GC.Barrier_Map1,  GC.Time_Line1],
   [GC.Barrier_Map2,  GC.Time_Line2],
   [GC.Barrier_Map3,  GC.Time_Line3],
   [GC.Barrier_Map4,  GC.Time_Line4],
   [GC.Barrier_Map5,  GC.Time_Line5],
   [GC.Barrier_Map11, GC.Time_Line11],
   [GC.Barrier_Map12, GC.Time_Line12],
   [GC.Barrier_Map13, GC.Time_Line13],
   [GC.Barrier_Map21,  GC.Time_Line21],
   [GC.Barrier_Map22,  GC.Time_Line22],
   [GC.Barrier_Map23,  GC.Time_Line23],
   [GC.Barrier_Map24,  GC.Time_Line24],
];

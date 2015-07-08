var GC = GC || {};
//障碍物地图1--17
GC.Barrier_Map1 = [
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
var time1 = 0.5;
GC.Time_Line1 = [];
var spaceArray1 = [
    0.0,1.5,1.5,1.5,1.5,
    3.0,1.5,2.0,1.5,2.0,
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
    [0, 2, 0],
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
var time2 = 0.5;
GC.Time_Line2=[];
var spaceArray2 = [
    0.0,2.0,2.0,2.0,3.0,
    2.0,3.0,1.0,1.0,1.0,
    2.0,1.0,1.0,2.0,1.0,
    3.0,2.0,2.0];
for(var i=0;i<GC.Barrier_Map2.length;i++){
    GC.Time_Line2[i] = time2 + spaceArray2[i];
    time2 = GC.Time_Line2[i];
}

//障碍物地图3--18
GC.Barrier_Map3 = [
    [5, 0, 0],
    [0, 3, 0],
    [0, 2, 0],
    [0, 0, 6],
    [3, 0, 2],
    [0, 0, 1],
    [0, 6, 0],
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
var time3 = 0.5;
GC.Time_Line3=[];
var spaceArray3 = [
    0.0,2.0,1.0,1.0,2.0,
    1.0,1.0,2.0,1.0,2.0,
    2.0,1.0,2.0,1.0,2.0,
    1.0,2.0,1.0,1.0];
for(var i=0;i<GC.Barrier_Map3.length;i++){
    GC.Time_Line3[i] = time3 + spaceArray3[i];
    time3 = GC.Time_Line3[i];
}

//障碍物地图4--19
GC.Barrier_Map4 = [
    [6, 0, 0],
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
var time4 = 0.5;
GC.Time_Line4=[];
var spaceArray4 = [
    0.0,2.0,1.0,1.0,2.0,
    1.0,1.0,2.0,1.0,2.0,
    2.0,1.0,2.0,1.0,2.0,
    1.0,2.0,1.0,1.0];
for(var i=0;i<GC.Barrier_Map4.length;i++){
    GC.Time_Line4[i] = time4 + spaceArray4[i];
    time4 = GC.Time_Line4[i];
}
cc.log("4TotalLength:"+GC.Time_Line4[GC.Barrier_Map4.length-1]);

//障碍物地图5
GC.Barrier_Map5 = [
    [5, 0, 0],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [2, 1, 0],
    [2, 1, 0],
    [2, 1, 0],
    [0, 3, 0],
    [0, 0, 5],
    [4, 0, 4],
    [4, 0, 4],
    [0, 3, 0],
    [0, 3, 0],
    [0, 3, 6],
    [1, 0, 0],
    [0, 2, 0],
    [0, 0, 3],
];
//障碍物时间轴5
var time5 = 0.5;
GC.Time_Line5=[];
var spaceArray5 = [
    0.0,1.0,1.0,1.0,2.0,
    1.0,1.0,1.0,1.0,2.0,
    1.0,2.0,1.0,1.0,2.0,
    1.0,1.0];
for(var i=0;i<GC.Barrier_Map5.length;i++){
    GC.Time_Line5[i] = time5 + spaceArray5[i];
    time5 = GC.Time_Line5[i];
}
cc.log("5TotalLength:"+GC.Time_Line5[GC.Barrier_Map5.length-1]);

//障碍物地图6
GC.Barrier_Map6 = [
    [1, 0, 0],
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
    [5, 0, 4],
    [0, 0, 4],
    [0, 2, 0],
    [0, 2, 0],
];

//障碍物时间轴6
var time6 = 0.5;
GC.Time_Line6=[];
var spaceArray6 = [
    0.5,1.0,1.0,2.0,1.0,
    1.0,1.0,2.0,1.0,2.0,
    1.0,2.0,1.0,1.0,2.0,
    1.0,1.0,1.0];

for(var i=0;i<GC.Barrier_Map6.length;i++){
    GC.Time_Line6[i] = time6 + spaceArray6[i];
    time6 = GC.Time_Line6[i];
}

//障碍物地图7
GC.Barrier_Map7 = [
    [1, 0, 0],
    [4, 3, 0],
    [1, 2, 0],
    [4, 0, 0],
    [3, 0, 0],
    [0, 3, 0],
    [0, 2, 0],
    [1, 4, 0],
    [1, 0, 0],
    [0, 3, 0],
    [3, 0, 0],
    [4, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
    [0, 2, 0],
    [0, 1, 0],
    [0, 1, 6],
    [0, 0, 1],
];
//障碍物时间轴7
var time7 = 0.5;
GC.Time_Line7=[];
var spaceArray7 = [
    0.5,1.0,1.0,2.0,1.0,
    1.0,2.0,1.0,1.0,2.0,
    1.0,1.0,1.0,1.0,2.0,
    1.0,2.0,1.0];

for(var i=0;i<GC.Barrier_Map7.length;i++){
    GC.Time_Line7[i] = time7 + spaceArray7[i];
    time7 = GC.Time_Line7[i];
}


//障碍物地图8
GC.Barrier_Map8 = [
    [1, 0, 0],
    [0, 3, 4],
    [1, 0, 0],
    [0, 3, 4],
    [1, 0, 1],
    [0, 1, 1],
    [2, 2, 0],
    [1, 0, 1],
    [0, 2, 2],
    [3, 0, 3],
    [1, 0, 6],
    [4, 3, 0],
    [1, 2, 0],
    [4, 0, 3],
    [3, 4, 0],
    [0, 3, 4],
    [2, 0, 2],
    [1, 4, 0],
];

//障碍物时间轴8
var time8 = 0.5;
GC.Time_Line8=[];
var spaceArray8 = [
    0.5,1.0,1.0,2.0,1.0,
    1.0,2.0,2.0,1.0,2.0,
    1.0,2.0,1.0,1.0,2.0,
    1.0,2.0,1.0];

for(var i=0;i<GC.Barrier_Map8.length;i++){
    GC.Time_Line8[i] = time8 + spaceArray8[i];
    time8 = GC.Time_Line8[i];
}

//障碍物地图9
GC.Barrier_Map9 = [
    [1, 0, 0],
    [0, 3, 0],
    [3, 0, 3],
    [4, 4, 0],
    [1, 0, 1],
    [0, 1, 1],
    [0, 2, 0],
    [6, 1, 0],
    [0, 2, 1],
    [0, 0, 1],
    [1, 0, 0],
    [4, 3, 0],
    [1, 2, 0],
    [4, 0, 4],
    [3, 3, 0],
    [0, 3, 0],
    [0, 2, 0],
    [1, 4, 0],
];

//障碍物时间轴9
var time9 = 0.5;
GC.Time_Line9=[];
var spaceArray9 = [
    0.5,1.0,1.0,2.0,1.0,
    1.0,1.0,1.0,1.0,1.0,
    1.0,1.0,1.0,1.0,1.0,
    1.0,2.0,1.0];

for(var i=0;i<GC.Barrier_Map9.length;i++){
    GC.Time_Line9[i] = time9 + spaceArray9[i];
    time9 = GC.Time_Line9[i];
}

//障碍物地图10
GC.Barrier_Map10 = [
    [1, 0, 0],
    [0, 3, 0],
    [3, 0, 0],
    [4, 0, 0],
    [0, 2, 1],
    [0, 1, 2],
    [1, 2, 0],
    [1, 0, 2],
    [3, 3, 0],
    [3, 3, 0],
    [1, 0, 4],
    [4, 3, 0],
    [1, 0, 2],
    [0, 4, 0],
    [3, 0, 0],
    [0, 3, 6],
    [0, 2, 0],
    [1, 0, 4],
];

//障碍物时间轴10
var time10 = 0.5;
GC.Time_Line10=[];
var spaceArray10 = [
    0.5,1.0,1.0,1.0,1.0,
    1.0,1.0,1.0,1.0,1.0,
    1.0,1.0,1.0,1.0,1.0,
    1.0,1.0,1.0];

for(var i=0;i<GC.Barrier_Map10.length;i++){
    GC.Time_Line10[i] = time10 + spaceArray10[i];
    time10 = GC.Time_Line10[i];
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
   [GC.Barrier_Map1,  GC.Time_Line1],
   [GC.Barrier_Map2,  GC.Time_Line2],
   [GC.Barrier_Map3,  GC.Time_Line3],
   [GC.Barrier_Map4,  GC.Time_Line4],
   [GC.Barrier_Map3,  GC.Time_Line3],
   [GC.Barrier_Map4,  GC.Time_Line4],
   [GC.Barrier_Map5, GC.Time_Line5],
   [GC.Barrier_Map6, GC.Time_Line6],
   [GC.Barrier_Map7, GC.Time_Line7],
   [GC.Barrier_Map5, GC.Time_Line5],
   [GC.Barrier_Map6, GC.Time_Line6],
   [GC.Barrier_Map7, GC.Time_Line7],
   [GC.Barrier_Map5, GC.Time_Line5],
   [GC.Barrier_Map6, GC.Time_Line6],
   [GC.Barrier_Map7, GC.Time_Line7],
   [GC.Barrier_Map5, GC.Time_Line5],
   [GC.Barrier_Map8,  GC.Time_Line8],
   [GC.Barrier_Map9,  GC.Time_Line9],
   [GC.Barrier_Map10, GC.Time_Line10],
   [GC.Barrier_Map8,  GC.Time_Line8],
   [GC.Barrier_Map9,  GC.Time_Line9],
   [GC.Barrier_Map10, GC.Time_Line10],
   [GC.Barrier_Map8,  GC.Time_Line8],
   [GC.Barrier_Map9,  GC.Time_Line9],
   [GC.Barrier_Map10, GC.Time_Line10],
   [GC.Barrier_Map8,  GC.Time_Line8],
];

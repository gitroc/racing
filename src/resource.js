var res = {
    Play_N_png:"res/image/loading_btn_on.jpg",
    Play_S_png:"res/image/loading_btn_off.jpg",
    Tree_plist : "res/main/main_bg_object_tree.plist",
    Stone_plist : "res/main/main_bg_object_stone.plist",
    Car_plist : "res/main/main_car.plist",
    Car_png : "res/main/main_car_back.png",
    Road_png : "res/main/main_bg_road1.png",
    Barrier_plist : "res/main/main_road_barrier.plist",
    Start_N_png : "res/start_N.png",
    Start_S_png : "res/start_S.png",
    Background_plist : "res/main/main_bg_road.plist",
    ReadyGo_plist : "res/image/loading_guide.plist",
    LoadingBg_Png : "res/image/loading_guide_bg.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
var res = {
    LoadingBg_Png : "res/image/loading_bg.jpg",
    Again_png : "res/image/end_btn_replay.png",
    AgainSel_png : "res/image/end_btn_replay_sel.png",
    Share_png : "res/image/end_btn_share.png",
    ShareSel_png : "res/image/end_btn_share_sel.png",
    MaskLayer_Png : "res/image/mask_layer.png",
    Slogan_Png : "res/image/end_icon_slogan.png",
    Word_Png : "res/image/end_icon_word1.png",
    Line_Png : "res/image/end_icon_line.png",
    Play_N_png:"res/image/loading_btn_on.jpg",
    Play_S_png:"res/image/loading_btn_off.jpg",
    Car_png : "res/main/main_car_back.png",
    Road_png : "res/main/main_bg_road1.png",
    Tree_plist : "res/main/main_bg_object_tree.plist",
    Stone_plist : "res/main/main_bg_object_stone.plist",
    Car_plist : "res/main/main_car.plist",
    Barrier_plist : "res/main/main_road_barrier.plist",
    Background_plist : "res/main/main_bg_road.plist",
    ReadyGo_plist : "res/image/loading_guide.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
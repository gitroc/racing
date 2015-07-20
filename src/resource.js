var res = {
    LoadingBg_Png : "res/image/loading_bg.jpg",
    LoadingBtOn_Png : "res/image/loading_btn_on.png",
    LoadingBtOff_Png : "res/image/loading_btn_off.png",
    GameOver_plist : "res/image/game_over.plist",
    Tree_plist : "res/main/main_bg_object_tree.plist",
    Stone_plist : "res/main/main_bg_object_stone.plist",
    Car_plist : "res/main/main_car.plist",
    Barrier_plist : "res/main/main_road_barrier.plist",
    Background_plist : "res/main/main_bg_road.plist",
    ReadyGo_plist : "res/image/loading_guide.plist",
    Game_Start : "res/music/start.mp3",
    Game_Music : "res/music/music.mp3",
    Ready_Go : "res/music/readygo.mp3",
    Game_Over : "res/music/gameover.mp3",
    Car_Crash : "res/music/crush.mp3",
    Speed_Up : "res/music/speed.mp3",
    Game_All : "res/music/pass_all.wav"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
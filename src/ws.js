var WebSocketHelper = cc.Class.extend({

    //_userId:0,

    ctor:function (game) {
        ws = new WebSocket("ws://127.0.0.1:8080");
        ws.game = game;
        this.ws = ws;
        //接続イベント
        ws.onopen = function(evt)
        {
            ws.send("onopen");
        };

        //メッセージ受信イベント
        ws.onmessage = function(evt)
        {
            cc.log(evt.data);
            if(isJSON(evt.data)){
                //_data = '{"itemCode":91,"itemName":"ramen","itemPrice":300}';
                _data = JSON.parse(evt.data)
                if(_data["type"] == "SET_USER_ID"){
                    ws.game.setUserId(_data["userId"]);
                    ws.game.addMyCharactor(_data["userId"]);
                }
                if(_data["type"] == "ADD_PLAYER"){
                    ws.game.addPlayer(_data["userId"]);
                }
                if(_data["type"] == "REMOVE_PLAYER"){
                    ws.game.removePlayer(_data["userId"]);
                }
                if(_data["type"] == "MOVE_PLAYER"){
                    ws.game.movePlayer(_data["userId"],_data["posX"],_data["posY"]);
                }
            }
        };
    },

    //getWS:function(){
    //    return this.ws;
    //},

    sendMsg:function(msg){
        ws.send(msg);
    },

    init:function () {
    },

    //getUserId:function(){
    //    return this.ws.userId;
    //},

});

var isJSON = function(arg) {
    arg = (typeof arg === "function") ? arg() : arg;
    if (typeof arg  !== "string") {
        return false;
    }
    try {
    arg = (!JSON) ? eval("(" + arg + ")") : JSON.parse(arg);
        return true;
    } catch (e) {
        return false;
    }
};

var getRandNumberFromRange = function (min,max) {
    var rand = min + Math.floor( Math.random() * (max - min));
    return rand;
};

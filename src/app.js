var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    userId:0,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this._time = 0;
        this.players = [];

        //set web_socket
        this.webSocketHelper = new WebSocketHelper(this)

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );

        this.targetMarker = new cc.Sprite("res/flag.png");
        this.addChild(this.targetMarker);

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan : function(touches, event){
                event.getCurrentTarget().targetMarker.setPosition(
                    touches[0].getLocation().x,
                    touches[0].getLocation().y
                );
            },
            onTouchesMoved : function(touches, event){},
            onTouchesEnded:function (touches, event) {
                if (touches.length <= 0)
                    return;
                }
            }),
        this);

        //最初からサーバーにいるプレイヤーを追加する
        this.scheduleUpdate();
        return true;
    },

    update:function(dt){
        this._time++;
        if(this._time >= 10){
            this.webSocketHelper.sendMsg("sendMsg! UserId:" + this.userId);
            var _data = '{'
                + '"type":"MOVE_PLAYER",'
                + '"userId":' + this.userId + ','
                + '"posX":' +this.player.getPosition().x+ ','
                + '"posY":' +this.player.getPosition().y+ ''
                + '}';
            this.webSocketHelper.sendMsg(_data);
            this._time = 0;
        }
        for(var i=0;i<this.players.length;i++){
            this.players[i].update();
        }
        this.player.moveToTargetMarker(this.targetMarker);
    },

    getMyStatus:function(){
        return [
            {
                "update" : {
                    "userId" : 1,
                    "age"    : 10
                }
            }
        ]
    },

    setUserId:function(userId){
        cc.log(userId);
        this.userId = userId;
    },

    setMessage:function(msg){
        cc.log(msg);

    },

    addMyCharactor:function(userId){
        var player = new Player(this,userId);
        this.player = player;

        //重複チェック
        var _sameIdNum = 0;
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].userId == userId){
                _sameIdNum++;
            }
        }

        if(_sameIdNum == 0){
            this.players.push(player);
            this.addChild(player);
            player.setPosition(getRandNumberFromRange(10,500),100)
        }
    },


    addPlayer:function(userId){
        var player = new Player(this,userId);

        //重複チェック
        var _sameIdNum = 0;
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].userId == userId){
                _sameIdNum++;
            }
        }

        if(_sameIdNum == 0){
            this.players.push(player);
            this.addChild(player);
            player.setPosition(getRandNumberFromRange(10,500),100)
        }
    },

    removePlayer:function(userId){
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].userId == userId){
                this.removeChild(this.players[i]);
                this.players.splice(i, 1);
            }
        }
    },

    movePlayer:function(userId,posX,posY){
cc.log("move")
        for(var i=0;i<this.players.length;i++){
            if(this.players[i].userId == userId){
                this.players[i].setPosition(posX,posY);
            }
        }
    },
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


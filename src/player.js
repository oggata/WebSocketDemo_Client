var Player = cc.Node.extend({
    ctor:function (game,userId) {
        this._super();
        this.game   = game;
        this.userId = userId;
        this.walkSpeed = 10;
        this.sprite = cc.Sprite.create("res/star.png");
        this.sprite.setPosition(0,0);
        //this.sprite.setOpacity(255*0.4);
        this.addChild(this.sprite);
    },

    init:function () {
    },

    update:function() {

    },

    moveToTargetMarker:function(targetSprite) {
        
        if(targetSprite == null) return;
        
        if(this.getPosition().x < targetSprite.getPosition().x){
            if(Math.abs(this.getPosition().x - targetSprite.getPosition().x) > this.walkSpeed){
                this.setPosition(
                    this.getPosition().x + this.walkSpeed,
                    this.getPosition().y
                );
            }else{
                this.setPosition(
                    targetSprite.getPosition().x,
                    this.getPosition().y
                );
            }
        }

        if(this.getPosition().x > targetSprite.getPosition().x){
            if(Math.abs(this.getPosition().x - targetSprite.getPosition().x) > this.walkSpeed){
                this.setPosition(
                    this.getPosition().x - this.walkSpeed,
                    this.getPosition().y
                );
            }else{
                this.setPosition(
                    targetSprite.getPosition().x,
                    this.getPosition().y
                );
            }
        }
    },
});
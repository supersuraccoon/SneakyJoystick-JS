
var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        //
        this.winSize = cc.director.getWinSize();
        
        this.hero = new cc.Sprite("res/face.png");
        this.hero.setPosition(this.winSize.width * 0.5, this.winSize.height * 0.5);
        this.addChild(this.hero);

        // UI
        this.uiLayer = UILayer.create(this);
        this.addChild(this.uiLayer, 100);
        
        // update
        this.scheduleUpdate();

        return true;
    },
    update:function(dt) {
        // if (this.uiLayer.getKeyboard()) {
        //     this.uiLayer.getKeyboard().handleKeyBoard();
        // }

        var SPEED_PER_FRAME = 300;
        // joypad
        if (this.uiLayer.getJoystick().velocity.x != 0 || this.uiLayer.getJoystick().velocity.y != 0) {
            this.hero.setPosition(
                this.hero.getPositionX() + this.uiLayer.getJoystick().velocity.x * dt * SPEED_PER_FRAME,
                this.hero.getPositionY() + this.uiLayer.getJoystick().velocity.y * dt * SPEED_PER_FRAME
            );
        }
        this.hero.setRotation(-this.uiLayer.getJoystick().degrees);

        if (this.uiLayer.getAttackButton().value == 1) {
            this.hero.setScale(this.hero.getScaleX() + 0.01);
        }
        else {
            this.hero.setScale(1.0);
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


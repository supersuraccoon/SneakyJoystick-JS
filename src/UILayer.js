//
var UILayer = cc.Layer.extend({
    init:function (delegate) {
        this._super();
        this._delegate = delegate;
        this.winSize = cc.director.getWinSize();

        var skinJoystick = SneakyJoystickSkinnedBase.create();
        skinJoystick.setBackgroundSprite(new cc.Sprite("res/joystick_normal.png"));
        skinJoystick.setBackgroundPressedSprite(new cc.Sprite("res/joystick_pressed.png"));
        skinJoystick.setThumbSprite(new cc.Sprite("res/thumbSprite.png"));
        skinJoystick.setThumbPressedSprite(new cc.Sprite("res/thumbSprite.png"));
        skinJoystick.setPosition(cc.p(120, 120));
        skinJoystick.setOpacity(100);
        this.addChild(skinJoystick);
        this.joystick = SneakyJoystick.create();
        this.joystick.initWithRect(cc.rect(0, 0, 0, 0));
        this.joystick.autoCenter = true;
        this.joystick.joyStickBase = skinJoystick;
        this.joystick.numberOfDirections = 360;
        skinJoystick.setJoystick(this.joystick);

        this.skinButton = SneakyButtonSkinnedBase.create();
        this.skinButton.setDefaultSprite(new cc.Sprite("res/sneakybutton_default.png"));
        this.skinButton.setPressSprite(new cc.Sprite("res/sneakybutton_pressed.png"));
        this.skinButton.setDisabledSprite(new cc.Sprite("res/sneakybutton_disable.png"));
        this.skinButton.setPosition(cc.p(this.winSize.width - 80, 80));
        this.skinButton.setOpacity(100);
        this.addChild(this.skinButton);
        this.attackButton = SneakyButton.create();
        this.attackButton.initWithRect(cc.rect(0, 0, 0, 0));
        this.attackButton.sneakyButtonBase = this.skinButton;
        this.attackButton.isHoldable = 1;
        this.skinButton.setButton(this.attackButton);

        // enable keyboard
        if('keyboard' in cc.sys.capabilities) {
            this.keyboard = KeyboardSimulator.create(this);
            this.addChild(this.keyboard, 9999);  
        }
        else {
            this.keyboard = null;
        }
        return true;
    },
    getAttackButton:function () {
        return this.attackButton;
    },
    getKeyboard:function () {
        return this.keyboard;
    },
    getJoystick:function () {
        return this.joystick;
    }
});
UILayer.create = function(delegate) {
    var uiLayer = new UILayer();
    if (uiLayer && uiLayer.init(delegate)) {
        return uiLayer;
    }
    return null;
}

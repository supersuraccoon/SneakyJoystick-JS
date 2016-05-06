// KeyboardSimulator.js
var KeyboardSimulator = cc.Layer.extend({
    init:function (delegate) {
        this._super();
        this._delegate = delegate;
        this.winSize = cc.director.getWinSize();

        // enable keyboard
        this.allKeys = [];
        if( 'keyboard' in cc.sys.capabilities ) {
            // this.setKeyboardEnabled(true);
            var that = this;
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed:  function(keyCode, event){
                    that.allKeys[keyCode] = true;
                },
                onKeyReleased: function(keyCode, event){
                    that.allKeys[keyCode] = false;
                }
            }, this);
        }
        return true;
    },
    // keyboard
    handleKeyBoard:function() {
        // move
        this._delegate.getJoystick().velocity.x = 0;
        this._delegate.getJoystick().velocity.y = 0;
        var direction = 0;
        if (this.allKeys[38] || this.allKeys[25]) {
            // up
            direction = 1;
            this._delegate.getJoystick().velocity.y = 1;
        }
        else if (this.allKeys[40] || this.allKeys[26]) {
            // down
            direction = 5;
            this._delegate.getJoystick().velocity.y = -1;
        }
        if (this.allKeys[37] || this.allKeys[23]) {
            // left
            if (direction == 1)
                direction = 2;
            else if (direction == 5)
                direction = 4;
            else
                direction = 3;
            this._delegate.getJoystick().velocity.x = -1;
        }
        else if (this.allKeys[39] || this.allKeys[24]) {
            // right
            if (direction == 1)
                direction = 8;
            else if (direction == 5)
                direction = 6;
            else
                direction = 7;
            this._delegate.getJoystick().velocity.x = 1;
        }
        this._delegate.getJoystick().degrees = [0, 45, 90, 135, 180, 225, 270, 325][direction - 1];
        if (this.allKeys[32] || this.allKeys[56]) {
            this._delegate.getJoystick().velocity.x /= 2;
            this._delegate.getJoystick().velocity.y /= 2;
        }

        // attack
        if (this.allKeys[65]) {
            this._delegate.getAttackButton().value = 1;
        }
        else {
            this._delegate.getAttackButton().value = 0;
        }
    }
});
KeyboardSimulator.create = function(delegate) {
    var keyboardSimulator = new KeyboardSimulator();
    if (keyboardSimulator && keyboardSimulator.init(delegate)) {
        return keyboardSimulator;
    }
    return null;
}

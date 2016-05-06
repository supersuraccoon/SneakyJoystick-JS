// SneakyJoystickSkinnedBase 

var SneakyJoystickSkinnedBase = cc.Layer.extend({
	init:function() {
		if(this._super()) {
		// if(this._super(cc.color(255, 0, 0, 255), 100, 100)) {
			this.backgroundSprite = null;
        	this.backgroundPressedSprite = null;
			this.thumbSprite = null;
        	this.thumbPressedSprite = null;
			this.joystick = null;
			this.schedule(this.updatePositions);
			return true;
		}
		return false
	},
	setVisible:function(flag) {
		if (this.backgroundSprite) 
			this.backgroundSprite.setVisible(flag);
		if (this.backgroundPressedSprite) 
			this.backgroundPressedSprite.setVisible(flag);
		if (this.thumbSprite) 
			this.thumbSprite.setVisible(flag);
		if (this.thumbPressedSprite) 
			this.thumbPressedSprite.setVisible(flag);
	},
	setOpacity:function(opacity) {
		if (this.backgroundSprite) 
			this.backgroundSprite.setOpacity(opacity);
		if (this.backgroundPressedSprite) 
			this.backgroundPressedSprite.setOpacity(opacity);
		if (this.thumbSprite) 
			this.thumbSprite.setOpacity(opacity);
		if (this.thumbPressedSprite) 
			this.thumbPressedSprite.setOpacity(opacity);
	},
	updatePositions:function(delta) {
		if(this.joystick && this.thumbSprite) {
			this.thumbSprite.setPosition(this.joystick.stickPosition);
        	this.thumbPressedSprite.setPosition(this.joystick.stickPosition);
    	}
	},
	setContentSize:function(s) {
		this._super(s);
		if (this.backgroundSprite)
			this.backgroundSprite.setContentSize(s);
	},
	getBackgroundSprite:function() {
    	return this.backgroundSprite;
	},
	setBackgroundSprite:function(aSprite) {
		if(this.backgroundSprite) {
			if(this.backgroundSprite.getParent())
				this.backgroundSprite.getParent().removeChild(this.backgroundSprite, true);
		}
		this.backgroundSprite = aSprite;
		if(aSprite){
			this.addChild(this.backgroundSprite, 1);
			this.setContentSize(this.backgroundSprite.getContentSize());
		}
	},
	getBackgroundPressedSprite:function() {
    	return this.backgroundPressedSprite;
	},
	setBackgroundPressedSprite:function(aSprite) {
		if(this.backgroundPressedSprite) {
			if(this.backgroundPressedSprite.getParent())
				this.backgroundPressedSprite.getParent().removeChild(this.backgroundPressedSprite, true);
		}
		this.backgroundPressedSprite = aSprite;
		if(aSprite){
			this.addChild(this.backgroundPressedSprite, 1);
			this.setContentSize(this.backgroundPressedSprite.getContentSize());
		}
    	this.backgroundPressedSprite.setVisible(false);
	},
	setThumbSprite:function(aSprite) {
		if(this.thumbSprite) {
			if(this.thumbSprite.getParent())
				this.thumbSprite.getParent().removeChild(this.thumbSprite, true);
		}
		this.thumbSprite = aSprite;
		if(aSprite){
			this.addChild(this.thumbSprite, 1);
		}
	},
	setThumbPressedSprite:function(aSprite) {
		if(this.thumbPressedSprite) {
			if(this.thumbPressedSprite.getParent())
				this.thumbPressedSprite.getParent().removeChild(this.thumbSprite, true);
		}
		this.thumbPressedSprite = aSprite;
		if(aSprite){
			this.addChild(this.thumbPressedSprite, 1);
		}
    	this.thumbPressedSprite.setVisible(false);
	},
	setJoystick:function(aJoystick) {
		if(this.joystick) {
			if(this.joystick.getParent())
				this.joystick.getParent().removeChild(this.joystick, true);
		}
		this.joystick = aJoystick;
		if(aJoystick){
			this.addChild(aJoystick, 2);
			if(this.thumbSprite) {
				this.joystick.setThumbRadius(this.thumbSprite.getBoundingBox().width / 2);
        }
		else
			this.joystick.setThumbRadius(0);
		if(this.backgroundSprite)
			this.joystick.setJoystickRadius(this.backgroundSprite.getBoundingBox().width / 2);
		}
	}
});

SneakyJoystickSkinnedBase.create = function() {
	var sneakyJoystickSkinnedBase = new SneakyJoystickSkinnedBase();
	if (sneakyJoystickSkinnedBase && sneakyJoystickSkinnedBase.init())
		return sneakyJoystickSkinnedBase;
	return null;
};



// SneakyJoystick

SJ_PI = 3.14159265359;
SJ_PI_X_2 = 6.28318530718;
SJ_RAD2DEG = 180.0 / SJ_PI;
SJ_DEG2RAD = SJ_PI / 180.0;

var SneakyJoystick = cc.Layer.extend({
	init:function() {
		if (this._super()) {
			return true;
		}
		return false;
	},
	initWithRect:function(rect) {
		this.joyStickBase = null;

		this.stickPosition = cc.p(0, 0);
		this.degrees = 0.0;
		this.velocity = cc.p(0, 0);
		this.autoCenter = true;
		this.isDPad = false;
		this.hasDeadzone = false;
		this.numberOfDirections = 4;
		this.enabled = true;
		this.setJoystickRadius(rect.width / 2);
		this.setThumbRadius(32.0);
		this.setDeadRadius(0.0);
		this.setPosition(cc.p(rect.x, rect.y));
		return true;
	},
	onEnterTransitionDidFinish:function() {
		var that = this;
		this.touchListener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function(touch, event) {
				if (!that.enabled)
					return false;
				var location = touch.getLocation();
				location = that.convertToNodeSpace(location);
				//Do a fast rect check before doing a circle hit check:
				if(location.x < -that.joystickRadius || location.x > that.joystickRadius || location.y < -that.joystickRadius || location.y > that.joystickRadius) {
					return false;
				} 
				else {
					if (that.JoySneakyTouchBegin(touch)) {
		            	return true;
		        	};
				}
				return false;
			},
            onTouchMoved: function(touch, event) {
				that.JoySneakyTouchMove(touch);
			},
            onTouchEnded: function(touch, event) {
				that.JoySneakyTouchEnd(touch);
			},
            onTouchCancelled: function(touch, event) {
				that.ccTouchEnded(touch, event);
			},
        }, this);
	},
	onExit:function() {
		cc.eventManager.removeListener(this.touchListener);
		this._super();
	},
	enable:function() {
		this.enabled = true;
	},
	disable:function() {
		this.enabled = false;
	},
	//
	round:function(r) {
		return (r > 0.0) ? Math.floor(r + 0.5) : Math.ceil(r - 0.5);
	},
	updateVelocity:function(point) {
		var dx = point.x;
		var dy = point.y;
		var dSq = dx * dx + dy * dy;

		if(dSq <= this.deadRadiusSq) {
			this.velocity = cc.p(0, 0);
			this.degrees = 0.0;
			this.stickPosition = point;
			return;
		}

		var angle = Math.atan2(dy, dx);
		if(angle < 0) {
			angle += SJ_PI_X_2;
		}
		var cosAngle;
		var sinAngle;
	
		if(this.isDPad) {
			var anglePerSector = 360.0 / this.numberOfDirections * SJ_DEG2RAD;
			angle = this.round(angle / anglePerSector) * anglePerSector;
		}
	
		cosAngle = Math.cos(angle);
		sinAngle = Math.sin(angle);
	
		if (dSq > this.joystickRadiusSq || this.isDPad) {
			dx = cosAngle * this.joystickRadius;
			dy = sinAngle * this.joystickRadius;
		}
	
		this.velocity = cc.p(dx / this.joystickRadius, dy / this.joystickRadius);
		this.degrees = angle * SJ_RAD2DEG - 90;
	
		// Update the thumb's position
		this.stickPosition = cc.p(dx, dy);
	},
	setIsDPad:function(b) {
		this.isDPad = b;
		if(this.isDPad) {
			this.hasDeadzone = true;
			this.setDeadRadius(10.0);
		}
	},
	setJoystickRadius:function(r) {
		this.joystickRadius = r;
		this.joystickRadiusSq = r * r;
	},
	setThumbRadius:function(r) {
		this.thumbRadius = r;
		this.thumbRadiusSq = r * r;	
	},
	setDeadRadius:function(r) {
		this.deadRadius = r;
		this.deadRadiusSq = r * r;
	},
	JoySneakyTouchBegin:function(touch) {
    	var location = touch.getLocation();
		location = this.convertToNodeSpace(location);
    
    	this.joyStickBase.backgroundSprite.setVisible(false);
    	this.joyStickBase.backgroundPressedSprite.setVisible(true);
    	if (this.joyStickBase.thumbSprite) {
        	this.joyStickBase.thumbSprite.setVisible(false);
    	}
    	if (this.joyStickBase.thumbPressedSprite) {
        	this.joyStickBase.thumbPressedSprite.setVisible(true);
    	}
    	var dSq = location.x * location.x + location.y * location.y;
    	if(this.joystickRadiusSq > dSq) {
        	this.updateVelocity(location);
        	return true;
    	}
    },
	JoySneakyTouchMove:function(touch) {
    	var location = touch.getLocation();
		location = this.convertToNodeSpace(location);
		this.updateVelocity(location);
	},
	JoySneakyTouchEnd:function(touch) {
    	var location = cc.p(0, 0);
		if(!this.autoCenter) {
			location = touch.getLocation();
			location = this.convertToNodeSpace(location);
		}
		this.updateVelocity(location);
    	this.joyStickBase.backgroundSprite.setVisible(true);
    	this.joyStickBase.backgroundPressedSprite.setVisible(false);
    	if (this.joyStickBase.thumbSprite) {
        	this.joyStickBase.thumbSprite.setVisible(false);
    	}
	    if (this.joyStickBase.thumbPressedSprite) {
	        this.joyStickBase.thumbPressedSprite.setVisible(false);
	    }
	}
});

SneakyJoystick.create = function() {
	var sneakyJoystick = new SneakyJoystick();
		if (sneakyJoystick && sneakyJoystick.init())
			return sneakyJoystick;
	return null;
};

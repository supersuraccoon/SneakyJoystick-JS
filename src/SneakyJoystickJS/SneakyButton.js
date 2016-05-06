// SneakyButton

var SneakyButton = cc.Layer.extend({
	onEnterTransitionDidFinish:function() {
		var that = this;
		this.touchListener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function(touch, event) {
				if (!that.enabled)
					return false;
				if (that.active) 
					return false;	
				var location = touch.getLocation();
				location = that.convertToNodeSpace(location);
				//Do a fast rect check before doing a circle hit check:
				if(location.x < -that.radius || location.x > that.radius || location.y < -that.radius || location.y > that.radius) {
					return false;
				}
				else {
					var dSq = location.x * location.x + location.y * location.y;
					if(that.radiusSq > dSq) {
		            	that.buttonSneakyTouch();
						return true;
					}
				}
				return false;
			},
            onTouchMoved: function(touch, event) {
				if (!that.active) 
					return;
				var location = touch.getLocation();
				location = that.convertToNodeSpace(location);
				//Do a fast rect check before doing a circle hit check:
				if(location.x < -that.radius || location.x > that.radius || location.y < -that.radius || location.y > that.radius) {
					return;
				}
				else {
					var dSq = location.x * location.x + location.y * location.y;
					if(that.radiusSq > dSq) {
						if (that.isHoldable) 
							that.value = 1;
					}
					else {
						if (that.isHoldable) 
							that.value = 0; 
						that.active = false;
					}
				}
			},
            onTouchEnded: function(touch, event) {
				that.buttonSneakyTouchEnd();
			},
            onTouchCancelled: function(touch, event) {
				that.ccTouchEnded(touch, event);
			}
        }, this);
	},
	onExit:function() {
		cc.eventManager.removeListener(this.touchListener);
		this._super();
	},
	init:function() {
		if (this._super()) {
			return true;
		}
		return false;
	},
	initWithRect:function(rect) {
		this.sneakyButtonBase = null;
		this.bounds = cc.rect(0, 0, rect.width, rect.height);
		this.center = cc.p(rect.width/2, rect.height/2);
		this.status = 1;
		this.active = false;
		this.value = 0;
		this.isHoldable = 0;
		this.isToggleable = 0;
		this.radius = 32.0;
		this.setPosition(cc.p(rect.x, rect.y));
		this.enabled = true;
		return true;
	},
	limiter:function(delta) {
		this.value = 0;
		this.unschedule(this.limiter);
		this.active = false;
	},
	setRadius:function(r) {
		this.radius = r;
		this.radiusSq = r * r;
	},
	enable:function() {
		this.enabled = true;
	},
	disable:function() {
		this.enabled = false;
	},
	buttonSneakyTouch:function() {
		this.active = true;
    	if (!this.isHoldable && !this.isToggleable) {
        	this.value = 1;
        	this.schedule(this.limiter);
    	}
    	if (this.isHoldable) 
    		this.value = 1;
    	if (this.isToggleable) 
    		this.value = !this.value;
    
    	this.sneakyButtonBase.disabledSprite.setVisible(false);
    	this.sneakyButtonBase.pressSprite.setVisible(true);
    
    	this.m_passTime = 0;
    	this.scheduleUpdate();
	},
	buttonSneakyTouchEnd:function() {
		this.unscheduleUpdate();
		if (!this.active) 
			return;
		if (this.isHoldable) 
			this.value = 0;
		if (this.isHoldable || this.isToggleable) 
			this.active = false;
    
    	this.sneakyButtonBase.disabledSprite.setVisible(true);
    	this.sneakyButtonBase.pressSprite.setVisible(false);
	},
	update:function(dt) {
		this.m_passTime += dt;
	}
});

SneakyButton.create = function() {
	var sneakyButton = new SneakyButton();
	if (sneakyButton && sneakyButton.init())
		return sneakyButton;
	return null;
};

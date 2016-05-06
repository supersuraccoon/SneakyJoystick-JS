// SneakyButtonSkinnedBase

var SneakyButtonSkinnedBase = cc.Layer.extend({
	init:function() {
		if(this._super()) {
			this.defaultSprite = null;
			this.activatedSprite = null;
			this.disabledSprite = null;
			this.pressSprite = null;
			this.button = null;
			return true;
		}
		return false;	
	},
	setContentSize:function(s) {
		this._super(s);
		if (this.defaultSprite)
			this.defaultSprite.setContentSize(s);	
	},
	setVisible:function(flag) {
		if (this.defaultSprite) 
			this.defaultSprite.setVisible(flag);
		if (this.activatedSprite) 
			this.activatedSprite.setVisible(flag);
		if (this.disabledSprite) 
			this.disabledSprite.setVisible(flag);
		if (this.pressSprite) 
			this.pressSprite.setVisible(flag);
	},
	setOpacity:function(opacity) {
		if (this.defaultSprite) 
			this.defaultSprite.setOpacity(opacity);
		if (this.activatedSprite) 
			this.activatedSprite.setOpacity(opacity);
		if (this.disabledSprite) 
			this.disabledSprite.setOpacity(opacity);
		if (this.pressSprite) 
			this.pressSprite.setOpacity(opacity);
	},
	setDefaultSprite:function(aSprite) {
		if(this.defaultSprite) {
			if(this.defaultSprite.getParent())
				this.defaultSprite.getParent().removeChild(this.defaultSprite, true);
		}
		this.defaultSprite = aSprite;
		if(aSprite){
			this.addChild(this.defaultSprite, 999999);
			this.setContentSize(this.defaultSprite.getContentSize());
		}
	},
	setActivatedSprite:function(aSprite) {
		if(this.activatedSprite) {
			if(this.activatedSprite.getParent())
				this.activatedSprite.getParent().removeChild(this.activatedSprite, true);
		}
		this.activatedSprite = aSprite;
		if(aSprite){
			this.addChild(this.activatedSprite, 1);
			this.setContentSize(this.activatedSprite.getContentSize());
		}
	},
	setDisabledSprite:function(aSprite) {
		if(this.disabledSprite) {
			if(this.disabledSprite.getParent())
				this.disabledSprite.getParent().removeChild(this.disabledSprite, true);
		}
		this.disabledSprite = aSprite;
		if(aSprite){
			this.addChild(this.disabledSprite, 2);
			this.setContentSize(this.disabledSprite.getContentSize());
		}
	},
	setPressSprite:function(aSprite) {
		if(this.pressSprite) {
			if(this.pressSprite.getParent())
				this.pressSprite.getParent().removeChild(this.pressSprite, true);
		}
		this.pressSprite = aSprite;
		if(aSprite) {
			this.addChild(this.pressSprite, 3);
			this.setContentSize(this.pressSprite.getContentSize());
		}
    	this.pressSprite.setVisible(false);
	},
	setButton:function(aButton) {
		if(this.button) {
			if(this.button.getParent())
				this.button.getParent().removeChild(this.button, true);
		}
		this.button = aButton;
		if(aButton) {
			this.addChild(this.button, 4);
			if(this.defaultSprite)
				this.button.setRadius(this.defaultSprite.getBoundingBox().width / 2);
		}
	}
});

SneakyButtonSkinnedBase.create = function() {
	var sneakyButtonSkinnedBase = new SneakyButtonSkinnedBase();
	if (sneakyButtonSkinnedBase && sneakyButtonSkinnedBase.init())
		return sneakyButtonSkinnedBase;
	return null;
};


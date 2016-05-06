var res = {
	face : "res/face.png",

	joystick_normal : "res/joystick_normal.png", 
    joystick_pressed : "res/joystick_pressed.png", 
    sneakybutton_pressed : "res/sneakybutton_pressed.png", 
    sneakybutton_default : "res/sneakybutton_default.png", 
    sneakybutton_disable : "res/sneakybutton_disable.png"
};

var g_resources = [];

for (var i in res) {
    g_resources.push(res[i]);
}
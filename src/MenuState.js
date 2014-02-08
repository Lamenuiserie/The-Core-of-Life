/*globals FM */
/**
 * @author Simon Chauvin
 */
var menuState = function () {
    "use strict";
    FM.State.apply(this);
    this.startButton = null;
    this.music = null;
    this.sound = null;
};
menuState.prototype = Object.create(FM.State.prototype);
/**
 * 
 */
menuState.prototype.init = function () {
    "use strict";
    FM.State.prototype.init.apply(this);

    var howToPlay = new FM.GameObject(10);
    howToPlay.addComponent(new FM.SpatialComponent(200, 250, howToPlay));
    var text = howToPlay.addComponent(new FM.TextRendererComponent("Click on the forms and see what you can do with them", howToPlay));
    text.setFormat('#fff', '30px sans-serif', 'middle');
    this.add(howToPlay);

    this.startButton = new FM.GameObject(10);
    this.startButton.addComponent(new FM.SpatialComponent(FM.Game.getScreenWidth() / 2 - 70, 512, this.startButton));
    text = this.startButton.addComponent(new FM.TextRendererComponent("Click to play", this.startButton));
    text.setFormat('#fff', '30px sans-serif', 'middle');
    this.add(this.startButton);

    this.music = new FM.GameObject(0, 0, "music");
    var audio = this.music.addComponent(new FM.AudioComponent(this.music));
    audio.addSound(FM.AssetManager.getAssetByName("music"));
    audio.play("music", 0.5, true);
};

menuState.prototype.update = function (dt) {
    FM.State.prototype.update.apply(this, [dt]);
    if (FM.Game.isMouseClicked()) {
        FM.Game.switchState(new playState());
    }
};
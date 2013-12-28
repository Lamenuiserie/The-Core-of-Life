/**
 * @author Simon Chauvin
 */
function menuState() {
    "use strict";
    var that = Object.create(FM.state()),
        startButton = null,
        music = null,
        sound = null;

    that.init = function () {
        Object.getPrototypeOf(that).init();

        var howToPlay = FM.gameObject(10);
        FM.spatialComponent(200, 250, howToPlay);
        var text = FM.textRendererComponent("Click on the forms and see what you can do with them", howToPlay);
        text.setFormat('#fff', '30px sans-serif', 'middle');
        that.add(howToPlay);

        startButton = FM.gameObject(10);
        FM.spatialComponent(FM.game.getScreenWidth() / 2 - 70, 512, startButton);
        text = FM.textRendererComponent("Click to play", startButton);
        text.setFormat('#fff', '30px sans-serif', 'middle');
        that.add(startButton);

        music = FM.gameObject(0, 0, "music");
        var audio = FM.audioComponent(music);
        audio.addSound(FM.assetManager.getAssetByName("music"));
        audio.play("music", 0.5, true);
    };

    that.update = function (game) {
        Object.getPrototypeOf(that).update(game);
        if (FM.game.isMouseClicked()) {
            FM.game.switchState(playState());
        }
    };

    return that;
}
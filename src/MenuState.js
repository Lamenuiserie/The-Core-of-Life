/**
 * @author Simon Chauvin
 */
function menuState() {
    "use strict";
    var that = Object.create(fmState());

    var startButton = null;
    var music = null;
    var sound = null;

    that.init = function () {
        Object.getPrototypeOf(that).init();

        var howToPlay = fmText(200, 250, 10, "Click on the forms and see what you can do with them");
        howToPlay.setFormat('#fff', '30px sans-serif', 'middle');
        that.add(howToPlay);

        startButton = fmText(fmParameters.screenWidth / 2 - 70, 512, 10, "Click to play");
        startButton.setFormat('#fff', '30px sans-serif', 'middle');
        that.add(startButton);

        music = fmSound(0, 0, "music");
        music.play(1, 0);
        sound = music.components[fmComponentTypes.sound].getSound();
    };

    that.update = function (game) {
        Object.getPrototypeOf(that).update(game);
        if (game.isMouseClicked()) {
            var newState = null;
            game.switchState(newState = playState());
            newState.setMusic(sound);
            //that.destroy();
        }

        if (sound.currentTime >= sound.duration - 1) {
            sound.currentTime = 0;
        }
    };

    return that;
}
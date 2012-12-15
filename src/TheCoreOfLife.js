/**
 * @author Simon Chauvin
 */
var start = function () {
    //Assets loading
    fmAssetManager.addAsset("music", fmParameters.AUDIO, "assets/sfx/music.ogg");
    fmAssetManager.addAsset("sprLifeForm1", fmParameters.IMAGE, "assets/gfx/lifeForm1.png");
    fmAssetManager.addAsset("sprLifeForm2", fmParameters.IMAGE, "assets/gfx/lifeForm2.png");
    fmAssetManager.addAsset("sprLifeForm3", fmParameters.IMAGE, "assets/gfx/lifeForm3.png");
    fmAssetManager.addAsset("sprLifeForm4", fmParameters.IMAGE, "assets/gfx/lifeForm4.png");
    fmAssetManager.addAsset("sprBackground", fmParameters.IMAGE, "assets/gfx/background.png");
    fmAssetManager.addAsset("sprCredits", fmParameters.IMAGE, "assets/gfx/credits.png");

    fmAssetManager.loadAssets();
    
    var game = fmGame("The Core of Life", 1024, 768, menuState);
    game.run();
};

window.addEventListener("load", start, false);
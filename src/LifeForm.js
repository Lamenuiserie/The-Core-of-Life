/*
 * @autho Simon Chauvin
 */
function lifeForm(x, y, imageName, formType) {
    "use strict";
    var that = FM.gameObject(10);
    that.spatial = FM.spatialComponent(x, y, that);
    that.type = formType;

    if (that.type === 1) {
        that.renderer = FM.animatedSpriteRendererComponent(FM.assetManager.getAssetByName(imageName), 200, 200, that);
        that.renderer.addAnimation("default", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35], 30, true);
        that.renderer.play("default");
    } else if (that.type === 2) {
        that.renderer = FM.animatedSpriteRendererComponent(FM.assetManager.getAssetByName(imageName), 200, 200, that);
        that.renderer.addAnimation("default", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35], 15, true);
        that.renderer.play("default");
    } else if (that.type === 3) {
        that.renderer = FM.animatedSpriteRendererComponent(FM.assetManager.getAssetByName(imageName), 250, 218, that);
        that.renderer.addAnimation("default", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], 15, true);
        that.renderer.addAnimation("die", [15,16,17,18,19,20,21], 15, false);
        that.renderer.addAnimation("revive", [22,23,24,25,26,27,1], 15, false);
        that.renderer.play("default");
    } else if (that.type === 4) {
        that.renderer = FM.animatedSpriteRendererComponent(FM.assetManager.getAssetByName(imageName), 250, 236, that);
        that.renderer.addAnimation("default", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25], 1, true);
        that.renderer.addAnimation("die", [26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43], 15, false);
        that.renderer.addAnimation("revive", [44,45,46,47,48,49,50,51,52,53,54,55,56,57,58], 15, false);
        that.renderer.play("default");
    }
    
    var width = that.renderer.getWidth();
    var height = that.renderer.getHeight();

    that.physicComponent = FM.aabbComponent(width - 20, height - 20, that);
    var positive = Math.random();
    var xVelocity = 1;
    var yVelocity = 1;
    if (positive > 0.5) {
        xVelocity = Math.random() * 70;
    } else {
        xVelocity = -Math.random() * 70;
    }
    positive = Math.random();
    if (positive > 0.5) {
        yVelocity = Math.random() * 70;
    } else {
        yVelocity = -Math.random() * 70;
    }
    that.physicComponent.velocity.reset(xVelocity, yVelocity);

    that.followPlayer = false;
    that.dead = false;

    /**
     * Update the life form
     */
    that.update = function (dt) {
        if (that.renderer.getCurrentAnim() === "revive" && that.renderer.finished) {
            that.renderer.play("default");
        } else if (that.renderer.getCurrentAnim() === "die" && that.renderer.finished) {
            that.renderer.stop();
        }

        width = that.renderer.getWidth();
        height = that.renderer.getHeight();
        
        var xPosition = that.spatial.position.x, yPosition = that.spatial.position.y;

        //Spawn at the opposite edge of the world
        if (xPosition + width <= that.bounds.x) {
            that.spatial.position.x = that.bounds.x + that.bounds.width;
        }
        else if (xPosition > that.bounds.x + that.bounds.width) {
            that.spatial.position.x = that.bounds.x - width;
        }
        if (yPosition + height <= that.bounds.y) {
            that.spatial.position.y = that.bounds.y + that.bounds.height;
        }
        else if (yPosition > that.bounds.y + that.bounds.height) {
            that.spatial.position.y = that.bounds.y - height;
        }

        if (that.followPlayer) {
            var areaToReach = FM.rectangle(FM.game.getMouseX(), FM.game.getMouseY(), 10, 10);
            var distanceX = Math.abs(that.spatial.position.x + that.renderer.getWidth() / 2 - areaToReach.x + areaToReach.width / 2);
            var distanceY = Math.abs(that.spatial.position.y + that.renderer.getHeight() / 2 - areaToReach.y + areaToReach.height / 2);
            
            if (that.spatial.position.x + that.renderer.getWidth() / 2 > areaToReach.x
                && that.spatial.position.x + that.renderer.getWidth() / 2 < areaToReach.x + areaToReach.width) {
                that.physicComponent.velocity.x = 0;
            } else if (that.spatial.position.x + that.renderer.getWidth() / 2 < areaToReach.x) {
                that.physicComponent.velocity.x = 70 * distanceX / 100;
            } else if (that.spatial.position.x + that.renderer.getWidth() / 2 > areaToReach.x + areaToReach.width) {
                that.physicComponent.velocity.x = -70 * distanceX / 100;
            }
            if (that.spatial.position.y + that.renderer.getHeight() / 2 > areaToReach.y
                && that.spatial.position.y + that.renderer.getHeight() / 2 < areaToReach.y + areaToReach.height) {
                that.physicComponent.velocity.y = 0;
            } else if (that.spatial.position.y + that.renderer.getHeight() / 2 < areaToReach.y) {
                that.physicComponent.velocity.y = 70 * distanceY / 100;
            } else if (that.spatial.position.y + that.renderer.getHeight() / 2 > areaToReach.y + areaToReach.height) {
                that.physicComponent.velocity.y = -70 * distanceY / 100;
            }
        }
    };

    return that;
}
/*
 * @autho Simon Chauvin
 */
function lifeForm(x, y, imageName, formType) {
    var that = Object.create(fmSprite(x, y, 10, imageName));

    that.spatial = that.components[fmComponentTypes.spatial];
    that.renderer = that.components[fmComponentTypes.renderer];
    
    var spatial = that.spatial;
    var renderer = that.renderer;
    
    that.type = formType;
    if (that.type == 1) {
        that.setAnimation("default", 200, 200, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35], 30, true);
        renderer.play("default");
    } else if (that.type == 2) {
        that.setAnimation("default", 200, 200, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35], 15, true);
        renderer.play("default");
    } else if (that.type == 3) {
        that.setAnimation("default", 250, 218, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], 15, true);
        that.setAnimation("die", 250, 218, [15,16,17,18,19,20,21], 15, false);
        that.setAnimation("revive", 250, 218, [22,23,24,25,26,27,1], 15, false);
        renderer.play("default");
    } else if (that.type == 4) {
        that.setAnimation("default", 250, 236, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25], 1, true);
        that.setAnimation("die", 250, 236, [26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43], 15, false);
        that.setAnimation("revive", 250, 236, [44,45,46,47,48,49,50,51,52,53,54,55,56,57,58], 15, false);
        renderer.play("default");
    }
    
    var width = renderer.getWidth();
    var height = renderer.getHeight();

    that.physicComponent = fmPhysicComponent(that);
    var positive = Math.random();
    var xVelocity = 1;
    var yVelocity = 1;
    if (positive > 0.5) {
        xVelocity = Math.random() * 7;
    } else {
        xVelocity = -Math.random() * 7;
    }
    positive = Math.random();
    if (positive > 0.5) {
        yVelocity = Math.random() * 7;
    } else {
        yVelocity = -Math.random() * 7;
    }
    that.physicComponent.xVelocity = xVelocity;
    that.physicComponent.yVelocity = yVelocity;
    that.addComponent(that.physicComponent);

    var scriptComponent = fmScriptComponent(that);
    that.addComponent(scriptComponent);

    that.bounds = fmRectangle(0, 0, 0, 0);
    that.followPlayer = false;

    that.dead = false;

    /**
     * Update the life form
     */
    that.update = function (game) {
        if (renderer.getCurrentAnim() == "revive" && renderer.finished) {
            renderer.play("default");
        } else if (renderer.getCurrentAnim() == "die" && renderer.finished) {
            that.renderer.stop();
        }

        width = renderer.getWidth();
        height = renderer.getHeight();
        
        var xPosition = spatial.x, yPosition = spatial.y;

        //Spawn at the opposite edge of the world
        if (xPosition + width <= that.bounds.x) {
            spatial.x = that.bounds.x + that.bounds.width;
        }
        else if (xPosition > that.bounds.x + that.bounds.width) {
            spatial.x = that.bounds.x - width;
        }
        if (yPosition + height <= that.bounds.y) {
            spatial.y = that.bounds.y + that.bounds.height;
        }
        else if (yPosition > that.bounds.y + that.bounds.height) {
            spatial.y = that.bounds.y - height;
        }

        if (that.followPlayer) {
            var worldBounds = game.getCurrentState().worldBounds;
            var areaToReach = fmRectangle(game.getMouseX() + worldBounds.xOffset, game.getMouseY() + worldBounds.yOffset, 10, 10);
            var distanceX = Math.abs(that.spatial.x + that.renderer.getWidth() / 2 - areaToReach.x + areaToReach.width / 2);
            var distanceY = Math.abs(that.spatial.y + that.renderer.getHeight() / 2 - areaToReach.y + areaToReach.height / 2);
            
            if (that.spatial.x + that.renderer.getWidth() / 2 > areaToReach.x
                && that.spatial.x + that.renderer.getWidth() / 2 < areaToReach.x + areaToReach.width) {
                that.physicComponent.xVelocity = 0;
            } else if (that.spatial.x + that.renderer.getWidth() / 2 < areaToReach.x) {
                that.physicComponent.xVelocity = 5 * distanceX / 100;
            } else if (that.spatial.x + that.renderer.getWidth() / 2 > areaToReach.x + areaToReach.width) {
                that.physicComponent.xVelocity = -5 * distanceX / 100;
            }
            if (that.spatial.y + that.renderer.getHeight() / 2 > areaToReach.y
                && that.spatial.y + that.renderer.getHeight() / 2 < areaToReach.y + areaToReach.height) {
                that.physicComponent.yVelocity = 0;
            } else if (that.spatial.y + that.renderer.getHeight() / 2 < areaToReach.y) {
                that.physicComponent.yVelocity = 5 * distanceY / 100;
            } else if (that.spatial.y + that.renderer.getHeight() / 2 > areaToReach.y + areaToReach.height) {
                that.physicComponent.yVelocity = -5 * distanceY / 100;
            }
        }
    };

    return that;
}
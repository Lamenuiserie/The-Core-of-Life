/**
 * Under Creative Commons Licence
 * @author Simon Chauvin
 * FMState is a simple container of game objects and helps structure the game
 *
 * @returns {FMState}
 */
function fmState() {
    "use strict";
    var that = Object.create({});

    /**
    * Bounds of the world (if greater than the screen resolution then apply
    * scrolling
    */
    that.worldBounds = fmRectangle(0, 0, 0, 0);
    that.worldBounds.xOffset = 0;
    that.worldBounds.yOffset = 0;

    /**
    * Bounds of the view (limited by the screen resolution of the game)
    */
    that.viewport = fmRectangle(0, 0, 0, 0);

    var fpsDisplay = fmText(10, 20, 99, "0");
    fpsDisplay.setFormat('#fff', '30px sans-serif', 'middle');
    var totalFrames = 1;
    var totalTimeElapsed = 0;

    /**
    * Array of arrays that stores colliders
    */
    //var colliders = [];

    /**
    * Object that makes the screen scrolls
    */
    var scroller = null;
    var followFrame = null;

    /**
    * Array containing every game objects of the state
    */
    that.gameObjects = [];

    /**
    * Initialize the state
    */
    that.init = function () {
        fpsDisplay.visible = false;
        that.add(fpsDisplay);

//        for (var i = 0; i < 8; i++) {
//                colliders.push([]);
//                for (var j = 0; j < 8; j++) {
//                        colliders[i].push([]);
//                }
//        }
    };

    /**
    * Initialize the bounds of the world, if not defined then apply the size of the game screen
    */
    that.initBounds = function () {
        // By default the view and the world are of the same size
        if (that.worldBounds.width == 0) {
            that.worldBounds.width = fmParameters.screenWidth;
        }
        if (that.worldBounds.height == 0) {
            that.worldBounds.height = fmParameters.screenHeight;
        }

        //Set the viewport size by the chosen screen size
        that.viewport.width = fmParameters.screenWidth;
        that.viewport.height = fmParameters.screenHeight;
    };

    /**
    * Private method that sort game objects according to their z index
    */
    var sortZIndex = function (a, b) {
            return (a.zIndex - b.zIndex);
    };

    /**
    * Add a game object to the state and sort it
    */
    that.add = function (gameObject) {
        that.gameObjects.push(gameObject);
        that.gameObjects.sort(sortZIndex);

//        if (gameObject && gameObject.components[fmComponentTypes.renderer]) {
//                var spatial = gameObject.components[fmComponentTypes.spatial];
//                if (gameObject.components[fmComponentTypes.collider]) {
//                        var indexI = Math.floor((spatial.x - 1) / (that.worldBounds.width / 8));
//                        var indexJ = Math.floor((spatial.y - 1) / (that.worldBounds.height / 8));
//                        colliders[indexI][indexJ].push(gameObject);
//                }
//        }
    };

    /**
    * Remove an object from the state
    */
    that.remove = function (gameObject) {
        var tmpGameObject, i = 0;
        while (i < that.gameObjects.length) {
            tmpGameObject = gameObjects.shift();
            if (tmpGameObject !== gameObject) {
                that.gameObjects.push(tmpGameObject);
            } else {
                gameObject.destroy();
                return;
            }
            i++;
        }
    };

    /**
    * Call all the updates
    */
    that.update = function (game) {
        //preUpdate(game);
        mainUpdate(game);
        //postUpdate(game);
    };

    /**
    * Ensure something someday
    */
    var preUpdate = function (game) {
        
    };

    /**
    * Update the game objects of the state
    */
    var mainUpdate = function (game) {
        var gameObject, collider, dynamic, controller, script, components;
        for ( var i = 0; i < that.gameObjects.length; i++) {
            gameObject = that.gameObjects[i];
            components = gameObject.components;
            collider = components[fmComponentTypes.collider];
            dynamic = components[fmComponentTypes.dynamic];
            controller = components[fmComponentTypes.controller];
            script = components[fmComponentTypes.script];
            if (collider) {
                collider.update(game);
            }
            if (dynamic) {
                if (!gameObject.destroyed) {
                    dynamic.update(game);
                }
            }
            if (controller) {
                controller.update(game);
            }
            if (script) {
                //FIXME use a system of pre and post update to ensure offset calculation
                //or not ?
                script.update(game);
            }
        }
    };
    
    /**
    * Ensure something someday
    */
    var postUpdate = function (game) {
        
    };

    /**
    * Draw the game objects of the state
    */
    that.draw = function (bufferContext) {
        bufferContext.clearRect(0, 0, fmParameters.screenWidth, fmParameters.screenHeight);
        var gameObject;
        for ( var i = 0; i < that.gameObjects.length; i++) {
            gameObject = that.gameObjects[i];
            var renderer = gameObject.components[fmComponentTypes.renderer];

            if (renderer) {
                var spatial = gameObject.components[fmComponentTypes.spatial];
                var dynamic = gameObject.components[fmComponentTypes.dynamic];
                var xPosition = spatial.x;
                var yPosition = spatial.y;
                var farthestXPosition = xPosition + renderer.getWidth();
                var farthestYPosition = yPosition + renderer.getHeight();

                //If there is scrolling from one game object
                if (scroller === gameObject) {
                    var newOffset;
                    var xVelocity = dynamic.xVelocity;
                    var yVelocity = dynamic.yVelocity;

                    // Going left
                    if (xVelocity < 0 && xPosition <= followFrame.x) {
                        newOffset = that.worldBounds.xOffset + xVelocity;
                        if (newOffset >= that.worldBounds.x) {
                            that.worldBounds.xOffset = newOffset;
                            followFrame.x += xVelocity;
                        }
                    }
                    // Going up
                    if (yVelocity < 0 && yPosition <= followFrame.y) {
                        newOffset = that.worldBounds.yOffset + yVelocity;
                        if (newOffset >= that.worldBounds.y) {
                            that.worldBounds.yOffset = newOffset;
                            followFrame.y += yVelocity;
                        }
                    }
                    // Going right
                    if (xVelocity > 0 && farthestXPosition >= followFrame.x + followFrame.width) {
                        newOffset = that.worldBounds.xOffset + xVelocity;
                        if (newOffset + that.viewport.width <= that.worldBounds.width) {
                            that.worldBounds.xOffset = newOffset;
                            followFrame.x += xVelocity;
                        }
                    }
                    // Going down
                    if (yVelocity > 0 && farthestYPosition >= followFrame.y + followFrame.height) {
                        newOffset = that.worldBounds.yOffset + yVelocity;
                        if (newOffset + that.viewport.height <= that.worldBounds.height) {
                            that.worldBounds.yOffset = newOffset;
                            followFrame.y += yVelocity;
                        }
                    }

                    // Debug display the camera bounds
                    if (fmParameters.debug) {
                        bufferContext.strokeStyle = '#fff';
                        bufferContext.strokeRect(followFrame.x - that.worldBounds.xOffset, followFrame.y - that.worldBounds.yOffset, followFrame.width,
                        followFrame.height);
                    }
                }

                //Update offsets
                bufferContext.xOffset = that.worldBounds.xOffset;
                bufferContext.yOffset = that.worldBounds.yOffset;

                //Draw the object to render if it is on screen
                var newViewX = that.viewport.x;
                var newViewY = that.viewport.y;
                if (renderer.scrolled) {
                    newViewX = that.viewport.x + that.worldBounds.xOffset;
                    newViewY = that.viewport.y + that.worldBounds.yOffset;
                }
                if (farthestXPosition >= newViewX && farthestYPosition >= newViewY
                    && xPosition <= newViewX + that.viewport.width && yPosition <= newViewY + that.viewport.height) {
                    if (!gameObject.destroyed && gameObject.visible) {
                        renderer.draw(bufferContext);
                    }
                }
            }

            // Debug
            if (fmParameters.debug) {
                //Display the fps
                fpsDisplay.visible = true;
                if (totalTimeElapsed / 1000 >= 1) {
                    fpsDisplay.components[fmComponentTypes.renderer].text = totalFrames;
                    totalFrames = 1;
                    totalTimeElapsed = 0;
                } else {
                    totalFrames += 1;
                    totalTimeElapsed += elapsedTime();
                }
                //Display the view bounds
                bufferContext.strokeStyle = '#fff';
                bufferContext.strokeRect(0, 0, that.viewport.width, that.viewport.height);

                //Display the world bounds
                bufferContext.strokeStyle = '#fff';
                bufferContext.strokeRect(that.viewport.x - that.worldBounds.x, that.worldBounds.y - that.viewport.y, that.worldBounds.width, that.worldBounds.height);
            }
        }
    };

    /**
    * Center the viewport on a specific game object
    */
    that.centerViewportOn = function(gameObject) {
        var spatial = gameObject.components[fmComponentTypes.spatial];
        that.worldBounds.xOffset = spatial.x;
        that.worldBounds.yOffset = spatial.y;
    }

    /**
    * Center the viewport at a specific given position
    */
    that.centerViewportAt = function(xPosition, yPosition) {
        that.worldBounds.xOffset = xPosition;
        that.worldBounds.yOffset = yPosition;
    }

    /**
    * Make an object as the scroller
    */
    that.follow = function(gameObject, width, height) {
        scroller = gameObject;
        followFrame = fmRectangle(fmParameters.screenWidth / 2 - width / 2 + that.worldBounds.xOffset, fmParameters.screenHeight / 2 - height / 2 + that.worldBounds.yOffset, width, height);
    }

    /**
    * Delete the scroller
    */
    that.unFollow = function() {
        followFrame = null;
        scroller = null;
    }

    /**
    * Destroy the state and its objects
    */
    that.destroy = function() {
        for ( var i = 0; i < that.gameObjects.length; i++) {
                that.gameObjects[i].destroy();
        }
        that.gameObjects = null;
    }
    
    /**
     * Return the object that scrolls the screen
     */
    that.getScroller = function () {
        return scroller;
    }

    return that;
}
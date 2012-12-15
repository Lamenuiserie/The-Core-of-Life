/**
 * @author Simon Chauvin
 */
function playState() {
    "use strict";
    var that = Object.create(fmState());

    that.bounds = fmRectangle (0, 0, parameters.WORLD_WIDTH, parameters.WORLD_HEIGHT);
    
    var lifeForms = [];
    var lifeForms1 = [];
    var lifeForms2 = [];
    var lifeForms3 = [];
    var lifeForms4 = [];

    var formFollowing = null;
    var isExpanding = false;
    var isReversingX = that.bounds.width > 0;
    var isReversingY = that.bounds.height > 0;
    var oldForm = null;
    var background = null;

    var music = null;

    that.init = function () {
        Object.getPrototypeOf(that).init();
        //TODO remove for release
        //fmParameters.debug = true;

        that.worldBounds.width = parameters.WORLD_WIDTH;
        that.worldBounds.height = parameters.WORLD_HEIGHT;

        var credits = fmSprite(parameters.WORLD_WIDTH / 2 - (fmParameters.screenWidth / 2), parameters.WORLD_HEIGHT / 2 - (fmParameters.screenHeight / 2) - 40, 0, "sprCredits");
        that.add(credits);

        background = fmSprite(0, 0, 0, "sprBackground");
        that.add(background);

        var form = lifeForm(500, 500, "sprLifeForm1", 1);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms1.push(form);

        form = lifeForm(1300, 1600, "sprLifeForm2", 2);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms2.push(form);

        form = lifeForm(1700, 1700, "sprLifeForm3", 3);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms3.push(form);

        form = lifeForm(1000, 1600, "sprLifeForm4", 4);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms4.push(form);

        form = lifeForm(2500, 1100, "sprLifeForm3", 3);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms3.push(form);

        form = lifeForm(2000, 500, "sprLifeForm4", 4);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms4.push(form);

        form = lifeForm(500, 1700, "sprLifeForm3", 3);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms3.push(form);

        form = lifeForm(900, 1000, "sprLifeForm4", 4);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms4.push(form);

        form = lifeForm(500, 1700, "sprLifeForm3", 3);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms3.push(form);

        form = lifeForm(900, 1000, "sprLifeForm4", 4);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms4.push(form);

        form = lifeForm(500, 1700, "sprLifeForm3", 3);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms3.push(form);

        form = lifeForm(900, 1000, "sprLifeForm4", 4);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms4.push(form);

        form = lifeForm(500, 1700, "sprLifeForm3", 3);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms3.push(form);

        form = lifeForm(900, 1000, "sprLifeForm4", 4);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms4.push(form);

        that.centerViewportAt(parameters.WORLD_WIDTH / 2, parameters.WORLD_HEIGHT / 2);
    };

    that.update = function (game) {
        Object.getPrototypeOf(that).update(game);

        //World shrinking
        var backgroundSpatial = background.components[fmComponentTypes.spatial];
        var backgroundRenderer = background.components[fmComponentTypes.renderer];
        if (isExpanding) {
            isReversingX = that.bounds.width < parameters.WORLD_WIDTH;
            isReversingY = that.bounds.height < parameters.WORLD_HEIGHT;
        } else {
            isReversingX = that.bounds.width > 100;
            isReversingY = that.bounds.height > 100;
        }
        if (isReversingX) {
            if (isExpanding) {
                backgroundSpatial.x -= parameters.currentShrinkingWidth / 2;
                backgroundRenderer.setWidth(backgroundRenderer.getWidth() + parameters.currentShrinkingWidth);
                var i = 0;
                for (i = 0; i < lifeForms.length; i++) {
                    var form = lifeForms[i];
                    var formRenderer = form.components[fmComponentTypes.renderer];
                    var formWidth = formRenderer.getWidth();
                    formRenderer.setWidth(formWidth + (formWidth * parameters.currentShrinkingWidth * 0.0008));
                }
            } else {
                backgroundSpatial.x += parameters.currentShrinkingWidth / 2;
                backgroundRenderer.setWidth(backgroundRenderer.getWidth() - parameters.currentShrinkingWidth);
                var i = 0;
                for (i = 0; i < lifeForms.length; i++) {
                    var form = lifeForms[i];
                    var formRenderer = form.components[fmComponentTypes.renderer];
                    var formWidth = formRenderer.getWidth();
                    formRenderer.setWidth(formWidth - (formWidth * parameters.currentShrinkingWidth * 0.0008));
                }
            }
            that.bounds.x = backgroundSpatial.x;
            that.bounds.width = backgroundRenderer.getWidth();
            form.bounds = that.bounds;
        } else {
            isExpanding = !isExpanding;
        }
        if (isReversingY) {
            if (isExpanding) {
                backgroundSpatial.y -= parameters.currentShrinkingHeight / 2;
                backgroundRenderer.setHeight(backgroundRenderer.getHeight() + parameters.currentShrinkingHeight);
                var i = 0;
                for (i = 0; i < lifeForms.length; i++) {
                    var form = lifeForms[i];
                    var formRenderer = form.components[fmComponentTypes.renderer];
                    var formHeight = formRenderer.getHeight();
                    formRenderer.setHeight(formHeight + (formHeight * parameters.currentShrinkingHeight * 0.0008));
                }
            } else {
                backgroundSpatial.y += parameters.currentShrinkingHeight / 2;
                backgroundRenderer.setHeight(backgroundRenderer.getHeight() - parameters.currentShrinkingHeight);
                var i = 0;
                for (i = 0; i < lifeForms.length; i++) {
                    var form = lifeForms[i];
                    var formRenderer = form.components[fmComponentTypes.renderer];
                    var formHeight = formRenderer.getHeight();
                    formRenderer.setHeight(formHeight - (formHeight * parameters.currentShrinkingHeight * 0.0008));
                }
            }
            that.bounds.y = backgroundSpatial.y;
            that.bounds.height = backgroundRenderer.getHeight();
            form.bounds = that.bounds;
        }
        
        //Handle clicks on forms
        if (game.isMouseClicked()) {
            var i = 0;
            for (i = 0; i < lifeForms.length; i++) {
                var form = lifeForms[i];
                var formSpatial = form.components[fmComponentTypes.spatial];
                var formRenderer = form.components[fmComponentTypes.renderer];
                var formWidth = formRenderer.getWidth();
                var formHeight = formRenderer.getHeight();
                var mouseX = game.getMouseX();
                var mouseY = game.getMouseY();

                var formX = formSpatial.x - that.worldBounds.xOffset;
                var formY = formSpatial.y - that.worldBounds.yOffset;

                if (mouseX >= formX && mouseX <= formX + formWidth
                    && mouseY >= formY && mouseY <= formY + formHeight) {
                    if (!formFollowing) {
                        form.physicComponent.stop();
                        that.follow(form, fmParameters.screenWidth / 2, fmParameters.screenHeight / 2);
                        form.followPlayer = true;
                        formFollowing = form;
                    } else {
                        formFollowing.physicComponent.xVelocity = 5;
                        formFollowing.physicComponent.yVelocity = 4;
                        that.unFollow();
                        formFollowing.followPlayer = false;
                        form.physicComponent.stop();
                        that.follow(form, fmParameters.screenWidth / 2, fmParameters.screenHeight / 2);
                        form.followPlayer = true;
                        formFollowing = form;
                    }
                    i = lifeForms.length;
                }
            }

            if (music.currentTime >= music.duration - 1) {
                music.currentTime = 0;
            }
        }
        
        //Hide forms going outside the world
        var i = 0;
        for (i = 0; i < lifeForms.length; i++) {
            var form = lifeForms[i];
            var formSpatial = form.components[fmComponentTypes.spatial];
            var xPosition = formSpatial.x;
            var yPosition = formSpatial.y;
            var formRenderer = form.components[fmComponentTypes.renderer];
            var formWidth = formRenderer.getWidth();
            var formHeight = formRenderer.getHeight();

            if (game.isMouseClicked()) {
                var mouseX = game.getMouseX();
                var mouseY = game.getMouseY();

                var formX = formSpatial.x - that.worldBounds.xOffset;
                var formY = formSpatial.y - that.worldBounds.yOffset;

                if (mouseX >= formX && mouseX <= formX + formWidth
                    && mouseY >= formY && mouseY <= formY + formHeight) {
                    if (!formFollowing) {
                        form.physicComponent.stop();
                        that.follow(form, fmParameters.screenWidth / 2, fmParameters.screenHeight / 2);
                        form.followPlayer = true;
                        formFollowing = form;
                    } else {
                        formFollowing.physicComponent.xVelocity = 5;
                        formFollowing.physicComponent.yVelocity = 4;
                        that.unFollow();
                        formFollowing.followPlayer = false;
                        form.physicComponent.stop();
                        that.follow(form, fmParameters.screenWidth / 2, fmParameters.screenHeight / 2);
                        form.followPlayer = true;
                        formFollowing = form;
                    }
                    i = lifeForms.length;
                }
            }

            if (xPosition + formWidth < that.bounds.x || yPosition + formHeight < that.bounds.y
                || xPosition > that.bounds.x + that.width || yPosition > that.bounds.y + that.bounds.height) {
                form.visible = false;
            } else {
                form.visible = true;
            }
        }

        var i = 0, j = 0;
        for (i = 0; i < lifeForms.length; i++) {
            var form = lifeForms[i];
            var formSpatial = form.components[fmComponentTypes.spatial];
            var xPosition = formSpatial.x;
            var yPosition = formSpatial.y;
            var formRenderer = form.components[fmComponentTypes.renderer];
            var formWidth = formRenderer.getWidth();
            var formHeight = formRenderer.getHeight();

            //Hide forms going outside the world
            if (xPosition + formWidth < that.bounds.x || yPosition + formHeight < that.bounds.y
                || xPosition > that.bounds.x + that.width || yPosition > that.bounds.y + that.bounds.height) {
                form.visible = false;
            } else {
                form.visible = true;
            }

            //Handle interaction between life forms
            for (j = 0; j < lifeForms3.length; j++) {
                var form3 = lifeForms3[j];
                if (form.collide(form3)) {
                    if (form.type == 1) {
                        if (form3.renderer.getCurrentAnim() != "die" && (form3.renderer.getCurrentAnim() != "revive" || form3.renderer.finished) && !form3.dead) {
                            form3.dead = true;
                            form3.renderer.play("die");
                            if (isExpanding) {
                                parameters.currentShrinkingWidth -= parameters.SHRINKING_WIDTH * 0.3;
                                parameters.currentShrinkingHeight -= parameters.SHRINKING_HEIGHT * 0.3;
                            } else {
                                parameters.currentShrinkingWidth += parameters.SHRINKING_WIDTH * 0.3;
                                parameters.currentShrinkingHeight += parameters.SHRINKING_HEIGHT * 0.3;
                            }
                        }
                    } else if (form.type == 2) {
                        if (form3.renderer.getCurrentAnim() != "revive" && (form3.renderer.getCurrentAnim() != "die" || form3.renderer.finished) && form3.dead) {
                            form3.dead = false;
                            form3.renderer.play("revive");
                            if (isExpanding) {
                                parameters.currentShrinkingWidth += parameters.SHRINKING_WIDTH * 0.3;
                                parameters.currentShrinkingHeight += parameters.SHRINKING_HEIGHT * 0.3;
                            } else {
                                parameters.currentShrinkingWidth -= parameters.SHRINKING_WIDTH * 0.3;
                                parameters.currentShrinkingHeight -= parameters.SHRINKING_HEIGHT * 0.3;
                            }
                        }
                    }
                }
            }
            oldForm = null;
            for (j = 0; j < lifeForms4.length; j++) {
                var form4 = lifeForms4[j];
                if (form.collide(form4)) {
                    if (form.type == 1) {
                        if (form4.renderer.getCurrentAnim() != "die" && (form4.renderer.getCurrentAnim() != "revive" || form4.renderer.finished) && !form4.dead) {
                            form4.dead = true;
                            form4.renderer.play("die");
                            if (isExpanding) {
                                parameters.currentShrinkingWidth -= parameters.SHRINKING_WIDTH * 0.3;
                                parameters.currentShrinkingHeight -= parameters.SHRINKING_HEIGHT * 0.3;
                            } else {
                                parameters.currentShrinkingWidth += parameters.SHRINKING_WIDTH * 0.3;
                                parameters.currentShrinkingHeight += parameters.SHRINKING_HEIGHT * 0.3;
                            }
                        }
                    } else if (form.type == 2) {
                        if (form4.renderer.getCurrentAnim() != "revive" && (form4.renderer.getCurrentAnim() != "die" || form4.renderer.finished) && form4.dead) {
                            form4.dead = false;
                            form4.renderer.play("revive");
                            if (isExpanding) {
                                parameters.currentShrinkingWidth += parameters.SHRINKING_WIDTH * 0.3;
                                parameters.currentShrinkingHeight += parameters.SHRINKING_HEIGHT * 0.3;
                            } else {
                                parameters.currentShrinkingWidth -= parameters.SHRINKING_WIDTH * 0.3;
                                parameters.currentShrinkingHeight -= parameters.SHRINKING_HEIGHT * 0.3;
                            }
                        }
                    }
                }
            }
        }
    };

    that.setMusic = function (curMusic) {
        music = curMusic;
    };

    return that;
}
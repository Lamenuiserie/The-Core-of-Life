/**
 * @author Simon Chauvin
 */
function playState() {
    "use strict";
    var that = Object.create(FM.state()),
        lifeForms = [],
        lifeForms1 = [],
        lifeForms2 = [],
        lifeForms3 = [],
        lifeForms4 = [],
        formFollowing = null,
        isExpanding = false,
        isReversingX,
        isReversingY,
        oldForm = null,
        background = null,
        music = null;
    /**
     * 
     * @returns {undefined}
     */
    that.init = function () {
        Object.getPrototypeOf(that).init(parameters.WORLD_WIDTH, parameters.WORLD_HEIGHT);

        that.bounds = FM.rectangle(0, 0, that.getWorld().width, that.getWorld().height);

        isReversingX = that.bounds.width > 0;
        isReversingY = that.bounds.height > 0;

        var credits = FM.gameObject(0);
        FM.spatialComponent(parameters.WORLD_WIDTH / 2 - (FM.game.getScreenWidth() / 2) + 20, parameters.WORLD_HEIGHT / 2 - (FM.game.getScreenHeight() / 2) - 40, credits);
        FM.spriteRendererComponent(FM.assetManager.getAssetByName("credits"), 1024, 768, credits);
        that.add(credits);

        background = FM.gameObject(0);
        FM.spatialComponent(0, 0, background);
        FM.spriteRendererComponent(FM.assetManager.getAssetByName("background"), parameters.WORLD_WIDTH, parameters.WORLD_HEIGHT, background);
        that.add(background);

        var form = lifeForm(500, 500, "lifeForm1", 1);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms1.push(form);

        form = lifeForm(1300, 1600, "lifeForm2", 2);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms2.push(form);

        form = lifeForm(1500, 1200, "lifeForm3", 3);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms3.push(form);

        form = lifeForm(1000, 1600, "lifeForm4", 4);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms4.push(form);

        form = lifeForm(2500, 1100, "lifeForm3", 3);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms3.push(form);

        form = lifeForm(2000, 500, "lifeForm4", 4);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms4.push(form);

        form = lifeForm(500, 1700, "lifeForm3", 3);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms3.push(form);

        form = lifeForm(900, 1000, "lifeForm4", 4);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms4.push(form);

        form = lifeForm(250, 450, "lifeForm3", 3);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms3.push(form);

        form = lifeForm(400, 1900, "lifeForm4", 4);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms4.push(form);

        form = lifeForm(1800, 400, "lifeForm3", 3);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms3.push(form);

        form = lifeForm(2000, 1900, "lifeForm4", 4);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms4.push(form);

        form = lifeForm(1500, 1600, "lifeForm3", 3);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms3.push(form);

        form = lifeForm(1900, 100, "lifeForm4", 4);
        form.bounds = that.bounds;
        that.add(form);
        lifeForms.push(form);
        lifeForms4.push(form);

        that.centerCameraAt(parameters.WORLD_WIDTH / 2, parameters.WORLD_HEIGHT / 2);
    };

    that.update = function (dt) {
        Object.getPrototypeOf(that).update(dt);

        //World shrinking
        var backgroundSpatial = background.components[FM.componentTypes.SPATIAL],
            backgroundRenderer = background.components[FM.componentTypes.RENDERER],
            i,
            form,
            formRenderer,
            formPhysic,
            formWidth;
        if (isExpanding) {
            isReversingX = that.bounds.width < parameters.WORLD_WIDTH;
            isReversingY = that.bounds.height < parameters.WORLD_HEIGHT;
        } else {
            isReversingX = that.bounds.width > 100;
            isReversingY = that.bounds.height > 100;
        }
        if (isReversingX) {
            if (isExpanding) {
                backgroundSpatial.position.x -= parameters.currentShrinkingWidth / 2;
                backgroundRenderer.setWidth(backgroundRenderer.getWidth() + parameters.currentShrinkingWidth);
                for (i = 0; i < lifeForms.length; i++) {
                    form = lifeForms[i];
                    formRenderer = form.components[FM.componentTypes.RENDERER];
                    formPhysic = form.components[FM.componentTypes.PHYSIC];
                    formWidth = formRenderer.getWidth();
                    formRenderer.setWidth(formWidth + (formWidth * parameters.currentShrinkingWidth * 0.0008));
                    formPhysic.width = formPhysic.width + (formPhysic.width * parameters.currentShrinkingWidth * 0.0008);
                }
            } else {
                backgroundSpatial.position.x += parameters.currentShrinkingWidth / 2;
                backgroundRenderer.setWidth(backgroundRenderer.getWidth() - parameters.currentShrinkingWidth);
                for (i = 0; i < lifeForms.length; i++) {
                    form = lifeForms[i];
                    formRenderer = form.components[FM.componentTypes.RENDERER];
                    formPhysic = form.components[FM.componentTypes.PHYSIC];
                    formWidth = formRenderer.getWidth();
                    formRenderer.setWidth(formWidth - (formWidth * parameters.currentShrinkingWidth * 0.0008));
                    formPhysic.width = formPhysic.width - (formPhysic.width * parameters.currentShrinkingWidth * 0.0008);
                }
            }
            that.bounds.x = backgroundSpatial.position.x;
            that.bounds.width = backgroundRenderer.getWidth();
            form.bounds = that.bounds;
        } else {
            isExpanding = !isExpanding;
        }
        if (isReversingY) {
            if (isExpanding) {
                backgroundSpatial.position.y -= parameters.currentShrinkingHeight / 2;
                backgroundRenderer.setHeight(backgroundRenderer.getHeight() + parameters.currentShrinkingHeight);
                for (i = 0; i < lifeForms.length; i++) {
                    form = lifeForms[i];
                    formRenderer = form.components[FM.componentTypes.RENDERER];
                    formPhysic = form.components[FM.componentTypes.PHYSIC];
                    formHeight = formRenderer.getHeight();
                    formRenderer.setHeight(formHeight + (formHeight * parameters.currentShrinkingHeight * 0.0008));
                    formPhysic.height = formPhysic.height + (formPhysic.height * parameters.currentShrinkingHeight * 0.0008);
                }
            } else {
                backgroundSpatial.position.y += parameters.currentShrinkingHeight / 2;
                backgroundRenderer.setHeight(backgroundRenderer.getHeight() - parameters.currentShrinkingHeight);
                for (i = 0; i < lifeForms.length; i++) {
                    form = lifeForms[i];
                    formRenderer = form.components[FM.componentTypes.RENDERER];
                    formPhysic = form.components[FM.componentTypes.PHYSIC];
                    formHeight = formRenderer.getHeight();
                    formRenderer.setHeight(formHeight - (formHeight * parameters.currentShrinkingHeight * 0.0008));
                    formPhysic.height = formPhysic.height - (formPhysic.height * parameters.currentShrinkingHeight * 0.0008);
                }
            }
            that.bounds.y = backgroundSpatial.position.y;
            that.bounds.height = backgroundRenderer.getHeight();
            form.bounds = that.bounds;
        }
        
        //Handle clicks on forms
        if (FM.game.isMouseClicked()) {
            var i = 0,
                form,
                formSpatial,
                formRenderer,
                formWidth,
                formHeight,
                mouseX = FM.game.getMouseX(),
                mouseY = FM.game.getMouseY(),
                formX,
                formY,
                positive,
                xVelocity,
                yVelocity;
            for (i = 0; i < lifeForms.length; i++) {
                form = lifeForms[i],
                formSpatial = form.components[FM.componentTypes.SPATIAL],
                formRenderer = form.components[FM.componentTypes.RENDERER],
                formWidth = formRenderer.getWidth(),
                formHeight = formRenderer.getHeight(),
                formX = formSpatial.position.x,
                formY = formSpatial.position.y;

                if (mouseX >= formX && mouseX <= formX + formWidth
                    && mouseY >= formY && mouseY <= formY + formHeight) {
                    if (!formFollowing) {
                        form.physicComponent.velocity.reset(0, 0);
                        that.centerCameraOn(form);
                        that.follow(form, FM.game.getScreenWidth() / 2, FM.game.getScreenHeight() / 2, true);
                        form.followPlayer = true;
                        formFollowing = form;
                    } else {
                        positive = Math.random();
                        xVelocity = 1;
                        yVelocity = 1;
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
                        formFollowing.physicComponent.velocity.reset(xVelocity, yVelocity);
                        that.unFollow();
                        formFollowing.followPlayer = false;
                        form.physicComponent.velocity.reset(0, 0);
                        that.centerCameraOn(form);
                        that.follow(form, FM.game.getScreenWidth() / 2, FM.game.getScreenHeight() / 2, true);
                        form.followPlayer = true;
                        formFollowing = form;
                    }
                    i = lifeForms.length;
                }
            }
        }

        //Handle interaction between life forms
        var i = 0, j = 0;
        for (i = 0; i < lifeForms.length; i++) {
            var form = lifeForms[i];
            for (j = 0; j < lifeForms3.length; j++) {
                var form3 = lifeForms3[j];
                if (form.physicComponent.overlapsWithObject(form3.physicComponent)) {
                    if (form.type === 1) {
                        if (form3.renderer.getCurrentAnim() !== "die" && (form3.renderer.getCurrentAnim() !== "revive" || form3.renderer.finished) && !form3.dead) {
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
                    } else if (form.type === 2) {
                        if (form3.renderer.getCurrentAnim() !== "revive" && (form3.renderer.getCurrentAnim() !== "die" || form3.renderer.finished) && form3.dead) {
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
                if (form.physicComponent.overlapsWithObject(form4.physicComponent)) {
                    if (form.type === 1) {
                        if (form4.renderer.getCurrentAnim() !== "die" && (form4.renderer.getCurrentAnim() !== "revive" || form4.renderer.finished) && !form4.dead) {
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
                    } else if (form.type === 2) {
                        if (form4.renderer.getCurrentAnim() !== "revive" && (form4.renderer.getCurrentAnim() !== "die" || form4.renderer.finished) && form4.dead) {
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